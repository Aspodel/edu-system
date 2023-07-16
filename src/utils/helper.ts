export const formatDate = (dateTime: Date) => {
  const date = new Date(dateTime);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Note: month index is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // Output: 29/5/2023
};

export const formatLongDate = (dateTime?: Date) => {
  if (!dateTime) {
    return ""; // Return an empty string if dateTime is undefined
  }

  // console.log(dateTime,"dateTime");
  const date = new Date(dateTime); // force LOCAL time,
  // without the T00:00:00 the Date would be UTC
  // and Western hemisphere dates will be a day out

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    // year: "numeric",
  });

  return formattedDate;
  // Output: May 29, 2023
};

export function formatDateToAMPM(data?: Date) {
  if (!data) {
    return "";
  }
  data = new Date(data);
  // Convert UTC time to local time (UTC+7)
  const utcOffset = 7; // UTC+7
  const localTimeMs = data.getTime() + utcOffset * 60 * 60 * 1000;
  const localDate = new Date(localTimeMs);

  // Format the local time as "HH:mm AM/PM"
  const formattedTime = localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
}
