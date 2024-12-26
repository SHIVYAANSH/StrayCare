document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Collect the form data
    const formData = {
      username: document.getElementById("username").value,
      realname: document.getElementById("realname").value,
      age: document.getElementById("age").value,
      animal: document.getElementById("animal").value,
      state: document.getElementById("state").value,
      password: document.getElementById('password').value
    };

  
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbz89Op3-1PkYjRxaF0kIX_8mXfoKoQ2YIo7w5ZZ_W54OYHrC3CzRXo5XTi52HEnriJugQ/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData), // Convert the form data into URL-encoded format
      });
  
      const result = await response.text();
      alert(result); // Display the response from the server
      if (result === "Success") {
        // Optionally redirect or clear the form if successful
        window.location.href = "login.html"; // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send data. Please try again.");
    }
  });
  