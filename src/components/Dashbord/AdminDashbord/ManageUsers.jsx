import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {

  const [axiosSecure] = useAxiosSecure()
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleAdmin = (user) =>{
       fetch(` https://music-server-davrahim.vercel.app/users/admin/${user._id}`, {
        method: 'PATCH'
       })
       .then(res => res.json())
       .then(data => {
          if(data.modifiedCount){
            refetch()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an admin now `,
              showConfirmButton: false,
              timer: 1500,
            });
          }
       })
  }

  const handleInstructor = (user) => {
    fetch(` https://music-server-davrahim.vercel.app/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an instructor now `,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h1 className="bg-gray-50 text-center text-4xl font-semibold mb-5">
        Manage Users
      </h1>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Make Instructor</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {users.map((user, ind) => (
              <tr key={user._id}>
                <th>{ind + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleAdmin(user)}
                    className="btn btn-circle bg-yellow-300"
                  >
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <FaUserShield></FaUserShield>
                    )}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleInstructor(user)}
                    className="btn btn-circle bg-red-300"
                  >
                    {user.role === "instructor" ? (
                      "instructor"
                    ) : (
                      <FaUserShield></FaUserShield>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
