

const Featured = () => {
    return (
        <div className="container mx-auto mb-6 ">
           <h1 className="font-bold text-4xl">Featured</h1>


           <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

{/* 1 */}
           <div className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src='https://i.ibb.co.com/VHv3c8w/mg.jpg'
                                        alt=''
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body ">
                                    <p className="text-sm font-medium">Infinix</p>
                                    <h2 className="card-title">Infinix GT20 Pro</h2>
                                    <p className="font-medium">Category: Smartphone</p>
                                    <p className="text-lg font-bold">Price: 250$</p>
                                    
                                </div>
                            </div>
{/* 2 */}
           <div className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src='https://i.ibb.co.com/Gv4f0c4/Galaxy-S23-Cream-3448.jpg'
                                        alt=''
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body ">
                                    <p className="text-sm font-medium">Samsung</p>
                                    <h2 className="card-title">Samsung Galaxy S23</h2>
                                    <p className="font-medium">Category: Smartphone</p>
                                    <p className="text-lg font-bold">Price: 899.99$</p>
                                    
                                </div>
                            </div>
{/* 3 */}
           <div className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src='https://i.ibb.co.com/82DpKcS/ASUS-ROG-Zephyrus-G16-GU605-MY-Eclipse-Grey-a-9307.jpg'
                                        alt=''
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body ">
                                    <p className="text-sm font-medium">Asus</p>
                                    <h2 className="card-title">ASUS ROG Zephyrus G16</h2>
                                    <p className="font-medium">Category: Laptop</p>
                                    <p className="text-lg font-bold">Price: 2299.99$</p>
                                    
                                </div>
                            </div>
{/* 4 */}
           <div className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src='https://i.ibb.co.com/0Q5yMHG/5384-47233.jpg'
                                        alt=''
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body ">
                                    <p className="text-sm font-medium">Apple</p>
                                    <h2 className="card-title">Apple AirPods Pro 2</h2>
                                    <p className="font-medium">Category: Earphone</p>
                                    <p className="text-lg font-bold">Price: 249.99$</p>
                                    
                                </div>
                            </div>




          </div>

        </div>
    );
};

export default Featured;