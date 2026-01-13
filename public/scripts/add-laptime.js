document.addEventListener("DOMContentLoaded", () => {
  // --- Variables Declaration ---
  const trackSelect = document.getElementById("trackSelect");
  const deviceSelect = document.getElementById("deviceSelect");
  const addLaptimeForm = document.getElementById("addLaptimeForm");
  const deviceRecordedLapContainer = document.getElementById(
    "deviceRecordedLapContainer"
  );
  const deviceRecordedLap = document.getElementById("deviceRecordedLap");
  const submitButton = addLaptimeForm.querySelector('button[type="submit"]');

  // Global date reference for validation (today at midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
  const populateSelect = (selectId, dataArray, key) => {
    const select = document.getElementById(selectId);

    if (!select) {
      console.error(`BŁĄD: Nie znaleziono elementu o ID: "${selectId}"`);
      return; // Przerwij funkcję natychmiast
    }

    if (!dataArray || !Array.isArray(dataArray)) {
      console.error(`BŁĄD: Dane dla ${selectId} są nieprawidłowe:`, dataArray);
      return;
    }

    // Jeśli tu dotarliśmy, select na pewno istnieje
    select.innerHTML = '<option value="">-- Wybierz organizatora --</option>';

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

      // Fetch and populate datalists when a track is selected
      await fetchAndPopulateDatalist(
        "/add-laptime/api/motorcycles",
        "motorcycleSuggestions",
        "motorcycle_name"
      );
      await fetchAndPopulateDatalist(
        "/add-laptime/api/tyres/front",
        "tyreFrontSuggestions",
        "tyre_name"
      );
      await fetchAndPopulateDatalist(
        "/add-laptime/api/tyres/rear",
        "tyreRearSuggestions",
        "tyre_name"
      );
      await fetchAndPopulateDatalist(
        "/add-laptime/api/riders/" + encodeURIComponent(trackSelect.value),
        "riderSuggestions",
        "rider_name"
      );

      // Fetch and populate dropdown lists when a track is selected
      await fetchAndPopulateSelect(
        "/add-laptime/api/organizers/" + encodeURIComponent(trackSelect.value),
        "organizerList",
        "organizer_name"
      );
    } else {
      toggleFormControls(false);
      console.log("No track selected. Fields disabled.");

      // Clear datalists if no track is selected
      populateDatalist("motorcycleSuggestions", [], "motorcycle_name");
      populateDatalist("tyreFrontSuggestions", [], "tyre_name");
      populateDatalist("tyreRearSuggestions", [], "tyre_name");
      populateDatalist("riderSuggestions", [], "rider_name");

      // Reset organizer select
      const organizerSelect = document.getElementById("organizerList"); // UPDATED: Changed from "organizer" to "organizerList"
      if (organizerSelect) {
        organizerSelect.innerHTML =
          '<option value="">-- Wybierz organizatora --</option>';
      }
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
  const fetchAndPopulateSelect = async (url, selectId, key) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      populateSelect(selectId, data, key);
      // console.log(`Select '${selectId}' populated from ${url}`);
    } catch (error) {
      console.error(`Error fetching data for ${selectId}:`, error);
    }
  };

  // Form submission handler
  addLaptimeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Final validation check
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
      const response = await fetch('/add-laptime/api', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert('Czas okrążenia został dodany pomyślnie!');
        addLaptimeForm.reset();
        toggleFormControls(false);
      } else {
        alert(`Błąd: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Wystąpił błąd podczas wysyłania formularza');
    }
  });

  if (deviceRecordedLap) {
    deviceRecordedLap.addEventListener("input", validateForm);
  }

}); // End of DOMContentLoaded
