// Google Sheets details
const SHEET_ID = '1qTYIxuwKZPniYeXI1EZprctWakB308Hi0avN0xpw8Hc'; // Updated sheet ID
const SHEET_TITLE = 'Sheet1'; // Sheet title
const SHEET_RANGE = 'A:E'; // Updated range to match your columns (adoption_image, animal_name, age, breed, location)
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

const postsContainer = document.getElementById('postsContainer');

// Function to fetch and display the posts from the Google Sheets
async function fetchAndDisplayPosts() {
  try {
    const response = await fetch(FULL_URL);
    const text = await response.text();
    const data = JSON.parse(text.substr(47).slice(0, -2));  // Parse the JSON data

    // Iterate through the rows and display each post
    const rows = data.table.rows;
    rows.forEach(row => {
      const adoptionImage = row.c[0]?.v || 'https://via.placeholder.com/150'; // Default image if not available
      const animalName = row.c[1]?.v || 'Unknown'; // animal_name
      const age = row.c[2]?.v || 'N/A'; // age
      const breed = row.c[3]?.v || 'Unknown'; // breed
      const location = row.c[4]?.v || 'Unknown'; // location

      // Create the post container (Product Container)
      const postElement = document.createElement('div');
      postElement.classList.add('product-container');

      // Create the product content (Display animal as a product card)
      postElement.innerHTML = `
        <div class="product-header">
          <img src="${adoptionImage}" alt="Animal Image" class="animal-image">
        </div>
        <div class="product-body">
          <h3 class="animal-name" data-animal-name="${animalName}">${animalName}</h3>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Breed:</strong> ${breed}</p>
          <p><strong>Location:</strong> ${location}</p>
        </div>
        <div class="product-footer">
          <a href="forms.html"><button class="adopt-button">Adopt Now</button></a>
        </div>
      `;

      // Attach an event listener to the animal name to handle click event
      const animalNameElement = postElement.querySelector('.animal-name');
      animalNameElement.addEventListener('click', (event) => {
        // Store the animal name and other details in localStorage
        const animalName = event.target.getAttribute('data-animal-name');
        const age = event.target.nextElementSibling.textContent.split(':')[1]?.trim() || 'N/A';
        const breed = event.target.nextElementSibling.nextElementSibling.textContent.split(':')[1]?.trim() || 'Unknown';
        const location = event.target.nextElementSibling.nextElementSibling.nextElementSibling.textContent.split(':')[1]?.trim() || 'Unknown';

        localStorage.setItem('animalName', animalName);
        localStorage.setItem('age', age);
        localStorage.setItem('breed', breed);
        localStorage.setItem('location', location);

        // Redirect to the form page
        window.location.href = 'forms.html';
      });

      // Append the post to the container
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

// Call the fetch function to display the posts
fetchAndDisplayPosts();
