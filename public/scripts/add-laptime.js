document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. VARIABLES DECLARATION
  // ==========================================

  // --- Main Form Elements ---
  const addLaptimeForm = document.getElementById("addLaptimeForm");
  const trackSelect = document.getElementById("trackSelect");
  const deviceSelect = document.getElementById("deviceSelect");
  const submitButton = addLaptimeForm.querySelector('button[type="submit"]');
  
  // --- Conditional Fields (Device/YouTube) ---
  const deviceRecordedLapContainer = document.getElementById("deviceRecordedLapContainer");
  const deviceRecordedLap = document.getElementById("deviceRecordedLap");
  
  // --- Motorcycle Fields ---
  const motorcycleSelect = document.getElementById("motorcycle");
  const motorcycleManual = document.getElementById("motorcycleManual");
  const noMotorcycleCheckbox = document.getElementById("noMotorcycleOnList");

  // --- Tyre Fields ---
  const tyreFrontSelect = document.getElementById("tyreFront");
  const tyreFrontManual = document.getElementById("tyreFrontManual");
  const noTyreFrontCheckbox = document.getElementById("noTyreFrontOnList");

  const tyreRearSelect = document.getElementById("tyreRear");
  const tyreRearManual = document.getElementById("tyreRearManual");
  const noTyreRearCheckbox = document.getElementById("noTyreRearOnList");

  // --- Success View Elements ---
  const successContainer = document.getElementById("successContainer");
  const addAnotherBtn = document.getElementById("addAnotherBtn");
  const formHeader = document.getElementById("formHeader");

  // --- Global References ---
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today for validation

  // List of all inputs that should be locked until a track is selected
  const controlsToToggle = addLaptimeForm.querySelectorAll(
    "input:not(#trackSelect), select:not(#trackSelect), button:not(#trackSelect)"
  );

  if (!trackSelect || !addLaptimeForm) {
    console.error("Required form elements not found.");
    return;
  }

  // ==========================================
  // 2. HELPER FUNCTIONS
  // ==========================================

  /**
   * Populates a <select> element with options from an array.
   */
  const populateSelect = (selectId, dataArray, key, defaultText = "-- Wybierz --") => {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = `<option value="">${defaultText}</option>`;
    if (dataArray && Array.isArray(dataArray)) {
      dataArray.forEach((item) => {
        if (item[key]) {
          const option = document.createElement("option");
          option.value = item[key];
          option.textContent = item[key];
          select.appendChild(option);
        }
      });
    }
  };

  /**
   * Fetches data from an API and populates a select dropdown.
   */
  const fetchAndPopulateSelect = async (url, selectId, key, defaultText) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      populateSelect(selectId, data, key, defaultText);
    } catch (error) {
      console.error(`Error fetching data for ${selectId}:`, error);
    }
  };

  /**
   * Sets up the toggle logic for "Not on list" checkboxes.
   */
  const setupManualToggle = (checkbox, select, manual) => {
    if (!checkbox) return;
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        select.style.display = "none";
        select.value = "";
        select.required = false;
        manual.style.display = "block";
        manual.disabled = false;
        if (select.hasAttribute('required')) manual.required = true;
        manual.focus();
      } else {
        select.style.display = "block";
        if (manual.hasAttribute('required')) select.required = true;
        manual.style.display = "none";
        manual.required = false;
        manual.value = "";
      }
      validateForm();
    });
  };

  /**
   * Enables or disables form controls based on track selection.
   */
  const toggleFormControls = (unlocked) => {
    controlsToToggle.forEach((field) => {
      field.disabled = !unlocked;
    });
    
    // Handle checkboxes and manual inputs
    [noMotorcycleCheckbox, noTyreFrontCheckbox, noTyreRearCheckbox].forEach(cb => {
      if (cb) cb.disabled = !unlocked;
    });

    if (unlocked) {
      if (noMotorcycleCheckbox?.checked) motorcycleManual.disabled = false;
      if (noTyreFrontCheckbox?.checked) tyreFrontManual.disabled = false;
      if (noTyreRearCheckbox?.checked) tyreRearManual.disabled = false;
      validateForm();
    } else {
      [motorcycleManual, tyreFrontManual, tyreRearManual].forEach(m => {
        if (m) m.disabled = true;
      });
      submitButton.disabled = true;
    }
  };

  /**
   * Validates all required fields and specific patterns.
   */
  const validateForm = () => {
    const proofImage = document.getElementById("proofImage");
    const proofImageBadge = proofImage?.parentElement.querySelector(".badge");
    
    // Conditional Requirement for Image Upload
    if (deviceRecordedLap && proofImage) {
        if (deviceRecordedLap.value.trim() === "") {
          proofImage.required = true;
          if (proofImageBadge) {
            proofImageBadge.textContent = "Wymagane";
            proofImageBadge.classList.replace("bg-secondary", "bg-danger");
          }
        } else {
          proofImage.required = false;
          if (proofImageBadge) {
            proofImageBadge.textContent = "Opcjonalne";
            proofImageBadge.classList.replace("bg-danger", "bg-secondary");
          }
        }
    }

    const requiredFields = addLaptimeForm.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) isValid = false;
      
      // Lap Time Pattern (MM:SS.mmm, SS.mmm, or SS)
      if (field.id === "lapTime" && field.value) {
        const pattern = /^([0-5]?\d:)?([0-5]?\d)(\.\d{1,3})?$/;
        if (!pattern.test(field.value)) isValid = false;
      }

      // Date Validation (No future dates)
      if (field.id === "lapDate" && field.value) {
        const selectedDate = new Date(field.value);
        if (selectedDate > today) isValid = false;
      }
    });

    submitButton.disabled = !isValid;
    return isValid;
  };

  // ==========================================
  // 3. EVENT LISTENERS & INITIALIZATION
  // ==========================================

  // --- Initialize Toggles ---
  setupManualToggle(noMotorcycleCheckbox, motorcycleSelect, motorcycleManual);
  setupManualToggle(noTyreFrontCheckbox, tyreFrontSelect, tyreFrontManual);
  setupManualToggle(noTyreRearCheckbox, tyreRearSelect, tyreRearManual);

  // --- Form Validation Listeners ---
  addLaptimeForm.addEventListener("input", validateForm);
  
  if (deviceRecordedLap) {
    deviceRecordedLap.addEventListener("input", validateForm);
  }

  if (lapDate) {
    lapDate.addEventListener("change", () => {
      if (new Date(lapDate.value) > today) {
        alert("Data nie może być z przyszłości!");
        lapDate.value = "";
        validateForm();
      }
    });
  }

  // --- Track Selection Logic ---
  trackSelect.addEventListener("change", async () => {
    if (trackSelect.value !== "") {
      toggleFormControls(true);

      await Promise.all([
        fetchAndPopulateSelect("/add-laptime/api/motorcycles", "motorcycle", "motorcycle_name", "-- Wybierz motocykl --"),
        fetchAndPopulateSelect("/add-laptime/api/tyres/front", "tyreFront", "tyre_name", "-- Wybierz oponę (przód) --"),
        fetchAndPopulateSelect("/add-laptime/api/tyres/rear", "tyreRear", "tyre_name", "-- Wybierz oponę (tył) --"),
        fetchAndPopulateSelect(`/add-laptime/api/riders/${encodeURIComponent(trackSelect.value)}`, "riderName", "rider_name", "-- Wybierz zawodnika --"),
        fetchAndPopulateSelect(`/add-laptime/api/organizers/${encodeURIComponent(trackSelect.value)}`, "organizerList", "organizer_name", "-- Wybierz organizatora --")
      ]);
    } else {
      toggleFormControls(false);
      ["motorcycle", "tyreFront", "tyreRear", "riderName", "organizerList"].forEach(id => populateSelect(id, [], "", "-- Wybierz --"));
    }
  });

  // --- Device Selection Logic ---
  deviceSelect.addEventListener("change", () => {
    if (deviceSelect.value !== "" && deviceSelect.value !== "-- Wybierz urządzenie --") {
      if (devicesWithExternalRecord.includes(deviceSelect.value)) {
        deviceRecordedLapContainer.style.display = "block";
        deviceRecordedLap.disabled = false;
      } else {
        deviceRecordedLapContainer.style.display = "none";
        deviceRecordedLap.disabled = true;
        deviceRecordedLap.value = "";
      }
    }
    validateForm();
  });

  // --- Form Submission ---
  addLaptimeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData(addLaptimeForm);

    // NEW: Logic to pick values from either Select or Manual input
    if (noMotorcycleCheckbox?.checked) {
      formData.set('motorcycle', motorcycleManual.value.trim());
    }
    
    if (noTyreFrontCheckbox?.checked) {
      formData.set('tyreFront', tyreFrontManual.value.trim());
    }

    if (noTyreRearCheckbox?.checked) {
      formData.set('tyreRear', tyreRearManual.value.trim());
    }
    
    try {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Wysyłanie...';

      const response = await fetch('/add-laptime/api', { method: 'POST', body: formData });
      const result = await response.json();

      if (result.success) {
        addLaptimeForm.style.display = "none";
        if (formHeader) formHeader.style.display = "none";
        successContainer.style.display = "block";
        window.scrollTo(0, 0);
      } else {
        alert(`Błąd: ${result.message}`);
        submitButton.disabled = false;
        submitButton.textContent = 'Dodaj Czas';
      }
    } catch (error) {
      console.error('Submission error:', error);
      submitButton.disabled = false;
      submitButton.textContent = 'Dodaj Czas';
    }
  });

  // --- Success View Reset ---
  if (addAnotherBtn) {
    addAnotherBtn.addEventListener("click", () => {
      addLaptimeForm.reset();
      successContainer.style.display = "none";
      addLaptimeForm.style.display = "block";
      if (formHeader) formHeader.style.display = "block";
      submitButton.textContent = 'Dodaj Czas';
      toggleFormControls(false);
      window.scrollTo(0, 0);
    });
  }

  // Initial State
  toggleFormControls(false);

}); // End of DOMContentLoaded
