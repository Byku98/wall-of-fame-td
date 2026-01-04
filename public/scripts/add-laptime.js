document.addEventListener('DOMContentLoaded', () => {
  const trackSelect = document.getElementById('trackSelect');
  const form = document.getElementById('addLaptimeForm');
  const formControls = form.querySelectorAll('input, select, button'); // Get all form controls

  // Function to enable/disable all controls except trackSelect
  const toggleFormControls = (unlocked) => {
    formControls.forEach(field => {
      if (field.id !== 'trackSelect') { // Don't disable the track select itself
        field.disabled = !unlocked;
      }
    });
  };

  // Initial state: disable all controls except trackSelect
  toggleFormControls(false);

  // Event listener for trackSelect changes
  trackSelect.addEventListener('change', () => {
    console.log('Track selection changed:', trackSelect.value);
    if (trackSelect.value !== '') {
      // A track is selected, enable other fields
      toggleFormControls(true);
    } else {
      // No track selected, disable other fields
      toggleFormControls(false);
    }
  });
});