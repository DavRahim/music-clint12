import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import PaymentTable from "./PaymentTable";

const MyPaymentHistory = () => {
    const { user } = useAuth();

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
        <h1 className="text-3xl text-center my-6">Payment history</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Trx ID</th>
                <th>Price</th>
                <th>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment, ind) => (
                <PaymentTable
                  key={payment._id}
                  ind={ind}
                  price={payment.price}
                  trxId={payment.transactionId}
                ></PaymentTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default MyPaymentHistory;