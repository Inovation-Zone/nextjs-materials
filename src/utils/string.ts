export function generateOrderCode() {
  const prefix = "MDH";
  const suffix = Math.floor(Math.random() * 10000000).toString().padStart(12, "0");
  return prefix + suffix;
}
