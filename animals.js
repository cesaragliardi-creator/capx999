// ─── DADOS ───────────────────────────────────────────────────────────────────
const ANIMALS = [
  { id:1, name:"Mimosa #12", emoji:"🐄", age:5, local:"Pasto A", score:0.22, scoreBefore:0.68, status:"ok", lat:40.4, lon:-8.2, country:"Portugal", lactation:"3ª", weight:"580kg", temp:"38.4°C", rumination:"Normal", sigma:0.31, phi:0.18, photo:null, tempHistory:[38.2,38.3,38.4,38.3,38.4,38.5,38.3,38.4,38.2,38.3,38.4,38.3,38.2,38.4,38.3,38.5,38.4,38.3,38.4,38.3,38.2,38.3,38.4,38.3], milkHistory:[18,18.5,19,18.8,19.2,19.5,19.3,19.8,20,19.9,20.2,20.5], sigmaHistory:[0.55,0.52,0.48,0.44,0.40,0.36,0.33,0.31,0.29,0.27,0.25,0.22], phiHistory:[0.38,0.33,0.28,0.25,0.22,0.20,0.19,0.18,0.17,0.17,0.18,0.18], ruminHistory:[42,44,45,43,46,47,48,46,49,50,51,52] },
  { id:2, name:"Estrela #07", emoji:"🐮", age:3, local:"Pasto B", score:0.71, scoreBefore:0.92, status:"warn", lat:41.1, lon:-8.6, country:"Portugal", lactation:"1ª", weight:"510kg", temp:"39.1°C", rumination:"Reduzida", sigma:0.62, phi:0.44, photo:null, tempHistory:[38.5,38.7,38.9,39.0,39.1,39.2,39.1,39.0,38.9,38.8,38.7,38.8,39.0,39.1,39.2,39.3,39.1,38.9,38.8,38.7,38.8,39.0,39.1,39.1], milkHistory:[14,13.5,13,13.2,13.5,14,14.2,14.5,14.8,15,15.3,15.5], sigmaHistory:[0.80,0.78,0.76,0.74,0.72,0.70,0.69,0.68,0.67,0.67,0.68,0.71], phiHistory:[0.58,0.54,0.50,0.47,0.45,0.44,0.44,0.44,0.43,0.43,0.44,0.44], ruminHistory:[28,26,25,27,26,28,29,30,31,32,31,30] },
  { id:3, name:"Boneca #23", emoji:"🐄", age:7, local:"Pasto A", score:0.18, scoreBefore:0.55, status:"ok", lat:39.7, lon:-8.0, country:"Portugal", lactation:"5ª", weight:"620kg", temp:"38.2°C", rumination:"Normal", sigma:0.28, phi:0.12, photo:null, tempHistory:[38.1,38.2,38.1,38.2,38.3,38.2,38.1,38.2,38.1,38.2,38.1,38.2,38.1,38.2,38.3,38.2,38.1,38.2,38.1,38.2,38.1,38.2,38.1,38.2], milkHistory:[22,22.3,22.8,23,23.2,23.5,23.8,24,24.2,24.5,24.8,25], sigmaHistory:[0.42,0.38,0.35,0.32,0.30,0.28,0.27,0.26,0.24,0.23,0.21,0.18], phiHistory:[0.28,0.24,0.21,0.18,0.16,0.14,0.13,0.13,0.12,0.12,0.12,0.12], ruminHistory:[52,53,54,55,54,56,57,58,57,59,60,61] },
  { id:4, name:"Pipa #31", emoji:"🐮", age:4, local:"Pasto C", score:0.55, scoreBefore:0.78, status:"ok", lat:40.8, lon:-8.4, country:"Portugal", lactation:"2ª", weight:"545kg", temp:"38.7°C", rumination:"Normal", sigma:0.44, phi:0.29, photo:null, tempHistory:[38.3,38.4,38.5,38.6,38.7,38.7,38.6,38.5,38.4,38.5,38.6,38.7,38.6,38.5,38.4,38.5,38.6,38.7,38.6,38.5,38.4,38.5,38.6,38.7], milkHistory:[16,16.2,16.5,16.8,17,17.3,17.5,17.8,18,18.2,18.5,18.8], sigmaHistory:[0.68,0.65,0.62,0.60,0.58,0.56,0.55,0.54,0.53,0.53,0.54,0.55], phiHistory:[0.42,0.38,0.35,0.33,0.31,0.30,0.29,0.29,0.29,0.29,0.29,0.29], ruminHistory:[38,39,40,41,40,42,43,44,43,45,44,45] }
];

