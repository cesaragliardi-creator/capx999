// js/predictor.js — Motor preditivo BoviWatch
// Lógica interna de scoring e predição

const Predictor = (() => {

  // Parâmetros internos do modelo
  const _params = {
    m_gap: 0.522,
    M_star: 1e16,
    lambda: 13.4,
    sigma_window: 24,
    phi_window: 6
  };

  // Calcula score de risco composto para um animal
  function computeRisk(animal) {
    const I  = animal.score || 0;
    const Y  = animal.sigma || 0;
    const C  = animal.phi   || 0;
    const P  = (animal.temp && parseFloat(animal.temp) > 39.0) ? 0.3 : 0;

    // Operador composto com termos cruzados
    const D2 = (I*I) + (Y*Y) + (P*P) + (C*C) + 2*(I*Y) + 2*(Y*C);
    const D  = Math.sqrt(D2);
    const ratio = D / _params.m_gap;

    // Operador de supressão não-linear
    const exp_arg = -_params.lambda * Math.pow(D2 + _params.m_gap*_params.m_gap, 2) / Math.pow(_params.m_gap, 4);
    const O = Math.exp(Math.max(exp_arg, -50));

    return { D2: +D2.toFixed(4), ratio: +ratio.toFixed(3), O: +O.toFixed(4) };
  }

  // Determina nível de alerta baseado no ratio D/M*
  function alertLevel(ratio) {
    if (ratio < 0.3)  return { level: "INATIVO",    color: "#1D9E75", bg: "#E1F5EE", label: "Inativo" };
    if (ratio < 0.8)  return { level: "MONITORAR",  color: "#BA7517", bg: "#FAEEDA", label: "Atenção" };
    if (ratio < 1.2)  return { level: "AGIR",       color: "#D85A30", bg: "#FAECE7", label: "Agir" };
    return              { level: "CRÍTICO",          color: "#E24B4A", bg: "#FCEBEB", label: "Crítico" };
  }

  // Calcula previsão de lead-time baseado no campo de memória longa
  function leadTime(sigma) {
    if (sigma > 0.70) return "18 meses de antecedência";
    if (sigma > 0.50) return "12 meses de antecedência";
    return "6 meses de antecedência";
  }

  // Status simplificado para UI
  function statusFromScore(score) {
    if (score < 0.3) return "ok";
    if (score < 0.8) return "warn";
    return "danger";
  }

  // Cor baseada no score
  function scoreColor(score) {
    if (score < 0.3) return "#1D9E75";
    if (score < 0.8) return "#EF9F27";
    return "#E24B4A";
  }

  // Simula variação de sensor em tempo real
  function simulateSensor(currentVal, volatility) {
    const delta = (Math.random() - 0.48) * volatility;
    return Math.max(0.05, Math.min(1.45, +(currentVal + delta).toFixed(3)));
  }

  // Gera descrição textual do estado do animal
  function describeAnimal(animal) {
    const risk = computeRisk(animal);
    const alert = alertLevel(risk.ratio);
    const lead = leadTime(animal.sigma || 0);
    return {
      riskLevel: alert.level,
      riskColor: alert.color,
      riskBg: alert.bg,
      leadTime: lead,
      recommendation: _getRecommendation(alert.level, animal)
    };
  }

  function _getRecommendation(level, animal) {
    const recs = {
      "INATIVO":   "Manter monitorização padrão. Sem intervenção necessária.",
      "MONITORAR": `Aumentar frequência de leituras para ${animal.name}. Verificar ruminação e temperatura nas próximas 24h.`,
      "AGIR":      `Acção recomendada para ${animal.name}: contactar veterinário, rever alimentação e condições do pasto. Considerar contratos preventivos.`,
      "CRÍTICO":   `ALERTA MÁXIMO — ${animal.name} requer intervenção imediata. Isolamento preventivo e avaliação veterinária urgente.`
    };
    return recs[level] || "Sem dados suficientes.";
  }

  // API pública
  return { computeRisk, alertLevel, leadTime, statusFromScore, scoreColor, simulateSensor, describeAnimal };
})();
