function login(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username1").value;
    const password = document.getElementById("password1").value;

    // Dummy login logic (replace with your actual authentication logic)
    if (username === "Pranjal" && password === "Moureabanx@1") {
        window.location.href = "Employeepage.html"; // Redirect to index.html
    } else {
        alert("Invalid username or password. Please try again.");
    }
}