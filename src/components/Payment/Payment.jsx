import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useMyClass from "../hooks/useMyClass";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_gateway);

const Payment = () => {
    
    const [myClass] = useMyClass();

   
    const total = myClass.reduce((sum, item) => sum + item.price, 0)
   
    const price = parseFloat(total.toFixed(2));
    
    return (
      <div className="w-4/6 mx-auto">
        <h1 className="text-3xl text-center my-8 font-semibold">Payment Option </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm myClass={myClass} price={price} />
        </Elements>
      </div>
    );
};

export default Payment;