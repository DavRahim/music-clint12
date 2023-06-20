import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";

import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const UpdateClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const classUpdate = useLoaderData();
  const { _id, className, availableSeats, price } = classUpdate;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

//    (classUpdate);

  const onSubmit = (data) => {
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
          
          const { className, availableSeats, price } = data;
          const UpdateClass = {
            className,
            availableSeats,
            price: parseFloat(price),
            image: imgUrl,
          };
           (UpdateClass);

          fetch(` https://music-server-davrahim.vercel.app/addclass/${_id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(UpdateClass),
          })
            .then((res) => res.json())
            .then((data) => {
                 (data);
                 if (data.modifiedCount > 0) {
                Swal.fire({
                  icon: "success",
                  title: "Update Done.",
                  text: "Toy Update!",
                });
              }
            });
        }
      });
  };

  return (
    <>
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center text-gray-800 rounded-xl bg-gray-50">
        <h1 className="bg-gray-50 text-center text-4xl font-semibold">
          Add a class
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 mx-auto p-7">
          <div className="">
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="location"
                  className="block text-gray-600 text-lg font-medium"
                >
                  Class name
                </label>
                <input
                  {...register("className", {
                    required: true,
                    maxLength: 120,
                  })}
                  defaultValue={className}
                  className="w-full px-4 py-3 text-gray-800 border border-[#B38B37] focus:outline-[#B38B37] rounded-md "
                  name="className"
                  id="className"
                  type="text"
                  placeholder="Class name"
                  required
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className=" p-4 bg-white w-full  m-auto rounded-lg ">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        {...register("image", { required: true })}
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-[#bd984a] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#B38B37">
                        Class Image Upload
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="title"
                  className="block text-gray-600 text-lg font-medium"
                >
                  Instructor name
                </label>
                <input
                  {...register("instructorName", { required: true })}
                  defaultValue={user?.displayName}
                  readOnly
                  className="w-full px-4 py-3 text-gray-800 border border-[#B38B37] focus:outline-[#B38B37] rounded-md "
                  name="instructorName"
                  id="instructorName"
                  type="text"
                  placeholder="Instructor name"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="title"
                  className="block text-gray-600 text-lg font-medium"
                >
                  Instructor email
                </label>
                <input
                  defaultValue={user?.email}
                  readOnly
                  {...register("email", { required: true })}
                  className="w-full px-4 py-3 text-gray-800 border border-[#B38B37] focus:outline-[#B38B37] rounded-md "
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Instructor email"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="title"
                  className="block text-gray-600 text-lg font-medium"
                >
                  Available seats
                </label>
                <input
                  {...register("availableSeats", { required: true })}
                  defaultValue={availableSeats}
                  className="w-full px-4 py-3 text-gray-800 border border-[#B38B37] focus:outline-[#B38B37] rounded-md "
                  name="availableSeats"
                  id="availableSeats"
                  type="text"
                  placeholder="Available seats"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="title"
                  className="block text-gray-600 text-lg font-medium"
                >
                  Price
                </label>
                <input
                  {...register("price", { required: true })}
                  defaultValue={price}
                  className="w-full px-4 py-3 text-gray-800 border border-[#B38B37] focus:outline-[#B38B37] rounded-md "
                  name="price"
                  id="price"
                  type="text"
                  placeholder="price"
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-center mx-auto p-3 mt-5  font-medium text-white transition duration-200 rounded shadow-md bg-[#B38B37]"
          >
            update Class
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateClass;
