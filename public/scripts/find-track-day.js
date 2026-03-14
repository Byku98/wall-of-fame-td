document.addEventListener("DOMContentLoaded", () => {
    const trackFilter = document.getElementById("trackFilter");
    const eventsContainer = document.getElementById("eventsContainer");
    const noEventsMessage = document.getElementById("noEventsMessage"); // NEW: Get the no events message element
    
    // Access the globally embedded events data
    const allEvents = window.allEvents || []; 

    if (!trackFilter || !eventsContainer) { // Removed tableBody from check
        console.error("Required elements for find-track-day.js not found.");
        return;
    }

    const populateTrackFilter = () => {
        const uniqueTracks = [...new Set(allEvents.map(event => event.track))].filter(Boolean).sort();
        
        trackFilter.innerHTML = '<option value="">Wszystkie tory</option>';

        uniqueTracks.forEach(track => {
            const option = document.createElement("option");
            option.value = track;
            option.textContent = track;
            trackFilter.appendChild(option);
        });
    };

    const filterEvents = () => {
        const selectedTrack = trackFilter.value;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to start of day for accurate comparison
        
        const eventCards = eventsContainer.querySelectorAll(".event-card-col");
        let futureVisibleCount = 0; // Count only future visible events for the "no events" message

        eventCards.forEach(card => {
            const cardTrack = card.dataset.track;
            const eventIndex = Array.from(eventCards).indexOf(card);
            const event = allEvents[eventIndex];
            
            // Parse date in DD.MM.YYYY format (e.g., "28.02.2026")
            const [day, month, year] = event.date.split('.');
            const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Month is 0-based
            
            const matchesTrack = selectedTrack === "" || cardTrack === selectedTrack;
            const isFuture = eventDate >= today;
            
            if (matchesTrack && isFuture) {
                // Future event: show normally
                card.style.display = "block";
                card.style.opacity = "1";
                card.style.pointerEvents = "auto"; // Allow interactions
                futureVisibleCount++;
            } else if (matchesTrack && !isFuture) {
                // Past event: show grayed out and frozen
                card.style.display = "block";
                card.style.opacity = "0.5"; // Gray out
                card.style.pointerEvents = "none"; // Freeze (disable clicks)
            } else {
                // Doesn't match track: hide
                card.style.display = "none";
            }
        });

        // Show/hide the "Brak nadchodzących wydarzeń." message only if no future events are visible
        if (noEventsMessage) {
            if (futureVisibleCount === 0) {
                noEventsMessage.style.display = "block";
            } else {
                noEventsMessage.style.display = "none";
            }
        }
    };

    // Initial population and filtering
    populateTrackFilter();
    trackFilter.addEventListener("change", filterEvents);
    filterEvents(); // Apply initial filter (show all)
});