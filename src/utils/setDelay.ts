export function setDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
