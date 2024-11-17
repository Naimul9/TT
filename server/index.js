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
    origin: ['http://localhost:5173', 'http://localhost:5174', ],
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
