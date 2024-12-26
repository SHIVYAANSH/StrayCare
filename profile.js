
        // Google Sheets details
        const SHEET_ID = '1ebA9MQFz_iGyzTf6TG9EDcKPqcBN0LMKbE79P7lnRx4';
        const SHEET_TITLE = 'Sheet1';
        const SHEET_RANGE = 'A:F'; // Assuming columns A, B, and D contain username, real name, and preferred animal
        const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

        // Function to fetch and display profile details
        async function fetchProfileData() {
            const username = localStorage.getItem('username'); // Get username from localStorage
            if (!username) {
                alert("Please log in first.");
                window.location.href = '/login.html';  // Redirect to login page if username is not found
                return;
            }

            try {
                const response = await fetch(FULL_URL);
                const text = await response.text();
                const data = JSON.parse(text.substr(47).slice(0, -2));  // Parse the JSON data

                const rows = data.table.rows;
                let profileFound = false;

                // Iterate through rows and match the username
                rows.forEach(row => {
                    const storedUsername = row.c[0]?.v || '';  // Column A: Username
                    const storedRealName = row.c[1]?.v || '';  // Column B: Real Name
                    const storedAge = row.c[2]?.v || '';  // Column C: Age
                    const storedPreferredAnimal = row.c[4]?.v || '';  // Column D: Preferred Animal

                    // Check if the stored username matches the one from localStorage
                    if (username === storedUsername) {
                        profileFound = true;

                        // Update profile information dynamically
                        document.getElementById('username').innerText = storedUsername;
                        document.getElementById('real-name').innerText = storedRealName;
                        document.getElementById('age').innerText = `Age: ${storedAge}`;
                        document.getElementById('preferred-animal').innerText = `Preferred Animal: ${storedPreferredAnimal}`;
                    }
                });

                // If profile is not found
                if (!profileFound) {
                    alert("Profile not found. Please log in again.");
                    window.location.href = '/login.html';  // Redirect to login page
                }
            } catch (error) {
                console.error("Error fetching profile data: ", error);
                alert("Error fetching profile data. Please try again.");
            }
        }

        // Show edit form when "Edit Profile" button is clicked
        document.getElementById('edit-btn').addEventListener('click', () => {
            document.getElementById('edit-form').style.display = 'block';
            document.getElementById('edit-real-name').value = document.getElementById('real-name').innerText;
            document.getElementById('edit-age').value = document.getElementById('age').innerText.replace("Age: ", "");
            document.getElementById('edit-preferred-animal').value = document.getElementById('preferred-animal').innerText.replace("Preferred Animal: ", "");
            document.getElementById('edit-btn').style.display = 'none';
        });

        // Save the edited profile data
        document.getElementById('save-btn').addEventListener('click', async () => {
            const newRealName = document.getElementById('edit-real-name').value;
            const newAge = document.getElementById('edit-age').value;
            const newPreferredAnimal = document.getElementById('edit-preferred-animal').value;

            // Update the profile in Google Sheets (Add appropriate API call to Google Sheets API here)
            // Example for updating locally (you need backend logic to update the database)
            document.getElementById('real-name').innerText = newRealName;
            document.getElementById('age').innerText = `Age: ${newAge}`;
            document.getElementById('preferred-animal').innerText = `Preferred Animal: ${newPreferredAnimal}`;

            // Hide the edit form and show the update button again
            document.getElementById('edit-form').style.display = 'none';
            document.getElementById('edit-btn').style.display = 'inline-block';

            // Optionally, save the data to Google Sheets or database here.
            alert("Profile updated successfully!");
        });

        // Fetch and display profile data when the page loads
        document.addEventListener('DOMContentLoaded', fetchProfileData);







        function saveProfile() {
    var username = document.getElementById('username').innerText; // Retrieve username
    var realName = document.getElementById('edit-real-name').value;
    var age = document.getElementById('edit-age').value;
    var preferredAnimal = document.getElementById('edit-preferred-animal').value;
    var password = ''; // Add password input if needed
    var state = ''; // Add state input if needed
    
    var formData = {
      username: username,
      realname: realName,
      age: age,
      animal: preferredAnimal,
      password: password,
      state: state
    };

    // Sending data to Google Apps Script
    fetch('https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec', {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
      alert(data); // Show success or failure message
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }