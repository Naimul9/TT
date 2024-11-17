import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="lg:w-full w-11/12 mx-auto">
            <div
                className="hero min-h-screen my-10"
                style={{
                    backgroundImage: "url(https://i.ibb.co/4JgFFpx/DALL-E-2024-08-17-12-06-55-A-banner-image-for-a-website-featuring-an-array-of-modern-electronic-gadg.webp)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectFit: "contain"
                }}
            >
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-white text-center px-4 md:px-10">
                    <div className="max-w-2xl">
                        <h1 className="mb-5 text-4xl md:text-5xl font-bold">Welcome</h1>
                        <p className="mb-5 text-sm md:text-lg">
                            Discover a curated selection of essential products on our site, designed to meet your needs with quality and convenience. Explore now for the best in electronics, gadgets, and more.
                        </p>
                        <Link to='/products'>
                            <button className="btn bg-slate-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
                                Explore More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
