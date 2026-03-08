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

/**
 * Helper to parse flexible time inputs with ANY non-digit delimiter.
 * Normalizes everything into standard HH:MM:SS.mmm
 * Handles overflows (e.g., 63 seconds -> 1 minute 3 seconds)
 */
const parseFlexibleTime = (raw) => {
  if (!raw) return "00:00:00.000";

  const parts = raw.split(/[^0-9]/).filter((p) => p !== "");

  let h = 0,
    m = 0,
    s = 0,
    ms = 0;

  // 1. Extract raw numbers from right to left
  switch (parts.length) {
    case 1:
      s = parseInt(parts[0], 10) || 0;
      break;
    case 2:
      s = parseInt(parts[0], 10) || 0;
      ms = parseInt(parts[1].padEnd(3, "0").substring(0, 3), 10) || 0;
      break;
    case 3:
      m = parseInt(parts[0], 10) || 0;
      s = parseInt(parts[1], 10) || 0;
      ms = parseInt(parts[2].padEnd(3, "0").substring(0, 3), 10) || 0;
      break;
    case 4:
      h = parseInt(parts[0], 10) || 0;
      m = parseInt(parts[1], 10) || 0;
      s = parseInt(parts[2], 10) || 0;
      ms = parseInt(parts[3].padEnd(3, "0").substring(0, 3), 10) || 0;
      break;
  }

  // 2. Handle Overflows (e.g., 70 seconds -> 1 min 10 sec)
  if (s >= 60) {
    m += Math.floor(s / 60);
    s = s % 60;
  }
  if (m >= 60) {
    h += Math.floor(m / 60);
    m = m % 60;
  }

  // 3. Format back to string with padding
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  const mss = String(ms).padStart(3, "0");

  return `${hh}:${mm}:${ss}.${mss}`;
};

export { convertDateToMySQL, convertMysqlToDate, formatLapTime, parseFlexibleTime };
