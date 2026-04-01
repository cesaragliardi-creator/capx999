// ─── MAPA LEAFLET ────────────────────────────────────────────────────────────
const MapModule = (() => {
  let map=null, farmMarkers=[], animalMarkers=[], animalLayers={};
  const VIEWS = {
    world:  { center:[40.0,-5.0], zoom:5 },
    europe: { center:[46.0, 8.0], zoom:4 },
    farm:   { center:[40.2,-8.3], zoom:9 }
  };
  function mkFarmIcon(active) {
    const c=active?'#378ADD':'#B5D4F4';
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">${active?`<circle cx="14" cy="14" r="13" fill="${c}" opacity="0.18"/>`:''}
      <circle cx="14" cy="14" r="8" fill="${c}" opacity="0.35"/><circle cx="14" cy="14" r="5" fill="${c}" stroke="white" stroke-width="2"/></svg>`;
    return L.divIcon({ html:svg, className:'', iconSize:[28,28], iconAnchor:[14,14], popupAnchor:[0,-14] });
  }
  function mkAnimalIcon(score, status) {
    const c=Predictor.scoreColor(score);
    const pulse=status==='warn'?`<circle cx="14" cy="14" r="13" fill="none" stroke="${c}" stroke-width="1.5" opacity="0.5"/>`:'';
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">${pulse}
      <circle cx="14" cy="14" r="9" fill="${c}" stroke="white" stroke-width="2"/>
      <text x="14" y="18" text-anchor="middle" font-size="8" font-weight="700" fill="white" font-family="sans-serif">${score.toFixed(1)}</text></svg>`;
    return L.divIcon({ html:svg, className:'', iconSize:[28,28], iconAnchor:[14,14], popupAnchor:[0,-14] });
  }
  function init() {
    const el=document.getElementById('leafletMap');
    if(!el||map) return;
    map=L.map('leafletMap',{ center:VIEWS.world.center, zoom:VIEWS.world.zoom, zoomControl:true, scrollWheelZoom:true, dragging:true, touchZoom:true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution:'&copy; OpenStreetMap', maxZoom:18 }).addTo(map);
    drawFarms(); drawAnimals(); renderFarmList(); renderMapAnimalList();
  }
  function drawFarms() {
    farmMarkers.forEach(m=>map&&map.removeLayer(m)); farmMarkers=[];
    FARMS.forEach(f=>{
      const m=L.marker([f.lat,f.lon],{icon:mkFarmIcon(f.active)});
      m.bindPopup(`<div style="font-family:sans-serif;font-size:13px;min-width:160px;"><b>${f.name}</b><br>${f.active?f.units+' unidades activas':'Expansão prevista 2027'}<br><span style="color:#888;font-size:11px;">${f.country}</span></div>`,{maxWidth:220});
      m.addTo(map); farmMarkers.push(m);
    });
  }
  function drawAnimals() {
    animalMarkers.forEach(m=>map&&map.removeLayer(m)); animalMarkers={}; animalLayers={};
    ANIMALS.forEach(a=>{
      const c=Predictor.scoreColor(a.score);
      const al=Predictor.alertLevel(Predictor.computeRisk(a).ratio);
      const m=L.marker([a.lat,a.lon],{icon:mkAnimalIcon(a.score,a.status)});
      m.bindPopup(`<div style="font-family:sans-serif;font-size:13px;min-width:180px;">
        <b>${a.emoji} ${a.name}</b><br>
        <span style="color:${c};font-weight:600;">D/M* = ${a.score.toFixed(2)} · ${al.label}</span><br>
        <span style="color:#555;">${a.local} · ${a.country}</span><br>
        <span style="color:#888;font-size:11px;">Temp: ${a.temp} · ${a.lactation} lactação</span><br>
        <button onclick="AppState.selectAnimal(${a.id})" style="margin-top:8px;background:${c};color:white;border:none;border-radius:5px;padding:5px 10px;font-size:11px;cursor:pointer;width:100%;">Ver ficha completa</button>
      </div>`,{maxWidth:220});
      m.addTo(map); animalLayers[a.id]=m;
    });
  }
  function setView(v) {
    if(!map) return;
    const vw=VIEWS[v]||VIEWS.world;
    map.flyTo(vw.center, vw.zoom, {duration:1.2});
  }
  function focusAnimal(id) {
    const a=ANIMALS.find(x=>x.id===id);
    if(!a||!map) return;
    map.flyTo([a.lat,a.lon],12,{duration:1});
    setTimeout(()=>{ if(animalLayers[id]) animalLayers[id].openPopup(); },1100);
  }
  function renderFarmList() {
    const el=document.getElementById('farmList'); if(!el) return;
    el.innerHTML=FARMS.map(f=>`<div class="farm-item" onclick="MapModule.setView('farm')">
      <div class="farm-name">${f.active?'🟢':'⚪'} ${f.name}</div>
      <div class="farm-meta">${f.active?f.units+' unidades · activa':'Expansão prevista'} · ${f.country}</div>
    </div>`).join('');
  }
  function renderMapAnimalList() {
    const el=document.getElementById('mapAnimalList'); if(!el) return;
    el.innerHTML=ANIMALS.map(a=>`<div class="farm-item" onclick="MapModule.focusAnimal(${a.id})">
      <div class="farm-name">${a.emoji} ${a.name}</div>
      <div class="farm-meta" style="color:${Predictor.scoreColor(a.score)}">D/M* = ${a.score.toFixed(2)} · ${a.local}</div>
    </div>`).join('');
  }
  return { init, setView, focusAnimal, drawAnimals };
})();
function setMapView(v) { MapModule.setView(v); }

