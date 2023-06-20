import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Banner = () => {

  const {user} = useAuth()
       
    return (
      <div className="hero md:h-screen bg-base-200 mb-5 p-0 darada">
        <div className="hero-content flex-col lg:flex-row p-0">
          <img
            src="https://i.ibb.co/p0bky9w/abstract-innovative-idea-representation.jpg"
            className="md:w-1/2 md:h-screen rounded-lg shadow-2xl"
          />
          <div className="md:w-1/2 md:px-16">
            <Fade>
              <p className="font-semibold text-xl mb-5">WELCOME TO MUSICINE</p>
            </Fade>
            <Fade>
              <h1 className="text-5xl font-bold md:w-64">
                Learning Music With Easy Way
              </h1>
            </Fade>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to={user ? "/classes" : "/login"}>
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Banner;