
import { useEffect, useState } from "react";
import SubHeading from "../Share/SubHeading/SubHeading";
import SingleClass from "./SingleClass";
import { Helmet } from "react-helmet";

const ClassPage = () => {
  const [classes, setClasses] = useState([]);

    useEffect(() => {
      fetch(" https://music-server-davrahim.vercel.app/class")
        .then((res) => res.json())
        .then((data) => setClasses(data));
    }, []);
    

    return (
      <div>
        <Helmet>
          <title>Musicine || Class</title>
        </Helmet>
        <SubHeading title="Our All Music Class" subTitle="OUR CLASS" />
        <div className="md:grid grid-cols-3 gap-6 mt-10">
          {classes.map((clased) => (
            <SingleClass key={clased._id} clased={clased}></SingleClass>
          ))}
        </div>
      </div>
    );
};

export default ClassPage;