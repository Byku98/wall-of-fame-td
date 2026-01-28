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

  // --- Virtual Lap Elements ---
  const virtualLapBtn = document.getElementById("virtualLapTime");
  const virtualContainer = document.getElementById("virtualLapTimeContainer");
  const virtualMin = document.getElementById("virtualMinutes");
  const virtualSec = document.getElementById("virtualSeconds");
  const virtualMs = document.getElementById("virtualMiliSeconds");
  const applyVirtualBtn = document.getElementById("applyVirtualLaptime");
  const clearVirtualBtn = document.getElementById("clearVirtualLaptime");

  // --- Autocomplete & Inputs ---
  const motorcycleFilter = document.getElementById("motorcycleNameFilter");
  const tyreFrontFilter = document.getElementById("tyreFrontFilter");
  const tyreRearFilter = document.getElementById("tyreRearFilter");
  const dateFrom = document.getElementById("dateFromFilter");
  const dateTo = document.getElementById("dateToFilter");

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
    const faster = getTotalSeconds([document.getElementById("fasterThanMinutes"), document.getElementById("fasterThanSeconds")]);
    const slower = getTotalSeconds([document.getElementById("slowerThanMinutes"), document.getElementById("slowerThanSeconds")]);
    if (faster > 0 && slower > 0 && faster >= slower) return false;
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

    rows.forEach(row => {
      if (row.cells.length === 0) return;
      let show = true;

      const d = row.dataset;
      const lapSec = getTotalSeconds(d.lapTime);

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
    filtersContainer.querySelectorAll("input").forEach(i => i.type === "checkbox" ? i.checked = false : i.value = "");
    if (sexRadios.all) sexRadios.all.checked = true;
    leaderboardTableBody.querySelectorAll("tr").forEach(r => r.style.display = "");
  });

  // --- Virtual Lap ---
  applyVirtualBtn?.addEventListener("click", () => {
    const time = `00:${virtualMin.value}:${virtualSec.value}.${virtualMs.value}`;
    allTrackLapsData = allTrackLapsData.filter(l => !l.isVirtual);
    allTrackLapsData.push({ lap_time: time, isVirtual: true });
    allTrackLapsData.sort((a, b) => getTotalSeconds(a.lap_time) - getTotalSeconds(b.lap_time));
    renderTable(allTrackLapsData);
    document.querySelector(".virtual-lap-row")?.scrollIntoView({ behavior: "smooth", block: "center" });
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
