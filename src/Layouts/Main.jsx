import { Outlet } from "react-router-dom";
import Footer from "../components/Share/Footer/Footer";
import Navber from "../components/Share/Navber/Navber";

const Main = () => {
    return (
        <>
           <Navber/>
           <Outlet/>
           <Footer/>
        </>
    );
};

export default Main;