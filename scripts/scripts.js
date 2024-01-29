document.addEventListener('DOMContentLoaded', function() {
  // Function to get the current date in the format "YYYY-MM-DD"
  function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }

  // Get the target element
  const currentDateElement = document.getElementById('currentDate');

  // Set the current date to the target element's text content
  currentDateElement.textContent = getCurrentDate();
});