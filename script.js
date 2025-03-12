document.addEventListener("DOMContentLoaded", function () {
    // ======================= Dropdown Menu =======================
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownMenu = document.getElementById("dropdown-menu");

    dropdownButton?.addEventListener("click", () => {
        dropdownMenu?.classList.toggle("hidden");
    });

    // ======================= Scroll to Footer =======================
    document.getElementById("scrollToFooter")?.addEventListener("click", () => {
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    });

    // ======================= Inisialisasi Peta =======================
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    var map = L.map("map").setView([-2.5489, 118.0149], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    var markers = L.layerGroup().addTo(map);

    // ======================= Custom Icons =======================
    const icons = {
        billboard: L.icon({ iconUrl: "Asset/blue.png", iconSize: [60, 65] }),
        baliho: L.icon({ iconUrl: "Asset/red.png", iconSize: [60, 65] }),
        videotron: L.icon({ iconUrl: "Asset/green.png", iconSize: [60, 65] })
    };

     // ======================= Data Lokasi =======================
     const locations = {
        billboard: [
            {
                code: "BB-JKT-001",
                name: "Billboard Jakarta",
                description: "Billboard di pusat kota Jakarta.",
                image: "./Asset/billboard.jpg",
                province: "DKI Jakarta",
                regency: "Jakarta Pusat",
                city: "Jakarta",
                street: "Jl. Sudirman No.10",
                size: "10m x 5m",
                type: "billboard",
                lightType: "LED",
                coordinates: { lat: -6.200, lng: 106.816 },
                trafficVolume: "50,000 kendaraan/hari",
                poleOwner: "PT. Media Outdoor",
                rentalStatus: "Rented",
                renter: "PT. Iklan Sejahtera",
                rentalDuration: "12 bulan"
            }
        ],
        baliho: [
            {
                code: "BH-BDG-001",
                name: "Baliho Bandung",
                description: "Baliho di pusat kota Bandung.",
                image: "./Asset/baliho.jpg",
                province: "Jawa Barat",
                regency: "Bandung",
                city: "Bandung",
                street: "Jl. Asia Afrika No.20",
                size: "8m x 4m",
                type: "baliho",
                lightType: "Halogen",
                coordinates: { lat: -6.917, lng: 107.619 },
                trafficVolume: "40,000 kendaraan/hari",
                poleOwner: "PT. Visual Media",
                rentalStatus: "Available",
                renter: "-",
                rentalDuration: "-"
            }
        ],
        videotron: [
            {
                code: "VT-BALI-001",
                name: "Videotron Bali",
                description: "Videotron modern di Bali.",
                image: "./Asset/videotron.jpg",
                province: "Bali",
                regency: "Denpasar",
                city: "Denpasar",
                street: "Jl. Sunset Road No.15",
                size: "12m x 6m",
                type: "videotron",
                lightType: "LED",
                coordinates: { lat: -8.670, lng: 115.212 },
                trafficVolume: "60,000 kendaraan/hari",
                poleOwner: "PT. Digital Vision",
                rentalStatus: "Rented",
                renter: "PT. Promo Bali",
                rentalDuration: "24 bulan"
            }
        ]
    };

    // ======================= Fungsi Tambah Marker =======================
    function addMarkers(category) {
        markers.clearLayers();
        locations[category]?.forEach(data => {
            if (!data.coordinates) return;
            var marker = L.marker([data.coordinates.lat, data.coordinates.lng], { icon: icons[category] })
                .bindPopup(`
                   <div style="display: flex; gap: 30px; max-width: 900px; align-items: center; padding: 10px;">
                        <img src="${data.image}" alt="${data.name}" style="width: 65%; border-radius: 5px;">
                        <div>
                            <h3>${data.name}</h3>
                            <p><strong>Kode:</strong> ${data.code}</p>
                            <p><strong>Provinsi:</strong> ${data.province}</p>
                            <p><strong>Kota:</strong> ${data.city}</p>
                            <p><strong>Jalan:</strong> ${data.street}</p>
                            <p><strong>Ukuran:</strong> ${data.size}</p>
                            <p><strong>Tipe Pencahayaan:</strong> ${data.lightType}</p>
                            <p><strong>Volume Lalu Lintas:</strong> ${data.trafficVolume}</p>
                            <p><strong>Pemilik Tiang:</strong> ${data.poleOwner}</p>
                            <p><strong>Status Sewa:</strong> ${data.rentalStatus}</p>
                            <p><strong>Penyewa:</strong> ${data.renter}</p>
                            <p><strong>Durasi Sewa:</strong> ${data.rentalDuration}</p>
                            <a href="./${data.type}.html?code=${data.code}" style="display: block; background-color: orange; color: white; text-align: center; padding: 10px; border-radius: 5px; text-decoration: none; font-weight: bold;">Show More</a>
                        </div>
                    </div>`);
            markers.addLayer(marker);
        });
        map.addLayer(markers);
    }

    document.getElementById("btnBillboard")?.addEventListener("click", () => addMarkers("billboard"));
    document.getElementById("btnBaliho")?.addEventListener("click", () => addMarkers("baliho"));
    document.getElementById("btnVideotron")?.addEventListener("click", () => addMarkers("videotron"));

    // ======================= Detail Lokasi (Klik Gambar) =======================
    const images = document.querySelectorAll(".location-img");
    const locationDetail = document.getElementById("location-detail");
    const locationImage = document.getElementById("locationImage");
    const locationName = document.getElementById("locationName");
    const locationDescription = document.getElementById("locationDescription");
    const navigateButton = document.getElementById("navigateButton");
    const closeDetail = document.getElementById("closeDetail");

    images.forEach(image => {
        image.addEventListener("click", function () {
            const type = this.getAttribute("data-type");

            if (locations[type] && locations[type][0]) {
                const data = locations[type][0];
                locationImage.src = data.image;
                locationName.textContent = data.name;
                locationDescription.textContent = data.description;
                navigateButton.href = `./${data.type}.html?code=${data.code}`;
                locationDetail.classList.remove("hidden");
            }
        });
    });

    // ======================= Tutup Detail Lokasi =======================
    closeDetail?.addEventListener("click", function () {
        locationDetail.classList.add("hidden");
    });

    locationDetail?.addEventListener("click", function (event) {
        if (event.target === locationDetail) {
            locationDetail.classList.add("hidden");
        }
    });
});
