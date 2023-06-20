import { useEffect, useState } from "react";
import SubHeading from "../../Share/SubHeading/SubHeading";
import SingleClass from "./singleClass";


const Class = () => {

  const [classes, setClasses] = useState([])

   useEffect(() =>{
      fetch(" https://music-server-davrahim.vercel.app/class")
        .then((res) => res.json())
        .then((data) => setClasses(data));
   },[])


    return (
      <div className="my-10 darada">
        <SubHeading title="Our Popular Music Classes" subTitle="OUR CLASS" />
        <div className="md:grid grid-cols-3 gap-6 mt-10">
          {/* //TODO:  assindig dekhate hobe */}

          {classes.slice(0, 6).map((clased) => (
            <SingleClass key={clased._id} clased={clased}></SingleClass>
          ))}
        </div>
      </div>
    );
};

export default Class;