import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import useInstructors from "../hooks/useInstructors";

const SingleClass = ({ clased }) => {
  const { user } = useContext(AuthContext);
  const { image, className, instructorName, availableSeats, price, _id} = clased;
  const navigate = useNavigate();
  const location = useLocation();

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructors();

  const handleEnroll = (classes) => {
    // console.log(classes);
    if (user) {
        const orderClass = {
          classId: _id,
          image,
          className,
          instructorName,
          price,
          email: user.email
        };
      fetch(" https://music-server-davrahim.vercel.app/myClass", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderClass),
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
          }
        });
    } else {
      Swal.fire({
        title: "Please login to order the class?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl darada">
        <figure className="h-60">
          <img
            className="bg-auto bg-no-repeat bg-center w-96 h-72"
            src={image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{className}</h2>
          <p>
            instructor Name :{" "}
            <span className="font-bold"> {instructorName} </span>{" "}
          </p>
          <p>
            Available seats :{" "}
            <span className="font-bold"> {availableSeats}</span>
          </p>
          <p>
            Price : <span className="font-bold">$ {price} </span>
          </p>
          <div className="card-actions justify-end">
            {isAdmin || isInstructor ? (
              <>
                <button
                  disabled
                  className="btn bg-red-500 text-[#FFFF] hover:bg-black"
                >
                  Enroll Now
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEnroll(clased)}
                  className="btn bg-[#B38B37] text-[#FFFF] hover:bg-black"
                >
                  Enroll Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;