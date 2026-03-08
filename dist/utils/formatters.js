"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLapTime = exports.convertMysqlToDate = exports.convertDateToMySQL = void 0;
const MISSING_DATA_TEXT = "Brak danych";
// Helper function to convert date from "DD.MM.YYYY" to "YYYY-MM-DD"
const convertDateToMySQL = (dateString) => {
    if (typeof dateString !== "string")
        return "";
    const parts = dateString.split(".");
    if (parts.length !== 3)
        return "";
    const [day, month, year] = parts;
    // Validate parts exist and are numeric
    if (!day || !month || !year)
        return "";
    if (isNaN(Number(day)) || isNaN(Number(month)) || isNaN(Number(year)))
        return "";
    const d = day.padStart(2, "0");
    const m = month.padStart(2, "0");
    const y = year.length === 2 ? `20${year}` : year; // optional: handle YY format
    return `${y}-${m}-${d}`;
};
exports.convertDateToMySQL = convertDateToMySQL;
// Helper function to format date from "YYYY-MM-DD" to "DD.MM.YYYY"
const convertMysqlToDate = (dateString) => {
    if (!dateString)
        return MISSING_DATA_TEXT;
    const date = new Date(dateString);
    if (isNaN(date.getTime()))
        return MISSING_DATA_TEXT; // Invalid date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
exports.convertMysqlToDate = convertMysqlToDate;
// Function to format lap time for display
const formatLapTime = (timeString) => {
    if (!timeString || typeof timeString !== "string")
        return "";
    const timeParts = timeString.split(":");
    if (timeParts.length < 1 || timeParts.length > 3)
        return "";
    // Extract safely with defaults
    const hours = parseInt(timeParts[0] ?? "0", 10) || 0;
    const minutes = parseInt(timeParts[1] ?? "0", 10) || 0;
    const secondsAndMs = timeParts[2] ?? timeParts[1] ?? timeParts[0];
    if (!secondsAndMs)
        return "";
    // Format
    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${secondsAndMs}`;
    }
    if (minutes > 0) {
        return `${minutes}:${secondsAndMs}`;
    }
    return secondsAndMs;
};
exports.formatLapTime = formatLapTime;
//# sourceMappingURL=formatters.js.map