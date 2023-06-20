import { useEffect, useState } from "react";
import SubHeading from "../Share/SubHeading/SubHeading";
import { Helmet } from "react-helmet";

const InstructorsPage = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
      fetch(" https://music-server-davrahim.vercel.app/instructor")
        .then((res) => res.json())
        .then((data) => setInstructors(data));
    }, []);

    //TODO: time pile pagination korbo 

    return (
      <div>
        <Helmet>
          <title>Musicine || Instructors</title>
        </Helmet>
        <SubHeading title="Our All Instructor" subTitle="OUR TEACHERS" />
        <div className="md:grid grid-cols-3 gap-6 mt-10">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className="card w-96 bg-base-100 shadow-xl darada"
            >
              <figure className="h-60">
                <img
                  className="bg-auto bg-no-repeat bg-center w-full"
                  src={instructor.image}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body text-center items-center">
                <h2 className="card-title text-center">{instructor.name}</h2>
                <p>{instructor.designation}</p>
                <div className="my-3">
                  <p>{instructor.email}</p>
                  <p>
                    Number of Classes :{" "}
                    <span className="font-bold">
                      {instructor.numberOfClass}
                    </span>
                  </p>
                  <p>
                    Name of the Classes :{" "}
                    <span className="font-bold">{instructor.nameOfClass}</span>
                  </p>
                </div>

                <div className="card-actions justify-end">
                  <button className="btn bg-[#B38B37] text-[#FFFF] hover:bg-black">
                    See Classes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default InstructorsPage;