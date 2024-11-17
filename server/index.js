const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware 
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://teachtrove-e43dd.firebaseapp.com', 'https://teachtrove-e43dd.web.app' ],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ahphq0t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const productCollection = client.db('WaveGadget').collection('product');
    const CartCollection = client.db('TechTrove').collection('cartsItem');
    const paymentHistoryCollection = client.db('TechTrove').collection('paymentHistory');
    const wishlistCollection = client.db('TechTrove').collection('wishlistItem');

      // Create Payment Intent API for Stripe
      app.post('/create-payment-intent', async (req, res) => {
        const { amount } = req.body;
    
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100, // Amount in cents
                currency: 'usd',
            });
    
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).send({ error: 'Failed to create payment intent' });
        }
    });
    
    
    

    // Fetch Products Endpoint
    app.get('/products', async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const category = req.query.category || '';
        const brand = req.query.brand || '';
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice) || 10000;
        const sort = req.query.sort || '';

        const query = {
            name: { $regex: search, $options: 'i' },
            category: category ? category : { $exists: true },
            brand: brand ? brand : { $exists: true },
            price: { $gte: minPrice, $lte: maxPrice }
        };

        const sortOptions = {};
        if (sort === 'lowToHigh') sortOptions.price = 1;
        if (sort === 'highToLow') sortOptions.price = -1;
        if (sort === 'newest') sortOptions._id = -1;

        const total = await productCollection.countDocuments(query);
        const products = await productCollection.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        res.send({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    });


    


    // get product detail
    app.get('/product-detail/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productCollection.findOne(query);
        res.send(result);
      });




    // Add Item to Cart Endpoint
    app.post('/cart', async (req, res) => {
        try {
            const cartItem = req.body; // This will contain the product data sent from the frontend
            const result = await CartCollection.insertOne(cartItem);
            res.status(201).send({ success: true, message: "Item added to cart", cartItem: result });
        } catch (error) {
            res.status(500).send({ success: false, message: "Failed to add item to cart", error });
        }
    });

    // Add Item to Cart Endpoint
    app.post('/wishlist', async (req, res) => {
        try {
            const wishlist = req.body; // This will contain the product data sent from the frontend
            const result = await wishlistCollection.insertOne(wishlist);
            res.status(201).send({ success: true, message: "Item added to Wishlist", cartItem: result });
        } catch (error) {
            res.status(500).send({ success: false, message: "Failed to add item to Wishlist", error });
        }
    });


    // Fetch Cart Items for a User Endpoint
    app.get('/cart', async (req, res) => {
        const userEmail = req.query.userEmail;

        if (!userEmail) {
            return res.status(400).send({ success: false, message: "User email is required" });
        }

        try {
            const cartItems = await CartCollection.find({ userEmail }).toArray();
            res.send({ success: true, cartItems });
        } catch (error) {
            res.status(500).send({ success: false, message: "Failed to fetch cart items", error });
        }
    });


    // Delete item from cart
    app.delete('/cart/:id', async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const query = { _id: (id) };
            const result = await CartCollection.deleteOne(query);
            console.log(result);
            res.send(result);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    });
    


  // Fetch Wishlist Items for a User Endpoint
  app.get('/wishlist', async (req, res) => {
    const userEmail = req.query.userEmail;

    if (!userEmail) {
        return res.status(400).send({ success: false, message: "User email is required" });
    }

    try {
        const cartItems = await wishlistCollection.find({ userEmail }).toArray();
        res.send({ success: true, cartItems });
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to fetch cart items", error });
    }
});

// Delete item from wishlist
app.delete('/wishlist/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const query = { _id: (id) };
      const result = await wishlistCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });





// Payment history
app.post('/payment-history', async (req, res) => {
    const paymentDetails = req.body;

    try {
        const result = await paymentHistoryCollection.insertOne(paymentDetails);
        res.status(201).send({ success: true, message: "Payment recorded", paymentId: result.insertedId });
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to record payment", error });
    }
});



// Fetch Payment History for a User Endpoint
app.get('/payment-history', async (req, res) => {
    const userEmail = req.query.userEmail;
    console.log(userEmail);

    if (!userEmail) {
        return res.status(400).send({ success: false, message: "User email is required" });
    }

    try {
        const payments = await paymentHistoryCollection.find({ userEmail }).toArray();
        res.send({ success: true, payments });
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).send({ success: false, message: "Failed to fetch payment history", error });
    }
});

    

      

    // Connect the client to the server
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
    res.send('TechTrove is running');
});

// Start the server
app.listen(port, () => {
    console.log(`TechTrove is running on port ${port}`);
});
