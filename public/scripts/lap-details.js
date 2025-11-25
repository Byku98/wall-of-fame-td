import { convertDateToMySQL} from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("lap-details.js loaded");

  // Add click handler for rider history table to dynamically reload left div
  const riderHistoryTable = document.getElementById("rider-history-table");

  console.log("Rider History Table found:", riderHistoryTable);

  if (riderHistoryTable) {
    console.log("Attaching event listener to table");

    riderHistoryTable.addEventListener("click", async (event) => {
      const target = event.target.closest("tr");
      
      console.log("Row clicked:", target);
      
      if (target && target.rowIndex > 0) { // Skip header row
        const lapTime = target.getAttribute("data-lap-time")?.trim();
        const riderName = target.getAttribute("data-rider-name")?.trim();
        const motorcycle = target.getAttribute("data-motorcycle")?.trim();
        const lapDate = convertDateToMySQL(target.getAttribute("data-lap-date")?.trim());
        const trackName = target.getAttribute("data-track-name")?.trim();

        console.log("Extracted data:", { lapTime, riderName, motorcycle, lapDate, trackName });

        if (lapTime && riderName && motorcycle && lapDate && trackName) {
          try {
            // Construct URL for the new lap details
            const url = `/lap-details/${encodeURIComponent(lapTime)}/${encodeURIComponent(riderName)}/${encodeURIComponent(motorcycle)}/${encodeURIComponent(lapDate)}/${encodeURIComponent(trackName)}`;

            console.log("Fetching URL:", url);

            // Fetch the full page HTML
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

            const html = await response.text();

            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Extract the left div content
            const newLeftDiv = doc.getElementById("lap-details-left");
            if (newLeftDiv) {
              // Replace the current left div content
              const currentLeftDiv = document.getElementById("lap-details-left");
              if (currentLeftDiv) {
                currentLeftDiv.innerHTML = newLeftDiv.innerHTML;
                console.log("Left div updated successfully");
              }
            } else {
              console.error("New left div not found in fetched HTML");
            }
          } catch (error) {
            console.error("Error reloading lap details:", error);
            alert("Nie udało się załadować szczegółów okrążenia.");
          }
        } else {
          console.error("Missing required data attributes");
        }
      }
    });
  } else {
    console.error("Rider history table not found");
  }
});