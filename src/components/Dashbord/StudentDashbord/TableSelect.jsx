import Swal from "sweetalert2";

const TableSelect = ({ singleClass, index, refetch }) => {
  const { image, className, instructorName, price, _id } = singleClass;
  const handleDelete = (id) => {
  //  console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(` https://music-server-davrahim.vercel.app/myClass/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {

            if (data.deletedCount > 0) {
                refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };
  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>{className}</td>
        <td>{instructorName}</td>

        <td>
          <button className="btn btn-ghost btn-xs">$ {price}</button>
        </td>
        {/* <td> */}
          {/* <Link to="/dashboard/payment">
            {" "}
            <button className="btn btn-xs">Pay</button>
          </Link> */}
        {/* </td> */}
        <td>
          <button onClick={() => handleDelete(_id)} className="btn btn-xs bg-red-600 text-white">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableSelect;