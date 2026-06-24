// ===== SAMPLE DATA =====
const places = [
    {
        id: 1,
        name: "Biblioteka e Fierit",
        type: "library",
        emoji: "📚",
        lat: 40.7239,
        lng: 19.5567,
        crowd: 2,
        noise: 1,
        checkins: 342,
        lastCheckins: [
            { name: "Sara", time: "5 mins ago" },
            { name: "Mira", time: "15 mins ago" },
            { name: "Elsa", time: "30 mins ago" }
        ]
    },
    {
        id: 2,
        name: "Parku Qendror",
        type: "park",
        emoji: "🌳",
        lat: 40.7260,
        lng: 19.5590,
        crowd: 1,
        noise: 2,
        checkins: 189,
        lastCheckins: [
            { name: "Joni", time: "10 mins ago" },
            { name: "Lisa", time: "25 mins ago" },
            { name: "Dani", time: "40 mins ago" }
        ]
    },
    {
        id: 3,
        name: "Kafja Qetësia",
        type: "cafe",
        emoji: "☕",
        lat: 40.7220,
        lng: 19.5550,
        crowd: 3,
        noise: 2,
        checkins: 256,
        lastCheckins: [
            { name: "Aleks", time: "2 mins ago" },
            { name: "Sonia", time: "12 mins ago" },
            { name: "Tomi", time: "35 mins ago" }
        ]
    },
    {
        id: 4,
        name: "Salla e Leximit Bregdet",
        type: "library",
        emoji: "📖",
        lat: 40.7250,
        lng: 19.5610,
        crowd: 1,
        noise: 1,
        checkins: 428,
        lastCheckins: [
            { name: "Rezi", time: "7 mins ago" },
            { name: "Kris", time: "22 mins ago" },
            { name: "Nina", time: "45 mins ago" }
        ]
    },
    {
        id: 5,
        name: "Sheshi Çlirimtarëve",
        type: "park",
        emoji: "🌸",
        lat: 40.7245,
        lng: 19.5530,
        crowd: 2,
        noise: 1,
        checkins: 195,
        lastCheckins: [
            { name: "Marko", time: "8 mins ago" },
            { name: "Julia", time: "18 mins ago" },
            { name: "Oli", time: "50 mins ago" }
        ]
    },
    {
        id: 6,
        name: "Kafja e Qetë",
        type: "cafe",
        emoji: "🍰",
        lat: 40.7210,
        lng: 19.5580,
        crowd: 2,
        noise: 2,
        checkins: 312,
        lastCheckins: [
            { name: "Luna", time: "4 mins ago" },
            { name: "Ryan", time: "16 mins ago" },
            { name: "Zoe", time: "38 mins ago" }
        ]
    }
];

