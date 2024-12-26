document.addEventListener('DOMContentLoaded', () => {
  const usernameModal = document.getElementById("usernameModal");

  // Check if username exists in localStorage
  const savedUsername = localStorage.getItem("username");

  if (savedUsername) {
      const profileUsername = document.getElementById('profileUsername');
      profileUsername.textContent = savedUsername;

      // Fetch and display user profile from the second sheet
      fetchUserProfile(savedUsername);

      // Hide modal if username already exists
      usernameModal.style.display = "none";
  } else {
      // Show modal to get username
      usernameModal.style.display = "flex";
  }
});

function saveUsername() {
  const usernameInput = document.getElementById("usernameInput").value.trim();
  const usernameModal = document.getElementById("usernameModal");

  if (usernameInput) {
      localStorage.setItem("username", usernameInput);
      usernameModal.style.display = "none";

      // Fetch and display user profile
      fetchUserProfile(usernameInput);
  } else {
      alert("Please enter a valid name.");
  }
}

function checkUsername() {
  const savedUsername = localStorage.getItem("username");

  if (!savedUsername) {
      window.location.href = "land.html";
  }
}

document.addEventListener("DOMContentLoaded", checkUsername);

// Google Sheets details for posts
const POST_SHEET_ID = '1yEJi1to6cIKcOVaLOS6nLqhKrhCu7-Zm3zLSB_uywJ0';
const POST_SHEET_TITLE = 'Sheet1';
const POST_SHEET_RANGE = 'A:H';
const POST_FULL_URL = `https://docs.google.com/spreadsheets/d/${POST_SHEET_ID}/gviz/tq?sheet=${POST_SHEET_TITLE}&range=${POST_SHEET_RANGE}`;

// Google Sheets details for profiles
const PROFILE_SHEET_ID = '1ebA9MQFz_iGyzTf6TG9EDcKPqcBN0LMKbE79P7lnRx4';
const PROFILE_SHEET_TITLE = 'Sheet1';
const PROFILE_SHEET_RANGE = 'A:H';
const PROFILE_FULL_URL = `https://docs.google.com/spreadsheets/d/${PROFILE_SHEET_ID}/gviz/tq?sheet=${PROFILE_SHEET_TITLE}&range=${PROFILE_SHEET_RANGE}`;

const postsContainer = document.getElementById('postsContainer');

// Fetch user profile based on username from the second sheet
async function fetchUserProfile(username) {
  try {
      const response = await fetch(PROFILE_FULL_URL);
      const text = await response.text();
      const data = JSON.parse(text.substr(47).slice(0, -2)); // Parse the JSON data

      const rows = data.table.rows;
      const userRow = rows.find(row => row.c[0]?.v === username); // Find the row for the given username

      if (userRow) {
          const profilePicture = userRow.c[6]?.v || "https://via.placeholder.com/150";
          const profileUsername = userRow.c[0]?.v || "Anonymous";
          const profileBio = userRow.c[2]?.v || "No bio available";

          // Update the profile card with user details
          document.getElementById('profilePicture').src = profilePicture;
          document.getElementById('profileUsername').textContent = profileUsername;
          document.getElementById('profileBio').textContent = profileBio;
      } else {
          console.warn("User profile not found.");
      }
  } catch (error) {
      console.error("Error fetching user profile:", error);
  }
}

// Fetch and display posts from the first Google Sheet
async function fetchAndDisplayPosts() {
  try {
      const response = await fetch(POST_FULL_URL);
      const text = await response.text();
      const data = JSON.parse(text.substr(47).slice(0, -2)); // Parse the JSON data

      const rows = data.table.rows;
      rows.forEach(row => {
          const username = row.c[0]?.v || "Anonymous";
          const reportContent = row.c[1]?.v || "";
          const reportLocation = row.c[2]?.v || "";
          const imageContent = row.c[3]?.v || "";
          //const reportTime = row.c[4]?.v || "";
          const reportTitle = row.c[5]?.v || "";
          const animalCondition = row.c[6]?.v || "";

          // Create the post container
          const postElement = document.createElement("div");
          postElement.classList.add("post");

          // Create the post content
          postElement.innerHTML = `
              <div class="post-header">
                  <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg" alt="User Image" class="user-image">
                  <h3 class="clickable-username">${username}</h3>
              </div>
              <div class="post-content"><strong>Title:</strong> ${reportTitle}</div>
              <div class="post-content"><strong>Details:</strong> ${reportContent}</div>
              <div class="post-location"><strong>Location:</strong> ${reportLocation}</div>
            
          
              <button class="view-attachment" onclick="viewAttachment('${imageContent}')">View Attachment</button>
              <p class="animal-condition"><strong>Condition:</strong> ${animalCondition}</p>
          `;

          // Append the post to the container
          postsContainer.appendChild(postElement);
      });
  } catch (error) {
      console.error("Error fetching posts:", error);
  }
}

function viewAttachment(imageUrl) {
  const attachmentWindow = window.open(imageUrl, "_blank");
  attachmentWindow.focus();
}

fetchAndDisplayPosts();
