// js/app.js — Controlador principal BoviWatch

const AppState = (() => {
  let selectedAnimalId = ANIMALS[0].id;

  function getSelectedAnimal() {
    return ANIMALS.find(a => a.id === selectedAnimalId) || ANIMALS[0];
  }

  function selectAnimal(id) {
    selectedAnimalId = id;
    renderAnimalGrid();
    renderAnimalDetail();
    ChartsModule.refreshAll(getSelectedAnimal());
  }

  return { get selectedAnimalId() { return selectedAnimalId; }, getSelectedAnimal, selectAnimal };
})();

// ─── INICIALIZAÇÃO ───────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderTopMetrics();
  renderAnimalGrid();
  MapModule.init();
  renderModules();
  renderMotorPreditivo();
  AlertsModule.render();
  ChartsModule.startRealtime(AppState.getSelectedAnimal.bind(AppState));

  // Carrega gráficos iniciais da aba activa
  setTimeout(() => {
    ChartsModule.buildBeforeAfter();
    ChartsModule.buildMilk(AppState.getSelectedAnimal());
    ChartsModule.buildDisease();
    ChartsModule.buildCost();
  }, 200);
});

// ─── MÉTRICAS DO TOPO ────────────────────────────────────────────────────────
function renderTopMetrics() {
  const healthy = ANIMALS.filter(a => a.status === "ok").length;
  const alerts  = ANIMALS.filter(a => a.status !== "ok").length;
  const avg     = (ANIMALS.reduce((s,a) => s + a.score, 0) / ANIMALS.length).toFixed(2);
  document.getElementById("topMetrics").innerHTML = [
    { val: ANIMALS.length, lbl:"Animais",    color:"#1a1a1a" },
    { val: healthy,        lbl:"Saudáveis",  color:"#1D9E75" },
    { val: alerts,         lbl:"Alertas",    color:"#EF9F27" },
    { val: avg,            lbl:"D/M* médio", color:"#1a1a1a" }
  ].map(m => `
    <div class="topbar-metric">
      <div class="topbar-metric-val" style="color:${m.color};">${m.val}</div>
      <div class="topbar-metric-lbl">${m.lbl}</div>
    </div>`).join("");
}

// ─── GRADE DE ANIMAIS ─────────────────────────────────────────────────────────
function renderAnimalGrid() {
  document.getElementById("animalGrid").innerHTML = ANIMALS.map(a => {
    const color = Predictor.scoreColor(a.score);
    const statusLabel = a.status === "ok" ? "Saudável" : a.status === "warn" ? "Atenção" : "Crítico";
    const badgeClass  = a.status === "ok" ? "green" : a.status === "warn" ? "amber" : "red";
    return `
      <div class="animal-card ${AppState.selectedAnimalId === a.id ? "selected" : ""}" onclick="AppState.selectAnimal(${a.id})">
        <div class="animal-avatar">
          ${a.photo ? `<img src="${a.photo}" alt="${a.name}">` : a.emoji}
        </div>
        <div class="animal-name">${a.name}</div>
        <div class="animal-id">${a.age} anos · ${a.local}</div>
        <div style="text-align:center;margin:4px 0;">
          <span class="badge ${badgeClass}">${statusLabel}</span>
        </div>
        <div class="animal-score" style="color:${color};">${a.score.toFixed(2)}</div>
        <div style="font-size:10px;color:#999;text-align:center;margin-top:2px;">Score D/M*</div>
        <div class="score-bar">
          <div class="score-fill" style="width:${Math.min(a.score/1.5*100,100).toFixed(0)}%;background:${color};"></div>
        </div>
      </div>`;
  }).join("");
}

