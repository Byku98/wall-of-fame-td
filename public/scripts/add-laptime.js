document.addEventListener("DOMContentLoaded", () => {
  const trackSelect = document.getElementById("trackSelect");
  const deviceSelect = document.getElementById("deviceSelect");
  const addLaptimeForm = document.getElementById("addLaptimeForm");

  if (!trackSelect || !addLaptimeForm) {
    console.error(
      "Required form elements not found: trackSelect or addLaptimeForm"
    );
    return;
  }

  const controlsToToggle = addLaptimeForm.querySelectorAll(
    "input:not(#trackSelect), select:not(#trackSelect), button:not(#trackSelect)"
  );

  console.log("Controls to toggle:", controlsToToggle);

  const toggleFormControls = (unlocked) => {
    controlsToToggle.forEach((field) => {
      field.disabled = !unlocked;
    });
  };

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
});
