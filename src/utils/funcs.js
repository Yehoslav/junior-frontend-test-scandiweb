export const round = (n, d = 0) => {
  if (d === 0) return Math.round(n);
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
};
