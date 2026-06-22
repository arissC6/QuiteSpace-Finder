// Simple prototype behavior: map, seed places, check-ins stored in localStorage

const seedPlaces = [
  { id: 'p1', name: 'Central Library', lat: 40.7128, lng: -74.0060, category: 'library',
    address: '123 Library St', hours: '9:00 - 18:00', wifi: true, outlets: true,
    description: 'Quiet reading rooms and free wifi.', photo: 'https://source.unsplash.com/collection/190727/800x600' },
  { id: 'p2', name: 'Riverside Park (North)', lat: 40.7154, lng: -74.0111, category: 'park',
    address: 'Riverside Dr', hours: '6:00 - 22:00', wifi: false, outlets: false,
    description: 'Green park with benches and river views.', photo: 'https://source.unsplash.com/collection/827743/800x600' },
  { id: 'p3', name: 'Cozy Cafe', lat: 40.7132, lng: -74.0085, category: 'cafe',
    address: '45 Coffee Ave', hours: '08:00 - 20:00', wifi: true, outlets: true,
    description: 'Small cafe with quiet corner seating.', photo: 'https://source.unsplash.com/collection/139386/800x600' }
]

// simple localStorage helpers
const CHECKIN_KEY = 'qsf_checkins'
const NOISE_KEY = 'qsf_noise_reports'

function loadCounts(){
  return JSON.parse(localStorage.getItem(CHECKIN_KEY)||'{}')
}
function saveCounts(obj){
  localStorage.setItem(CHECKIN_KEY, JSON.stringify(obj))
}
function loadNoise(){
  return JSON.parse(localStorage.getItem(NOISE_KEY)||'[]')
}
function saveNoise(a){ localStorage.setItem(NOISE_KEY, JSON.stringify(a)) }

let checkinCounts = loadCounts()
let noiseReports = loadNoise()

// init map
const map = L.map('map', { zoomControl: true }).setView([40.7135, -74.009], 15)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map)

const markers = {}
seedPlaces.forEach(p => {
  const marker = L.marker([p.lat, p.lng]).addTo(map)
  marker.bindPopup(`<strong>${p.name}</strong><br/><small>${p.category}</small>`)
  marker.on('click', ()=> openDetail(p.id))
  markers[p.id] = marker
})

// UI refs
const placeListEl = document.getElementById('placeList')
const locateBtn = document.getElementById('locateBtn')
const searchInput = document.getElementById('searchInput')

const detailEl = document.getElementById('detail')
const placeNameEl = document.getElementById('placeName')
const placePhotoEl = document.getElementById('placePhoto')
const placeDescEl = document.getElementById('placeDesc')
const placeAttrsEl = document.getElementById('placeAttrs')
const placeStatusEl = document.getElementById('placeStatus')
const placeCheckinsEl = document.getElementById('placeCheckins')
const checkinBtn = document.getElementById('checkinBtn')
const reportNoiseBtn = document.getElementById('reportNoiseBtn')
const noiseLevelSelect = document.getElementById('noiseLevel')
const closeDetailBtn = document.getElementById('closeDetail')

function renderList(filter=''){
  placeListEl.innerHTML = ''
  const q = filter.trim().toLowerCase()
  seedPlaces.forEach(p => {
    if(q && !(p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))) return
    const li = document.createElement('li')
    li.className = 'placeItem'
    li.innerHTML = `<div>
      <div><strong>${p.name}</strong></div>
      <div class="placeMeta">${p.category} • ${p.address}</div>
    </div>
    <div style="text-align:right">
      <div class="placeMeta">${getStatusText(p.id)}</div>
      <div style="font-weight:600">${getCount(p.id)} here</div>
    </div>`
    li.addEventListener('click', ()=> openDetail(p.id))
    placeListEl.appendChild(li)
  })
}

function getCount(placeId){
  return checkinCounts[placeId] || 0
}
function getStatusText(placeId){
  const c = getCount(placeId)
  if(c >= 4) return 'busy'
  if(c >= 1) return 'moderate'
  return 'quiet'
}

function openDetail(placeId){
  const p = seedPlaces.find(x=>x.id===placeId)
  if(!p) return
  placeNameEl.textContent = p.name
  placePhotoEl.src = p.photo
  placeDescEl.textContent = p.description
  placeAttrsEl.innerHTML = `<li><strong>Hours:</strong> ${p.hours}</li><li><strong>Wifi:</strong> ${p.wifi ? 'Yes' : 'No'}</li><li><strong>Outlets:</strong> ${p.outlets ? 'Yes' : 'No'}</li>`
  placeStatusEl.textContent = getStatusText(placeId)
  placeCheckinsEl.textContent = getCount(placeId)
  checkinBtn.onclick = ()=> doCheckin(placeId)
  reportNoiseBtn.onclick = ()=> reportNoise(placeId)
  detailEl.classList.remove('hidden')
  // center map
  map.setView([p.lat, p.lng], 17)
}

function closeDetail(){
  detailEl.classList.add('hidden')
}

function doCheckin(placeId){
  checkinCounts[placeId] = (checkinCounts[placeId] || 0) + 1
  saveCounts(checkinCounts)
  placeCheckinsEl.textContent = getCount(placeId)
  placeStatusEl.textContent = getStatusText(placeId)
  renderList(searchInput.value)
  // update marker popup
  const m = markers[placeId]
  if(m) m.bindPopup(`<strong>${seedPlaces.find(p=>p.id===placeId).name}</strong><br/><small>${getStatusText(placeId)}</small>`)
}

function reportNoise(placeId){
  const level = noiseLevelSelect.value
  noiseReports.push({ placeId, level, ts: Date.now() })
  saveNoise(noiseReports)
  alert('Thanks — noise reported. Trusted moderators can review reports.')
}

locateBtn.addEventListener('click', ()=>{
  if(!navigator.geolocation){ alert('Geolocation not supported') ; return }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords
    map.setView([latitude, longitude], 15)
    L.circle([latitude, longitude], { radius: 50, color:'#2b6cb0', fillOpacity:0.1 }).addTo(map)
  }, err => alert('Could not
