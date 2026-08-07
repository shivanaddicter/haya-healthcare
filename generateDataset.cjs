const fs = require('fs');

const diseases = ['kidney', 'diabetes', 'heart', 'liver'];
const patientTypes = ['inpatient', 'outpatient'];

// Helper for normal distribution
function randomNormal(min, max) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; 
  if (num > 1 || num < 0) return randomNormal(min, max);
  return Math.floor(num * (max - min) + min);
}

const generateDataset = (count) => {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const disease = diseases[Math.floor(Math.random() * diseases.length)];
    const type = patientTypes[Math.floor(Math.random() * patientTypes.length)];
    
    // Generate dates over the last 12 months
    const dateOffset = Math.floor(Math.random() * 365);
    const date = new Date(now.getTime() - (dateOffset * 24 * 60 * 60 * 1000));
    const monthStr = date.toLocaleString('default', { month: 'short' });

    // Realistic stats based on disease
    let age = randomNormal(18, 85);
    let bp = randomNormal(90, 160);
    let chol = randomNormal(120, 300);
    let glucose = randomNormal(70, 200);
    let bmi = randomNormal(18, 40);
    
    let riskScore = 0;

    if (disease === 'heart') {
      age = randomNormal(45, 85);
      bp = randomNormal(130, 180);
      chol = randomNormal(200, 350);
      riskScore = (chol > 240 ? 40 : 10) + (bp > 140 ? 30 : 10) + (age > 60 ? 20 : 0);
    } else if (disease === 'diabetes') {
      glucose = randomNormal(120, 300);
      bmi = randomNormal(25, 45);
      riskScore = (glucose > 140 ? 50 : 10) + (bmi > 30 ? 30 : 10);
    } else if (disease === 'kidney') {
      age = randomNormal(50, 85);
      bp = randomNormal(140, 190);
      riskScore = (bp > 140 ? 40 : 10) + (age > 65 ? 30 : 10);
    } else {
      riskScore = Math.floor(Math.random() * 100);
    }

    let riskLevel = 'Low Risk';
    if (riskScore > 75) riskLevel = 'High Risk';
    else if (riskScore > 40) riskLevel = 'Moderate Risk';

    data.push({
      id: `PT-${Math.floor(Math.random() * 9000) + 1000}`,
      age,
      disease,
      type,
      bp,
      chol,
      glucose,
      bmi,
      riskScore,
      riskLevel,
      date: date.toISOString(),
      month: monthStr
    });
  }
  return data;
};

const dataset = generateDataset(1500);

// Ensure directory exists
const dir = './src/data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync('./src/data/clinicalDataset.json', JSON.stringify(dataset, null, 2));
console.log('Dataset generated successfully!');
