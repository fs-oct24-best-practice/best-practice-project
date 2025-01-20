export const createNewItemId = (
  namespaceId: string,
  capacity: string,
  color: string
) => {
  return `${namespaceId}-${capacity}-${color}`.toLowerCase();
};
