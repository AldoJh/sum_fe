document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const locationCode = urlParams.get("code");

    const locations = {
        "BB-JKT-001": {
            name: "Billboard Jakarta",
            description: "Billboard di pusat kota Jakarta.",
            image: "./Asset/billboard.jpg",
            province: "DKI Jakarta",
            regency: "Jakarta Pusat",
            city: "Jakarta",
            street: "Jl. Sudirman No.10",
            size: "10m x 5m",
            type: "Billboard",
            lightType: "LED",
            coordinates: { lat: -6.200, lng: 106.816 },
            trafficVolume: "50,000 kendaraan/hari",
            poleOwner: "PT. Media Outdoor",
            rentalStatus: "Rented",
            renter: "PT. Iklan Sejahtera",
            rentalDuration: "12 bulan"
        },
        "BH-BDG-001": {
            name: "Baliho Bandung",
            description: "Baliho di pusat kota Bandung.",
            image: "https://via.placeholder.com/800x400?text=Baliho+Bandung",
            province: "Jawa Barat",
            regency: "Bandung",
            city: "Bandung",
            street: "Jl. Asia Afrika No.20",
            size: "8m x 4m",
            type: "Baliho",
            lightType: "Halogen",
            coordinates: { lat: -6.917, lng: 107.619 },
            trafficVolume: "40,000 kendaraan/hari",
            poleOwner: "PT. Visual Media",
            rentalStatus: "Available",
            renter: "-",
            rentalDuration: "-"
        },
        "VT-BALI-001": {
            name: "Videotron Bali",
            description: "Videotron modern di Bali.",
            image: "https://via.placeholder.com/800x400?text=Videotron+Bali",
            province: "Bali",
            regency: "Denpasar",
            city: "Denpasar",
            street: "Jl. Sunset Road No.15",
            size: "12m x 6m",
            type: "Videotron",
            lightType: "LED",
            coordinates: { lat: -8.670, lng: 115.212 },
            trafficVolume: "60,000 kendaraan/hari",
            poleOwner: "PT. Digital Vision",
            rentalStatus: "Rented",
            renter: "PT. Promo Bali",
            rentalDuration: "24 bulan"
        }
    };

    if (locationCode && locations[locationCode]) {
        const location = locations[locationCode];

        // Mengisi elemen HTML dengan data lokasi
        document.getElementById("locationName").textContent = location.name;
        document.getElementById("locationImage").src = location.image;
        document.getElementById("locationDescription").textContent = location.description;

        document.getElementById("locationProvince").textContent = location.province;
        document.getElementById("locationRegency").textContent = location.regency;
        document.getElementById("locationCity").textContent = location.city;
        document.getElementById("locationStreet").textContent = location.street;
        document.getElementById("locationSize").textContent = location.size;
        document.getElementById("locationType").textContent = location.type;
        document.getElementById("locationLight").textContent = location.lightType;
        document.getElementById("trafficVolume").textContent = location.trafficVolume;
        document.getElementById("poleOwner").textContent = location.poleOwner;
        document.getElementById("rentalStatus").textContent = location.rentalStatus;
        document.getElementById("renter").textContent = location.renter;
        document.getElementById("rentalDuration").textContent = location.rentalDuration;

        // Menampilkan Peta
        var map = L.map('map').setView([location.coordinates.lat, location.coordinates.lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([location.coordinates.lat, location.coordinates.lng]).addTo(map)
            .bindPopup(location.name)
            .openPopup();

        // Tombol navigasi ke Google Maps
        const navigateButton = document.getElementById("navigateButton");
        navigateButton.href = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
    } else {
        document.querySelector(".container").innerHTML = "<h2 class='text-red-500 text-2xl'>Lokasi tidak ditemukan.</h2>";
    }
});
