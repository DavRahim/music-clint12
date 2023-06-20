import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useInstructors from "../../hooks/useInstructors";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../../../App";

const Navber = () => {

  const {user, logOut} = useContext(AuthContext)
  const photoUrl = user?.photoURL;
  const name = user?.displayName;
  const [ isAdmin ] = useAdmin();
  const [isInstructor] = useInstructors();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogOut = () =>{
      logOut()
       .then(() =>{})
       .catch(err =>  (err))
  }


  const mainOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructor">Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
      
      {isAdmin ? (
        <>
          <li>
            <NavLink to="/dashboard/manageclass">Dashboard</NavLink>
          </li>
        </>
      ) : isInstructor ? (
        <>
          <li>
            <NavLink to="/dashboard/addclass">Dashboard</NavLink>
          </li>
        </>
      ) : (
        user && (
          <>
            <li>
              <NavLink to="/dashboard/myselectclass">Dashboard</NavLink>
            </li>
          </>
        )
      )}
    </>
  );


    return (
      <div>
        <div className="navbar bg-base-100 darada">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {mainOptions}
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl">
              {/* daisyUI */}
              <h1 className=" text-4xl font-bold">Musicine</h1>
              {/* <img
                width="274"
                height="48"
                className="w-[174px] h-[30px]"
                src="https://templatekit.tokomoo.com/musicschool/wp-content/uploads/sites/91/2022/08/Logo-Musicine-1.png"
                alt=""
              /> */}
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{mainOptions}</ul>
          </div>

          <div className="navbar-end">
            <ReactSwitch onChange={toggleTheme} checked={theme === "light"} />
            {user && (
              <div className="">
                <img
                  title={name}
                  className="w-10 h-10 rounded-full mx-5"
                  src={
                    photoUrl ||
                    "https://i.ibb.co/FX61WLf/studio-portrait-cook-man-with-fresh-vegetables-table.jpg"
                  }
                />
              </div>
            )}
            {user ? (
              <>
                <button onClick={handleLogOut} className="btn">
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link className="btn" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
};

export default Navber;