import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageClassCart = ({ manage, refetch }) => {
  const {
    className,
    availableSeats,
    instructorName,
    price,
    email,
    image,
    _id,
    status,
  } = manage;

   const handleDeny = (id) => {
     fetch(` https://music-server-davrahim.vercel.app/addAllclassdeny/${id}`, {
       method: "PATCH",
     })
       .then((res) => res.json())
       .then((data) => {
         if (data.modifiedCount) {
          refetch();
           Swal.fire({
             position: "top-end",
             icon: "success",
             title: "Your work has been saved",
             showConfirmButton: false,
             timer: 1500,
           });
         }
       });
   };

  const handleApprove = (id) => {
    fetch(` https://music-server-davrahim.vercel.app/addAllclass/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          fetch(" https://music-server-davrahim.vercel.app/approveAdmin", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(manage),
          })
            .then((res) => res.json())
            .then((data) => {
              refetch();
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
        }
      });
     
     

  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="w-96 h-72" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{className}</h2>
        <p>
          {" "}
          Instructor name: <span className="font-bold"> {instructorName} </span>
        </p>
        <p>
          {" "}
          Instructor email: <span className="font-bold"> {email} </span>
        </p>
        <p>
          Available seats : <span className="font-bold"> {availableSeats}</span>
        </p>
        <p>
          Price : <span className="font-bold">$ {price} </span>
        </p>
        <p>
          Status : <span className="font-bold">{status} </span>
        </p>
        <div className="card-actions justify-end">
          {status === "Approve" || status === "Deny" ? (
            <>
              {" "}
              <button disabled className="btn btn-outline btn-info btn-sm">
                Approve
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleApprove(_id)}
                className="btn btn-outline btn-info btn-sm"
              >
                Approve
              </button>
            </>
          )}
          {status === "Approve" || status === "Deny" ? (
            <>
              {" "}
              <button disabled className="btn btn-outline btn-info btn-sm">
                Deny
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleDeny(_id)}
                className="btn btn-outline btn-info btn-sm"
              >
                Deny
              </button>
            </>
          )}

          <Link to={`/dashboard/adminfeedback/${_id}`}>
            <button className="btn btn-outline btn-warning btn-sm">
              feedback
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageClassCart;