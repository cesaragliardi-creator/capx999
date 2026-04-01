<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <title>BoviWatch - Digital Twin</title>

  <!-- Responsivo -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Chart.js (OBRIGATÓRIO para gráficos) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f7fa;
      margin: 0;
      padding: 20px;
    }

    h1 {
      text-align: center;
    }

    .container {
      max-width: 1000px;
      margin: auto;
    }

    canvas {
      background: white;
      border-radius: 10px;
      padding: 10px;
      margin-top: 20px;
    }
  </style>
</head>

<body>

  <div class="container">
    <h1>BoviWatch Dashboard</h1>

    <!-- Gráfico exemplo -->
    <canvas id="chartBeforeAfter"></canvas>
  </div>

  <!-- ORDEM IMPORTANTE -->
  <script src="animals.js"></script>
  <script src="predictor.js"></script>
  <script src="farms.js"></script>
  <script src="alerts.js"></script>
  <script src="map.js"></script>
  <script src="app.js"></script>
  <script src="charts.js"></script>

</body>
</html>
