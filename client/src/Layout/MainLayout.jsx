import { Outlet } from "react-router-dom";
import Footer from "../Component/Shared/Footer";
import Navbar from "../Component/Shared/Navbar";



const MainLayout = () => {
    return (
        <div>
            <div className="font-roboto">
            <Navbar/>
           <div className="min-h-[calc(100vh-246px)]" > <Outlet/></div>
            <Footer/>
        </div>
        </div>
    );
};

export default MainLayout;