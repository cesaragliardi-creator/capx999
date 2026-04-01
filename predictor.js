// js/map.js — Módulo do mapa mundial D3

const MapModule = (() => {
  let svg, g, projection, pathGen;
  let currentView = "world";

  const views = {
    world:  { scale: 145, translate: [450, 270] },
    europe: { scale: 480, translate: [200, 520] },
    farm:   { scale: 1400, translate: [-2900, 2750] }
  };

  function init() {
    svg = d3.select("#worldMap");
    g   = svg.append("g");

    projection = d3.geoNaturalEarth1()
      .scale(views.world.scale)
      .translate(views.world.translate);

    pathGen = d3.geoPath().projection(projection);

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(r => r.json())
      .then(world => {
        const countries = topojson.feature(world, world.objects.countries);
        g.selectAll(".country")
          .data(countries.features)
          .enter().append("path")
          .attr("class", "country")
          .attr("d", pathGen)
          .attr("fill", "#C0DD97")
          .attr("stroke", "#fff")
          .attr("stroke-width", "0.6");
        drawFarms();
        drawAnimals();
      })
      .catch(() => {
        // Fallback se offline
        g.append("rect").attr("width", 900).attr("height", 500).attr("fill", "#E1F5EE");
        g.append("text").attr("x", 450).attr("y", 240).attr("text-anchor", "middle")
         .attr("font-size", "15").attr("fill", "#1D9E75").attr("font-weight","600")
         .text("BoviWatch · Rede de Monitoramento");
        g.append("text").attr("x", 450).attr("y", 265).attr("text-anchor", "middle")
         .attr("font-size", "12").attr("fill", "#5DCAA5")
         .text("Portugal · Espanha · França — Expansão 1.000 unidades");
        drawFarms();
        drawAnimals();
      });

    renderFarmList();
    renderMapAnimalList();
  }

  function project(lon, lat) {
    if (!projection) return [450, 250];
    const pt = projection([lon, lat]);
    return pt || [450, 250];
  }

  function drawFarms() {
    g.selectAll(".farm-pin").remove();
    const offsets = [[0,0],[15,-12],[-12,10],[10,14]];
    FARMS.forEach((f, i) => {
      const [x, y] = project(f.lon, f.lat);
      const [dx, dy] = offsets[i % offsets.length];
      const fg = g.append("g").attr("class", "farm-pin")
        .attr("transform", `translate(${x+dx},${y+dy})`)
        .style("cursor", "pointer");

      if (f.active) {
        fg.append("circle").attr("r", 18).attr("fill", "#378ADD").attr("opacity", 0.15).attr("class","pulse-ring");
        fg.append("circle").attr("r", 11).attr("fill", "#378ADD").attr("opacity", 0.25);
      }
      fg.append("circle").attr("r", f.active ? 7 : 5)
        .attr("fill", f.active ? "#378ADD" : "#B5D4F4")
        .attr("stroke", "#fff").attr("stroke-width", "2");

      fg.on("mouseover", (e) => showTooltip(e,
        `<strong>${f.name}</strong><br>` +
        `${f.active ? `${f.units} unidades activas` : "Expansão prevista 2027"}<br>` +
        `${f.country}`
      )).on("mouseout", hideTooltip);
    });
  }

  function drawAnimals() {
    g.selectAll(".animal-pin").remove();
    const offsets = [[0,0],[18,-8],[-16,12],[12,16]];
    ANIMALS.forEach((a, i) => {
      const [x, y] = project(a.lon, a.lat);
      const [dx, dy] = offsets[i % offsets.length];
      const color = Predictor.scoreColor(a.score);
      const ag = g.append("g").attr("class", "animal-pin")
        .attr("transform", `translate(${x+dx},${y+dy})`)
        .style("cursor", "pointer");

      if (a.status === "warn") {
        ag.append("circle").attr("r", 14).attr("fill","none")
          .attr("stroke", color).attr("stroke-width","1.5")
          .attr("opacity", 0.5).attr("class","pulse-ring");
      }
      ag.append("circle").attr("r", 8).attr("fill", color)
        .attr("stroke","#fff").attr("stroke-width","2");
      ag.append("text").attr("text-anchor","middle").attr("dy","0.35em")
        .attr("font-size","9").attr("fill","#fff").attr("font-weight","700")
        .text(a.score.toFixed(1));

      ag.on("mouseover", (e) => showTooltip(e,
        `<strong>${a.name}</strong><br>` +
        `D/M* = ${a.score.toFixed(2)}<br>` +
        `${a.local} · ${a.country}<br>` +
        `Status: ${a.status === "ok" ? "✅ Saudável" : "⚠️ Atenção"}`
      )).on("mouseout", hideTooltip)
        .on("click", () => AppState.selectAnimal(a.id));
    });
  }

  function showTooltip(e, html) {
    const tt = document.getElementById("mapTooltip");
    tt.innerHTML = html;
    tt.style.display = "block";
    const rect = document.querySelector(".map-container").getBoundingClientRect();
    tt.style.left = (e.clientX - rect.left + 12) + "px";
    tt.style.top  = (e.clientY - rect.top  - 10) + "px";
  }
  function hideTooltip() {
    document.getElementById("mapTooltip").style.display = "none";
  }

  function setView(v) {
    currentView = v;
    if (!projection) return;
    const vw = views[v] || views.world;
    projection.scale(vw.scale).translate(vw.translate);
    g.selectAll(".country").attr("d", pathGen);
    drawFarms();
    drawAnimals();
  }

  function renderFarmList() {
    document.getElementById("farmList").innerHTML = FARMS.map(f => `
      <div class="farm-item">
        <div class="farm-name">${f.active ? "🟢" : "⚪"} ${f.name}</div>
        <div class="farm-meta">${f.active ? f.units+" unidades · activa" : "Expansão prevista"} · ${f.country}</div>
      </div>`).join("");
  }

  function renderMapAnimalList() {
    document.getElementById("mapAnimalList").innerHTML = ANIMALS.map(a => `
      <div class="farm-item" onclick="AppState.selectAnimal(${a.id})" style="cursor:pointer;">
        <div class="farm-name">${a.emoji} ${a.name}</div>
        <div class="farm-meta" style="color:${Predictor.scoreColor(a.score)}">D/M* = ${a.score.toFixed(2)} · ${a.local}</div>
      </div>`).join("");
  }

  return { init, setView, drawAnimals };
})();

function setMapView(v) { MapModule.setView(v); }
