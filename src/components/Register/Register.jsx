import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import GoogleLogin from "../Share/GoogleLogin/GoogleLogin";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";


const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const Register = () => {

  const [error2, setError2] = useState("")
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    

  //TODO: hostin photo url

  
            

  // const photo = "http//: www.imajhZCKJX"

  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError2("")

     if (data.password !== data.confirm) {
       setError2("Confirm Password is not match");
       return;
     }
     
   const formData = new FormData();
   formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgUrl = imgRes.data.display_url;

          createUser(data.email, data.password)
            .then((result) => {
              const loggedUser = result.user;
              updateProfile(loggedUser, {
                displayName: data.name,
                photoURL: imgUrl,
                phoneNumber: data.phone_number,
              })
                .then(() => {
                  // console.log("user name");
                  const saveUser = { name: data.name, email: data.email };
                  fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      // console.log(data);
                      if (data.insertedId) {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Your work has been saved",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        navigate(from, { replace: true });
                      }
                    });
                })
                .catch((error) => console.log(error));
              // console.log(loggedUser);
            })
            .catch((err) => console.log(err));
        }
      });



   
      

    console.log(data);
  };
  const handleShow = () => {
    setShowPass(!showPass);
  };
  const handleShow2 = () => {
    setShowPass2(!showPass2);
  };

  // const updateUserData = (user, name, photo) => {
  //   setLoading(true);
  //   updateProfile(user, {
  //     displayName: name,
  //     photoURL: photo,
  //   })
  //     .then(() => {
  //       console.log("user name");
  //       const saveUser = { name: user.name, email: data.email };

  //       fetch("http://localhost:5000/users", {
  //         method: "POST",
  //         headers :{
  //            'content-type': 'application/json'
  //         },
  //         body : JSON.stringify(saveUser)
  //       })
  //        .then(res => res.json())
  //        .then(data => {
  //          if(data.insertedId){
  //            Swal.fire({
  //              position: "top-end",
  //              icon: "success",
  //              title: "Your work has been saved",
  //              showConfirmButton: false,
  //              timer: 1500,
  //            });
  //            navigate('/')
  //          }
  //        })
  //     })
  //     .catch((error) => console.log(error));
  // };

    return (
      <div className="flex justify-center items-center min-h-screen my-5">
        <Helmet>
          <title>Musicine || Register</title>
        </Helmet>
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-base-200 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">Welcome to Musicine</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#B38B37] bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  {...register("image", { required: true })}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </div>
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
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Gender
                  </label>
                </div>
                <select
                  defaultValue={"Pick One"}
                  {...register("category", { required: true })}
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled>Gender select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="number" className="text-sm mb-2">
                    Phone Number
                  </label>
                </div>
                <input
                  {...register("phone_number", { required: true })}
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  placeholder="phone_number"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#B38B37] bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Address
                  </label>
                </div>
                <textarea
                  {...register("address", { required: true })}
                  className="textarea textarea-bordered w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#B38B37] bg-gray-200 text-gray-900"
                  placeholder="Bio"
                ></textarea>
              </div>
              <div>
                <div className="relative">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm mb-2">
                      Password
                    </label>
                  </div>

                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /(?=.*[A-Z])(?=.*[!@#$&*]).{6}/,
                    })}
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#B38B37] bg-gray-200 text-gray-900"
                  />
                  <div onClick={handleShow} className="absolute top-10 right-6">
                    {showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                  </div>
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-red-800">password is required </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-800">password must be 6 characters </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-800">
                    don,t have a capital letter, don have a special character
                  </p>
                )}
              </div>
              <div>
                <div className="relative">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm mb-2">
                      Confirm Password
                    </label>
                  </div>
                  <input
                    {...register("confirm", { required: true })}
                    type={showPass2 ? "text" : "password"}
                    name="confirm"
                    id="confirm"
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#B38B37] bg-gray-200 text-gray-900"
                  />
                  <div
                    onClick={handleShow2}
                    className="absolute top-10 right-6"
                  >
                    {showPass2 ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                  </div>
                </div>
                <p className="text-red-800">{error2}</p>
              </div>
            </div>

            <div>
              <input
                value={"Continue"}
                type="submit"
                className="bg-[#2e2d2b] w-full rounded-md py-3 text-white"
              />
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          {/* <div className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </div> */}
          <GoogleLogin></GoogleLogin>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-[#B38B37] text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    );
};

export default Register;