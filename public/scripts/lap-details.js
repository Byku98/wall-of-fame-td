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
              // Replace the current left div content with animation
              const currentLeftDiv = document.getElementById("lap-details-left");
              if (currentLeftDiv) {
                // prepare animation: fade out/slide slightly
                currentLeftDiv.style.transition = 'opacity 250ms ease, transform 250ms ease';
                currentLeftDiv.style.opacity = '0';
                currentLeftDiv.style.transform = 'translateY(8px)';

                // replace content
                currentLeftDiv.innerHTML = newLeftDiv.innerHTML;

                // force reflow and then animate in
                void currentLeftDiv.offsetWidth;
                currentLeftDiv.style.opacity = '1';
                currentLeftDiv.style.transform = 'translateY(0)';

                // Smooth scroll page to the left div top
                const top = Math.max(window.scrollY + currentLeftDiv.getBoundingClientRect().top - 20, 0);
                window.scrollTo({ top, behavior: 'smooth' });

                console.log("Left div updated and animated successfully");
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