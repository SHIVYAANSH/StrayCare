// Google Sheets details
const SHEET_ID = '1ebA9MQFz_iGyzTf6TG9EDcKPqcBN0LMKbE79P7lnRx4';
const SHEET_TITLE = 'Sheet1';
const SHEET_RANGE = 'A:D';  // Assuming that Column A is username and Column B is password
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

// Function to fetch and validate login details
async function validateLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch(FULL_URL);
    const text = await response.text();
    const data = JSON.parse(text.substr(47).slice(0, -2));  // Parse the JSON data

    // Iterate through the rows and check if any row matches the username and password
    const rows = data.table.rows;
    let loginSuccess = false;

    rows.forEach(row => {
      const storedUsername = row.c[0]?.v || '';  // Column A: Username
      const storedPassword = row.c[3]?.v || '';  // Column B: Password

      // Check if the entered username and password match any entry in the Google Sheets
      if (username === storedUsername && password === storedPassword) {
        loginSuccess = true;
      }
    });

    // Display appropriate message based on login success/failure
    if (loginSuccess) {
      // Store username in localStorage
      localStorage.setItem('username', username);
      alert("Login successful!");

      // Redirect to the next page (index.html)
      window.location.href = '/index.html';  // Adjust the URL to where you want to redirect
    } else {
      alert("Invalid username or password. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    alert("Error verifying login. Please try again.");
  }
}

// Attach event listener to the login form when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();  // Prevent the default form submission
      validateLogin();  // Validate the login
    });
  } else {
    console.error('loginForm element not found!');
  }
});