// ─── DETALHE DO ANIMAL ────────────────────────────────────────────────────────
function renderAnimalDetail() {
  const a = AppState.getSelectedAnimal();
  const risk = Predictor.computeRisk(a);
  const desc = Predictor.describeAnimal(a);
  const el = document.getElementById("animalDetail");
  el.style.display = "block";
  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="font-size:40px;">${a.emoji}</div>
        <div>
          <div style="font-size:18px;font-weight:700;">${a.name}</div>
          <div style="font-size:13px;color:#666;">${a.local} · ${a.country} · Lactação ${a.lactation}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:28px;font-weight:700;color:${desc.riskColor};">${a.score.toFixed(2)}</div>
        <span class="badge ${a.status==='ok'?'green':a.status==='warn'?'amber':'red'}">${desc.riskLevel}</span>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-item"><div class="detail-label">Peso</div><div class="detail-value">${a.weight}</div></div>
      <div class="detail-item"><div class="detail-label">Temperatura</div><div class="detail-value" style="color:#D85A30;">${a.temp}</div></div>
      <div class="detail-item"><div class="detail-label">Ruminação</div><div class="detail-value">${a.rumination}</div></div>
      <div class="detail-item"><div class="detail-label">σ-field (24m)</div><div class="detail-value" style="color:#7F77DD;">${a.sigma.toFixed(2)}</div></div>
      <div class="detail-item"><div class="detail-label">φ-field (6m)</div><div class="detail-value" style="color:#D85A30;">${a.phi.toFixed(2)}</div></div>
      <div class="detail-item"><div class="detail-label">Previsão</div><div class="detail-value" style="font-size:12px;color:#1D9E75;">${desc.leadTime}</div></div>
    </div>
    <div style="margin-top:12px;padding:12px;background:#E1F5EE;border-radius:8px;font-size:13px;color:#0F6E56;">
      💡 <strong>Recomendação:</strong> ${desc.recommendation}
    </div>`;
}

// ─── MÓDULOS INOCROWD ─────────────────────────────────────────────────────────
function renderModules() {
  document.getElementById("modulesList").innerHTML = MODULES.map(m => `
    <div class="module-item">
      <div class="module-num">${m.num}</div>
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <div class="module-name">${m.name}</div>
          <span class="badge blue">${m.field}</span>
          <span class="badge ${m.status==='ok'?'green':'amber'}">${m.coverage}% cobertura</span>
        </div>
        <div class="module-desc">${m.desc}</div>
        <div style="height:4px;border-radius:2px;background:#f0f0f0;margin-top:8px;overflow:hidden;">
          <div style="height:100%;width:${m.coverage}%;background:${m.status==='ok'?'#1D9E75':'#EF9F27'};border-radius:2px;transition:width 0.6s;"></div>
        </div>
      </div>
    </div>`).join("");

  setTimeout(() => ChartsModule.buildRadar(), 100);
}

// ─── MOTOR PREDITIVO ──────────────────────────────────────────────────────────
function renderMotorPreditivo() {
  document.getElementById("motorGrid").innerHTML = `
    <div class="motor-card">
      <div class="motor-card-title">Estado quântico do animal</div>
      <div class="motor-formula">|Ψ(x)⟩ = cos(θ/2)|+1⟩<br>       + e^(iφ)sin(θ/2)|−1⟩</div>
      <div class="motor-sub">|+1⟩ = estado saudável · |−1⟩ = estado de risco<br>θ = ângulo de transição · φ = fase (memória de eventos)</div>
    </div>
    <div class="motor-card">
      <div class="motor-card-title">Operador universal de supressão</div>
      <div class="motor-formula">O(D²) = exp[−λ(D²+m²)² / M*⁴]</div>
      <div class="motor-sub">Suprime ruído dos sensores · amplifica sinais reais de doença<br>10–100× mais potente que modelos quadráticos convencionais</div>
    </div>
    <div class="motor-card">
      <div class="motor-card-title">Operador composto com termos cruzados</div>
      <div class="motor-formula">D² = I²+Y²+P²+C²<br>     + 2·I·Y + 2·Y·C</div>
      <div class="motor-sub">2·I·Y = covariância produção × comportamento<br>2·Y·C = covariância comportamento × clima → ausente em todos os modelos concorrentes</div>
    </div>
    <div class="motor-card">
      <div class="motor-card-title">Limiares de alerta D/M*</div>
      <div class="motor-threshold">
        <div class="threshold-item" style="background:#E1F5EE;"><div class="threshold-val">D/M* &lt; 0.3</div><div class="threshold-label" style="color:#0F6E56;">INATIVO</div></div>
        <div class="threshold-item" style="background:#FAEEDA;"><div class="threshold-val">0.3 – 0.8</div><div class="threshold-label" style="color:#854F0B;">MONITORAR</div></div>
        <div class="threshold-item" style="background:#FAECE7;"><div class="threshold-val">0.8 – 1.2</div><div class="threshold-label" style="color:#993C1D;">AGIR</div></div>
        <div class="threshold-item" style="background:#FCEBEB;"><div class="threshold-val">D/M* &gt; 1.2</div><div class="threshold-label" style="color:#A32D2D;">CRÍTICO</div></div>
      </div>
    </div>
    <div class="motor-card">
      <div class="motor-card-title">Memória longa — campo σ</div>
      <div class="motor-formula">σ_trend = Σ(w_i · σ_i) / Σw_i<br>janela de 24 meses</div>
      <div class="motor-sub">σ &gt; 0.70 → alerta com 18 meses de antecedência<br>σ &gt; 0.50 → alerta com 12 meses<br>σ ≤ 0.50 → alerta com 6 meses</div>
    </div>
    <div class="motor-card">
      <div class="motor-card-title">Memória curta — campo φ</div>
      <div class="motor-formula">φ_echo = Σ(φ_i · e^(−i)) / Σe^(−i)<br>janela de 6 meses</div>
      <div class="motor-sub">Captura ecos de choque recente:<br>stress pós-parto · doenças agudas · mudança de manejo · ondas de calor</div>
    </div>`;
}

// ─── NAVEGAÇÃO ────────────────────────────────────────────────────────────────
function showSection(id, btn) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("section-" + id).classList.add("active");
  btn.classList.add("active");

  if (id === "graficos") {
    setTimeout(() => {
      const animal = AppState.getSelectedAnimal();
      ChartsModule.buildBeforeAfter();
      ChartsModule.buildMilk(animal);
      ChartsModule.buildDisease();
      ChartsModule.buildCost();
    }, 100);
  }
  if (id === "rebanho") renderAnimalDetail();
}

function switchChartTab(tabId, el) {
  document.querySelectorAll(".chart-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".chart-tab-content").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("ctab-" + tabId).classList.add("active");

  const animal = AppState.getSelectedAnimal();
  setTimeout(() => {
    if (tabId === "antes-depois") { ChartsModule.buildBeforeAfter(); ChartsModule.buildMilk(animal); ChartsModule.buildDisease(); ChartsModule.buildCost(); }
    if (tabId === "tempo-real")   { ChartsModule.buildRealtime(); ChartsModule.buildTemp(animal); ChartsModule.updateSensorBars(animal); }
    if (tabId === "evolucao")     { ChartsModule.buildEvolution(); ChartsModule.buildMemory(animal); ChartsModule.buildRumination(animal); }
  }, 80);
}

// ─── MODAL CADASTRO ───────────────────────────────────────────────────────────
function openAddModal()  { document.getElementById("addModal").style.display = "flex"; }
function closeAddModal() { document.getElementById("addModal").style.display = "none"; }

function handlePhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const area = document.getElementById("uploadArea");
    area.innerHTML = `<img src="${ev.target.result}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;"><br><span style="font-size:11px;color:#666;">Foto carregada ✓</span>`;
    area._photo = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function saveAnimal() {
  const name   = document.getElementById("fName").value || `Vaca #${ANIMALS.length+1}`;
  const age    = parseInt(document.getElementById("fAge").value)    || 1;
  const local  = document.getElementById("fLocal").value  || "Pasto A";
  const score  = parseFloat(document.getElementById("fScore").value) || 0.3;
  const weight = document.getElementById("fWeight").value ? document.getElementById("fWeight").value+"kg" : "500kg";
  const lact   = document.getElementById("fLact").value   || "1ª";
  const photo  = document.getElementById("uploadArea")._photo || null;
  const status = Predictor.statusFromScore(score);

  const newAnimal = {
    id: Date.now(), name, emoji: "🐄", age, local, country: "Portugal",
    score, scoreBefore: +(score + 0.2 + Math.random()*0.2).toFixed(2),
    status, lat: 40.5 + (Math.random()-0.5)*0.5, lon: -8.3 + (Math.random()-0.5)*0.5,
    lactation: lact, weight, temp:"38.5°C", rumination:"Normal",
    sigma: +(score*0.8).toFixed(2), phi: +(score*0.5).toFixed(2), photo,
    tempHistory: Array(24).fill(38.4).map(v=>+(v+Math.random()*0.5).toFixed(1)),
    milkHistory: Array(12).fill(16).map((v,i)=>+(v+i*0.2+Math.random()).toFixed(1)),
    sigmaHistory: Array(12).fill(score).map(v=>+(v+Math.random()*0.1-0.05).toFixed(2)),
    phiHistory:   Array(12).fill(score*0.6).map(v=>+(v+Math.random()*0.08-0.04).toFixed(2)),
    ruminHistory: Array(12).fill(40).map(v=>Math.floor(v+Math.random()*10))
  };

  ANIMALS.push(newAnimal);
  closeAddModal();

  // Reset form
  ["fName","fAge","fLocal","fScore","fWeight","fLact"].forEach(id => { document.getElementById(id).value = ""; });
  document.getElementById("uploadArea").innerHTML = `📷 Clique para carregar foto do animal<input type="file" id="photoInput" accept="image/*" style="display:none" onchange="handlePhoto(event)">`;

  renderTopMetrics();
  renderAnimalGrid();
  MapModule.drawAnimals();
  AppState.selectAnimal(newAnimal.id);
  showSection("rebanho", document.querySelectorAll(".nav-btn")[1]);
}
