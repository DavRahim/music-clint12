import { useEffect, useState } from "react";
import SubHeading from "../../Share/SubHeading/SubHeading";
import SingleInstructors from "./SingleInstructors";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() =>{
     fetch(" https://music-server-davrahim.vercel.app/instructor")
       .then((res) => res.json())
       .then((data) => setInstructors(data));
  },[])
    return (
      <div>
        <SubHeading title="Our Popular Instructor" subTitle="OUR TEACHERS" />
        <div className="md:grid grid-cols-3 gap-6 mt-10">
          {instructors.slice(0, 6).map((instructor) => (
            <SingleInstructors
              key={instructor._id}
              instructor={instructor}
            ></SingleInstructors>
          ))}
        </div>
      </div>
    );
};

export default Instructor;