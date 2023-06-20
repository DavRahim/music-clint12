const EnrolledTable = ({ payment }) => {
   (payment.myClass);
  const pays = payment.myClass;
  // const { transactionId, price, image, itemNames } = payment;
  return (
    <>
      {pays && pays.map((pay, ind) => (
        <tr key={pay._id}>
          <td>{ind + 1}</td>
          <td>
            <div className="flex items-center space-x-3 ">
              <div className="avatar flex items-center justify-center">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={pay.image} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
            </div>
          </td>
          <td>{pay.className}</td>
          <td>{pay.instructorName}</td>
          <td>$ {pay.price}</td>
        </tr>
      ))}
    </>
  );
};

export default EnrolledTable;
