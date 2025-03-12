document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const locationCode = urlParams.get("code");

    const locations = {
        "BB-JKT-001": {
            coordinates: { lat: -6.200, lng: 106.816 },
            name: "Billboard Jakarta"
        },
        "BH-BDG-001": {
            coordinates: { lat: -6.917, lng: 107.619 },
            name: "Baliho Bandung"
        },
        "BH-BDG-001": {
            coordinates: { lat: -6.917, lng: 107.619 },
            name: "Baliho Bandung"
        }
        
    };

    if (locationCode && locations[locationCode]) {
        const location = locations[locationCode];

        var map = L.map('map').setView([location.coordinates.lat, location.coordinates.lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([location.coordinates.lat, location.coordinates.lng]).addTo(map)
            .bindPopup(location.name)
            .openPopup();
    }
});
