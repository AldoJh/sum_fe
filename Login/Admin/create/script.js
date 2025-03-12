document.addEventListener("DOMContentLoaded", function () {
    // Menangani logout dari halaman admin
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        window.location.href = "Login/login.html"; // Redirect ke halaman login
      });
    }

    // Pilih file gambar
    document.getElementById("chooseFileBtn").addEventListener("click", function () {
        document.getElementById("fileInput").click();
    });

    // Menangani submit form
    document.getElementById("editForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Data telah disimpan!");
    });
});