const FARMS = [
  { name:"Fazenda Piloto — Lisboa", lat:38.7, lon:-9.1, units:320, country:"Portugal", active:true },
  { name:"Unidade Porto",           lat:41.2, lon:-8.6, units:185, country:"Portugal", active:true },
  { name:"Expansão — Espanha",      lat:40.4, lon:-3.7, units:0,   country:"Espanha",  active:false },
  { name:"Expansão — França",       lat:46.2, lon:2.2,  units:0,   country:"França",   active:false }
];

const MODULES = [
  { num:1, name:"Biomecânica e Locomoção", desc:"Análise 3D esqueletal, detecção de coxeira, ocupação de cubículos, padrão de marcha", status:"ok", field:"Câmeras + IA", coverage:95 },
  { num:2, name:"Fisiologia e Condição Corporal", desc:"Stress térmico (HLI), frequência cardíaca, ruminação, detecção preditiva de mastite", status:"ok", field:"Sensores + Coleiras", coverage:90 },
  { num:3, name:"Ambiente e Microclima", desc:"Qualidade do ar (NH₃), ventilação, temperatura, humidade relativa, conforto térmico", status:"warn", field:"Sensores Ambientais", coverage:85 },
  { num:4, name:"Comportamento Social e Emocional", desc:"QBA automático, análise facial FACS adaptada ao bovino, vocalização, postura da cauda", status:"ok", field:"Câmeras Térmicas + IA", coverage:88 },
  { num:5, name:"Manejo e Simulação de Cenários", desc:"Impacto de intervenções na produtividade, sensores na sala de ordenha, simulação Digital Twin", status:"ok", field:"Digital Twin", coverage:92 },
  { num:6, name:"Módulo Específico para Bezerros", desc:"Monitoramento neonatal, diarreia, pneumonia, qualidade da cama, balanço repouso-actividade", status:"ok", field:"Câmeras + Sensores", coverage:80 },
  { num:7, name:"Integração com Sistemas Existentes", desc:"Coleiras, câmeras térmicas, acelerómetros, sistemas comerciais via API interoperável", status:"warn", field:"API / Interoperabilidade", coverage:87 }
];

const ALERTS_DATA = [
  { cow:"Estrela #07", type:"warn", title:"Score D/M* = 0.71 — Zona de atenuação", body:"Ruminação reduzida detectada pelo sensor de coleira. Campo de memória indica tendência de stress crescente. Recomenda-se monitorização veterinária nas próximas 48h.", time:"2h atrás", module:"Fisiologia" },
  { cow:"Estrela #07", type:"warn", title:"Campo de memória curta — Eco de stress recente", body:"Possível impacto pós-parto ainda activo. Temperatura ligeiramente elevada (39.1°C). Sugere-se revisão do protocolo de manejo.", time:"6h atrás", module:"Biomecânica" },
  { cow:"Pipa #31",    type:"ok",   title:"Score D/M* = 0.55 — Zona intermediária estável", body:"Comportamento social normal. Produção de leite em linha com histórico. Acompanhar nas próximas 72h sem intervenção.", time:"1 dia", module:"Comportamento" },
  { cow:"Fazenda Piloto", type:"warn", title:"Módulo Ambiente — Alerta de Microclima", body:"Temperatura interna da unidade 1.2°C acima do limiar de conforto. Activar ventilação mecânica zona norte. Risco de stress térmico em 4h.", time:"30 min", module:"Ambiente" },
  { cow:"Mimosa #12",  type:"ok",   title:"Score D/M* = 0.22 — Zona segura", body:"Todos os indicadores dentro dos parâmetros normais. Produção de leite em máximo histórico (20.5L/dia). Sem acção necessária.", time:"3h atrás", module:"Fisiologia" }
];

