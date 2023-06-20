import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Share/GoogleLogin/GoogleLogin";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";



const Login = () => {

  const {LogIn} = useContext(AuthContext)
  const [showPass, setShowPass] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
     LogIn(data.email, data.password)
       .then((result) => {
         const loggedUser = result.user;
         // console.log(loggedUser)
         navigate(from, { replace: true });
       })
       .catch((err) => console.log(err));
  }

  const handleShow = () => {
    setShowPass(!showPass);
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen my-5">
      <Helmet>
        <title>Musicine || Login</title>
      </Helmet>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#B38B37] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div className="relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#B38B37] bg-gray-200 text-gray-900"
                />
              </div>
              {/* {}
              <div onClick={handleShow} className="absolute top-10 right-6">
                <FaEye></FaEye>
              </div> */}
              <div onClick={handleShow} className="absolute top-10 right-6">
                {showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#B38B37] w-full rounded-md py-3 text-white"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-[#B38B37] text-gray-400">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        {/* <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div> */}
        <GoogleLogin></GoogleLogin>
        <p className="px-6 text-sm text-center text-gray-400">
          have an account yet?
          <Link
            to="/register"
            className="hover:underline hover:text-[#B38B37] text-gray-600"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
