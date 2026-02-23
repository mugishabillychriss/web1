// Registration
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.find(u => u.username === username)){
        alert("Username exists!");
        return;
    }

    users.push({ username, password, role: "staff" });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if(user){
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

// Protect Dashboard
if(window.location.pathname.includes("index.html") || window.location.pathname.includes("ai.html")){
    if(localStorage.getItem("loggedIn") !== "true"){
        window.location.href = "login.html";
    }
}

// Logout
function logout(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
