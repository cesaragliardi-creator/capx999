// js/map.js — Mapa interativo com Leaflet (zoom, pan, clique)

const MapModule = (() => {
  let map = null;
  let farmMarkers = [];
  let animalMarkers = [];
  let animalLayers = {};

  const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const TILE_ATTR = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>';

  const VIEWS = {
    world:  { center: [42.0, -5.0], zoom: 5 },
    europe: { center: [46.0,  8.0], zoom: 4 },
    farm:   { center: [39.7, -8.2], zoom: 10 }
  };

  function scoreColor(s) {
    if (s < 0.3)  return '#1D9E75';
    if (s < 0.8)  return '#EF9F27';
    if (s < 1.2)  return '#D85A30';
    return '#E24B4A';
  }

  function scoreZone(s) {
    if (s < 0.3)  return 'Saudável';
    if (s < 0.8)  return 'Atenção';
    if (s < 1.2)  return 'Agir';
    return 'Crítico';
  }

  function makeFarmIcon(active) {
    const color = active ? '#378ADD' : '#B5D4F4';
    const pulse = active ? `<circle cx="14" cy="14" r="13" fill="${color}" opacity="0.18"/>` : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      ${pulse}
      <circle cx="14" cy="14" r="8" fill="${color}" opacity="0.35"/>
      <circle cx="14" cy="14" r="5" fill="${color}" stroke="white" stroke-width="2"/>
    </svg>`;
    return L.divIcon({ html: svg, className: '', iconSize: [28,28], iconAnchor: [14,14], popupAnchor: [0,-14] });
  }

  function makeAnimalIcon(score, status) {
    const color = scoreColor(score);
    const pulse = status === 'warn'
      ? `<circle cx="14" cy="14" r="13" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5"/>` : '';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
      ${pulse}
      <circle cx="14" cy="14" r="9" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="14" y="18" text-anchor="middle" font-size="8" font-weight="700" fill="white" font-family="sans-serif">${score.toFixed(1)}</text>
    </svg>`;
    return L.divIcon({ html: svg, className: '', iconSize: [28,28], iconAnchor: [14,14], popupAnchor: [0,-14] });
  }

  function init() {
    const container = document.getElementById('leafletMap');
    if (!container || map) return;

    map = L.map('leafletMap', {
      center: VIEWS.world.center,
      zoom: VIEWS.world.zoom,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true,
      touchZoom: true
    });

    L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 18 }).addTo(map);

    drawFarms();
    drawAnimals();
    renderFarmList();
    renderMapAnimalList();
  }

  function drawFarms() {
    farmMarkers.forEach(m => map && map.removeLayer(m));
    farmMarkers = [];
    FARMS.forEach(f => {
      const marker = L.marker([f.lat, f.lon], { icon: makeFarmIcon(f.active) });
      marker.bindPopup(`
        <div style="font-family:sans-serif;font-size:13px;min-width:160px;">
          <div style="font-weight:600;margin-bottom:4px;">${f.name}</div>
          <div style="color:#555;">${f.active ? f.units+' unidades activas' : 'Expansão prevista 2027'}</div>
          <div style="color:#888;font-size:11px;margin-top:2px;">${f.country}</div>
        </div>`, { maxWidth: 220 });
      marker.addTo(map);
      farmMarkers.push(marker);
    });
  }

  function drawAnimals() {
    animalMarkers.forEach(m => map && map.removeLayer(m));
    animalMarkers = [];
    animalLayers = {};
    ANIMALS.forEach(a => {
      const marker = L.marker([a.lat, a.lon], { icon: makeAnimalIcon(a.score, a.status) });
      const zone = scoreZone(a.score);
      const color = scoreColor(a.score);
      marker.bindPopup(`
        <div style="font-family:sans-serif;font-size:13px;min-width:180px;">
          <div style="font-weight:600;margin-bottom:4px;">${a.emoji} ${a.name}</div>
          <div style="color:${color};font-weight:600;">D/M* = ${a.score.toFixed(2)} · ${zone}</div>
          <div style="color:#555;margin-top:4px;">${a.local} · ${a.country}</div>
          <div style="color:#888;font-size:11px;margin-top:2px;">Temp: ${a.temp} · ${a.lactation} lactação</div>
          <div style="margin-top:8px;">
            <button onclick="AppState.selectAnimal(${a.id})" style="background:${color};color:white;border:none;border-radius:5px;padding:5px 10px;font-size:11px;cursor:pointer;width:100%;">Ver ficha completa</button>
          </div>
        </div>`, { maxWidth: 220 });
      marker.on('click', () => map.setView([a.lat, a.lon], Math.max(map.getZoom(), 10)));
      marker.addTo(map);
      animalMarkers.push(marker);
      animalLayers[a.id] = marker;
    });
  }

  function setView(v) {
    if (!map) return;
    const vw = VIEWS[v] || VIEWS.world;
    map.flyTo(vw.center, vw.zoom, { duration: 1.2 });
  }

  function focusAnimal(id) {
    const a = ANIMALS.find(x => x.id === id);
    if (!a || !map) return;
    map.flyTo([a.lat, a.lon], 12, { duration: 1 });
    setTimeout(() => { if (animalLayers[id]) animalLayers[id].openPopup(); }, 1100);
  }

  function renderFarmList() {
    const el = document.getElementById('farmList');
    if (!el) return;
    el.innerHTML = FARMS.map(f => `
      <div class="farm-item" style="cursor:pointer;" onclick="MapModule.setView('farm')">
        <div class="farm-name">${f.active ? '🟢' : '⚪'} ${f.name}</div>
        <div class="farm-meta">${f.active ? f.units+' unidades · activa' : 'Expansão prevista'} · ${f.country}</div>
      </div>`).join('');
  }

  function renderMapAnimalList() {
    const el = document.getElementById('mapAnimalList');
    if (!el) return;
    el.innerHTML = ANIMALS.map(a => `
      <div class="farm-item" style="cursor:pointer;" onclick="MapModule.focusAnimal(${a.id})">
        <div class="farm-name">${a.emoji} ${a.name}</div>
        <div class="farm-meta" style="color:${scoreColor(a.score)}">D/M* = ${a.score.toFixed(2)} · ${a.local}</div>
      </div>`).join('');
  }

  return { init, setView, focusAnimal, drawAnimals };
})();

function setMapView(v) { MapModule.setView(v); }
