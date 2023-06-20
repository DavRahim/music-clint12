import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import EnrolledTable from "./EnrolledTable";


const MyEnrolledClass = () => {

    const {user} = useAuth();

    const { data: payments = [] } = useQuery({
      queryKey: ["myClass", user?.email],
      queryFn: async () => {
        const res = await fetch(
          ` https://music-server-davrahim.vercel.app/payments/${user?.email}`
        );
        return res.json();
      },
    });
   

    return (
      <div>
        <h1 className="text-3xl text-center my-6">My Enrolled Classes</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Enroll class </th>
                <th>Name</th>
                <th>instructor Name</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment) => (
                <EnrolledTable
                  key={payment._id}
                  payment={payment}
                  trxId={payment.transactionId}
                ></EnrolledTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyEnrolledClass;