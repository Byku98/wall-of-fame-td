import { 
  convertMysqlToDate, 
  convertDateToMySQL, 
  formatLapTime, 
  parseFlexibleTime 
} from "./utils.js";
import { translate } from "./translations.js";

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. VARIABLES DECLARATION
  // ==========================================

  // --- Main Table Elements ---
  const trackSelect = document.getElementById("trackSelect");
  const filterButton = document.getElementById("filterLeaderboard");
  const leaderboardTableBody = document.getElementById("leaderboardTableBody");

  // --- Filter Dropdown Elements ---
  const toggleFiltersBtn = document.getElementById("toggleFiltersDropdown");
  const filtersContainer = document.getElementById("filtersDropdownContainer");
  const applyFiltersBtn = document.getElementById("applyFiltersDropdown");
  const clearFiltersBtn = document.getElementById("clearFiltersDropdown");
  
  // --- Time Filters ---
  const fasterThanInput = document.getElementById("fasterThanInput");
  const slowerThanInput = document.getElementById("slowerThanInput");
  const clearFiltersFasterThan = document.getElementById("clearFiltersFasterThan");
  const clearFiltersSlowerThan = document.getElementById("clearFiltersSlowerThan");

  // --- Virtual Lap Elements ---
  const virtualLapBtn = document.getElementById("virtualLapTime");
  const virtualContainer = document.getElementById("virtualLapTimeContainer");
  const virtualInput = document.getElementById("virtualLapInput");
  const applyVirtualBtn = document.getElementById("applyVirtualLaptime");
  const clearVirtualBtn = document.getElementById("clearVirtualLaptime");

  // --- Autocomplete & Date Inputs ---
  const motorcycleFilter = document.getElementById("motorcycleNameFilter");
  const tyreFrontFilter = document.getElementById("tyreFrontFilter");
  const tyreRearFilter = document.getElementById("tyreRearFilter");
  const dateFrom = document.getElementById("dateFromFilter");
  const dateTo = document.getElementById("dateToFilter");
  const clearFiltersDateFrom = document.getElementById("clearFiltersDateFrom");
  const clearFiltersDateTo = document.getElementById("clearFiltersDateTo");

  // --- Checkboxes & Radios ---
  const expCheckboxes = [
    "expFreshman", "expBeginner", "expMedium", "expAdvanced", "expSemipro", "expProfessional"
  ].map(id => document.getElementById(id));

  const sexRadios = {
    male: document.getElementById("sexMale"),
    female: document.getElementById("sexFemale"),
    all: document.getElementById("sexAll")
  };

  // --- State ---
  let allTrackLapsData = [];
  const MISSING_DATA_TEXT = "Brak danych";

  // ==========================================
  // 2. HELPER FUNCTIONS
  // ==========================================

  /**
   * Converts time string to total seconds.
   */
  const getTotalSeconds = (input) => {
    if (!input || typeof input !== "string") return 0;
    const parts = input.split(":");
    const h = parseInt(parts[0] || 0, 10);
    const m = parseInt(parts[1] || 0, 10);
    const s = parseFloat(parts[2] || 0);
    return h * 3600 + m * 60 + s;
  };

  /**
   * Validates that 'from' date is before 'to' date.
   */
  const validateDateRange = () => {
    if (!dateFrom?.value || !dateTo?.value) return true;
    return new Date(dateFrom.value) < new Date(dateTo.value);
  };

  /**
   * Validates that 'faster' time is actually faster (smaller) than 'slower' time.
   * This means the 'fasterThanInput' (upper bound) should be a numerically larger time
   * than 'slowerThanInput' (lower bound) if both are used to define a range.
   */
  const validateLapTimeRange = () => {
    const fasterRaw = fasterThanInput?.value.trim(); // This is the upper bound (e.g., 50s)
    const slowerRaw = slowerThanInput?.value.trim(); // This is the lower bound (e.g., 45s)

    if (!fasterRaw || !slowerRaw) return true; // If only one or none are set, no conflict

    const fasterLimitSec = getTotalSeconds(parseFlexibleTime(fasterRaw)); // e.g., 50
    const slowerLimitSec = getTotalSeconds(parseFlexibleTime(slowerRaw)); // e.g., 45

    // If both are set, the "faster than" limit (upper bound) must be numerically greater
    // than the "slower than" limit (lower bound) to define a valid range.
    // For example, "faster than 50s" AND "slower than 45s" is a valid range (45s < lap < 50s).
    // If fasterLimitSec is 0, it means the input was invalid or empty, so we don't validate against it.
    if (fasterLimitSec > 0 && slowerLimitSec > 0 && slowerLimitSec >= fasterLimitSec) {
      return false; // Invalid range: "slower than X" is not faster than "faster than Y"
    }
    return true;
  };

  /**
   * Populates datalists for motorcycle and tyre filters based on current table data.
   */
  const populateFilterDatalists = () => {
    const updateList = (id, key) => {
      const dl = document.getElementById(id);
      if (!dl) return;
      dl.innerHTML = "";
      [...new Set(allTrackLapsData.map(l => l[key]))].sort().forEach(val => {
        if (val) {
          const option = document.createElement("option");
          option.value = val;
          dl.appendChild(option);
        }
      });
    };
    updateList("motorcycleSuggestions", "motorcycle");
    updateList("tyreFrontSuggestions", "tyre_front");
    updateList("tyreRearSuggestions", "tyre_rear");
  };

  /**
   * Renders the leaderboard table rows.
   */
  const renderTable = (laps) => {
    leaderboardTableBody.innerHTML = laps.length === 0 
      ? '<tr><td colspan="9" class="text-center">Brak czasów dla wybranego toru.</td></tr>' // Adjusted colspan
      : "";

    laps.forEach((lap, index) => {
      const row = leaderboardTableBody.insertRow();
      row.className = lap.isVirtual ? "virtual-lap-row" : "";
      
      // Set Data Attributes
      row.dataset.lapTime = lap.lap_time || "";
      row.dataset.riderName = lap.rider_name || "";
      row.dataset.organiserName = lap.organiser_name || ""; // Add organiser_name to dataset
      row.dataset.motorcycle = lap.motorcycle || "";
      row.dataset.lapDate = lap.isVirtual ? "" : convertMysqlToDate(lap.lap_date);
      row.dataset.sex = lap.sex_name || "";
      // row.dataset.riderLevel = lap.rider_level || ""; // Not needed for now
      row.dataset.tyreFront = lap.tyre_front || "";
      row.dataset.tyreRear = lap.tyre_rear || "";

      // Cells
      row.insertCell().textContent = index + 1;
      row.insertCell().textContent = formatLapTime(lap.lap_time) || MISSING_DATA_TEXT;
      row.insertCell().textContent = lap.isVirtual ? "Twój czas" : (lap.rider_name || MISSING_DATA_TEXT);
      row.insertCell().textContent = lap.isVirtual ? "" : (lap.organizer_name || MISSING_DATA_TEXT); // Add organiser cell
      // row.insertCell().textContent = lap.isVirtual ? "" : (translate("rider_level", lap.rider_level) || MISSING_DATA_TEXT); // Not needed for now
      row.insertCell().textContent = lap.isVirtual ? "" : (lap.motorcycle || MISSING_DATA_TEXT);
      row.insertCell().textContent = lap.isVirtual ? "" : (lap.tyre_front || MISSING_DATA_TEXT);
      row.insertCell().textContent = lap.isVirtual ? "" : (lap.tyre_rear || MISSING_DATA_TEXT);
      row.insertCell().textContent = lap.isVirtual ? "" : convertMysqlToDate(lap.lap_date);
    });
    populateFilterDatalists();
  };

  /**
   * Filters visible table rows based on UI inputs.
   */
  const filterTableRows = () => {
    const rows = leaderboardTableBody.querySelectorAll("tr");
    // const expChecked = expCheckboxes.filter(cb => cb?.checked).map(cb => cb.value.toLowerCase()); // Not needed for now

    const fasterLimit = fasterThanInput?.value ? getTotalSeconds(parseFlexibleTime(fasterThanInput.value)) : 0;
    const slowerLimit = slowerThanInput?.value ? getTotalSeconds(parseFlexibleTime(slowerThanInput.value)) : 0;

    rows.forEach(row => {
      if (row.cells.length === 0) return;
      let show = true;

      const d = row.dataset;
      const lapSec = getTotalSeconds(d.lapTime);

      // Corrected logic for filtering times
      // If fasterLimit is set, hide laps that are NOT faster than it (i.e., lapSec >= fasterLimit)
      if (fasterLimit > 0 && lapSec >= fasterLimit) show = false;
      // If slowerLimit is set, hide laps that are NOT slower than it (i.e., lapSec <= slowerLimit)
      if (slowerLimit > 0 && lapSec <= slowerLimit) show = false;

      if (motorcycleFilter?.value && !d.motorcycle.toLowerCase().includes(motorcycleFilter.value.toLowerCase())) show = false;
      if (tyreFrontFilter?.value && !d.tyreFront.toLowerCase().includes(tyreFrontFilter.value.toLowerCase())) show = false;
      if (tyreRearFilter?.value && !d.tyreRear.toLowerCase().includes(tyreRearFilter.value.toLowerCase())) show = false;
      
      if (dateFrom?.value && new Date(d.lapDate.split(".").reverse().join("-")) < new Date(dateFrom.value)) show = false;
      if (dateTo?.value && new Date(d.lapDate.split(".").reverse().join("-")) > new Date(dateTo.value)) show = false;

      // if (expChecked.length > 0 && !expChecked.includes(d.riderLevel.toLowerCase())) show = false; // Not needed for now

      if (sexRadios.male?.checked && d.sex.toLowerCase() !== "male") show = false;
      if (sexRadios.female?.checked && d.sex.toLowerCase() !== "female") show = false;

      row.style.display = show ? "" : "none";
    });
  };

  // ==========================================
  // 3. EVENT LISTENERS
  // ==========================================

  // --- Data Fetching ---
  filterButton?.addEventListener("click", async () => {
    if (!trackSelect.value) return;
    try {
      const res = await fetch(`/leaderboard/filter?trackName=${encodeURIComponent(trackSelect.value)}`);
      allTrackLapsData = await res.json();
      renderTable(allTrackLapsData);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  });

  // --- Filter Controls ---
  applyFiltersBtn?.addEventListener("click", () => {
    if (!validateDateRange()) return alert("Błędny zakres dat.");
    if (!validateLapTimeRange()) return alert("Błędny zakres czasu.");
    filterTableRows();
  });

  clearFiltersBtn?.addEventListener("click", () => {
    filtersContainer.querySelectorAll("input").forEach(i => i.type === "checkbox" ? i.checked = false : i.value = "");
    if (sexRadios.all) sexRadios.all.checked = true;
    filterTableRows();
  });

  clearFiltersFasterThan?.addEventListener("click", () => {
    if (fasterThanInput) fasterThanInput.value = "";
    filterTableRows();
  });

  clearFiltersSlowerThan?.addEventListener("click", () => {
    if (slowerThanInput) slowerThanInput.value = "";
    filterTableRows();
  });

  clearFiltersDateFrom?.addEventListener("click", () => {
    if (dateFrom) dateFrom.value = "";
    filterTableRows();
  });

  clearFiltersDateTo?.addEventListener("click", () => {
    if (dateTo) dateTo.value = "";
    filterTableRows();
  });

  // --- Virtual Lap ---
  applyVirtualBtn?.addEventListener("click", () => {
    const rawValue = virtualInput.value.trim();
    const formattedTime = parseFlexibleTime(rawValue);
    
    if (formattedTime === "00:00:00.000") {
      alert("Wprowadź prawidłowy format czasu.");
      return;
    }

    allTrackLapsData = allTrackLapsData.filter(l => !l.isVirtual);
    allTrackLapsData.push({ lap_time: formattedTime, isVirtual: true });
    allTrackLapsData.sort((a, b) => getTotalSeconds(a.lap_time) - getTotalSeconds(b.lap_time));
    
    renderTable(allTrackLapsData);
    document.querySelector(".virtual-lap-row")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  clearVirtualBtn?.addEventListener("click", () => {
    if (virtualInput) virtualInput.value = "";
    allTrackLapsData = allTrackLapsData.filter(l => !l.isVirtual);
    renderTable(allTrackLapsData);
  });

  // --- Navigation ---
  leaderboardTableBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row || row.rowIndex === 0 || row.classList.contains("virtual-lap-row")) return;
    
    const d = row.dataset;
    const url = `/lap-details/${encodeURIComponent(d.lapTime)}/${encodeURIComponent(d.riderName)}/${encodeURIComponent(d.motorcycle)}/${encodeURIComponent(convertDateToMySQL(d.lapDate))}/${encodeURIComponent(trackSelect.value)}`;
    window.location.href = url;
  });

  // --- UI Toggles ---
  const filterCollapse = new bootstrap.Collapse(filtersContainer, { toggle: false });
  const virtualCollapse = new bootstrap.Collapse(virtualContainer, { toggle: false });

  toggleFiltersBtn?.addEventListener("click", () => { filterCollapse.toggle(); virtualCollapse.hide(); });
  virtualLapBtn?.addEventListener("click", () => { virtualCollapse.toggle(); filterCollapse.hide(); });

});
