
import { FaRegTimesCircle } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();

  return (
    <section className="flex items-center h-screen p-16 bg-base-200 text-[#0c0c0c]">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <FaRegTimesCircle className="w-48 h-48 text-[#0c0c0c]"></FaRegTimesCircle>
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-[#0c0c0c]">
            <span className="sr-only">{error?.message}</span> {status || 404}
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            {error?.message}
          </p>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded bg-slate-500  text-[#0c0c0c]"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
