document.addEventListener("DOMContentLoaded", () => {
    const trackFilter = document.getElementById("trackFilter");
    const eventsTable = document.getElementById("eventsTable");
    const tableBody = eventsTable ? eventsTable.querySelector("tbody") : null;

    // Access the globally embedded events data
    const allEvents = window.allEvents || []; 

    console.log("find-track-day.js loaded."); // Debugging line
    console.log("trackFilter element:", trackFilter); // Debugging line
    console.log("eventsTable element:", eventsTable); // Debugging line
    console.log("tableBody element:", tableBody); // Debugging line
    console.log("allEvents data:", allEvents); // Debugging line

    if (!trackFilter || !eventsTable || !tableBody) {
        console.error("Required elements for find-track-day.js not found. Cannot populate filter or table.");
        return;
    }

    const populateTrackFilter = () => {
        console.log("populateTrackFilter called."); // Debugging line
        // Use allEvents directly to get unique tracks
        const uniqueTracks = [...new Set(allEvents.map(event => event.track))].filter(Boolean).sort();
        
        // Clear existing options before populating
        trackFilter.innerHTML = '<option value="">Wszystkie tory</option>';

        uniqueTracks.forEach(track => {
            const option = document.createElement("option");
            option.value = track;
            option.textContent = track;
            trackFilter.appendChild(option);
        });
        console.log("Track filter populated with unique tracks:", uniqueTracks); // Debugging line
    };

    const filterTable = () => {
        console.log("filterTable called."); // Debugging line
        const selectedTrack = trackFilter.value;
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            // Ensure we only process actual data rows, not the colspan row
            if (row.querySelector('td[colspan="4"]')) { // Check for the "Brak nadchodzących wydarzeń." row
                row.style.display = "none"; // Always hide this row when filtering
                return;
            }

            const rowTrack = row.dataset.track;
            if (selectedTrack === "" || rowTrack === selectedTrack) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    };

    // Initial population and filtering
    populateTrackFilter();
    trackFilter.addEventListener("change", filterTable);
    filterTable(); // Apply initial filter (show all)
});