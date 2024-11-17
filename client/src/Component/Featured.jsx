

const Featured = () => {
    return (
        <div className="container mx-auto mb-6 ">
           <h1 className="font-bold text-4xl">Featured</h1>


           <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

{/* 1 */}
           <div className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src='https://admin.dazzle.com.bd/assets/accounts/a_8037/prod_972_821.jpg'
                                        alt=''
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body ">
                                    <p className="text-sm font-medium">Apple</p>
                                    <h2 className="card-title">Iphone 14 Pro</h2>
                                    <p className="font-medium">Category: Smartphone</p>
                                    <p className="text-lg font-bold">Price: 1400$</p>
                                    
                                </div>
                            </div>
{/* 2 */}
           <div className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src='https://admin.dazzle.com.bd/assets/accounts/a_8037/prod_46_212.jpg'
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
                                        src='https://admin.dazzle.com.bd/assets/accounts/a_8037/prod_809_099.jpg'
                                        alt=''
                                        loading="lazy"
                                        className="rounded-xl w-full"
                                    />
                                </figure>
                                <div className="card-body ">
                                    <p className="text-sm font-medium">MSI</p>
                                    <h2 className="card-title">MSI Vector GP68HX</h2>
                                    <p className="font-medium">Category: Laptop</p>
                                    <p className="text-lg font-bold">Price: 2599.99$</p>
                                    
                                </div>
                            </div>
{/* 4 */}
           <div className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src='https://admin.dazzle.com.bd/assets/accounts/a_8037/prod_7_510.jpg'
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