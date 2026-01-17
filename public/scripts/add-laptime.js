document.addEventListener("DOMContentLoaded", () => {
  // --- Variables Declaration ---
  const trackSelect = document.getElementById("trackSelect");
  const deviceSelect = document.getElementById("deviceSelect");
  const addLaptimeForm = document.getElementById("addLaptimeForm");
  const successContainer = document.getElementById("successContainer");
  const addAnotherBtn = document.getElementById("addAnotherBtn");
  const formHeader = document.getElementById("formHeader"); // NEW
  const deviceRecordedLapContainer = document.getElementById(
    "deviceRecordedLapContainer"
  );
  const deviceRecordedLap = document.getElementById("deviceRecordedLap");
  const submitButton = addLaptimeForm.querySelector('button[type="submit"]');

  // Global date reference for validation (end of today)
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (!trackSelect || !addLaptimeForm) {
    console.error(
      "Required form elements not found: trackSelect or addLaptimeForm"
    );
    return;
  }

  const controlsToToggle = addLaptimeForm.querySelectorAll(
    "input:not(#trackSelect), select:not(#trackSelect), button:not(#trackSelect)"
  );

  const toggleFormControls = (unlocked) => {
    controlsToToggle.forEach((field) => {
      field.disabled = !unlocked;
    });
    if (!unlocked) {
      submitButton.disabled = true;
    } else {
      validateForm(); // Check validation immediately when unlocked
    }
  };

  // --- Validation Logic ---
  const validateForm = () => {
    const proofImage = document.getElementById("proofImage");
    const proofImageBadge = proofImage.parentElement.querySelector(".badge");
    
    // NEW: Conditional Requirement for Image Upload
    if (deviceRecordedLap.value.trim() === "") {
      proofImage.required = true;
      proofImageBadge.textContent = "Wymagane";
      proofImageBadge.classList.replace("bg-secondary", "bg-danger");
    } else {
      proofImage.required = false;
      proofImageBadge.textContent = "Opcjonalne";
      proofImageBadge.classList.replace("bg-danger", "bg-secondary");
    }

    const requiredFields = addLaptimeForm.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      // Check if field is empty
      if (!field.value.trim()) {
        isValid = false;
      }
      
      // Check pattern for Lap Time (MM:SS.mmm, SS.mmm, or SS)
      if (field.id === "lapTime" && field.value) {
        // ^([0-5]?\d:)? -> Optional minutes
        // ([0-5]?\d)    -> Required seconds
        // (\.\d{1,3})?$ -> Optional dot and 1-3 milliseconds
        const pattern = /^([0-5]?\d:)?([0-5]?\d)(\.\d{1,3})?$/;
        if (!pattern.test(field.value)) {
          isValid = false;
        }
      }

      // NEW: Date Validation using global 'today'
      if (field.id === "lapDate" && field.value) {
        const selectedDate = new Date(field.value);
        // Allow today and past dates, block future dates
        if (selectedDate > today) {
          isValid = false;
        }
      }
    });

    submitButton.disabled = !isValid;
    return isValid;
  };

  // NEW: Immediate feedback for invalid date using global 'today'
  const lapDateField = document.getElementById("lapDate");
  if (lapDateField) {
    lapDateField.addEventListener("change", () => {
      const selectedDate = new Date(lapDateField.value);
      if (selectedDate > today) {
        alert("Data nie może być z przyszłości!");
        lapDateField.value = ""; // Clear the invalid date
        validateForm(); // Re-validate
      }
    });
  }
  
  // Listen for any input change to re-validate
  addLaptimeForm.addEventListener("input", validateForm);

  // --- Datalist Population Logic ---
  const populateDatalist = (datalistId, dataArray, key) => {
    const datalist = document.getElementById(datalistId);
    if (datalist && dataArray) {
      datalist.innerHTML = ""; // Clear existing options
      dataArray.forEach((item) => {
        const option = document.createElement("option");
        option.value = item[key];
        datalist.appendChild(option);
      });
    }
  };

  // Function to populate select options
  const populateSelect = (selectId, dataArray, key, defaultText = "-- Wybierz --") => {
    const select = document.getElementById(selectId);

    if (!select) {
      console.error(`BŁĄD: Nie znaleziono elementu o ID: "${selectId}"`);
      return;
    }

    if (!dataArray || !Array.isArray(dataArray)) {
      console.error(`BŁĄD: Dane dla ${selectId} są nieprawidłowe:`, dataArray);
      return;
    }

    select.innerHTML = `<option value="">${defaultText}</option>`;

    dataArray.forEach((item) => {
      if (item[key]) {
        const option = document.createElement("option");
        option.value = item[key];
        option.textContent = item[key];
        select.appendChild(option);
      }
    });
  };

  deviceSelect.addEventListener("change", () => {
    if (deviceSelect.value !== "-- Wybierz urządzenie --") {
      // Check if device requires lap record URL
      if (devicesWithExternalRecord.includes(deviceSelect.value)) {
        deviceRecordedLapContainer.style.display = "block";
        deviceRecordedLap.disabled = false;
      } else {
        deviceRecordedLapContainer.style.display = "none";
        deviceRecordedLap.disabled = true;
        deviceRecordedLap.value = "";
      }
    }
  });

  // Initial state: disable all controls except trackSelect
  toggleFormControls(false);
  // console.log("Initial state: fields disabled.");

  // Event listener for trackSelect changes
  trackSelect.addEventListener("change", async () => {
    // console.log('Track selection changed. New value:', trackSelect.value);

    if (trackSelect.value !== "") {
      toggleFormControls(true);
      // console.log("Track selected. Fields enabled.");

      // Fetch and populate dropdown lists when a track is selected
      await fetchAndPopulateSelect(
        "/add-laptime/api/motorcycles",
        "motorcycle",
        "motorcycle_name",
        "-- Wybierz motocykl --"
      );
      await fetchAndPopulateSelect(
        "/add-laptime/api/tyres/front",
        "tyreFront",
        "tyre_name",
        "-- Wybierz oponę (przód) --"
      );
      await fetchAndPopulateSelect(
        "/add-laptime/api/tyres/rear",
        "tyreRear",
        "tyre_name",
        "-- Wybierz oponę (tył) --"
      );
      await fetchAndPopulateSelect(
        "/add-laptime/api/riders/" + encodeURIComponent(trackSelect.value),
        "riderName",
        "rider_name",
        "-- Wybierz zawodnika --"
      );
      await fetchAndPopulateSelect(
        "/add-laptime/api/organizers/" + encodeURIComponent(trackSelect.value),
        "organizerList",
        "organizer_name",
        "-- Wybierz organizatora --"
      );
    } else {
      toggleFormControls(false);
      // console.log("No track selected. Fields disabled.");

      // Reset all selects
      populateSelect("motorcycle", [], "", "-- Wybierz motocykl --");
      populateSelect("tyreFront", [], "", "-- Wybierz oponę (przód) --");
      populateSelect("tyreRear", [], "", "-- Wybierz oponę (tył) --");
      populateSelect("riderName", [], "", "-- Wybierz zawodnika --");
      populateSelect("organizerList", [], "", "-- Wybierz organizatora --");
    }
  });

  // Function to fetch data from API endpoints
  const fetchAndPopulateDatalist = async (url, datalistId, key) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      populateDatalist(datalistId, data, key);
      // console.log(`Datalist '${datalistId}' populated from ${url}`);
    } catch (error) {
      console.error(`Error fetching data for ${datalistId}:`, error);
    }
  };

  // Function to fetch data and populate select
  const fetchAndPopulateSelect = async (url, selectId, key, defaultText) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      populateSelect(selectId, data, key, defaultText);
    } catch (error) {
      console.error(`Error fetching data for ${selectId}:`, error);
    }
  };

  // Form submission handler
  addLaptimeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Proszę poprawnie wypełnić wszystkie wymagane pola.');
      return;
    }

    const formData = new FormData(addLaptimeForm);
    const fileInput = document.getElementById('proofImage');
    const file = fileInput.files[0];

    // Client-side file size validation
    if (file && file.size > 3 * 1024 * 1024) {
      alert('Plik jest za duży. Maksymalny rozmiar to 3MB');
      return;
    }

    try {
      submitButton.disabled = true; // Prevent double submission
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Wysyłanie...';

      const response = await fetch('/add-laptime/api', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // NEW: Show success view
        addLaptimeForm.style.display = "none";
        formHeader.style.display = "none"; // NEW: Hide header
        successContainer.style.display = "block";
        window.scrollTo(0, 0);
      } else {
        alert(`Błąd: ${result.message}`);
        submitButton.disabled = false;
        submitButton.textContent = 'Dodaj Czas';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Wystąpił błąd podczas wysyłania formularza');
      submitButton.disabled = false;
      submitButton.textContent = 'Dodaj Czas';
    }
  });

  // NEW: Logic for "Dodaj kolejny czas" button
  if (addAnotherBtn) {
    addAnotherBtn.addEventListener("click", () => {
      addLaptimeForm.reset();
      successContainer.style.display = "none";
      addLaptimeForm.style.display = "block";
      formHeader.style.display = "block"; // NEW: Show header again
      submitButton.textContent = 'Dodaj Czas';
      toggleFormControls(false); // Lock fields until track is selected again
      window.scrollTo(0, 0);
    });
  }

  if (deviceRecordedLap) {
    deviceRecordedLap.addEventListener("input", validateForm);
  }

}); // End of DOMContentLoaded
