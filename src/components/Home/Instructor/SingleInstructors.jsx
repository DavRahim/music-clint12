
const SingleInstructors = ({ instructor }) => {
    const { name, image, designation } = instructor;
  return (
    <div className="card w-96 bg-base-100 shadow-xl darada mt-5 mx-auto">
      <figure className="h-60">
        <img
          className="bg-auto bg-no-repeat bg-center"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body text-center items-center">
        <h2 className="card-title text-center">{name}</h2>
        <p>{designation}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Explore more</button>
        </div> */}
      </div>
    </div>
  );
};

export default SingleInstructors;