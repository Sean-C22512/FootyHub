// adduser.js (client-side JavaScript)

document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the form from refreshing the page

    // Get form input values
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Send the user data to the server
    try {
        const response = await fetch('/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        // Check if the request was successful
        if (response.ok) {
            window.location.href = '/index.html';  // Redirect to the index page
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to register user.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error registering user.');
    }
});
