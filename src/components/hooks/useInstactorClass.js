import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
const useInstructorClass = () => {
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    refetch,
    data: instructorClass = [],
  } = useQuery({
    queryKey: ["instructorClass", user?.email],
    queryFn: async () => {
      const res = await fetch(
        ` https://music-server-davrahim.vercel.app/addclass?email=${user?.email}`
      );
      return res.json();
    },
  });

  return [instructorClass, isLoading, refetch];
};

export default useInstructorClass;
