document.addEventListener("DOMContentLoaded", function () {
    // ======================= Dropdown Menu =======================
    function setupDropdownMenu() {
        const dropdownButton = document.getElementById("dropdownButton");
        const dropdownMenu = document.getElementById("dropdown-menu");

        dropdownButton?.addEventListener("click", (event) => {
            event.stopPropagation(); // Hindari event dari bubbling ke document
            dropdownMenu?.classList.toggle("hidden");
        });

        document.addEventListener("click", (event) => {
            if (!dropdownMenu?.contains(event.target) && !dropdownButton?.contains(event.target)) {
                dropdownMenu?.classList.add("hidden");
            }
        });
    }

    setupDropdownMenu();

    // ======================= Scroll to Footer =======================
    document.getElementById("scrollToFooter")?.addEventListener("click", () => {
        document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    });

    // ======================= Image Slider =======================
    function initializeSlider() {
        let slideIndex = 0;
        const slides = document.querySelectorAll("#slider .min-w-full");
        const totalSlides = slides.length;
        const slider = document.getElementById("slider");

        function showSlide(index) {
            slider?.style.setProperty("transform", `translateX(${-index * 100}%)`);
        }

        if (totalSlides > 0) {
            setInterval(() => {
                slideIndex = (slideIndex + 1) % totalSlides;
                showSlide(slideIndex);
            }, 3000);
        }
    }

    initializeSlider();

    // ======================= Initialize Map =======================
    function initializeMap() {
        const mapElement = document.getElementById("map");
        if (!mapElement) return null;

        const map = L.map("map").setView([-2.5489, 118.0149], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

        // Add Search Box to Map
        const searchBox = L.control({ position: "topright" });
        searchBox.onAdd = function () {
            const div = L.DomUtil.create("div", "search-container");
            div.innerHTML = `
                <div class="relative flex items-center bg-white rounded-full shadow-lg p-2">
                    <input type="text" id="searchBox" placeholder="Search keyword" class="px-4 py-2 rounded-full outline-none w-64">
                    <button id="searchButton" class="ml-2 px-4 py-2 bg-orange-400 text-white rounded-full">Search</button>
                </div>
            `;
            return div;
        };
        searchBox.addTo(map);

        return map;
    }

    const map = initializeMap();
    const markers = L.layerGroup().addTo(map);

    // ======================= Custom Icons =======================
    const icons = {
        billboard: L.icon({ iconUrl: "Asset/blue.png", iconSize: [60, 65] }),
        baliho: L.icon({ iconUrl: "Asset/red.png", iconSize: [60, 65] }),
        videotron: L.icon({ iconUrl: "Asset/green.png", iconSize: [60, 65] }),
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
                city: "Jakarta",
                street: "Jl. Sudirman No.10",
                size: "10m x 5m",
                type: "billboard",
                lightType: "LED",
                coordinates: { lat: -6.200, lng: 106.816 },
                rentalStatus: "Rented",
            }
        ],
        baliho: [
            {
                code: "BH-BDG-001",
                name: "Baliho Bandung",
                description: "Baliho di pusat kota Bandung.",
                image: "./Asset/baliho.jpg",
                province: "Jawa Barat",
                city: "Bandung",
                street: "Jl. Asia Afrika No.20",
                size: "8m x 4m",
                type: "baliho",
                lightType: "Halogen",
                coordinates: { lat: -6.917, lng: 107.619 },
                rentalStatus: "Available",
            }
        ],
        videotron: [
            {
                code: "VT-BALI-001",
                name: "Videotron Bali",
                description: "Videotron modern di Bali.",
                image: "./Asset/videotron.jpg",
                province: "Bali",
                city: "Denpasar",
                street: "Jl. Sunset Road No.15",
                size: "12m x 6m",
                type: "videotron",
                lightType: "LED",
                coordinates: { lat: -8.670, lng: 115.212 },
                rentalStatus: "Rented",
            }
        ]
    };

    function addMarkers(category) {
        markers.clearLayers();
        locations[category]?.forEach((data) => {
            if (!data.coordinates) return;
            const marker = L.marker([data.coordinates.lat, data.coordinates.lng], { icon: icons[category] }).bindPopup(`
                <div style="display: flex; gap: 15px; max-width: 400px; font-family: Arial, sans-sx x   erif; padding: 10px;">
                    <img src="${data.image}" alt="${data.name}" 
                        style="width: 40%; height: auto; max-height: 150px; object-fit: cover; border-radius: 5px;">
                    <div style="width: 60%;">
                    <h3>${data.name}</h3>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Kode Tiang:</strong> ${data.code}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Deskripsi:</strong> ${data.description}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Lokasi:</strong> ${data.street}, ${data.city}, ${data.province}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Ukuran:</strong> ${data.size}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Jenis Lampu:</strong> ${data.lightType}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Koordinat:</strong> ${data.coordinates.lat}, ${data.coordinates.lng}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Volume Kendaraan:</strong> ${data.trafficVolume} kendaraan/hari</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Pemilik Tiang:</strong> ${data.poleOwner}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Status Sewa:</strong> <span style="color: ${data.rentalStatus === 'Rented' ? 'red' : 'green'}; font-weight: bold;">${data.rentalStatus}</span></p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Nama Penyewa:</strong> ${data.renter}</p>
                        <p style="margin: 5px 0; font-size: 14px;"><strong>Lama Sewa:</strong> ${data.rentalDuration}</p>
                   <a href="./${data.type}.html?code=${data.code}" 
                            style="display: block; background-color: orange; color: white; text-align: center; padding: 10px; border-radius: 5px; text-decoration: none; font-weight: bold; margin-top: 10px;">
                            Show Details
            `);
            
            markers.addLayer(marker);
        });
        map.addLayer(markers);
    }

    document.getElementById("btnBillboard")?.addEventListener("click", () => addMarkers("billboard"));
    document.getElementById("btnBaliho")?.addEventListener("click", () => addMarkers("baliho"));
    document.getElementById("btnVideotron")?.addEventListener("click", () => addMarkers("videotron"));

    // ======================= Detail Lokasi (Klik Gambar) =======================
    function setupLocationDetails() {
        document.querySelectorAll(".location-img").forEach((image) => {
            image.addEventListener("click", function () {
                const type = this.getAttribute("data-type");
                const data = locations[type]?.[0];

                if (data) {
                    document.getElementById("locationImage").src = data.image;
                    document.getElementById("locationName").textContent = data.name;
                    document.getElementById("locationDescription").textContent = data.description;
                    document.getElementById("navigateButton").href = `./${data.type}.html?code=${data.code}`;
                    document.getElementById("location-detail").classList.remove("hidden");
                }
            });
        });
    }

    setupLocationDetails();
});

