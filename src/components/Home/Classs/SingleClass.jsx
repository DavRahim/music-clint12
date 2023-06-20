
const singleClass = ({ clased }) => {
    const { className, image, student, description } = clased;
  return (
    <div className="card w-96 bg-base-100 shadow-xl darada mt-5 mx-auto">
      <figure className="h-60">
        <img
          className="bg-auto bg-no-repeat bg-center"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{className}</h2>
        <p>{description}</p>
        <p>
          Student : <span className="font-medium">{student}</span>
        </p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Explore more</button>
        </div> */}
      </div>
    </div>
  );
};

export default singleClass;