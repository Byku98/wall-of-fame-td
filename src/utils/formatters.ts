const MISSING_DATA_TEXT = "Brak danych";

// Helper function to convert date from "DD.MM.YYYY" to "YYYY-MM-DD"
const convertDateToMySQL = (dateString: string): string => {
  if (typeof dateString !== "string") return "";

  const parts = dateString.split(".");
  if (parts.length !== 3) return "";

  const [day, month, year] = parts;

  // Validate parts exist and are numeric
  if (!day || !month || !year) return "";
  if (isNaN(Number(day)) || isNaN(Number(month)) || isNaN(Number(year))) return "";

  const d = day.padStart(2, "0");
  const m = month.padStart(2, "0");
  const y = year.length === 2 ? `20${year}` : year; // optional: handle YY format

  return `${y}-${m}-${d}`;
};

// Helper function to format date from "YYYY-MM-DD" to "DD.MM.YYYY"
const convertMysqlToDate = (dateString: string): string => {
  if (!dateString) return MISSING_DATA_TEXT;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return MISSING_DATA_TEXT; // Invalid date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Function to format lap time for display
const formatLapTime = (timeString: string): string => {
  if (!timeString || typeof timeString !== "string") return "";

  const timeParts = timeString.split(":");
  
  let hours = 0;
  let minutes = 0;
  let secondsAndMs = "";

  // Handle different formats based on number of colons
  if (timeParts.length === 3) {
    // Format: HH:MM:SS.mmm
    hours = parseInt(timeParts[0], 10) || 0;
    minutes = parseInt(timeParts[1], 10) || 0;
    secondsAndMs = timeParts[2];
  } else if (timeParts.length === 2) {
    // Format: MM:SS.mmm
    minutes = parseInt(timeParts[0], 10) || 0;
    secondsAndMs = timeParts[1];
  } else {
    // Format: SS.mmm
    secondsAndMs = timeParts[0];
  }

  // Final Formatting
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${secondsAndMs}`;
  }

  if (minutes > 0) {
    return `${minutes}:${secondsAndMs}`;
  }

  // Remove leading zero from seconds if it's like "05.12" -> "5.12" 
  // but keep it if it's just "0.12"
  if (secondsAndMs.startsWith("0") && secondsAndMs.length > 1 && secondsAndMs[1] !== ".") {
    return secondsAndMs.substring(1);
  }

  return secondsAndMs;
};

export { convertDateToMySQL, convertMysqlToDate, formatLapTime };