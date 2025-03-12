document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://localhost:3000/login", {
            email: email,
            password: password
        }, {
            withCredentials: true // 🔹 **WAJIB** agar cookie bisa dikirim & diterima
        });

        console.log(response.data);
        
        if (response.data.error) {
            alert(response.data.error);
        } else {
            alert("✅ Login berhasil!");
            document.cookie = `user=${JSON.stringify(response.data)}; path=/;`;
            window.location.href = "Dashboard/dashboard.html"; // Redirect setelah login
        }
    } catch (error) {
        console.error("❌ Login failed:", error);
        alert("Terjadi kesalahan saat login.");
    }
});


    // Toggle visibility password
    document.getElementById("togglePassword").addEventListener("click", function () {
        const passwordInput = document.getElementById("password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.classList.add("fa-eye-slash");
            this.classList.remove("fa-eye");
        } else {
            passwordInput.type = "password";
            this.classList.add("fa-eye");
            this.classList.remove("fa-eye-slash");
        }
    });

// Fungsi untuk mendapatkan cookie
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}
