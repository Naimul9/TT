import { Helmet } from "react-helmet";
import Banner from "../../Component/Banner";
import Featured from "../../Component/Featured";


const Home = () => {
    return (
        <div className="container mx-auto">
           <Helmet> <title>Home</title></Helmet>
            <Banner/>
            <Featured/>
          
        </div>
    );
};

export default Home;