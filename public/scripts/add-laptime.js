document.addEventListener('DOMContentLoaded', () => {
  console.log('add-laptime.js loaded and running');

  const trackSelect = document.getElementById('trackSelect');
  const addLaptimeForm = document.getElementById('addLaptimeForm');

  if (!trackSelect || !addLaptimeForm) {
    console.error('Required form elements not found: trackSelect or addLaptimeForm');
    return;
  }

  const controlsToToggle = addLaptimeForm.querySelectorAll(
    'input:not(#trackSelect), select:not(#trackSelect), button:not(#trackSelect)'
  );

  console.log('Controls to toggle:', controlsToToggle);

  const toggleFormControls = (unlocked) => {
    controlsToToggle.forEach(field => {
      field.disabled = !unlocked;
    });
  };

  // --- Datalist Population Logic ---
  const populateDatalist = (datalistId, dataArray, key) => {
    const datalist = document.getElementById(datalistId);
    if (datalist && dataArray) {
      datalist.innerHTML = ''; // Clear existing options
      dataArray.forEach(item => {
        const option = document.createElement('option');
        option.value = item[key];
        datalist.appendChild(option);
      });
    }
  };

  // NEW: Function to fetch data from API endpoints
  const fetchAndPopulateDatalist = async (url, datalistId, key) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      populateDatalist(datalistId, data, key);
      console.log(`Datalist '${datalistId}' populated from ${url}`);
    } catch (error) {
      console.error(`Error fetching data for ${datalistId}:`, error);
    }
  };

  // Initial state: disable all controls except trackSelect
  toggleFormControls(false);
  console.log('Initial state: fields disabled.');

  // Event listener for trackSelect changes
  trackSelect.addEventListener('change', async () => { // Made async
    // console.log('Track selection changed. New value:', trackSelect.value);

    if (trackSelect.value !== '') {
      toggleFormControls(true);
      console.log('Track selected. Fields enabled.');

      // Fetch and populate datalists when a track is selected
      await fetchAndPopulateDatalist('/add-laptime/api/motorcycles', 'motorcycleSuggestions', 'motorcycle_name');
      await fetchAndPopulateDatalist('/add-laptime/api/tyres/front', 'tyreFrontSuggestions', 'tyre_name');
      await fetchAndPopulateDatalist('/add-laptime/api/tyres/rear', 'tyreRearSuggestions', 'tyre_name');
      await fetchAndPopulateDatalist('/add-laptime/api/riders/' + trackSelect.value, 'riderSuggestions', 'rider_name');

    } else {
      toggleFormControls(false);
      console.log('No track selected. Fields disabled.');
      // Clear datalists if no track is selected
      populateDatalist('motorcycleSuggestions', [], 'motorcycle_name');
      populateDatalist('tyreFrontSuggestions', [], 'tyre_name');
      populateDatalist('tyreRearSuggestions', [], 'tyre_name');
      populateDatalist('riderSuggestions', [], 'rider_name');
    }
  });
});