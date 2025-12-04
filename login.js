const loginScreen = document.getElementById("login");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

function validation(event) {

    event.preventDefault(); // stops page refresh
    
    let alarm = "";

    if (usernameInput.value.trim() === "")
        alarm += "Please enter your username\n";

    if (passwordInput.value.trim() === "")
        alarm += "Please enter your password";

    if (alarm !== "") // if user failed to fill both fields
        alert(alarm);

    else {
        loginScreen.classList.add("fade-out"); // classList provides a way to access CSS classes.
    }
}