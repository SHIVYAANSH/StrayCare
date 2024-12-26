// Function to set animal data from localStorage when the page loads
window.onload = function() {
    setAnimalData();
  }
  
  function setAnimalData() {
    // Retrieve the animal data from localStorage
    const animalName = localStorage.getItem('animalName');
    const age = localStorage.getItem('age');
    const breed = localStorage.getItem('breed');
    const animalLocation = localStorage.getItem('location');
  
    // Check if the elements are available in the DOM before updating their content
    const animalNameElement = document.getElementById('animal-name-value');
    const ageElement = document.getElementById('age-value');
    const breedElement = document.getElementById('breed-value');
    const locationElement = document.getElementById('location-value');
  
    // Set the textContent only if the elements exist
    if (animalNameElement) {
      animalNameElement.textContent = animalName || 'No animal selected';
    }
    if (ageElement) {
      ageElement.textContent = age || 'N/A';
    }
    if (breedElement) {
      breedElement.textContent = breed || 'Unknown';
    }
    if (locationElement) {
      locationElement.textContent = animalLocation || 'Unknown';
    }
  }
  
  