// ===== DOM ELEMENTS =====
const placesGrid = document.getElementById('placesGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('placeModal');
const closeModal = document.querySelector('.close-modal');
const ctaButton = document.getElementById('ctaButton');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

// ===== MAP STATE =====
let map = null;
let markers = [];

// ===== STATE =====
let currentFilter = 'all';
let currentPlace = null;

// ===== INITIALIZE =====
// Wait for window load (not just DOMContentLoaded) so Leaflet is ready
window.addEventListener('load', () => {
    initializeMap();
    renderPlaces();
    setupEventListeners();
    animateElements();
});

// ===== INITIALIZE LEAFLET MAP =====
function initializeMap() {
    if (typeof L === 'undefined') {
        console.error('Leaflet not loaded yet');
        return;
    }

    const centerLat = 40.7239;
    const centerLng = 19.5567;

    map = L.map('leaflet-map').setView([centerLat, centerLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    places.forEach(place => {
        createMapMarker(place);
    });

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

// ===== CREATE MAP MARKER =====
function createMapMarker(place) {
    const crowdColor = place.crowd <= 2 ? '#A8C5A0' : place.crowd === 3 ? '#E8C89C' : '#D4B8A0';

    const customIcon = L.divIcon({
        html: `
            <div style="
                background-color: ${crowdColor};
                border: 3px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                cursor: pointer;
            ">
                ${place.emoji}
            </div>
        `,
        iconSize: [40, 40],
        className: 'custom-marker'
    });

    const marker = L.marker([place.lat, place.lng], { icon: customIcon }).addTo(map);

    const popupHTML = `
        <div style="font-family: 'Playfair Display', serif; width: 220px;">
            <h3 style="margin: 0 0 0.5rem 0; color: #1A2E10; font-size: 1rem;">${place.name}</h3>
            <p style="margin: 0.3rem 0; color: #8C916C; font-size: 0.9rem;"><strong>Type:</strong> ${capitalizeType(place.type)}</p>
            <p style="margin: 0.3rem 0; color: #8C916C; font-size: 0.9rem;"><strong>Check-ins:</strong> ${place.checkins}</p>
            <button onclick="openModalFromMap(${place.id})" style="
                width: 100%;
                margin-top: 0.8rem;
                padding: 0.5rem;
                background-color: #4A6741;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.9rem;
                font-family: 'Playfair Display', serif;
            ">View Details</button>
        </div>
    `;

    marker.bindPopup(popupHTML);
    markers.push(marker);
}

// ===== OPEN MODAL FROM MAP =====
function openModalFromMap(placeId) {
    const place = places.find(p => p.id === placeId);
    if (place) {
        openModal(place);
    }
}

// ===== RENDER PLACES =====
function renderPlaces(filter = 'all') {
    placesGrid.innerHTML = '';

    let filteredPlaces = places;
    if (filter !== 'all') {
        filteredPlaces = places.filter(place => place.type === filter);
    }

    filteredPlaces.forEach((place, index) => {
        const placeCard = createPlaceCard(place);
        placesGrid.appendChild(placeCard);
        setTimeout(() => {
            placeCard.style.animation = `slideIn 0.5s ease forwards`;
        }, index * 50);
    });
}

// ===== CREATE PLACE CARD =====
function createPlaceCard(place) {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.innerHTML = `
        <div class="place-image">
            <span>${place.emoji}</span>
        </div>
        <div class="place-content">
            <h3>${place.name}</h3>
            <span class="place-type">${capitalizeType(place.type)}</span>
            <div class="place-details">
                <div class="detail-row">
                    <span class="detail-label">👥 Crowd Level:</span>
                    <div class="crowd-level">
                        ${generateCrowdDots(place.crowd)}
                    </div>
                </div>
                <div class="detail-row">
                    <span class="detail-label">🔊 Noise Level:</span>
                    <div class="noise-indicator">
                        ${generateNoiseBars(place.noise)}
                    </div>
                </div>
            </div>
            <div class="place-footer">
                <div class="checkin-count">✓ ${place.checkins} people checked in</div>
                <button class="place-btn">View Details</button>
            </div>
        </div>
    `;
    card.addEventListener('click', () => openModal(place));
    return card;
}

// ===== GENERATE CROWD DOTS =====
function generateCrowdDots(level) {
    let dots = '';
    for (let i = 1; i <= 5; i++) {
        dots += `<div class="crowd-dot ${i <= level ? 'filled' : ''}"></div>`;
    }
    return dots;
}

// ===== GENERATE NOISE BARS =====
function generateNoiseBars(level) {
    let bars = '';
    for (let i = 1; i <= 5; i++) {
        bars += `<div class="noise-bar ${i <= level ? 'active' : ''}"></div>`;
    }
    return bars;
}

// ===== CAPITALIZE TYPE =====
function capitalizeType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            renderPlaces(currentFilter);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    document.getElementById('checkinBtn').addEventListener('click', () => {
        showNotification(`✓ You've checked in to ${currentPlace.name}!`);
        currentPlace.checkins++;
        modal.classList.remove('show');
        renderPlaces(currentFilter);
    });

    document.getElementById('bookBtn').addEventListener('click', () => {
        showNotification(`🎫 Booking feature coming soon for ${currentPlace.name}!`);
    });

    ctaButton.addEventListener('click', () => {
        document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.style.display = navToggle.classList.contains('active') ? 'flex' : 'none';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '1rem';
        navLinks.style.padding = '1.5rem 2rem';
        navLinks.style.backgroundColor = '#FFFFFF';
        navLinks.style.boxShadow = '0 5px 15px rgba(154, 197, 187, 0.1)';
        navLinks.style.zIndex = '999';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.style.display = 'none';
        });
    });
}

// ===== OPEN MODAL =====
function openModal(place) {
    currentPlace = place;
    document.getElementById('modalTitle').textContent = place.name;
    document.getElementById('modalType').textContent = capitalizeType(place.type);
    document.getElementById('modalCrowd').innerHTML = generateCrowdDots(place.crowd);
    document.getElementById('modalNoise').innerHTML = generateNoiseBars(place.noise);

    const checkinsHtml = place.lastCheckins
        .map(checkin => `<div style="margin-bottom: 0.5rem;"><strong>${checkin.name}</strong> - ${checkin.time}</div>`)
        .join('');
    document.getElementById('modalCheckins').innerHTML = checkinsHtml;

    modal.classList.add('show');
}

// ===== NOTIFICATION =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4A6741;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(74, 103, 65, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-family: 'Playfair Display', serif;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ANIMATIONS =====
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.step-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.stat').forEach(stat => observer.observe(stat));
}

// ===== REAL-TIME SIMULATION =====
setInterval(() => {
    places.forEach(place => {
        place.crowd = Math.floor(Math.random() * 4) + 1;
        place.noise = Math.floor(Math.random() * 3) + 1;
        if (Math.random() > 0.7) place.checkins += 1;
    });
    if (!modal.classList.contains('show')) {
        renderPlaces(currentFilter);
    }
}, 30000);

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
    }
});

// ===== ACCESSIBILITY =====
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && modal.classList.contains('show')) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }
    }
});

// ===== ADDITIONAL ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('QuietSpace Finder initialized');
