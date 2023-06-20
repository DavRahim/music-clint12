import { Link } from "react-router-dom";
import useInstructorClass from "../../hooks/useInstactorClass";

const MyClasses = () => {
    const [instructorClass,] = useInstructorClass();

    return (
      <div>
        <h1 className="bg-gray-50 text-center text-4xl font-semibold mb-5">
          My Classes
        </h1>
        <div className="md:grid grid-cols-2 gap-6 mt-10">
          {instructorClass.map((inst) => (
            <div
              key={inst._id}
              className="card card-compact w-96 bg-base-100 shadow-xl"
            >
              <figure>
                <img src={inst.image} alt="Shoes" className=" w-96 h-72" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{inst.className}</h2>
                <p>
                  status : <span className="font-bold"> pending </span>{" "}
                </p>
                <p>
                  Available seats :{" "}
                  <span className="font-bold"> {inst.availableSeats}</span>
                </p>
                <p>
                  Price : <span className="font-bold">$ {inst.price} </span>
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary"> Feedback </button>
                  <Link to={`/dashboard/update/${inst._id}`}>
                    <button className="btn btn-primary"> Update </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default MyClasses;