import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useMyClass = () => {
  const {isLoading, user, loading } = useContext(AuthContext);
  // const token = localStorage.getItem("access_token");
  const [axiosSecure] = useAxiosSecure();
  const {  refetch , data: myClass = [] } = useQuery({
    queryKey: ["myClass", user?.email],
    enabled: !loading,
    // queryFn: async () => {
    //   const res = await fetch(
    //     ` https://music-server-davrahim.vercel.app/myClass?email=${user?.email}`,{
    //       headers: {
    //         authorization: `bearer ${token}`
    //       }
    //     }
    //   );
    //   return res.json();
    // },

    queryFn: async () => {
      const res = await axiosSecure(`/myClass?email=${user?.email}`)
      return res.data;
    },
  });

  return [myClass, isLoading, refetch];
};

export default useMyClass;
