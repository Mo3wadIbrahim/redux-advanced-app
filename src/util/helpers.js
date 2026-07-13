export const centsUsdFormatter = (value) => {
  const formatterObj = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return formatterObj.format(value / 100);
};
