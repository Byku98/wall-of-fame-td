// Helper function to convert date from "DD.MM.YYYY" to "YYYY-MM-DD"
const convertDateToMySQL = (dateString) => {
  if (!dateString || typeof dateString !== "string") return "";
  const parts = dateString.split(".");
  if (parts.length !== 3) return "";
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Helper function to format date from "YYYY-MM-DD" to "DD.MM.YYYY"
const convertMysqlToDate = (dateString) => {
  if (!dateString) return MISSING_DATA_TEXT;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return MISSING_DATA_TEXT; // Invalid date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Function to format lap time for display
const formatLapTime = (timeString) => {
  const timeParts = timeString.split(":"); // e.g., ["00", "00", "41.76"]
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const secondsAndMs = timeParts[2]; // Keep as string to preserve milliseconds

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${secondsAndMs}`;
  } else if (minutes > 0) {
    return `${minutes}:${secondsAndMs}`;
  } else {
    return secondsAndMs;
  }
};

export { convertDateToMySQL, convertMysqlToDate, formatLapTime };
