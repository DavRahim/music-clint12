import { Helmet } from "react-helmet";
import AboutUs from "../../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import Class from "../Classs/Class";
import Instructor from "../Instructor/Instructor";


const Home = () => {
    return (
      <>
        <Helmet>
          <title>Musicine || Home</title>
        </Helmet>
        <Banner />
        <Class />
        <Instructor />
        <AboutUs />
      </>
    );
};

export default Home;