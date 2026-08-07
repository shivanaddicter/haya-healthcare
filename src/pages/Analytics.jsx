import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { 
  Filter, 
  Calendar, 
  TrendingUp, 
  Activity, 
  RefreshCcw,
  BookOpen
} from 'lucide-react';
import clinicalDataset from '../data/clinicalDataset.json';

// Helper to calculate Pearson correlation
function getPearsonCorrelation(x, y) {
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  const minLength = Math.min(x.length, y.length);
  if (minLength === 0) return 0;
  for (let i = 0; i < minLength; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += (x[i] * y[i]);
    sumX2 += (x[i] * x[i]);
    sumY2 += (y[i] * y[i]);
  }
  const step1 = (minLength * sumXY) - (sumX * sumY);
  const step2 = (minLength * sumX2) - (sumX * sumX);
  const step3 = (minLength * sumY2) - (sumY * sumY);
  const step4 = Math.sqrt(step2 * step3);
  if (step4 === 0) return 0;
  return step1 / step4;
}

export default function Analytics() {
  const [diseaseFilter, setDiseaseFilter] = useState('all');
  const [patientTypeFilter, setPatientTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('6m');

  const handleResetFilters = () => {
    setDiseaseFilter('all');
    setPatientTypeFilter('all');
    setDateRange('6m');
  };

  // Dynamic Data Filtering
  const filteredData = React.useMemo(() => {
    let now = new Date();
    let limitDate = new Date();
    if (dateRange === '30d') limitDate.setDate(now.getDate() - 30);
    else if (dateRange === '6m') limitDate.setMonth(now.getMonth() - 6);
    else if (dateRange === '1y') limitDate.setFullYear(now.getFullYear() - 1);

    return clinicalDataset.filter(patient => {
      const dDate = new Date(patient.date);
      const isDateValid = dDate >= limitDate && dDate <= now;
      const isDiseaseValid = diseaseFilter === 'all' || patient.disease === diseaseFilter;
      const isTypeValid = patientTypeFilter === 'all' || patient.type === patientTypeFilter;
      return isDateValid && isDiseaseValid && isTypeValid;
    });
  }, [diseaseFilter, patientTypeFilter, dateRange]);

  // Derived Analytics Data
  const { trendData, ageDistributionData, riskPieData, correlationMatrix } = React.useMemo(() => {
    if (filteredData.length === 0) {
      return {
        trendData: { labels: [], datasets: [] },
        ageDistributionData: { labels: [], datasets: [] },
        riskPieData: { labels: [], datasets: [] },
        correlationMatrix: []
      };
    }

    // 1. Age Distribution
    let ageBuckets = [0, 0, 0, 0, 0]; // <18, 18-30, 31-45, 46-60, 60+
    filteredData.forEach(p => {
      if (p.age < 18) ageBuckets[0]++;
      else if (p.age <= 30) ageBuckets[1]++;
      else if (p.age <= 45) ageBuckets[2]++;
      else if (p.age <= 60) ageBuckets[3]++;
      else ageBuckets[4]++;
    });

    const ageDistributionData = {
      labels: ['<18', '18-30', '31-45', '46-60', '60+'],
      datasets: [{
        label: 'Patient Count',
        data: ageBuckets,
        backgroundColor: 'rgba(30, 136, 229, 0.75)',
        borderColor: '#1e88e5',
        borderWidth: 1
      }]
    };

    // 2. Risk Pie
    let riskCounts = { 'High Risk': 0, 'Moderate Risk': 0, 'Low Risk': 0 };
    filteredData.forEach(p => riskCounts[p.riskLevel]++);
    const riskPieData = {
      labels: ['High Risk', 'Moderate Risk', 'Low Risk'],
      datasets: [{
        data: [riskCounts['High Risk'], riskCounts['Moderate Risk'], riskCounts['Low Risk']],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
      }]
    };

    // 3. Trend Analysis (Last 6 Months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let now = new Date();
    let last6Months = [];
    for (let i = 5; i >= 0; i--) {
      let d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push(monthNames[d.getMonth()]);
    }
    
    let highRiskCounts = { 'kidney': [0,0,0,0,0,0], 'heart': [0,0,0,0,0,0], 'diabetes': [0,0,0,0,0,0], 'liver': [0,0,0,0,0,0] };
    filteredData.forEach(p => {
      if (p.riskLevel === 'High Risk') {
        const pDate = new Date(p.date);
        const diffMonths = (now.getFullYear() - pDate.getFullYear()) * 12 + (now.getMonth() - pDate.getMonth());
        if (diffMonths >= 0 && diffMonths <= 5) {
          const targetIdx = 5 - diffMonths;
          if (highRiskCounts[p.disease]) {
             highRiskCounts[p.disease][targetIdx]++;
          }
        }
      }
    });

    const trendData = {
      labels: last6Months,
      datasets: [
        { label: 'Kidney Risk Flags', data: highRiskCounts.kidney, borderColor: '#1e88e5', tension: 0.3, fill: false },
        { label: 'Heart Risk Flags', data: highRiskCounts.heart, borderColor: '#ef4444', tension: 0.3, fill: false },
        { label: 'Diabetes Risk Flags', data: highRiskCounts.diabetes, borderColor: '#f59e0b', tension: 0.3, fill: false }
      ]
    };

    // 4. Correlation Matrix
    const features = ['bp', 'chol', 'glucose', 'bmi', 'age'];
    const matrix = [];
    features.forEach(f1 => {
      let row = { row: f1.toUpperCase() };
      features.forEach(f2 => {
        if (f1 === f2) {
          row[f2] = "1.00";
        } else {
          let x = filteredData.map(p => p[f1]);
          let y = filteredData.map(p => p[f2]);
          let corr = getPearsonCorrelation(x, y);
          row[f2] = Math.abs(corr).toFixed(2); // absolute correlation
        }
      });
      matrix.push(row);
    });

    return { trendData, ageDistributionData, riskPieData, correlationMatrix: matrix };
  }, [filteredData]);

  // Helper to color matrix cells based on value
  const getCellColor = (val) => {
    const num = parseFloat(val);
    if (num === 1.0) return 'bg-blue-600 text-white font-bold';
    if (num > 0.28) return 'bg-blue-200 dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 font-semibold';
    if (num > 0.18) return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
    return 'bg-slate-50 dark:bg-slate-800/40 text-slate-500';
  };

  return (
    <div className="space-y-8 p-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Healthcare Analytics & Insights</h1>
          <p className="text-sm text-slate-500">
            Real-time analytics engine processing {filteredData.length} records.
          </p>
        </div>
        <button 
          onClick={handleResetFilters}
          className="flex items-center gap-1.5 text-xs font-semibold py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          Reset Filters
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Date Range
          </label>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-medical-primary"
          >
            <option value="30d">Last 30 Days</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        {/* Disease filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5" /> Disease Type
          </label>
          <select 
            value={diseaseFilter}
            onChange={(e) => setDiseaseFilter(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-medical-primary"
          >
            <option value="all">All Diseases</option>
            <option value="kidney">Kidney Disease</option>
            <option value="diabetes">Diabetes</option>
            <option value="heart">Heart Disease</option>
            <option value="liver">Liver Disease</option>
          </select>
        </div>

        {/* Patient type filter */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" /> Patient Type
          </label>
          <select 
            value={patientTypeFilter}
            onChange={(e) => setPatientTypeFilter(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-medical-primary"
          >
            <option value="all">All Patients</option>
            <option value="inpatient">In-Patients</option>
            <option value="outpatient">Out-Patients</option>
          </select>
        </div>
      </div>

      {/* Main analytics grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend analysis line chart */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-md flex items-center gap-1.5">
            <TrendingUp className="h-5 w-5 text-medical-primary" />
            Trend Analysis (Flags Over Time)
          </h3>
          <div className="h-64">
            <Line data={trendData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Age Histogram */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-md flex items-center gap-1.5">
            <Activity className="h-5 w-5 text-indigo-500" />
            Age Distribution (Histogram)
          </h3>
          <div className="h-64">
            <Bar data={ageDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Correlation Matrix (Heatmap UI) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-md flex items-center gap-1.5">
            <BookOpen className="h-5 w-5 text-teal-500" />
            Clinical Parameter Correlation Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-2.5 text-left font-bold text-slate-500">Feature</th>
                  <th className="p-2.5 font-bold text-slate-500">BP</th>
                  <th className="p-2.5 font-bold text-slate-500">Cholesterol</th>
                  <th className="p-2.5 font-bold text-slate-500">Glucose</th>
                  <th className="p-2.5 font-bold text-slate-500">BMI</th>
                  <th className="p-2.5 font-bold text-slate-500">Age</th>
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-850">
                    <td className="p-2.5 text-left font-semibold text-slate-650 dark:text-slate-350">{item.row}</td>
                    <td className={`p-2.5 rounded-lg ${getCellColor(item.bp)}`}>{item.bp}</td>
                    <td className={`p-2.5 rounded-lg ${getCellColor(item.chol)}`}>{item.chol}</td>
                    <td className={`p-2.5 rounded-lg ${getCellColor(item.glucose)}`}>{item.glucose}</td>
                    <td className={`p-2.5 rounded-lg ${getCellColor(item.bmi)}`}>{item.bmi}</td>
                    <td className={`p-2.5 rounded-lg ${getCellColor(item.age)}`}>{item.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Level Distribution Pie */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-md flex items-center gap-1.5">
            <Filter className="h-5 w-5 text-rose-500" />
            Filtered Patient Risk Levels
          </h3>
          <div className="h-56 flex justify-center items-center">
            <div className="h-44 w-44">
              <Pie data={riskPieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
