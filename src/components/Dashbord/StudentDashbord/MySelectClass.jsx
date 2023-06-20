import { Link } from "react-router-dom";
import useMyClass from "../../hooks/useMyClass";
import TableSelect from "./TableSelect";
import { Helmet } from "react-helmet";

const MySelectClass = () => {
  const [myClass, , refetch] = useMyClass();
  const total = myClass.reduce((sum, item) => item.price + sum, 0);
  return (
    <div>
      <Helmet>
        <title>Musicine || Student Dashboard</title>
      </Helmet>
      <h1 className="font-semibold text-4xl text-center mb-5">
        My Selected Class
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th> #</th>
              <th>image</th>
              <th>class Name</th>
              <th>instructorName</th>
              <th>price</th>
              {/* <th>Pay</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myClass.map((singleClass, index) => (
              <TableSelect
                key={singleClass._id}
                singleClass={singleClass}
                index={index}
                refetch={refetch}
              ></TableSelect>
            ))}
          </tbody>
        </table>
        <div className="divider"></div>
        <h1 className="font-semibold text-xl mx-auto">Total =$ {total} </h1>
        <Link to="/dashboard/payment">
          {" "}
          <button className="btn mt-5 bg-[#B38B37] hover:bg-[#9d8041] w-full">
            pay Amount
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MySelectClass;
