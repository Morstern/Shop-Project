export const formatDateToDatabase = date => {
  let splitDate = date.split("-");
  return splitDate[0] + "." + splitDate[1] + "." + splitDate[2];
};

export const formatDateFromDatabase = date => {
  let splitDate = date.split("-");
  return splitDate[2] + "." + splitDate[1] + "." + splitDate[0];
};
