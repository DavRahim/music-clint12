
const SingleFeed = ({ feed }) => {
    const { message, adminName } = feed;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Admin Name: {adminName}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default SingleFeed;