exports.getOrderData = req => {
  orderData = {};

  if (req.body.idorder) orderData.idorder = req.body.idorder;
  if (req.body.orderdate) orderData.orderdate = req.body.orderdate;
  if (req.body.amount) orderData.amount = req.body.amount;
  if (req.body.discount) orderData.discount = req.body.discount;
  if (req.body.clientNickname)
    orderData.clientNickname = req.body.clientNickname;

  return orderData;
};
