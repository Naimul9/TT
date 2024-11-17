import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic"; // Ensure this hook is set up correctly

const ProductsDetail = () => {
    const { id } = useParams(); // Get the product ID from the URL parameters
    const axiosPublic = useAxiosPublic(); // Hook to handle Axios requests
    const [product, setProduct] = useState(null); // State for product details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch product details when component mounts or ID changes
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axiosPublic.get(`/product-detail/${id}`); // Ensure the endpoint is correct
                setProduct(response.data); // Set the product data from the response
            } catch (err) {
                setError("Failed to fetch product details."); // Set error message
                console.error("Error fetching product details:", err);
            } finally {
                setLoading(false); // Set loading to false in both success and error cases
            }
        };

        fetchProductDetail(); // Call the function
    }, [id, axiosPublic]); // Dependency array to re-fetch when ID changes

    if (loading) {
        return (
            <div className="text-center my-10">
                <span className="loading loading-bars loading-md"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center my-10">
                <h2 className="text-red-600">{error}</h2>
            </div>
        );
    }

    if (!product) {
        return <div>No product found.</div>; // Handle case where product is not found
    }

    return (
        <div className="container mx-auto my-10 px-4">
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="rounded-xl "
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className="text-sm">{product.brand}</p>
                    <p>{product.category}</p>
                    <p className="text-lg font-bold">${product.price}</p>
                    <p>{product.description}</p> {/* Displaying product description */}
                </div>
            </div>
        </div>
    );
};

export default ProductsDetail;
