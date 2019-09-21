exports.getClientData = req => {
  clientData = {};
  if (req.body.nickname) clientData.nickname = req.body.nickname;
  if (req.body.firstName) clientData.firstname = req.body.firstName;
  if (req.body.lastName) clientData.lastname = req.body.lastName;
  if (req.body.adress) clientData.adress = req.body.adress;
  if (req.body.city) clientData.city = req.body.city;
  if (req.body.postcode) clientData.postcode = req.body.postcode;
  if (req.body.email) clientData.email = req.body.email;
  if (req.body.phone) clientData.phone = req.body.phone;
  if (req.body.gender) clientData.gender = req.body.gender;

  clientData.facebookfan = req.body.facebookFan;

  return clientData;
};
