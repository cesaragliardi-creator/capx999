// js/charts.js — Módulo de gráficos Chart.js

const ChartsModule = (() => {
  const charts = {};
  const MONTHS6  = ["Nov","Dez","Jan","Fev","Mar","Abr"];
  const MONTHS12 = ["Mai","Jun","Jul","Ago","Set","Out","Nov","Dez","Jan","Fev","Mar","Abr"];
  const HOURS24  = Array.from({length:24},(_,i)=>`${i}h`);
  let timeRange   = "6m";
  let rtData      = Array(24).fill(null).map(()=>+(0.25+Math.random()*0.35).toFixed(2));
  let rtInterval  = null;

  const baseOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor:"#fff", titleColor:"#222", bodyColor:"#555", borderColor:"#ddd", borderWidth:1, padding:10 }
    },
    scales: {
      x: { grid:{display:false}, ticks:{font:{size:10},color:"#999"} },
      y: { grid:{color:"rgba(0,0,0,0.04)"}, ticks:{font:{size:10},color:"#999"} }
    }
  };

  function mk(id, config) {
    const el = document.getElementById(id);
    if (!el) return null;
    if (charts[id]) { charts[id].destroy(); }
    charts[id] = new Chart(el.getContext("2d"), config);
    return charts[id];
  }

  function buildBeforeAfter() {
    mk("chartBeforeAfter", {
      type: "bar",
      data: {
        labels: ANIMALS.map(a => a.name.split(" ")[0]),
        datasets: [
          { label:"Antes", data: ANIMALS.map(a=>a.scoreBefore), backgroundColor:"#F09595", borderRadius:5, borderSkipped:false },
          { label:"Depois (BoviWatch)", data: ANIMALS.map(a=>a.score), backgroundColor:"#5DCAA5", borderRadius:5, borderSkipped:false }
        ]
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,min:0,max:1.5,ticks:{...baseOpts.scales.y.ticks,callback:v=>v.toFixed(1)}} }
      }
    });
  }

  function buildMilk(animal) {
    const sliceStart = timeRange==="6m"?6:0;
    const labels = timeRange==="6m"?MONTHS6:MONTHS12;
    mk("chartMilk", {
      type: "line",
      data: {
        labels,
        datasets: [
          { label:"Sem sistema", data:animal.milkHistory.slice(sliceStart).map(v=>+(v*0.88).toFixed(1)), borderColor:"#F09595",backgroundColor:"rgba(240,149,149,0.08)",tension:0.4,fill:true,pointRadius:3 },
          { label:"Com BoviWatch", data:animal.milkHistory.slice(sliceStart), borderColor:"#1D9E75",backgroundColor:"rgba(29,158,117,0.08)",tension:0.4,fill:true,pointRadius:3 }
        ]
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,ticks:{...baseOpts.scales.y.ticks,callback:v=>v+"L"}} }
      }
    });
  }

  function buildDisease() {
    mk("chartDisease", {
      type: "bar",
      data: {
        labels: MONTHS12,
        datasets: [
          { label:"Sem monitoramento", data:[3,4,3,5,4,3,2,2,1,1,1,1], backgroundColor:"#F09595", borderRadius:4, borderSkipped:false },
          { label:"Com BoviWatch",     data:[3,4,3,5,4,3,1,1,0,1,0,0], backgroundColor:"#5DCAA5", borderRadius:4, borderSkipped:false }
        ]
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,min:0,max:6,ticks:{...baseOpts.scales.y.ticks,stepSize:1}} }
      }
    });
  }

  function buildCost() {
    mk("chartCost", {
      type: "line",
      data: {
        labels: MONTHS12,
        datasets: [
          { label:"Sem sistema (€/animal)", data:[85,88,90,92,89,91,88,86,84,82,80,79], borderColor:"#F09595",backgroundColor:"rgba(240,149,149,0.08)",tension:0.4,fill:true,pointRadius:3 },
          { label:"Com BoviWatch (€/animal)", data:[85,88,90,92,89,85,78,72,68,65,63,61], borderColor:"#1D9E75",backgroundColor:"rgba(29,158,117,0.08)",tension:0.4,fill:true,pointRadius:3 }
        ]
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,ticks:{...baseOpts.scales.y.ticks,callback:v=>"€"+v}} }
      }
    });
  }

  function buildRealtime() {
    const labels = Array(24).fill("").map((_,i)=>i===23?"agora":i%4===0?(23-i)+"s atrás":"");
    mk("chartRealtime", {
      type: "line",
      data: {
        labels,
        datasets: [
          { label:"Score D/M*", data:[...rtData], borderColor:"#1D9E75",backgroundColor:"rgba(29,158,117,0.06)",tension:0.4,fill:true,pointRadius:2,pointBackgroundColor:"#1D9E75" },
          { label:"Limiar atenção (0.8)", data:Array(24).fill(0.8), borderColor:"#EF9F27",borderDash:[5,5],pointRadius:0,fill:false },
          { label:"Limiar crítico (1.2)", data:Array(24).fill(1.2), borderColor:"#E24B4A",borderDash:[5,5],pointRadius:0,fill:false }
        ]
      },
      options: {
        ...baseOpts,
        animation: { duration: 300 },
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,min:0,max:1.5,ticks:{...baseOpts.scales.y.ticks,callback:v=>v.toFixed(1)}} }
      }
    });
  }

  function buildTemp(animal) {
    mk("chartTemp", {
      type: "line",
      data: {
        labels: HOURS24,
        datasets: [
          { label:"Temperatura (°C)", data:animal.tempHistory, borderColor:"#D85A30",backgroundColor:"rgba(216,90,48,0.06)",tension:0.4,fill:true,pointRadius:2 },
          { label:"Limiar normal (39°C)", data:Array(24).fill(39), borderColor:"#E24B4A",borderDash:[4,4],pointRadius:0,fill:false }
        ]
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,min:37.5,max:40.5,ticks:{...baseOpts.scales.y.ticks,callback:v=>v.toFixed(1)+"°"}} }
      }
    });
  }

  function buildEvolution() {
    const sliceStart = timeRange==="6m"?6:0;
    const labels = timeRange==="6m"?MONTHS6:MONTHS12;
    mk("chartEvolution", {
      type: "line",
      data: {
        labels,
        datasets: ANIMALS.map(a=>({
          label: a.name.split(" ")[0],
          data: a.sigmaHistory.slice(sliceStart),
          borderColor: Predictor.scoreColor(a.score),
          backgroundColor: "transparent",
          tension: 0.4,
          pointRadius: 3,
          borderWidth: AppState.selectedAnimalId===a.id ? 3 : 1.5
        }))
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,min:0,max:1,ticks:{...baseOpts.scales.y.ticks,callback:v=>v.toFixed(1)}} }
      }
    });
  }

  function buildMemory(animal) {
    const sliceStart = timeRange==="6m"?6:0;
    const labels = timeRange==="6m"?MONTHS6:MONTHS12;
    mk("chartMemory", {
      type: "line",
      data: {
        labels,
        datasets: [
          { label:"σ (memória longa 24m)", data:animal.sigmaHistory.slice(sliceStart), borderColor:"#7F77DD",backgroundColor:"rgba(127,119,221,0.07)",tension:0.4,fill:true,pointRadius:3 },
          { label:"φ (memória curta 6m)",  data:animal.phiHistory.slice(sliceStart),   borderColor:"#D85A30",backgroundColor:"rgba(216,90,48,0.05)",tension:0.4,fill:true,pointRadius:3 }
        ]
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,min:0,max:0.9,ticks:{...baseOpts.scales.y.ticks,callback:v=>v.toFixed(1)}} }
      }
    });
  }

  function buildRumination(animal) {
    const sliceStart = timeRange==="6m"?6:0;
    const labels = timeRange==="6m"?MONTHS6:MONTHS12;
    mk("chartRumination", {
      type: "bar",
      data: {
        labels,
        datasets: ANIMALS.map(a=>({
          label: a.name.split(" ")[0],
          data: a.ruminHistory.slice(sliceStart),
          backgroundColor: Predictor.scoreColor(a.score)+"66",
          borderColor: Predictor.scoreColor(a.score),
          borderWidth: 1,
          borderRadius: 4
        }))
      },
      options: {
        ...baseOpts,
        plugins: { ...baseOpts.plugins, legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { ...baseOpts.scales, y:{...baseOpts.scales.y,min:0,max:70,ticks:{...baseOpts.scales.y.ticks,callback:v=>v+"min"}} }
      }
    });
  }

  function buildRadar() {
    mk("chartRadar", {
      type: "radar",
      data: {
        labels: MODULES.map(m=>`M${m.num}`),
        datasets: [
          { label:"BoviWatch", data:MODULES.map(m=>m.coverage), borderColor:"#1D9E75",backgroundColor:"rgba(29,158,117,0.15)",pointBackgroundColor:"#1D9E75",pointRadius:4 },
          { label:"Requisito InoCrowd", data:Array(7).fill(100), borderColor:"#B5D4F4",backgroundColor:"rgba(181,212,244,0.06)",pointBackgroundColor:"#378ADD",pointRadius:3,borderDash:[4,4] }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend:{display:true,labels:{font:{size:10},boxWidth:12,color:"#666"}} },
        scales: { r:{grid:{color:"rgba(0,0,0,0.06)"},ticks:{display:false},pointLabels:{font:{size:11},color:"#666"},min:0,max:100} }
      }
    });
  }

  function tickRealtime(selectedAnimal) {
    const last = rtData[rtData.length-1];
    const next = Predictor.simulateSensor(last, 0.06);
    rtData.shift(); rtData.push(next);
    if (charts["chartRealtime"]) {
      charts["chartRealtime"].data.datasets[0].data = [...rtData];
      charts["chartRealtime"].update("none");
    }
    updateSensorBars(selectedAnimal);
    const cl = document.getElementById("rtClock");
    if (cl) cl.textContent = new Date().toLocaleTimeString("pt-PT");
  }

  function updateSensorBars(animal) {
    const el = document.getElementById("sensorBars");
    if (!el || !animal) return;
    const sensors = [
      { label:"Score D/M*",    val:rtData[rtData.length-1].toFixed(2), pct:rtData[rtData.length-1]/1.5, color:"#1D9E75" },
      { label:"Temperatura",   val:(38+Math.random()*1.3).toFixed(1)+"°C", pct:0.55+Math.random()*0.25, color:"#D85A30" },
      { label:"Ruminação",     val:Math.floor(35+Math.random()*25)+"min/h", pct:0.60+Math.random()*0.20, color:"#1D9E75" },
      { label:"Actividade",    val:Math.floor(55+Math.random()*35)+"%",  pct:0.55+Math.random()*0.35, color:"#7F77DD" },
      { label:"σ-field",       val:animal.sigma.toFixed(2), pct:animal.sigma, color:"#7F77DD" },
      { label:"φ-field",       val:animal.phi.toFixed(2),   pct:animal.phi,   color:"#D85A30" }
    ];
    el.innerHTML = sensors.map(s=>`
      <div class="sensor-row">
        <span class="sensor-label">${s.label}</span>
        <div class="sensor-bar"><div class="sensor-fill" style="width:${Math.min(s.pct*100,100).toFixed(0)}%;background:${s.color};"></div></div>
        <span class="sensor-val" style="color:${s.color};">${s.val}</span>
      </div>`).join("");
  }

  function setTimeRange(range) {
    timeRange = range;
  }

  function refreshAll(animal) {
    const curTab = document.querySelector(".chart-tab-content.active");
    if (!curTab) return;
    const id = curTab.id;
    if (id === "ctab-antes-depois") { buildBeforeAfter(); buildMilk(animal); buildDisease(); buildCost(); }
    else if (id === "ctab-tempo-real")  { buildRealtime(); buildTemp(animal); updateSensorBars(animal); }
    else if (id === "ctab-evolucao")    { buildEvolution(); buildMemory(animal); buildRumination(animal); }
  }

  function startRealtime(getAnimal) {
    if (rtInterval) clearInterval(rtInterval);
    rtInterval = setInterval(() => {
      const curTab = document.querySelector(".chart-tab-content.active");
      if (curTab && curTab.id === "ctab-tempo-real") tickRealtime(getAnimal());
    }, 3000);
  }

  return { buildBeforeAfter, buildMilk, buildDisease, buildCost, buildRealtime, buildTemp, buildEvolution, buildMemory, buildRumination, buildRadar, setTimeRange, refreshAll, startRealtime, updateSensorBars };
})();

function setTimeRange(range, el) {
  ChartsModule.setTimeRange(range);
  document.querySelectorAll(".time-btn").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");
  const animal = AppState.getSelectedAnimal();
  ChartsModule.buildEvolution();
  ChartsModule.buildMemory(animal);
  ChartsModule.buildMilk(animal);
  ChartsModule.buildRumination(animal);
}
