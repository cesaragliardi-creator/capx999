// ─── PREDICTOR ───────────────────────────────────────────────────────────────
const Predictor = (() => {
  const _p = { m_gap:0.522, lambda:13.4 };
  function scoreColor(s) { if(s<0.3) return '#1D9E75'; if(s<0.8) return '#EF9F27'; return '#E24B4A'; }
  function statusFromScore(s) { if(s<0.3) return 'ok'; if(s<0.8) return 'warn'; return 'danger'; }
  function simulateSensor(v, vol) { return Math.max(0.05, Math.min(1.45, +(v + (Math.random()-0.48)*vol).toFixed(3))); }
  function alertLevel(r) {
    if(r<0.3)  return { level:'INATIVO',   color:'#1D9E75', bg:'#E1F5EE', label:'Inativo' };
    if(r<0.8)  return { level:'MONITORAR', color:'#BA7517', bg:'#FAEEDA', label:'Atenção' };
    if(r<1.2)  return { level:'AGIR',      color:'#D85A30', bg:'#FAECE7', label:'Agir' };
    return             { level:'CRÍTICO',  color:'#E24B4A', bg:'#FCEBEB', label:'Crítico' };
  }
  function leadTime(sigma) {
    if(sigma>0.70) return '18 meses de antecedência';
    if(sigma>0.50) return '12 meses de antecedência';
    return '6 meses de antecedência';
  }
  function computeRisk(a) {
    const I=a.score||0, Y=a.sigma||0, C=a.phi||0, P=(parseFloat(a.temp)>39)?0.3:0;
    const D2=(I*I)+(Y*Y)+(P*P)+(C*C)+2*(I*Y)+2*(Y*C);
    const ratio=Math.sqrt(D2)/_p.m_gap;
    return { D2:+D2.toFixed(4), ratio:+ratio.toFixed(3) };
  }
  function describeAnimal(a) {
    const risk=computeRisk(a), al=alertLevel(risk.ratio);
    const recs = {
      'INATIVO':   'Manter monitorização padrão. Sem intervenção necessária.',
      'MONITORAR': `Aumentar frequência de leituras para ${a.name}. Verificar ruminação e temperatura nas próximas 24h.`,
      'AGIR':      `Acção recomendada para ${a.name}: contactar veterinário, rever alimentação. Considerar cuidados preventivos.`,
      'CRÍTICO':   `ALERTA MÁXIMO — ${a.name} requer intervenção imediata. Isolamento preventivo e avaliação veterinária urgente.`
    };
    return { riskLevel:al.level, riskColor:al.color, riskBg:al.bg, leadTime:leadTime(a.sigma||0), recommendation:recs[al.level] };
  }
  return { scoreColor, statusFromScore, simulateSensor, alertLevel, leadTime, computeRisk, describeAnimal };
})();

