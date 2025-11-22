import { convertMysqlToDate, convertDateToMySQL, formatLapTime } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  // Constants for DOM elements
  const trackSelect = document.getElementById("trackSelect");
  const filterButton = document.getElementById("filterLeaderboard");
  const leaderboardTableContainer = document.getElementById(
    "leaderboardTableContainer"
  );
  const leaderboardTableBody = document.getElementById("leaderboardTableBody");

  // Constants for dropdown filters
  const toggleFiltersDropdownButton = document.getElementById(
    "toggleFiltersDropdown"
  );
  const filtersDropdownContainer = document.getElementById(
    "filtersDropdownContainer"
  );
  const applyFiltersDropdown = document.getElementById("applyFiltersDropdown");
  const clearFiltersDropdown = document.getElementById("clearFiltersDropdown");

  // Constants for autocomplete filtering inputs and datalists
  const motorcycleNameFilter = document.getElementById("motorcycleNameFilter");
  const tyreFrontFilter = document.getElementById("tyreFrontFilter");
  const tyreRearFilter = document.getElementById("tyreRearFilter");
  const motorcycleSuggestionsDatalist = document.getElementById(
    "motorcycleSuggestions"
  );
  const tyreFrontSuggestionsDatalist = document.getElementById(
    "tyreFrontSuggestions"
  );
  const tyreRearSuggestionsDatalist = document.getElementById(
    "tyreRearSuggestions"
  );

  // Constants to validate date order
  const dateFromFilter = document.getElementById("dateFromFilter");
  const dateToFilter = document.getElementById("dateToFilter");
  const clearFiltersDateFrom = document.getElementById("clearFiltersDateFrom");
  const clearFiltersDateTo = document.getElementById("clearFiltersDateTo");

  // Constants to validate laptime order
  const fasterThanMinutes = document.getElementById("fasterThanMinutes");
  const fasterThanSeconds = document.getElementById("fasterThanSeconds");
  const slowerThanMinutes = document.getElementById("slowerThanMinutes");
  const slowerThanSeconds = document.getElementById("slowerThanSeconds");
  const clearFiltersFasterThan = document.getElementById(
    "clearFiltersFasterThan"
  );
  const clearFiltersSlowerThan = document.getElementById(
    "clearFiltersSlowerThan"
  );

  // Constants for checkboxes
  const expFreshman = document.getElementById("expFreshman");
  const expBeginner = document.getElementById("expBeginner");
  const expMedium = document.getElementById("expMedium");
  const expAdvanced = document.getElementById("expAdvanced");
  const expSemipro = document.getElementById("expSemipro");
  const expProfessional = document.getElementById("expProfessional");
  const accVeryHigh = document.getElementById("accVeryHigh");
  const accHigh = document.getElementById("accHigh");
  const accMedium = document.getElementById("accMedium");
  const accLow = document.getElementById("accLow");
  const sexMale = document.getElementById("sexMale");
  const sexFemale = document.getElementById("sexFemale");
  const sexAll = document.getElementById("sexAll");

  // Constants for hints (if present in EJS)
  const fasterThanHint = document.getElementById("fasterThanHint");
  const slowerThanHint = document.getElementById("slowerThanHint");

  // Variables to store data
  let allTrackLapsData = []; // Full unfiltered data for the selected track
  const MISSING_DATA_TEXT = "Brak danych";

  // Unified helper function to get total seconds from either DOM elements or a time string
  const getTotalSeconds = (input) => {
    if (typeof input === "string") {
      // Parse from time string (e.g., "00:00:41.76")
      const parts = input.split(":");
      const hours = parseInt(parts[0] || 0, 10);
      const minutes = parseInt(parts[1] || 0, 10);
      const seconds = parseFloat(parts[2] || 0);
      return hours * 3600 + minutes * 60 + seconds;
    } else if (input.length === 2) {
      // Parse from DOM elements (minElement, secElement)
      const min = parseInt(input[0].value || 0, 10);
      const sec = parseInt(input[1].value || 0, 10);
      return min * 60 + sec;
    }
    return 0; // Default for invalid input
  };

  // Function to validate date range order
  const validateDateRange = () => {
    if (dateFromFilter && dateToFilter) {
      const fromDate = new Date(dateFromFilter.value);
      const toDate = new Date(dateToFilter.value);
      if (dateFromFilter.value && dateToFilter.value && fromDate >= toDate) {
        return false; // Invalid: "Data - od" is not earlier than "Data - do"
      }
      return true; // Valid
    }
    return true; // If fields are not set, consider valid
  };

  // Function to validate lap time range
  const validateLapTimeRange = () => {
    const fasterTotal = getTotalSeconds([fasterThanMinutes, fasterThanSeconds]);
    const slowerTotal = getTotalSeconds([slowerThanMinutes, slowerThanSeconds]);
    console.log(fasterTotal, slowerTotal);
    if (fasterTotal > 0 && slowerTotal > 0 && fasterTotal <= slowerTotal) {
      return false; // Invalid: "Szybciej niż" must be grater (bigger than) "Wolniej niż"
    }
    return true; // Valid or one/both filters not set
  };

  // Function to render table rows
  const renderTable = (laps) => {
    leaderboardTableBody.innerHTML = ""; // Clear existing rows

    if (laps.length === 0) {
      leaderboardTableBody.innerHTML =
        '<tr><td colspan="8" class="text-center">Brak czasów dla wybranego toru.</td></tr>';
    } else {
      laps.forEach((lap, index) => {
        const row = leaderboardTableBody.insertRow();

        // Extract date-only from lap.lap_date (e.g., "2020-07-19" from "2020-07-19T22:00:00.000Z")
        const dateOnly = lap.lap_date
          ? new Date(lap.lap_date).toISOString().split("T")[0]
          : ""; // YYYY-MM-DD

        // Add data attributes for later use
        row.setAttribute("data-lap-time", lap.lap_time || "");
        row.setAttribute("data-rider-name", lap.rider_name || "");
        row.setAttribute("data-motorcycle", lap.motorcycle || "");
        row.setAttribute("data-lap-date", convertMysqlToDate(lap.lap_date) || "");

        // Populate row cells
        row.insertCell().textContent = index + 1; // Position
        row.insertCell().textContent =
          formatLapTime(lap.lap_time) || MISSING_DATA_TEXT; // Lap time
        row.insertCell().textContent = lap.rider_name || MISSING_DATA_TEXT; // Rider name
        row.insertCell().textContent = lap.rider_level || MISSING_DATA_TEXT; // Rider level
        // row.insertCell().textContent = lap.validity || MISSING_DATA_TEXT; // Validity
        row.insertCell().textContent = lap.motorcycle || MISSING_DATA_TEXT; // Motorcycle
        row.insertCell().textContent = lap.tyre_front || MISSING_DATA_TEXT; // Tyre front
        row.insertCell().textContent = lap.tyre_rear || MISSING_DATA_TEXT; // Tyre rear
        row.insertCell().textContent = convertMysqlToDate(lap.lap_date); // Use custom formatter for DD.MM.YYYY
      });
    }
    populateFilterAutofillDatalist(); // Update datalists after rendering table
  };

  // Function to populate the autofill datalists
  const populateFilterAutofillDatalist = () => {
    motorcycleSuggestionsDatalist.innerHTML = ""; // Clear existing options
    tyreFrontSuggestionsDatalist.innerHTML = ""; // Clear existing options
    tyreRearSuggestionsDatalist.innerHTML = ""; // Clear existing options

    if (allTrackLapsData.length > 0) {
      const uniqueMotorcycles = [
        ...new Set(allTrackLapsData.map((lap) => lap.motorcycle)),
      ].sort();
      const uniqueTyresFront = [
        ...new Set(allTrackLapsData.map((lap) => lap.tyre_front)),
      ].sort();
      const uniqueTyresRear = [
        ...new Set(allTrackLapsData.map((lap) => lap.tyre_rear)),
      ].sort();

      uniqueMotorcycles.forEach((motorcycle) => {
        if (motorcycle) {
          const option = document.createElement("option");
          option.value = motorcycle;
          motorcycleSuggestionsDatalist.appendChild(option);
        }
      });

      uniqueTyresFront.forEach((tyre_front) => {
        if (tyre_front) {
          const option = document.createElement("option");
          option.value = tyre_front;
          tyreFrontSuggestionsDatalist.appendChild(option);
        }
      });

      uniqueTyresRear.forEach((tyre_rear) => {
        if (tyre_rear) {
          const option = document.createElement("option");
          option.value = tyre_rear;
          tyreRearSuggestionsDatalist.appendChild(option);
        }
      });
    }
  };

  // Function to filter laps based on current filter values
  const filterLaps = (laps) => {
    return laps.filter((lap) => {
      // Motorcycle filter
      if (
        motorcycleNameFilter &&
        motorcycleNameFilter.value &&
        !lap.motorcycle
          ?.toLowerCase()
          .includes(motorcycleNameFilter.value.toLowerCase())
      ) {
        return false;
      }
      // Tyre front filter
      if (
        tyreFrontFilter &&
        tyreFrontFilter.value &&
        !lap.tyre_front
          ?.toLowerCase()
          .includes(tyreFrontFilter.value.toLowerCase())
      ) {
        return false;
      }
      // Tyre rear filter
      if (
        tyreRearFilter &&
        tyreRearFilter.value &&
        !lap.tyre_rear
          ?.toLowerCase()
          .includes(tyreRearFilter.value.toLowerCase())
      ) {
        return false;
      }
      // Faster than filter
      if (fasterThanMinutes && fasterThanSeconds) {
        const fasterTotal = getTotalSeconds([
          fasterThanMinutes,
          fasterThanSeconds,
        ]);
        if (fasterTotal > 0) {
          const lapTotal = getTotalSeconds(lap.lap_time);
          if (lapTotal >= fasterTotal) return false; // Lap time must be faster (less than)
        }
      }
      // Slower than filter
      if (slowerThanMinutes && slowerThanSeconds) {
        const slowerTotal = getTotalSeconds([
          slowerThanMinutes,
          slowerThanSeconds,
        ]);
        if (slowerTotal > 0) {
          const lapTotal = getTotalSeconds(lap.lap_time);
          if (lapTotal <= slowerTotal) return false; // Lap time must be slower (greater than)
        }
      }
      // Date from filter
      if (dateFromFilter && dateFromFilter.value) {
        const fromDate = new Date(dateFromFilter.value);
        const lapDate = new Date(lap.lap_date);
        if (lapDate < fromDate) return false;
      }
      // Date to filter
      if (dateToFilter && dateToFilter.value) {
        const toDate = new Date(dateToFilter.value);
        const lapDate = new Date(lap.lap_date);
        if (lapDate > toDate) return false;
      }
      // Experience checkboxes (case-insensitive, handle null/undefined)
      const expChecked = [
        expFreshman,
        expBeginner,
        expMedium,
        expAdvanced,
        expSemipro,
        expProfessional,
      ]
        .filter((cb) => cb && cb.checked)
        .map((cb) => cb.value.toLowerCase()); // Normalize to lowercase
      if (
        expChecked.length > 0 &&
        (!lap.rider_level ||
          !expChecked.includes(lap.rider_level.toLowerCase()))
      ) {
        return false;
      }

      // Accuracy checkboxes (case-insensitive, handle null/undefined)
      const accChecked = [accVeryHigh, accHigh, accMedium, accLow]
        .filter((cb) => cb && cb.checked)
        .map((cb) => cb.value.toLowerCase()); // Normalize to lowercase
      if (
        accChecked.length > 0 &&
        (!lap.validity || !accChecked.includes(lap.validity.toLowerCase()))
      ) {
        return false;
      }

      // Gender radio (case-insensitive, handle null/undefined)
      if (sexMale && sexFemale && sexAll) {
        if (
          sexMale.checked &&
          (!lap.gender || lap.gender.toLowerCase() !== "male")
        )
          return false;
        if (
          sexFemale.checked &&
          (!lap.gender || lap.gender.toLowerCase() !== "female")
        )
          return false;
        // sexAll.checked means no filter
      }
      return true;
    });
  };

  // Event listeners for clearing individual filters
  if (clearFiltersFasterThan) {
    clearFiltersFasterThan.addEventListener("click", () => {
      if (fasterThanMinutes) fasterThanMinutes.value = "0";
      if (fasterThanSeconds) fasterThanSeconds.value = "0";
    });
  }
  if (clearFiltersSlowerThan) {
    clearFiltersSlowerThan.addEventListener("click", () => {
      if (slowerThanMinutes) slowerThanMinutes.value = "0";
      if (slowerThanSeconds) slowerThanSeconds.value = "0";
    });
  }
  if (clearFiltersDateFrom) {
    clearFiltersDateFrom.addEventListener("click", () => {
      if (dateFromFilter) dateFromFilter.value = "";
    });
  }
  if (clearFiltersDateTo) {
    clearFiltersDateTo.addEventListener("click", () => {
      if (dateToFilter) dateToFilter.value = "";
    });
  }

  // Event listener for clearing all filters and resetting the table
  if (clearFiltersDropdown) {
    clearFiltersDropdown.addEventListener("click", () => {
      // Reset all filter inputs
      if (motorcycleNameFilter) motorcycleNameFilter.value = "";
      if (tyreFrontFilter) tyreFrontFilter.value = "";
      if (tyreRearFilter) tyreRearFilter.value = "";
      if (fasterThanMinutes) fasterThanMinutes.value = "0";
      if (fasterThanSeconds) fasterThanSeconds.value = "0";
      if (slowerThanMinutes) slowerThanMinutes.value = "0";
      if (slowerThanSeconds) slowerThanSeconds.value = "0";
      if (dateFromFilter) dateFromFilter.value = "";
      if (dateToFilter) dateToFilter.value = "";
      // Reset checkboxes
      if (expFreshman) expFreshman.checked = false;
      if (expBeginner) expBeginner.checked = false;
      if (expMedium) expMedium.checked = false;
      if (expAdvanced) expAdvanced.checked = false;
      if (expSemipro) expSemipro.checked = false;
      if (expProfessional) expProfessional.checked = false;
      if (accVeryHigh) accVeryHigh.checked = false;
      if (accHigh) accHigh.checked = false;
      if (accMedium) accMedium.checked = false;
      if (accLow) accLow.checked = false;
      // Reset radios
      if (sexAll) sexAll.checked = true;
      if (sexMale) sexMale.checked = false;
      if (sexFemale) sexFemale.checked = false;
      // Reset hints
      if (fasterThanHint) fasterThanHint.style.display = "none";
      if (slowerThanHint) slowerThanHint.style.display = "none";
      // Re-render the table with all unfiltered data
      renderTable(allTrackLapsData);
    });
  }

  // Event listener for track selection and initial data fetch
  if (filterButton) {
    filterButton.addEventListener("click", async () => {
      const selectedTrackName = trackSelect.value;
      if (!selectedTrackName) {
        leaderboardTableBody.innerHTML =
          '<tr><td colspan="8" class="text-center">Brak czasów dla wybranego toru.</td></tr>';
        return;
      }

      try {
        const response = await fetch(
          `/leaderboard/filter?trackName=${selectedTrackName}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const laps = await response.json();
        allTrackLapsData = laps; // Store the full unfiltered data
        renderTable(laps); // Render the full data
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        leaderboardTableBody.innerHTML =
          '<tr><td colspan="8" class="text-center text-danger">Failed to load leaderboard data.</td></tr>';
      }
    });
  }

  // Event listener for applying filters (with validation)
  if (applyFiltersDropdown) {
    applyFiltersDropdown.addEventListener("click", () => {
      // Validate date range
      if (!validateDateRange()) {
        alert("Data - od musi być wcześniejsza niż Data - do.");
        return;
      }
      // Validate lap time range
      if (!validateLapTimeRange()) {
        alert("Czas 'Szybciej niż' musi być krótszy niż 'Wolniej niż'.");
        return;
      }
      // Proceed with filtering
      const filteredLaps = filterLaps(allTrackLapsData);
      renderTable(filteredLaps);
    });
  }

  // Initialize Bootstrap Collapse instance
  const bsCollapse = new bootstrap.Collapse(filtersDropdownContainer, {
    toggle: false,
  });

  // Event listener for the toggle button
  if (toggleFiltersDropdownButton) {
    toggleFiltersDropdownButton.addEventListener("click", () => {
      bsCollapse.toggle();
    });
  }

  // Listen for Bootstrap collapse events to change button text
  if (filtersDropdownContainer) {
    filtersDropdownContainer.addEventListener("show.bs.collapse", () => {
      if (toggleFiltersDropdownButton)
        toggleFiltersDropdownButton.textContent = "Zwiń";
    });
    filtersDropdownContainer.addEventListener("hide.bs.collapse", () => {
      if (toggleFiltersDropdownButton)
        toggleFiltersDropdownButton.textContent = "Filtry";
    });
  }

  // Add event listener for table row clicks to fetch lap details
  if (leaderboardTableBody) {
    leaderboardTableBody.addEventListener("click", (event) => {
      const target = event.target.closest("tr");
      if (target && target.rowIndex > 0) {
        // Skip header row
        const lapTime = target.getAttribute("data-lap-time")?.trim(); // Use data attributes instead of cells
        const riderName = target.getAttribute("data-rider-name")?.trim();
        const motorcycle = target.getAttribute("data-motorcycle")?.trim();
        const displayedDate = target
          .querySelectorAll("td")[8]
          ?.textContent?.trim();
        const lapDate = convertDateToMySQL(displayedDate);
        const selectedTrackName = trackSelect.value;

        console.log("Extracted data:", {
          lapTime,
          riderName,
          motorcycle,
          lapDate,
          selectedTrackName,
        });

        if (lapTime && riderName && motorcycle && lapDate && selectedTrackName) {
          // Navigate to the lap details page with query parameters including track name
          const url = `/lap-details/${encodeURIComponent(
            lapTime
          )}/${encodeURIComponent(riderName)}/${encodeURIComponent(
            motorcycle
          )}/${encodeURIComponent(lapDate)}/${encodeURIComponent(selectedTrackName)}`;
          window.location.href = url;
        } else {
          alert("Nie można pobrać szczegółów okrążenia. Spróbuj ponownie.");
        }
      }
    });
  }
});
