
const SubHeading = ({title, subTitle}) => {
    return (
      <>
        <div className="text-center">
          <p className="text-lg font-semibold">{subTitle}</p>
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
        
      </>
    );
};

export default SubHeading;