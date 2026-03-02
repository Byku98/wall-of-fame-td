import { parseFlexibleTime } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. VARIABLES DECLARATION
  // ==========================================

  // --- Global References ---
  const addLaptimeForm = document.getElementById("addLaptimeForm");
  const trackSelect = document.getElementById("trackSelect");
  const submitButton = document.getElementById("submitButton");
  const successContainer = document.getElementById("successContainer");
  const formHeader = document.getElementById("formHeader");

  // Manual input fields
  const motorcycleSelect = document.getElementById("motorcycle");
  const noMotorcycleCheckbox = document.getElementById("noMotorcycleOnList");
  const motorcycleManualGroup = document.getElementById("motorcycleManualGroup");
  const motorcycleNameManual = document.getElementById("motorcycleNameManual");
  const motorcycleYearManual = document.getElementById("motorcycleYearManual");
  const motorcycleTypeManual = document.getElementById("motorcycleTypeManual");

  const tyreFrontSelect = document.getElementById("tyreFront");
  const noTyreFrontCheckbox = document.getElementById("noTyreFrontOnList");
  const tyreFrontManual = document.getElementById("tyreFrontManual");

  const tyreRearSelect = document.getElementById("tyreRear");
  const noTyreRearCheckbox = document.getElementById("noTyreRearOnList");
  const tyreRearManual = document.getElementById("tyreRearManual");

  const riderSelect = document.getElementById("riderName");
  const noRiderOnListCheckbox = document.getElementById("noRiderOnList");
  const riderManualGroup = document.getElementById("riderManualGroup");
  const riderNameManual = document.getElementById("riderNameManual");
  const riderSexMaleManual = document.getElementById("riderSexMaleManual");
  const riderSexFemaleManual = document.getElementById("riderSexFemaleManual");
  const riderInstagramManual = document.getElementById("riderInstagramManual");
  const riderFacebookManual = document.getElementById("riderFacebookManual");

  const deviceSelect = document.getElementById("device");
  const deviceRecordedLapContainer = document.getElementById("deviceRecordedLapContainer");
  const deviceRecordedLap = document.getElementById("deviceRecordedLap");

  const socialProfileInput = document.getElementById("socialProfile"); // Assuming this is the social profile for the submitter

  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today for validation

  let currentRiderNames = []; // To store current rider names for validation

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
    
    // FIX: Store rider names for validation when the rider list is loaded
    if (selectId === "riderName" && dataArray) {
      currentRiderNames = dataArray.map(item => item[key].toLowerCase());
    }

    if (dataArray && Array.isArray(dataArray)) {
      dataArray.forEach((item) => {
        let value = item[key];
        let text = item[key];

        // NEW: Special handling for motorcycle formatting (Motorcycle - Year)
        if (selectId === "motorcycle" && item.motorcycle_name) {
          text = item.year ? `${item.motorcycle_name} - ${item.year}` : item.motorcycle_name;
          value = text;
        }

        if (text) {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = text;
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
      console.log(`Fetching data from: ${url} for ${selectId}`); // Debug log
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(`Data received for ${selectId}:`, data); // Debug log
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
      if (field) field.disabled = !unlocked;
    });
    
    // Handle checkboxes
    [noMotorcycleCheckbox, noTyreFrontCheckbox, noTyreRearCheckbox, noRiderOnListCheckbox]
      .forEach(cb => { if (cb) cb.disabled = !unlocked; });

    // Handle manual inputs based on checkbox state
    if (unlocked) {
      // Motorcycle group
      const isMotorcycleManual = noMotorcycleCheckbox?.checked;
      [motorcycleNameManual, motorcycleYearManual, motorcycleTypeManual].forEach(input => {
        if (input) input.disabled = !isMotorcycleManual;
      });

      if (noTyreFrontCheckbox?.checked && tyreFrontManual) tyreFrontManual.disabled = false;
      if (noTyreRearCheckbox?.checked && tyreRearManual) tyreRearManual.disabled = false;

      // new‑rider manual inputs
      if (noRiderOnListCheckbox?.checked) {
        [riderNameManual, riderSexMaleManual, riderSexFemaleManual,
         riderInstagramManual, riderFacebookManual].forEach(i => {
           if (i) i.disabled = false;
        });
      }

      if (socialProfileInput) socialProfileInput.disabled = false;
      validateForm();
    } else {
      [motorcycleNameManual, motorcycleYearManual, motorcycleTypeManual,
       tyreFrontManual, tyreRearManual, socialProfileInput,
       riderNameManual, riderSexMaleManual, riderSexFemaleManual,
       riderInstagramManual, riderFacebookManual].forEach(m => {
         if (m) m.disabled = true;
      });
      if (submitButton) submitButton.disabled = true;
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
      // Skip validation for hidden/disabled fields (like the dropdown when manual is active)
      if (field.offsetParent === null || field.disabled) return;

      if (!field.value.trim()) isValid = false;
      
      // UPDATED: Flexible Lap Time Pattern
      // Allows digits and any separators. The parser will handle the rest.
      if (field.id === "lapTime" && field.value) {
        const flexiblePattern = /^[\d\\s.,:]+$/; 
        if (!flexiblePattern.test(field.value)) isValid = false;
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
  setupManualToggle(noMotorcycleCheckbox, motorcycleSelect, motorcycleManualGroup);
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
    console.log("Track selection changed to:", trackSelect.value); // Debug log
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
      ["motorcycle", "tyreFront", "tyreRear", "riderName", "organizerList"]
        .forEach(id => populateSelect(id, [], "", "-- Wybierz --"));

      // reset new‑rider section as well
      if (noRiderOnListCheckbox) {
        noRiderOnListCheckbox.checked = false;
        riderManualGroup.style.display = "none";
        [riderNameManual, riderSexMaleManual, riderSexFemaleManual,
         riderInstagramManual, riderFacebookManual].forEach(i => {
           if (!i) return;
           if (i.type === "radio") i.checked = false;
           else i.value = "";
           i.disabled = true;
           i.required = false;
        });
      }
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

  // --- Updated Lap Time Format Warning ---
  const lapTimeField = document.getElementById("lapTime");
  if (lapTimeField) {
    lapTimeField.addEventListener("change", () => {
      const flexiblePattern = /^[\d\\s.,:]+$/;
      if (lapTimeField.value && !flexiblePattern.test(lapTimeField.value)) {
        alert("Niepoprawny format! Użyj cyfr i dowolnych separatorów (np. 1.05.12, 45.2).");
        lapTimeField.scrollIntoView({ behavior: "smooth", block: "center" });
        lapTimeField.classList.add("is-invalid");
      } else {
        lapTimeField.classList.remove("is-invalid");
      }
    });
  }

  // --- Initialize Motorcycle Toggle ---
  if (noMotorcycleCheckbox) {
    noMotorcycleCheckbox.addEventListener("change", () => {
      const isChecked = noMotorcycleCheckbox.checked;
      
      motorcycleSelect.style.display = isChecked ? "none" : "block";
      motorcycleSelect.required = !isChecked;
      motorcycleSelect.value = "";

      motorcycleManualGroup.style.display = isChecked ? "block" : "none";
      
      [motorcycleNameManual, motorcycleYearManual, motorcycleTypeManual].forEach(input => {
        input.required = isChecked;
        input.disabled = !isChecked;
        if (!isChecked) input.value = "";
      });

      if (isChecked) motorcycleNameManual.focus();
      validateForm();
    });
  }

  // --- Initialize Rider Toggle ---
  if (noRiderOnListCheckbox) {
    noRiderOnListCheckbox.addEventListener("change", () => {
      const isChecked = noRiderOnListCheckbox.checked;

      riderSelect.style.display = isChecked ? "none" : "block";
      riderSelect.required = !isChecked;
      riderSelect.value = "";

      riderManualGroup.style.display = isChecked ? "block" : "none";

      // FIX: Set required status for mandatory fields
      riderNameManual.required = isChecked;
      riderSexMaleManual.required = isChecked;
      riderSexFemaleManual.required = isChecked;

      [riderNameManual, riderSexMaleManual, riderSexFemaleManual].forEach(input => {
        input.required = isChecked;
        input.disabled = !isChecked;
        if (!isChecked) {
          if (input.type === "radio") input.checked = false;
          else input.value = "";
        }
      });

      if (isChecked) riderNameManual.focus();
      validateForm();
    });
  }

  // --- Form Submission ---
  addLaptimeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // FIX: Add the duplicate name check before submission
    if (noRiderOnListCheckbox?.checked && riderNameManual.value.trim()) {
      const newRiderName = riderNameManual.value.trim().toLowerCase();
      if (currentRiderNames.includes(newRiderName)) {
        alert(`Błąd: Zawodnik o imieniu "${riderNameManual.value.trim()}" już istnieje na liście. Proszę wybrać go z listy lub podać inne imię.`);
        riderNameManual.focus();
        return;
      }
    }

    const formData = new FormData(addLaptimeForm);

    // Normalize Lap Time
    const rawLapTime = lapTimeField.value.trim();
    formData.set('lapTime', parseFlexibleTime(rawLapTime));

    // NEW: Handle Structured Motorcycle Data
    if (noMotorcycleCheckbox?.checked) {
      // We send the specific fields for the pending motorcycle procedure
      formData.set('motorcycleName', motorcycleNameManual.value.trim());
      formData.set('motorcycleYear', motorcycleYearManual.value);
      formData.set('motorcycleType', motorcycleTypeManual.value);
      // Clear the main 'motorcycle' field so the backend knows to use the manual ones
      formData.delete('motorcycle'); 
    }
    
    // NEW: Logic to pick values from either Select or Manual input
    if (noTyreFrontCheckbox?.checked) {
      formData.set('tyreFrontNameManual', tyreFrontManual.value.trim());
    }

    if (noTyreRearCheckbox?.checked) {
      formData.set('tyreRearNameManual', tyreRearManual.value.trim());
    }

    // NEW: handle manual rider entry
    if (noRiderOnListCheckbox?.checked) {
      formData.set('riderNameManual', riderNameManual.value.trim());
      const sex = riderSexMaleManual.checked ? 'M' :
                  riderSexFemaleManual.checked ? 'F' : '';
      if (sex) formData.set('riderSex', sex);
      formData.set('riderInstagram', riderInstagramManual.value.trim());
      formData.set('riderFacebook', riderFacebookManual.value.trim());
      formData.delete('riderName');
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
