import { convertDateToMySQL } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. VARIABLES & INITIALIZATION
  // ==========================================
  const riderHistoryTable = document.getElementById("rider-history-table");
  const detailsContainer = document.getElementById("lap-details-left");

  if (!riderHistoryTable) return;

  // ==========================================
  // 2. HELPER FUNCTIONS
  // ==========================================

  /**
   * Fetches new lap details and updates the UI with animation.
   */
  const updateLapDetails = async (data) => {
    try {
      const url = `/lap-details/${encodeURIComponent(data.lapTime)}/${encodeURIComponent(data.riderName)}/${encodeURIComponent(data.motorcycle)}/${encodeURIComponent(data.lapDate)}/${encodeURIComponent(data.trackName)}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fetch failed");
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent = doc.getElementById("lap-details-left");

      if (newContent && detailsContainer) {
        // Animation Out
        detailsContainer.style.transition = 'opacity 200ms ease, transform 200ms ease';
        detailsContainer.style.opacity = '0';
        detailsContainer.style.transform = 'translateY(10px)';

        setTimeout(() => {
          detailsContainer.innerHTML = newContent.innerHTML;
          // Animation In
          detailsContainer.style.opacity = '1';
          detailsContainer.style.transform = 'translateY(0)';
          
          const top = Math.max(window.scrollY + detailsContainer.getBoundingClientRect().top - 20, 0);
          window.scrollTo({ top, behavior: 'smooth' });
        }, 200);
      }
    } catch (error) {
      console.error("Error updating details:", error);
      alert("Nie udało się załadować danych.");
    }
  };

  // ==========================================
  // 3. EVENT LISTENERS
  // ==========================================

  riderHistoryTable.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row || row.rowIndex === 0) return;

    const data = {
      lapTime: row.dataset.lapTime?.trim(),
      riderName: row.dataset.riderName?.trim(),
      motorcycle: row.dataset.motorcycle?.trim(),
      lapDate: convertDateToMySQL(row.dataset.lapDate?.trim()),
      trackName: row.dataset.trackName?.trim()
    };

    if (Object.values(data).every(val => val)) {
      updateLapDetails(data);
    }
  });

});