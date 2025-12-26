import type { ApplianceWithQuantity } from '@/data/appliances';

interface PDFData {
  appliances: ApplianceWithQuantity[];
  batteryConfig: {
    voltage: number;
    capacity: number;
    count: number;
    dod: number;
  };
  calculations: {
    totalLoad: number;
    peakSurge: number;
    requiredKva: number;
    recommendedInverter: number;
    backupHours: number;
    warnings: string[];
    recommendations: string[];
  };
}

export function generatePDFContent(data: PDFData): string {
  const activeAppliances = data.appliances.filter(a => a.quantity > 0);
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const batteryEnergy = (
    (data.batteryConfig.voltage *
      data.batteryConfig.capacity *
      data.batteryConfig.count *
      data.batteryConfig.dod) /
    1000
  ).toFixed(1);

  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Solar Inverter Load Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1a2e;
      line-height: 1.6;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header { 
      text-align: center; 
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #00d9c0;
    }
    .header h1 { 
      font-size: 28px; 
      color: #1a1a2e;
      margin-bottom: 8px;
    }
    .header .date { 
      color: #666; 
      font-size: 14px; 
    }
    .section { 
      margin-bottom: 30px; 
    }
    .section-title { 
      font-size: 18px;
      font-weight: 600;
      color: #00d9c0;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 25px;
    }
    .stat-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
    }
    .stat-card.highlight {
      background: linear-gradient(135deg, #00d9c0, #00b4a0);
      color: white;
    }
    .stat-label { 
      font-size: 12px; 
      text-transform: uppercase;
      opacity: 0.8;
      margin-bottom: 4px;
    }
    .stat-value { 
      font-size: 24px; 
      font-weight: 700; 
    }
    .stat-unit { 
      font-size: 14px; 
      opacity: 0.8; 
    }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-top: 10px;
    }
    th, td { 
      padding: 10px 12px; 
      text-align: left; 
      border-bottom: 1px solid #e0e0e0;
    }
    th { 
      background: #f8f9fa; 
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
    }
    .warning-box {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 10px 0;
      border-radius: 0 8px 8px 0;
    }
    .recommendation-box {
      background: #d4edda;
      border-left: 4px solid #28a745;
      padding: 15px;
      margin: 10px 0;
      border-radius: 0 8px 8px 0;
    }
    .list-item {
      margin: 8px 0;
      padding-left: 15px;
      position: relative;
    }
    .list-item::before {
      content: "•";
      position: absolute;
      left: 0;
    }
    .disclaimer {
      margin-top: 40px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      font-size: 12px;
      color: #666;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>☀️ Solar Inverter Load Report</h1>
    <p class="date">Generated on ${date}</p>
  </div>

  <div class="section">
    <div class="section-title">Power Requirements Summary</div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Load</div>
        <div class="stat-value">${data.calculations.totalLoad.toLocaleString()}</div>
        <div class="stat-unit">Watts</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Peak Surge</div>
        <div class="stat-value">${data.calculations.peakSurge.toLocaleString()}</div>
        <div class="stat-unit">Watts</div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-label">Recommended Inverter</div>
        <div class="stat-value">${data.calculations.recommendedInverter}</div>
        <div class="stat-unit">kVA</div>
      </div>
      <div class="stat-card highlight">
        <div class="stat-label">Estimated Backup</div>
        <div class="stat-value">${data.calculations.backupHours}</div>
        <div class="stat-unit">Hours</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Selected Appliances</div>
    <table>
      <thead>
        <tr>
          <th>Appliance</th>
          <th>Wattage</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${activeAppliances
          .map(
            (a) => `
          <tr>
            <td>${a.name}</td>
            <td>${a.wattage}W</td>
            <td>${a.quantity}</td>
            <td>${a.wattage * a.quantity}W</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">Battery Configuration</div>
    <table>
      <tbody>
        <tr>
          <td>Bank Voltage</td>
          <td><strong>${data.batteryConfig.voltage}V</strong></td>
        </tr>
        <tr>
          <td>Battery Capacity</td>
          <td><strong>${data.batteryConfig.capacity}Ah</strong></td>
        </tr>
        <tr>
          <td>Number of Batteries</td>
          <td><strong>${data.batteryConfig.count}</strong></td>
        </tr>
        <tr>
          <td>Depth of Discharge</td>
          <td><strong>${Math.round(data.batteryConfig.dod * 100)}%</strong></td>
        </tr>
        <tr>
          <td>Total Usable Energy</td>
          <td><strong>${batteryEnergy} kWh</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  ${
    data.calculations.warnings.length > 0
      ? `
  <div class="section">
    <div class="section-title">⚠️ Warnings</div>
    <div class="warning-box">
      ${data.calculations.warnings.map((w) => `<div class="list-item">${w}</div>`).join('')}
    </div>
  </div>
  `
      : ''
  }

  ${
    data.calculations.recommendations.length > 0
      ? `
  <div class="section">
    <div class="section-title">💡 Recommendations</div>
    <div class="recommendation-box">
      ${data.calculations.recommendations.map((r) => `<div class="list-item">${r}</div>`).join('')}
    </div>
  </div>
  `
      : ''
  }

  <div class="disclaimer">
    <strong>Disclaimer:</strong> This report provides estimates for planning purposes only. 
    Actual power consumption may vary based on appliance efficiency, usage patterns, and environmental conditions. 
    Always consult with a qualified solar installer for professional sizing recommendations. 
    Calculations include a 30% safety margin and assume a power factor of 0.8.
  </div>

  <div class="footer">
    Solar Load Calculator • Professional Power Planning Tool
  </div>
</body>
</html>
  `;

  return html;
}

export function downloadPDF(data: PDFData): void {
  const htmlContent = generatePDFContent(data);
  
  // Create a new window with the HTML content
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
