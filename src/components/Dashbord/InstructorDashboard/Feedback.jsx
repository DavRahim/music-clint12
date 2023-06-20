import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import SingleFeed from "./singleFeed";

const Feedback = () => {
    const {user} = useAuth()
    const { data: feedback = [] } = useQuery(
      ["manageClass"],
      async () => {
        const res = await fetch(
          ` https://music-server-davrahim.vercel.app/feedback/${user.email}`
        );
        return res.json();
      }
    );

    return (
      <div>
        <h1 className="bg-gray-50 text-center text-4xl font-semibold mb-5">
          Feedback
        </h1>
        <div className="divider w-4/5 mx-auto"></div>
        <div className="md:grid grid-cols-2 gap-6 mt-10">
          {feedback.map((feed) => (
            <SingleFeed key={feed._id} feed={feed}></SingleFeed>
          ))}
        </div>
      </div>
    );
};

export default Feedback;