import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useDebounce from "../../Hooks/useDedounce";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Products = () => {
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
    const [loading, setLoading] = useState(false);

    const axiosPublic = useAxiosPublic();
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
                search: debouncedSearchTerm || '',
                category: filters.category || '',
                brand: filters.brand || '',
                minPrice: filters.minPrice || '',
                maxPrice: filters.maxPrice || '',
                sort: sort || '',
            });

            const response = await axiosPublic.get(`/products?${queryParams.toString()}`);
            setProducts(response.data.products || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, debouncedSearchTerm, filters, sort]);

    return (
        <div className="container mx-auto my-10 px-4">
            <Helmet>
                <title>Products</title>
            </Helmet>

            {/* Search Input */}
            <div className="flex flex-col lg:flex-row justify-between mb-7 space-y-4 lg:space-y-0">
                <div className="flex w-full lg:max-w-xs">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Sorting Dropdown */}
                <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
                    className="select select-bordered select-sm w-full lg:w-32"
                >
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
                    onChange={(e) => { setFilters({ ...filters, category: e.target.value }); setCurrentPage(1); }}
                    className="select select-bordered select-sm w-full"
                >
                    <option value="">All Categories</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Earphones">Earphones</option>
                    <option value="Soundbox">Soundbox</option>
                </select>

                <select
                    value={filters.brand}
                    onChange={(e) => { setFilters({ ...filters, brand: e.target.value }); setCurrentPage(1); }}
                    className="select select-bordered select-sm w-full"
                >
                    <option value="">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                </select>

                <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => { setFilters({ ...filters, minPrice: e.target.value }); setCurrentPage(1); }}
                    placeholder="Min Price"
                    className="input input-bordered h-8 w-full"
                />
                <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => { setFilters({ ...filters, maxPrice: e.target.value }); setCurrentPage(1); }}
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
                    {products.length > 0 ? (
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
                                            <Link to={`/product-detail/${product._id}`}>
                                                <button className="btn bg-slate-400 hover:bg-slate-500 text-white">Details</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center my-10 text-lg font-semibold">
                            No products available.
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {products.length > 0 && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="btn bg-gray-500 text-white mr-2"
                            >
                                Previous
                            </button>
                            <span className="mx-2 flex items-center">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="btn bg-gray-500 text-white"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;
