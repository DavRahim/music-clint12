import { useQuery } from "@tanstack/react-query";
import ManageClassCart from "./ManageClassCart";
import { Helmet } from "react-helmet";


const ManageClasses = () => {

    const {refetch, data: manageClass = []} = useQuery(["manageClass"], async() =>{
        const res = await fetch(" https://music-server-davrahim.vercel.app/addAllclass")
        return res.json()
    })

    return (
      <div>
        <Helmet>
          <title>Musicine || Admin Dashboard</title>
        </Helmet>
        <h1 className="bg-gray-50 text-center text-4xl font-semibold mb-5">
          Manage Class
        </h1>
        <div className="divider"></div>
        <div className="md:grid grid-cols-2 gap-6 mt-10">
          {manageClass.map((manage) => (
            <ManageClassCart
              key={manage._id}
              manage={manage}
              refetch={refetch}
            ></ManageClassCart>
          ))}
        </div>
      </div>
    );
};

export default ManageClasses;
