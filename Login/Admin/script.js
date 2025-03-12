document.addEventListener("DOMContentLoaded", function () {
    // Menangani login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Mencegah reload halaman

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "admin123") {
                alert("Login berhasil!");
                window.location.href = "Dashboard/dashboard.html"; // Redirect ke halaman dashboard
            } else {
                alert("Username atau Password salah!");
            }
        });
    }

    // Menangani logout dari halaman dashboard
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            window.location.href = "../index.html"; // Redirect ke halaman login
        });
    }
});
