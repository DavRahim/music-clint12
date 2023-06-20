import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";


const AdminFeedback = () => {


  const {user} = useAuth()
  const loadData = useLoaderData()
  const {email} = loadData;
  const navigate = useNavigate()

  const handleFeedback = (event) =>{
    event.preventDefault();

   const form = event.target;
   const email = form.email.value;
   const message = form.message.value;
   const adminName = user.displayName;

   const hex = {
     email,
     message,
     adminName,
   };

    (email, message);
   fetch(" https://music-server-davrahim.vercel.app/feedback", {
     method: "POST",
     headers: {
       "content-type": "application/json",
     },
     body: JSON.stringify(hex),
   })
     .then((res) => res.json())
     .then((data) => {
        
       if (data.insertedId) {
         Swal.fire({
           position: "top-end",
           icon: "success",
           title: "Your work has been saved",
           showConfirmButton: false,
           timer: 1500,
         });
         navigate("/dashboard/manageclass");
       }
     });

  }

  return (
    <>
      <h1 className="bg-gray-50 text-center text-4xl font-semibold mb-5">
        Admin Feedback{" "}
      </h1>
      <div className="divider w-4/5 mx-auto"></div>
      <form onSubmit={handleFeedback} className="w-4/5 mx-auto">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium text-xl">
              Instructor Email
            </span>
          </label>
          <input
            type="text"
            defaultValue={email}
            name="email"
            id="email"
            readOnly
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-xl">Message</span>
          </label>
          <textarea
            name="message"
            id="message"
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </div>
        <button
          type="submit"
          
          className="btn mt-5 bg-[#B38B37] hover:bg-[#9d8041] w-full"
        >
          Sand Feedback
        </button>
      </form>
    </>
  );
};

export default AdminFeedback;