document.addEventListener("DOMContentLoaded", () => {
  //
  const trackSelect = document.getElementById("trackSelect");
  const filterButton = document.getElementById("filterLeaderboard");
  const leaderboardTableContainer = document.getElementById(
    "leaderboardTableContainer"
  );
  const leaderboardTableBody = document.getElementById("leaderboardTableBody");

  // Dropdown filters
  const toggleFiltersDropdownButton = document.getElementById(
    "toggleFiltersDropdown"
  );
  const filtersDropdownContainer = document.getElementById(
    "filtersDropdownContainer"
  );

  // Function to render table rows
  const renderTable = (laps) => {
    leaderboardTableBody.innerHTML = ""; // Clear existing rows

    if (laps.length === 0) {
      leaderboardTableBody.innerHTML =
        '<tr><td colspan="8" class="text-center">Brak czasów dla wybranego toru.</td></tr>';
    } else {
      laps.forEach((lap, index) => {
        const row = leaderboardTableBody.insertRow();
        row.insertCell().textContent = index + 1; // Position
        row.insertCell().textContent = lap.lap_time;
        row.insertCell().textContent = lap.rider_name;
        row.insertCell().textContent = lap.validity;
        row.insertCell().textContent = lap.motorcycle;
        row.insertCell().textContent = lap.tyre_front;
        row.insertCell().textContent = lap.tyre_rear;
        row.insertCell().textContent = new Date(
          lap.lap_date
        ).toLocaleDateString(); // Format date
      });
    }
  };

  // No need for initial render logic here, EJS handles the first load.
  // The dropdown will already be pre-selected by EJS.

  filterButton.addEventListener("click", async () => {
    const selectedTrackId = trackSelect.value;

    // If "Wybierz tor" (value="") is selected, and it's disabled,
    // the user must select a valid track.
    if (!selectedTrackId) {
      leaderboardTableBody.innerHTML =
        '<tr><td colspan="8" class="text-center">Brak czasów dla wybranego toru.</td></tr>';
      return;
    }

    try {
      const response = await fetch(
        `/leaderboard/filter?trackId=${selectedTrackId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const laps = await response.json();
      renderTable(laps); // Use the render function
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      leaderboardTableBody.innerHTML =
        '<tr><td colspan="8" class="text-center text-danger">Failed to load leaderboard data.</td></tr>';
    }
  });

  // Initialize Bootstrap Collapse instance
  const bsCollapse = new bootstrap.Collapse(filtersDropdownContainer, {
    toggle: false // We'll handle toggling via the button click
  });

  // Event listener for the new "Więcej opcji" button
  toggleFiltersDropdownButton.addEventListener('click', () => {
    bsCollapse.toggle(); // Use the toggle method of the instance
  });

  // Listen for Bootstrap collapse events to change button text
  filtersDropdownContainer.addEventListener('show.bs.collapse', () => {
    toggleFiltersDropdownButton.textContent = 'Zwiń'; // Corrected ID
  });

  filtersDropdownContainer.addEventListener('hide.bs.collapse', () => {
    toggleFiltersDropdownButton.textContent = 'Filtry'; // Corrected ID
  });

});
