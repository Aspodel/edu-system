export const formatDate = (dateTime: Date) => {
  const date = new Date(dateTime);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Note: month index is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // Output: 29/5/2023
};
