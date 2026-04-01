// data/modules.js
const MODULES = [
  { num: 1, name: "Biomecânica e Locomoção", desc: "Análise 3D esqueletal, detecção de coxeira, ocupação de cubículos, padrão de marcha", status: "ok", field: "Câmeras + IA", coverage: 95 },
  { num: 2, name: "Fisiologia e Condição Corporal", desc: "Stress térmico (HLI), frequência cardíaca, ruminação, detecção preditiva de mastite", status: "ok", field: "Sensores + Coleiras", coverage: 90 },
  { num: 3, name: "Ambiente e Microclima", desc: "Qualidade do ar (NH₃), ventilação, temperatura, humidade relativa, conforto térmico", status: "warn", field: "Sensores Ambientais", coverage: 85 },
  { num: 4, name: "Comportamento Social e Emocional", desc: "QBA automático, análise facial FACS adaptada ao bovino, vocalização, postura da cauda", status: "ok", field: "Câmeras Térmicas + IA", coverage: 88 },
  { num: 5, name: "Manejo e Simulação de Cenários", desc: "Impacto de intervenções na produtividade, sensores na sala de ordenha, simulação Digital Twin", status: "ok", field: "Digital Twin", coverage: 92 },
  { num: 6, name: "Módulo Específico para Bezerros", desc: "Monitoramento neonatal, diarreia, pneumonia, qualidade da cama, balanço repouso-actividade", status: "ok", field: "Câmeras + Sensores", coverage: 80 },
  { num: 7, name: "Integração com Sistemas Existentes", desc: "Coleiras, câmeras térmicas, acelerómetros, sistemas comerciais via API interoperável", status: "warn", field: "API / Interoperabilidade", coverage: 87 }
];

const ALERTS_DATA = [
  { cow: "Estrela #07", type: "warn", title: "Score D/M* = 0.71 — Zona de atenuação", body: "Ruminação reduzida detectada pelo sensor de coleira. Campo de memória indica tendência de stress crescente. Recomenda-se monitorização veterinária nas próximas 48h.", time: "2h atrás", module: "Fisiologia" },
  { cow: "Estrela #07", type: "warn", title: "Campo de memória curta — Eco de stress recente", body: "Possível impacto pós-parto ainda activo. Temperatura ligeiramente elevada (39.1°C). Sugere-se revisão do protocolo de manejo.", time: "6h atrás", module: "Biomecânica" },
  { cow: "Pipa #31",    type: "ok",   title: "Score D/M* = 0.55 — Zona intermediária estável", body: "Comportamento social normal. Produção de leite em linha com histórico. Acompanhar nas próximas 72h sem intervenção.", time: "1 dia",    module: "Comportamento" },
  { cow: "Fazenda Piloto", type: "warn", title: "Módulo Ambiente — Alerta de Microclima", body: "Temperatura interna da unidade 1.2°C acima do limiar de conforto. Activar ventilação mecânica zona norte. Risco de stress térmico em 4h.", time: "30 min",  module: "Ambiente" },
  { cow: "Mimosa #12",  type: "ok",   title: "Score D/M* = 0.22 — Zona segura", body: "Todos os indicadores dentro dos parâmetros normais. Produção de leite em máximo histórico (20.5L/dia). Sem acção necessária.", time: "3h atrás", module: "Fisiologia" }
];
