import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
    const { user } = useContext(AuthContext); // Removed loading from AuthContext
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        minPrice: '',
        maxPrice: ''
    });
    const [sort, setSort] = useState('');
    const [loading, setLoading] = useState(false); // Local loading state

    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate(); 
    const location = useLocation(); 

    const query = new URLSearchParams(location.search);
    const categoryFromQuery = query.get('category');

    useEffect(() => {
        if (categoryFromQuery) {
            setFilters((prevFilters) => ({ ...prevFilters, category: categoryFromQuery }));
        }
    }, [categoryFromQuery]);

    const fetchProducts = async () => {
        setLoading(true); // Set loading to true when fetching starts
        try {
            const queryParams = new URLSearchParams({
                page: currentPage,
                search: searchTerm,
                category: filters.category,
                brand: filters.brand,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                sort: sort,
                limit: 10 
            }).toString();

            const response = await axiosPublic.get(`/products?${queryParams}`);
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, filters, sort]);

    const handleAddToCart = async (product) => {
        if (!user?.email) {
            navigate('/login');
            return;
        }

        const cartItem = {
            ...product,
            userEmail: user?.email
        };

        try {
            const response = await axiosPublic.post('/cart', cartItem);
            if (response.data.success) {
                toast.success("Item added to cart");
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error('Item already added');
        }
    };

    const handleAddToWishlist = async (product) => {
        if (!user?.email) {
            navigate('/login');
            return;
        }

        const wishlistItem = {
            ...product,
            userEmail: user?.email
        };

        try {
            const response = await axiosPublic.post('/wishlist', wishlistItem);
            if (response.data.success) {
                toast.success("Item added to wishlist");
            }
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
            toast.error('Item already added');
        }
    };

    return (
        <div className="container mx-auto my-10 px-4">
            <Helmet>
                <title>Products</title>
            </Helmet>

            {/* Search Input with Button Inside */}
            <div className="flex flex-col lg:flex-row justify-between mb-7 space-y-4 lg:space-y-0">
                <div className="flex w-full lg:max-w-xs">
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Search products..." 
                        className="input input-bordered w-full"
                    />
                    <button 
                        onClick={() => { setCurrentPage(1); fetchProducts(); }} 
                        className="btn bg-slate-600 text-white">
                        Search
                    </button>
                </div>

                {/* Sorting Dropdown */}
                <select 
                    value={sort} 
                    onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }} 
                    className="select select-bordered select-sm w-full lg:w-32">
                    <option value="">Sort By</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                    <option value="newest">Newest First</option>
                </select>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-7">
                <select 
                    value={filters.category} 
                    onChange={(e) => { setFilters({...filters, category: e.target.value}); setCurrentPage(1); }} 
                    className="select select-bordered select-sm w-full">
                    <option value="">All Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Earphones">Earphones</option>
                    <option value="Soundbox">Soundbox</option>
                </select>

                <select 
                    value={filters.brand} 
                    onChange={(e) => { setFilters({...filters, brand: e.target.value}); setCurrentPage(1); }} 
                    className="select select-bordered select-sm w-full">
                    <option value="">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                </select>

                <input 
                    type="number" 
                    value={filters.minPrice} 
                    onChange={(e) => { setFilters({...filters, minPrice: e.target.value}); setCurrentPage(1); }} 
                    placeholder="Min Price" 
                    className="input input-bordered h-8 w-full"
                />
                <input 
                    type="number" 
                    value={filters.maxPrice} 
                    onChange={(e) => { setFilters({...filters, maxPrice: e.target.value}); setCurrentPage(1); }} 
                    placeholder="Max Price" 
                    className="input input-bordered h-8 w-full"
                />
            </div>  

            {/* Loading Indicator */}
            {loading ? (
                <div className="text-center my-10">
                    <span className="loading loading-bars loading-md"></span>
                </div>
            ) : (
                <>
                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map(product => (
                            <div key={product.id} className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body">
                                    <p className="text-sm">{product.brand}</p>
                                    <h2 className="card-title">{product.name}</h2>
                                    <p>{product.category}</p>
                                    <p className="text-lg font-bold">${product.price}</p>
                                    <div className="card-actions flex justify-between">
                                        <button 
                                            onClick={() => handleAddToCart(product)} 
                                            className="btn bg-slate-400 hover:bg-slate-500 text-white">
                                            Add To Cart
                                        </button>
                                        <button onClick={() => handleAddToWishlist(product)} className="btn bg-slate-400 hover:bg-slate-500 text-white">Wishlist</button>
                                        <Link to={`/product-detail/${product._id}`}>
                                            <button className="btn bg-slate-400 hover:bg-slate-500 text-white">Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-10">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                            disabled={currentPage === 1}
                            className="btn bg-gray-500 text-white mr-2">
                            Previous
                        </button>
                        <span className="mx-2 flex items-center">Page {currentPage} of {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                            disabled={currentPage === totalPages}
                            className="btn bg-gray-500 text-white">
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
