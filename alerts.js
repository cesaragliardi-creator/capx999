const AlertsModule = (() => {
  
  function render() {
    // 1. Renderiza a lista de alertas no feed
    const feed = document.getElementById('alertsFeed');
    feed.innerHTML = ALERTS_DATA.map(a => `
      <div class="alert-item ${a.type}">
        <div class="alert-cow">${a.cow} · ${a.time}</div>
        <div class="alert-title">${a.title}</div>
        <div class="alert-body">${a.body}</div>
        <div class="alert-time">Módulo: ${a.module}</div>
      </div>
    `).join('');

    // 2. Renderiza o resumo lateral (contagem warn / danger / ok)
    const summary = document.getElementById('alertsSummary');
    const c = {warn:0, danger:0, ok:0};
    ALERTS_DATA.forEach(a => c[a.type]++);
    summary.innerHTML = `... cards de ⚠️ Atenção / 🔴 Crítico / ✅ Normal`;
  }

  return { render };
})();
