
const PaymentTable = ({ price, trxId, ind }) => {
  return (
   
      <tr key={ind}>
        <td>{ind + 1}</td>
        <td>{trxId}</td>
        <td>$ {price}</td>
        <td>Payment succed</td>
      </tr>
   
  );
};

export default PaymentTable;