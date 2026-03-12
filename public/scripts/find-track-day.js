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
        const eventCards = eventsContainer.querySelectorAll(".event-card-col");
        let visibleCardsCount = 0;

        eventCards.forEach(card => {
            const cardTrack = card.dataset.track;
            if (selectedTrack === "" || cardTrack === selectedTrack) {
                card.style.display = "block"; // Show the card
                visibleCardsCount++;
            } else {
                card.style.display = "none"; // Hide the card
            }
        });

        // Show/hide the "Brak nadchodzących wydarzeń." message based on visible cards
        if (noEventsMessage) {
            if (visibleCardsCount === 0) {
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