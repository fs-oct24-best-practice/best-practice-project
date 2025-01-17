export const sortStrings = (array: string[]) => {
  return array.toSorted((a, b) => a.localeCompare(b));
};
