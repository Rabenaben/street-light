// Attach an event listener to the form submission
document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get the input values for email (username) and password
  const email = document.querySelector('input[name="uname"]').value;
  const password = document.querySelector('input[name="psw"]').value;

  try {
    // Send the login request to the backend API
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // Send the login credentials
    });

    const data = await response.json();

    if (response.ok) {
      // If login is successful, redirect to info.html
      alert('Login successful! Redirecting...');
      window.location.href = 'info.html'; // Redirect to info.html
    } else {
      // If login fails, display an error message
      alert(data.message); // Show the error message from the backend
    }
  } catch (err) {
    // Handle any errors during the API request
    console.error(err);
    alert('An error occurred while logging in.');
  }
});
