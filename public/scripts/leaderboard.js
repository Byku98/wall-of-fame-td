import { convertMysqlToDate, convertDateToMySQL, formatLapTime } from "./utils.js";
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
  const fasterThanInput = document.getElementById("fasterThanInput");
  const slowerThanInput = document.getElementById("slowerThanInput");
  const clearFiltersFasterThan = document.getElementById("clearFiltersFasterThan"); // NEW
  const clearFiltersSlowerThan = document.getElementById("clearFiltersSlowerThan"); // NEW

  // --- Virtual Lap Elements ---
  const virtualLapBtn = document.getElementById("virtualLapTime");
  const virtualContainer = document.getElementById("virtualLapTimeContainer");
  const virtualInput = document.getElementById("virtualLapInput"); // UPDATED
  const applyVirtualBtn = document.getElementById("applyVirtualLaptime");
  const clearVirtualBtn = document.getElementById("clearVirtualLaptime");

  // --- Autocomplete & Inputs ---
  const motorcycleFilter = document.getElementById("motorcycleNameFilter");
  const tyreFrontFilter = document.getElementById("tyreFrontFilter");
  const tyreRearFilter = document.getElementById("tyreRearFilter");
  const dateFrom = document.getElementById("dateFromFilter");
  const dateTo = document.getElementById("dateToFilter");
  const clearFiltersDateFrom = document.getElementById("clearFiltersDateFrom"); // NEW
  const clearFiltersDateTo = document.getElementById("clearFiltersDateTo");     // NEW

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
   * Converts time string or DOM elements to total seconds.
   */
  const getTotalSeconds = (input) => {
    if (typeof input === "string") {
      const parts = input.split(":");
      const h = parseInt(parts[0] || 0, 10);
      const m = parseInt(parts[1] || 0, 10);
      const s = parseFloat(parts[2] || 0);
      return h * 3600 + m * 60 + s;
    } else if (Array.isArray(input) && input.length === 2) {
      const m = parseInt(input[0]?.value || 0, 10);
      const s = parseInt(input[1]?.value || 0, 10);
      return m * 60 + s;
    }
    return 0;
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
   */
  const validateLapTimeRange = () => {
    const fasterRaw = fasterThanInput?.value.trim();
    const slowerRaw = slowerThanInput?.value.trim();

    if (!fasterRaw || !slowerRaw) return true;

    const faster = getTotalSeconds(formatToHHMMSS(fasterRaw));
    const slower = getTotalSeconds(formatToHHMMSS(slowerRaw));

    if (faster > 0 && slower > 0 && faster <= slower) return false;
    return true;
  };

  /**
   * Helper to ensure time string is in HH:MM:SS.mmm format for getTotalSeconds.
   */
  const formatToHHMMSS = (raw) => {
    if (!raw) return "00:00:00";
    let formatted = raw;
    if (formatted.includes(':')) {
      const colonCount = (formatted.match(/:/g) || []).length;
      if (colonCount === 1) formatted = `00:${formatted}`;
    } else {
      formatted = `00:00:${formatted}`;
    }
    return formatted;
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
        if (val) dl.innerHTML += `<option value="${val}">`;
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
      ? '<tr><td colspan="8" class="text-center">Brak czasów dla wybranego toru.</td></tr>'
      : "";

    laps.forEach((lap, index) => {
      const row = leaderboardTableBody.insertRow();
      row.className = lap.isVirtual ? "virtual-lap-row" : "";
      
      // Set Data Attributes
      row.dataset.lapTime = lap.lap_time || "";
      row.dataset.riderName = lap.rider_name || "";
      row.dataset.motorcycle = lap.motorcycle || "";
      row.dataset.lapDate = lap.isVirtual ? "" : convertMysqlToDate(lap.lap_date);
      row.dataset.sex = lap.sex_name || "";
      row.dataset.riderLevel = lap.rider_level || "";
      row.dataset.tyreFront = lap.tyre_front || "";
      row.dataset.tyreRear = lap.tyre_rear || "";

      // Cells
      row.insertCell().textContent = index + 1;
      row.insertCell().textContent = formatLapTime(lap.lap_time) || MISSING_DATA_TEXT;
      row.insertCell().textContent = lap.isVirtual ? "Twój czas" : (lap.rider_name || MISSING_DATA_TEXT);
      row.insertCell().textContent = lap.isVirtual ? "" : (translate("rider_level", lap.rider_level) || MISSING_DATA_TEXT);
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
    const expChecked = expCheckboxes.filter(cb => cb?.checked).map(cb => cb.value.toLowerCase());

    // Pre-calculate limits
    const fasterLimit = fasterThanInput?.value ? getTotalSeconds(formatToHHMMSS(fasterThanInput.value)) : 0;
    const slowerLimit = slowerThanInput?.value ? getTotalSeconds(formatToHHMMSS(slowerThanInput.value)) : 0;

    rows.forEach(row => {
      if (row.cells.length === 0) return;
      let show = true;

      const d = row.dataset;
      const lapSec = getTotalSeconds(d.lapTime);

      // Faster than filter
      if (fasterLimit > 0 && lapSec >= fasterLimit) show = false;

      // Slower than filter
      if (slowerLimit > 0 && lapSec <= slowerLimit) show = false;

      if (motorcycleFilter?.value && !d.motorcycle.toLowerCase().includes(motorcycleFilter.value.toLowerCase())) show = false;
      if (tyreFrontFilter?.value && !d.tyreFront.toLowerCase().includes(tyreFrontFilter.value.toLowerCase())) show = false;
      if (tyreRearFilter?.value && !d.tyreRear.toLowerCase().includes(tyreRearFilter.value.toLowerCase())) show = false;
      
      if (dateFrom?.value && new Date(d.lapDate.split(".").reverse().join("-")) < new Date(dateFrom.value)) show = false;
      if (dateTo?.value && new Date(d.lapDate.split(".").reverse().join("-")) > new Date(dateTo.value)) show = false;

      if (expChecked.length > 0 && !expChecked.includes(d.riderLevel.toLowerCase())) show = false;

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
    // Clear all filter inputs except trackSelect
    filtersContainer.querySelectorAll("input").forEach(i => {
      if (i.type === "checkbox") {
        i.checked = false;
      } else {
        i.value = "";
      }
    });
    if (sexRadios.all) sexRadios.all.checked = true;
    filterTableRows(); // Re-apply filters (shows all rows)
  });

  // NEW: Event listeners for individual clear buttons
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
    
    // Validate format using the same regex as the form
    const pattern = /^([0-5]?\d:)?([0-5]?\d)(\.\d{1,3})?$/;
    if (!pattern.test(rawValue)) {
      alert("Wprowadź prawidłowy format czasu (np. 1:05.12 lub 45).");
      return;
    }

    // Format the time to HH:MM:SS.mmm for consistent sorting/display
    let formattedTime = rawValue;
    if (formattedTime.includes(':')) {
      const colonCount = (formattedTime.match(/:/g) || []).length;
      if (colonCount === 1) formattedTime = `00:${formattedTime}`;
    } else {
      formattedTime = `00:00:${formattedTime}`;
    }

    // Remove existing virtual lap if present
    allTrackLapsData = allTrackLapsData.filter(l => !l.isVirtual);
    
    // Add new virtual lap
    allTrackLapsData.push({ lap_time: formattedTime, isVirtual: true });
    
    // Sort by lap time (fastest first)
    allTrackLapsData.sort((a, b) => getTotalSeconds(a.lap_time) - getTotalSeconds(b.lap_time));
    
    renderTable(allTrackLapsData);
    document.querySelector(".virtual-lap-row")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  clearVirtualBtn?.addEventListener("click", () => {
    if (virtualInput) virtualInput.value = ""; // UPDATED
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
