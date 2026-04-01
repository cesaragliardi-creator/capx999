# BoviWatch — Digital Twin
## Monitoramento Preditivo de Gado Leiteiro
### Powered by Motor Preditivo AG-999 · InoCrowd Challenge

---

## Como rodar

### Opção 1 — Python (mais simples, sem instalação)
```bash
cd boviwatch
python3 -m http.server 8080
```
Abra o navegador em: **http://localhost:8080**

### Opção 2 — Node.js
```bash
cd boviwatch
npx serve .
```

### Opção 3 — VS Code
- Instale a extensão **Live Server**
- Clique direito em `index.html` → **Open with Live Server**

---

## Estrutura do projeto

```
boviwatch/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Estilos
├── data/
│   ├── animals.js      ← Dados dos animais
│   ├── farms.js        ← Fazendas no mapa
│   └── modules.js      ← Módulos InoCrowd + alertas
├── js/
│   ├── predictor.js    ← Motor preditivo (lógica interna)
│   ├── map.js          ← Mapa mundial D3 + TopoJSON
│   ├── charts.js       ← Gráficos Chart.js
│   ├── alerts.js       ← Módulo de alertas
│   └── app.js          ← Controlador principal
└── README.md
```

---

## Funcionalidades

### 🗺 Mapa Global
- Mapa mundial interactivo com D3 + TopoJSON
- Animais localizados em Portugal com score D/M* visível
- Fazendas piloto (Lisboa e Porto) com expansão Espanha/França
- Zoom: Mundo / Europa / Fazenda
- Tooltip ao passar o rato

### 🐄 Rebanho
- Cadastro de animais com foto real da câmera
- Score de risco D/M* por animal
- Ficha completa com todos os indicadores
- Recomendações automáticas baseadas no motor preditivo

### 📊 Gráficos
**Antes / Depois:**
- Score de bem-estar antes e depois do sistema
- Produção de leite (L/dia) com comparativo
- Incidência de doenças por mês
- Custo operacional (€/animal/mês)

**Tempo Real:**
- Score D/M* ao vivo (atualiza a cada 3s)
- Barras de sensores: temperatura, ruminação, actividade, σ, φ
- Temperatura corporal 24h

**Evolução Mensal:**
- Evolução do score D/M* — 6m ou 12m
- Campos de memória σ (24m) e φ (6m)
- Ruminação por animal (min/h)

### 🔔 Alertas
- Feed de alertas preditivos em tempo real
- Classificação por nível: Atenção / Crítico / Normal
- Módulo de origem de cada alerta

### ⚙️ Módulos InoCrowd
- 7 módulos do desafio com % de cobertura
- Gráfico radar: BoviWatch vs Requisitos
- Status e campo tecnológico de cada módulo

### 🧠 Motor Preditivo
- Equações do sistema preditivo
- Campos de memória longa e curta
- 4 limiares de alerta D/M*

---

## Tecnologias usadas
- **D3.js** v7 — mapa mundial
- **TopoJSON** — dados geográficos
- **Chart.js** v4 — todos os gráficos
- HTML5 + CSS3 + JavaScript puro (sem framework)

---

## Requisitos do sistema
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexão à internet para carregar os mapas e bibliotecas CDN
- Python 3 ou Node.js para servidor local

---

*Cesar Agliardi Pereira — Investigador Independente*
*Física Teórica e Modelação de Risco Financeiro*
*Gravataí, RS, Brasil — 2026*
