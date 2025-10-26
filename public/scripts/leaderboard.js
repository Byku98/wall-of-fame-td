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
  const MISSING_DATA_TEXT = "Brak danych";

  // Constnats for autocomplete filtering leaderboard
  const motorcycleNameFilter = document.getElementById("motorcycleNameFilter");
  const tyreFrontFilter = document.getElementById("tyreFrontFilter");
  const tyreRearFilter = document.getElementById("tyreRearFilter");
  const clearFiltersFasterThan = document.getElementById(
    "clearFiltersFasterThan"
  );
  const clearFiltersSlowerThan = document.getElementById(
    "clearFiltersSlowerThan"
  );
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

  // Constants to validate laptime order
  const fasterThanMinutes = document.getElementById("fasterThanMinutes");
  const fasterThanSeconds = document.getElementById("fasterThanSeconds");
  const slowerThanMinutes = document.getElementById("slowerThanMinutes");
  const slowerThanSeconds = document.getElementById("slowerThanSeconds");

  // Variable to store the last fetched laps data to extract unique motorcycles
  let currentLapsData = [];
  let allTrackLapsData = [];

  // Event listener for clearing faster than filters
  if (clearFiltersFasterThan) {
    clearFiltersFasterThan.addEventListener("click", () => {
      fasterThanMinutes.value = ""; // Reset to default (empty)
      fasterThanSeconds.value = ""; // Reset to default (empty)
    });
  }

  // Event listener for clearing slower than filters
  if (clearFiltersSlowerThan) {
    clearFiltersSlowerThan.addEventListener("click", () => {
      slowerThanMinutes.value = ""; // Reset to default (empty)
      slowerThanSeconds.value = ""; // Reset to default (empty)
    });
  }

  // Event listener for clearing slower than filters
  if (clearFiltersDateFrom) {
    clearFiltersDateFrom.addEventListener("click", () => {
      dateFromFilter.value = ""; // Reset to default (empty)
    });
  } // Event listener for clearing slower than filters
  if (clearFiltersDateTo) {
    clearFiltersDateTo.addEventListener("click", () => {
      dateToFilter.value = ""; // Reset to default (empty)
    });
  }

  // Reset all filter inputs to their default values (empty strings)
  if (clearFiltersDropdown) {
    clearFiltersDropdown.addEventListener("click", () => {
      // Reset all filter inputs to their default values (empty strings or unchecked)
      if (motorcycleNameFilter) motorcycleNameFilter.value = "";
      if (tyreFrontFilter) tyreFrontFilter.value = "";
      if (tyreRearFilter) tyreRearFilter.value = "";
      if (fasterThanMinutes) fasterThanMinutes.value = "";
      if (fasterThanSeconds) fasterThanSeconds.value = "";
      if (slowerThanMinutes) slowerThanMinutes.value = "";
      if (slowerThanSeconds) slowerThanSeconds.value = "";
      if (dateFromFilter) dateFromFilter.value = "";
      if (dateToFilter) dateToFilter.value = "";
      // Reset checkboxes to unchecked
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
      // Reset radios to default (sexAll checked)
      if (sexAll) sexAll.checked = true;
      if (sexMale) sexMale.checked = false;
      if (sexFemale) sexFemale.checked = false;
      // Re-render the table with all unfiltered data
      renderTable(allTrackLapsData);
    });
  }

  // Function to get total seconds from minutes and seconds select elements
  const getTotalSeconds = (minElement, secElement) => {
    const min = parseInt(minElement.value || 0, 10);
    const sec = parseInt(secElement.value || 0, 10);
    return min * 60 + sec;
  };

  const validateLapTimeRange = () => {
    const fasterTotal = getTotalSeconds(fasterThanMinutes, fasterThanSeconds);
    const slowerTotal = getTotalSeconds(slowerThanMinutes, slowerThanSeconds);
    console.log(fasterTotal);
    console.log(slowerTotal);
    if (
      (fasterTotal >= slowerTotal || slowerTotal >= fasterTotal) &&
      fasterTotal != 0 &&
      slowerTotal != 0
    ) {
      return false; // Invalid: "Szybciej niż" is not faster than "Wolniej niż"
    }
    return true; // If fields are set 0 or it won't enter trap, consider valid
  };

  // Add validation on change event for lap time selects
  if (fasterThanMinutes) {
    fasterThanMinutes.addEventListener("change", () => {
      if (!validateLapTimeRange()) {
        alert("Czas 'Szybciej niż' musi być mniejszy niż 'Wolniej niż'.");
        fasterThanMinutes.value = "00";
        fasterThanSeconds.value = "00";
      }
    });
  }
  if (fasterThanSeconds) {
    fasterThanSeconds.addEventListener("change", () => {
      if (!validateLapTimeRange()) {
        alert("Czas 'Szybciej niż' musi być mniejszy niż 'Wolniej niż'.");
        fasterThanMinutes.value = "00";
        fasterThanSeconds.value = "00";
      }
    });
  }
  if (slowerThanMinutes) {
    slowerThanMinutes.addEventListener("change", () => {
      if (!validateLapTimeRange()) {
        alert("Czas 'Wolniej niż' musi być większy niż 'Szybciej niż'.");
        slowerThanMinutes.value = "00";
        slowerThanSeconds.value = "00";
      }
    });
  }
  if (slowerThanSeconds) {
    slowerThanSeconds.addEventListener("change", () => {
      if (!validateLapTimeRange()) {
        alert("Czas 'Wolniej niż' musi być większy niż 'Szybciej niż'.");
        slowerThanMinutes.value = "00";
        slowerThanSeconds.value = "00";
      }
    });
  }

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

  // Add validation on change event for date inputs (triggers when user selects a date)
  if (dateFromFilter) {
    // Call the function, but do not set anything based on the result
    dateFromFilter.addEventListener("change", () => {
      if (!validateDateRange()) {
        alert("Data - od musi być wcześniejsza niż Data - do.");
        dateFromFilter.value = "";
      }
    });
  }

  // Add validation on change event for date inputs (triggers when user selects a date)
  if (dateToFilter) {
    // Call the function, but do not set anything based on the result
    dateToFilter.addEventListener("change", () => {
      if (!validateDateRange()) {
        alert("Data - do musi być późniejsza niż Data - od.");
        dateToFilter.value = "";
      }
    });
  }

  const formatLapTime = (timeString) => {
    const timeParts = timeString.split(":"); // e.g., ["00", "00", "41.76"]
    let formattedTime = "";

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const secondsAndMs = timeParts[2]; // Keep as string to preserve milliseconds

    if (hours > 0) {
      formattedTime = `${hours}:${String(minutes).padStart(
        2,
        "0"
      )}:${secondsAndMs}`;
    } else if (minutes > 0) {
      formattedTime = `${minutes}:${secondsAndMs}`;
    } else {
      formattedTime = secondsAndMs;
    }
    return formattedTime;
  };

  // Function to render table rows
  const renderTable = (laps) => {
    leaderboardTableBody.innerHTML = ""; // Clear existing rows
    currentLapsData = laps; // Store the fetched laps data

    if (laps.length === 0) {
      leaderboardTableBody.innerHTML =
        '<tr><td colspan="8" class="text-center">Brak czasów dla wybranego toru.</td></tr>';
    } else {
      // Define the date formatter once outside the loop for efficiency
      const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      laps.forEach((lap, index) => {
        const row = leaderboardTableBody.insertRow();
        row.insertCell().textContent = index + 1; // Position
        row.insertCell().textContent = formatLapTime(lap.lap_time); // Call the new function
        row.insertCell().textContent = lap.rider_name;
        row.insertCell().textContent = lap.rider_level || MISSING_DATA_TEXT;
        row.insertCell().textContent = lap.validity || MISSING_DATA_TEXT;
        row.insertCell().textContent = lap.motorcycle || MISSING_DATA_TEXT;
        row.insertCell().textContent = lap.tyre_front || MISSING_DATA_TEXT;
        row.insertCell().textContent = lap.tyre_rear || MISSING_DATA_TEXT;
        row.insertCell().textContent =
          dateFormatter.format(new Date(lap.lap_date)) || MISSING_DATA_TEXT; // Use the formatter
      });
    }
    populateFilterAutofillDatalist(); // Update datalist with motorcycles after rendering table
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
      allTrackLapsData = laps; // Store the full unfiltered data for filtering
      renderTable(laps); // Use the render function
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      leaderboardTableBody.innerHTML =
        '<tr><td colspan="8" class="text-center text-danger">Failed to load leaderboard data.</td></tr>';
    }
  });

  // Function to populate the autofill fields
  const populateFilterAutofillDatalist = () => {
    motorcycleSuggestionsDatalist.innerHTML = ""; // Clear existing options
    tyreFrontSuggestionsDatalist.innerHTML = ""; // Clear existing options
    tyreRearSuggestionsDatalist.innerHTML = ""; // Clear existing options

    if (currentLapsData.length > 0) {
      const uniqueMotorcycles = [
        ...new Set(currentLapsData.map((lap) => lap.motorcycle)),
      ].sort(); // Get unique and sort motorcycles
      const uniqueTyresFront = [
        ...new Set(currentLapsData.map((lap) => lap.tyre_front)),
      ].sort(); // Get unique and sort tyres front
      const uniqueTyresRear = [
        ...new Set(currentLapsData.map((lap) => lap.tyre_rear)),
      ].sort(); // Get unique and sort tyres rear

      uniqueMotorcycles.forEach((motorcycle) => {
        if (motorcycle) {
          // Ensure motorcycle name is not null/empty
          const option = document.createElement("option");
          option.value = motorcycle;
          motorcycleSuggestionsDatalist.appendChild(option);
        }
      });

      uniqueTyresFront.forEach((tyre_front) => {
        if (tyre_front) {
          // Ensure motorcycle name is not null/empty
          const option = document.createElement("option");
          option.value = tyre_front;
          tyreFrontSuggestionsDatalist.appendChild(option);
        }
      });

      uniqueTyresRear.forEach((tyre_rear) => {
        if (tyre_rear) {
          // Ensure motorcycle name is not null/empty
          const option = document.createElement("option");
          option.value = tyre_rear;
          tyreRearSuggestionsDatalist.appendChild(option);
        }
      });
    }
  };

  // Initialize Bootstrap Collapse instance
  const bsCollapse = new bootstrap.Collapse(filtersDropdownContainer, {
    toggle: false, // We'll handle toggling via the button click
  });

  // Event listener for the new "Więcej opcji" button
  toggleFiltersDropdownButton.addEventListener("click", () => {
    bsCollapse.toggle(); // Use the toggle method of the instance
  });

  // Listen for Bootstrap collapse events to change button text
  // Listen for Bootstrap collapse events to change button text
  filtersDropdownContainer.addEventListener("show.bs.collapse", () => {
    toggleFiltersDropdownButton.textContent = "Zwiń";
    // Populate datalist when filters are shown, if not already done by initial renderTable
    // if (
    // motorcycleSuggestionsDatalist.options.length === 0 &&
    // currentLapsData.length > 0
    // ) {
    // populateMotorcycleDatalist();
    // }
  });

  filtersDropdownContainer.addEventListener("hide.bs.collapse", () => {
    toggleFiltersDropdownButton.textContent = "Filtry"; // Corrected ID
  });

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
      // Faster than filter (convert to total seconds)
      if (fasterThanMinutes && fasterThanSeconds) {
        const fasterTotal = getTotalSeconds(
          fasterThanMinutes,
          fasterThanSeconds
        );
        if (fasterTotal > 0) {
          const lapTimeParts = lap.lap_time.split(":");
          const lapMin = parseInt(lapTimeParts[0] || 0, 10);
          const lapSec = parseFloat(lapTimeParts[1] || 0);
          const lapTotal = lapMin * 60 + lapSec;
          if (lapTotal >= fasterTotal) return false; // Lap time must be faster (less than)
        }
      }
      // Slower than filter (convert to total seconds)
      if (slowerThanMinutes && slowerThanSeconds) {
        const slowerTotal = getTotalSeconds(
          slowerThanMinutes,
          slowerThanSeconds
        );
        if (slowerTotal > 0) {
          const lapTimeParts = lap.lap_time.split(":");
          const lapMin = parseInt(lapTimeParts[0] || 0, 10);
          const lapSec = parseFloat(lapTimeParts[1] || 0);
          const lapTotal = lapMin * 60 + lapSec;
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
      // Experience checkboxes (at least one must match if any are checked)
      const expChecked = [
        expFreshman,
        expBeginner,
        expMedium,
        expAdvanced,
        expSemipro,
        expProfessional,
      ]
        .filter((cb) => cb && cb.checked)
        .map((cb) => cb.value);
      if (expChecked.length > 0 && !expChecked.includes(lap.rider_level)) {
        return false;
      }
      // Accuracy checkboxes (at least one must match if any are checked)
      const accChecked = [accVeryHigh, accHigh, accMedium, accLow]
        .filter((cb) => cb && cb.checked)
        .map((cb) => cb.value);
      if (accChecked.length > 0 && !accChecked.includes(lap.validity)) {
        return false;
      }
      // Gender radio (must match selected)
      if (sexMale && sexFemale && sexAll) {
        if (sexMale.checked && lap.gender !== "male") return false;
        if (sexFemale.checked && lap.gender !== "female") return false;
        // sexAll.checked means no filter
      }
      return true;
    });
  };

  // Event listener for applying filters
  if (applyFiltersDropdown) {
    applyFiltersDropdown.addEventListener("click", () => {
      const filteredLaps = filterLaps(allTrackLapsData); // Filter from the full unfiltered data
      renderTable(filteredLaps);
    });
  }
});
