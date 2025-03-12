document.addEventListener("DOMContentLoaded", function () {
    // Menangani login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Mencegah reload halaman

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username === "admin" && password === "super123") {
                alert("Login berhasil! Masuk ke halaman Super Admin.");
                window.location.href = "Admin/admin.html"; // Redirect ke halaman super admin
            } else if (username === "admin" && password === "admin123") {
                alert("Login berhasil! Masuk ke Dashboard Admin.");
                window.location.href = "Dashboard/dashboard.html"; // Redirect ke halaman admin
            } else {
                alert("Username atau Password salah!");
            }
        });
    }

    // Menangani logout dari halaman dashboard
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            window.location.href = "../login.html"; // Redirect ke halaman login
        });
    }
});
