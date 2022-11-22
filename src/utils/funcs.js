export const round = (n, d = 0) => {
  if (d === 0) return Math.round(n);
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
};

export const totalPrice = (products, currency) => {
  if (products) {
    const totPrice = products.reduce((previous, current) => {
      return (
        previous +
        current.prices.find((item) => item.currency.symbol === currency)
          .amount *
          current.amount
      );
    }, 0);
    return round(totPrice, 2);
  }
  return 0;
};

