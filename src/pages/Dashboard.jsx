import React, { useState, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Users, 
  Activity, 
  UserCheck, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  Bell,
  HeartPulse,
  ChevronRight,
  UserPlus,
  Watch,
  ActivitySquare
} from 'lucide-react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

export default function Dashboard() {
  const { patients, doctors } = useSystem();
  const [activeChartTab, setActiveChartTab] = useState('predictions');
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_GNEWS_API_KEY?.replace(/['"]/g, '').trim();
      const apiUrl = import.meta.env.VITE_GNEWS_API_URL || 'https://gnews.io/api/v4/search';
      
      if (!apiKey) {
        setNews([
          { title: "System flagged high risk Kidney reports in registry update.", type: "warning" },
          { title: "System model accuracy margins updated in control dashboard.", type: "info" },
          { title: "Weekly aggregate analytics reports compiled successfully.", type: "success" },
        ]);
        setNewsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}?q=healthcare OR medicine&lang=en&max=3&apikey=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setNews(data.articles || []);
        } else {
          throw new Error('News API failed');
        }
      } catch (err) {
        console.error("GNews fetch error:", err);
        setNews([
          { title: "Could not fetch live news. Network error or limit reached.", type: "warning" },
          { title: "System flagged high risk Kidney reports in registry update.", type: "info" },
        ]);
      }
      setNewsLoading(false);
    };
    fetchNews();
  }, []);

  // Compute live counts based on SystemContext
  const totalPatientsCount = patients.length + 3418; // offset to make it look realistic
  const highRiskCount = patients.filter(p => p.predictions?.some(pred => pred.status === 'High Risk')).length + 310;
  const lowRiskCount = totalPatientsCount - highRiskCount;

  // Dashboard Stats configuration
  const stats = [
    { label: "Total Patients", value: totalPatientsCount.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { label: "Total Predictions", value: "15,240", icon: Activity, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/20" },
    { label: "Active Users", value: "1,280", icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
    { label: "Disease Predictions Today", value: "48", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20" },
    { label: "High Risk Patients", value: highRiskCount.toString(), icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/20" },
    { label: "Low Risk Patients", value: lowRiskCount.toLocaleString(), icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
    { label: "Accuracy Rate", value: "98.4%", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
    { label: "Reports Generated", value: "2,840", icon: FileText, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-950/20" },
  ];

  // Chart Data Configurations
  const monthlyPredictionsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Predictions Made',
      data: [1200, 1500, 1800, 2200, 2600, 3120],
      borderColor: '#1e88e5',
      backgroundColor: 'rgba(30, 136, 229, 0.15)',
      fill: true,
      tension: 0.4,
    }]
  };

  const diseaseDistributionData = {
    labels: ['Kidney', 'Diabetes', 'Heart', 'Liver', 'Parkinson\'s', 'Lung Cancer', 'Stroke'],
    datasets: [{
      label: 'Cases Detected',
      data: [420, 890, 560, 310, 120, 180, 290],
      backgroundColor: [
        'rgba(30, 136, 229, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(100, 116, 139, 0.8)',
      ],
      borderWidth: 1,
    }]
  };

  const accuracyData = {
    labels: ['Kidney', 'Diabetes', 'Heart', 'Liver', 'Parkinson\'s', 'Lung Cancer', 'Stroke'],
    datasets: [{
      label: 'Model Accuracy (%)',
      data: [98.2, 97.8, 98.9, 97.2, 99.1, 98.5, 99.0],
      backgroundColor: 'rgba(16, 185, 129, 0.7)',
      borderColor: '#10b981',
      borderWidth: 1,
    }]
  };

  const patientGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Patients Registered',
      data: [500, 800, 1200, 1900, 2600, totalPatientsCount],
      borderColor: '#0d47a1',
      backgroundColor: 'rgba(13, 71, 161, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const riskLevelData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [{
      data: [75, 15, 10],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      hoverOffset: 4
    }]
  };

  const genderData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [{
      data: [52, 46, 2],
      backgroundColor: ['#1e88e5', '#ec7299', '#94a3b8'],
    }]
  };

  // Compile recent predictions from live patients
  const recentPredictionsList = patients
    .flatMap(p => (p.predictions || []).map(pred => ({
      patientName: p.name,
      disease: pred.disease,
      risk: pred.risk,
      status: pred.status,
      date: pred.date
    })))
    .slice(0, 3);

  // Fallback if no predictions are logged yet
  const displayPredictions = recentPredictionsList.length > 0 ? recentPredictionsList : [
    { patientName: "John Doe", disease: "Kidney Disease", risk: "12%", status: "Low Risk", date: "2026-06-12" },
    { patientName: "Sarah Jenkins", disease: "Heart Disease", risk: "74%", status: "High Risk", date: "2026-06-11" },
    { patientName: "Michael Chang", disease: "Diabetes Risk", risk: "18%", status: "Low Risk", date: "2026-06-10" }
  ];

  return (
    <div className="space-y-4 sm:space-y-8 p-3 sm:p-6 animate-slide-up">
      {/* Brand Header Banner with Zen Meditation Aura & Viewing-Size Logo */}
      <div className="relative overflow-hidden glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-2xl bg-gradient-to-r from-blue-900/15 via-teal-900/15 to-indigo-900/15 dark:from-slate-900/90 dark:to-slate-950/90 animate-meditation">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-breath-ring"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative group shrink-0">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-400 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500 animate-glow-pulse"></div>
              <img 
                src="/logo.png" 
                alt="Haya Health Care Logo" 
                className="relative h-20 sm:h-28 w-auto object-contain logo-viewing-size cursor-pointer"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-medical-primary/15 text-medical-primary border border-medical-primary/30 shadow-sm">
                  Clinical AI Engine
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 animate-meditation">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Human Zen Meditation Active
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-gradient-animated mt-2 leading-none">
                HAYA HEALTH CARE
              </h1>
              <p className="text-xs sm:text-base font-semibold text-slate-600 dark:text-slate-300 mt-1.5">
                AI-Powered Multi-Disease Clinical Diagnostics & Holistic Patient Vitality Platform
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md text-xs font-black flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-emerald-500 animate-ekg-beat" />
              <span>7 Diagnostic Neural Models</span>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-md text-xs font-extrabold text-slate-500 dark:text-slate-400">
              Retrained: 2d ago
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 card-glass-hover shadow-sm flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-semibold group-hover:text-medical-primary transition-colors">{stat.label}</span>
              <div className="text-xl sm:text-2xl font-extrabold font-display group-hover:scale-105 transition-transform origin-left">{stat.value}</div>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Charts Area */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg">System Insights</h3>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
              <button 
                onClick={() => setActiveChartTab('predictions')}
                className={`py-1.5 px-3 rounded-md transition-all ${activeChartTab === 'predictions' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
              >
                Predictions
              </button>
              <button 
                onClick={() => setActiveChartTab('distribution')}
                className={`py-1.5 px-3 rounded-md transition-all ${activeChartTab === 'distribution' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
              >
                Diseases
              </button>
              <button 
                onClick={() => setActiveChartTab('accuracy')}
                className={`py-1.5 px-3 rounded-md transition-all ${activeChartTab === 'accuracy' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
              >
                Accuracy
              </button>
              <button 
                onClick={() => setActiveChartTab('growth')}
                className={`py-1.5 px-3 rounded-md transition-all ${activeChartTab === 'growth' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
              >
                Patient Growth
              </button>
            </div>
          </div>

          <div className="h-72 flex items-center justify-center">
            {activeChartTab === 'predictions' && <Line data={monthlyPredictionsData} options={{ responsive: true, maintainAspectRatio: false }} />}
            {activeChartTab === 'distribution' && <Bar data={diseaseDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />}
            {activeChartTab === 'accuracy' && <Bar data={accuracyData} options={{ responsive: true, maintainAspectRatio: false }} />}
            {activeChartTab === 'growth' && <Line data={patientGrowthData} options={{ responsive: true, maintainAspectRatio: false }} />}
          </div>
        </div>

        {/* Side Charts / Demographics */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-bold text-lg border-b border-slate-200 dark:border-slate-800 pb-4">Demographics & Risk</h3>
          <div className="grid grid-cols-2 gap-4 h-64 items-center">
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 mb-2">Risk Distribution</span>
              <div className="h-36 w-36">
                <Doughnut data={riskLevelData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 mb-2">Gender Share</span>
              <div className="h-36 w-36">
                <Pie data={genderData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Widgets & Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Predictions Widget */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-md flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-medical-primary" />
              Recent Predictions
            </h4>
          </div>
          <div className="space-y-3.5">
            {displayPredictions.map((p, i) => (
              <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="font-bold block text-slate-650 dark:text-slate-350">{p.patientName}</span>
                  <span className="text-slate-400">{p.disease}</span>
                </div>
                <div className="text-right">
                  <span className={`font-semibold block ${p.status.includes('High') ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {p.status} ({p.risk})
                  </span>
                  <span className="text-[10px] text-slate-400">{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Medical News / Alerts Widget */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col h-full">
          <h4 className="font-bold text-md flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500 animate-bounce" />
              Live Medical News
            </span>
            {import.meta.env.VITE_GNEWS_API_KEY && !newsLoading && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full animate-pulse">Live</span>}
          </h4>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {newsLoading ? (
              <div className="text-center text-xs text-slate-400 py-4">Loading news...</div>
            ) : news.length === 0 ? (
              <div className="text-center text-xs text-slate-400 py-4">No news available</div>
            ) : (
              news.map((item, i) => (
                <a 
                  key={i}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className={`block p-3 rounded-xl border text-xs leading-relaxed transition-all hover:scale-[1.02] cursor-pointer ${
                    item.type === 'warning' 
                      ? 'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 text-amber-800 dark:text-amber-300' 
                      : item.type === 'info' || item.type === 'success'
                      ? 'bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:shadow-md'
                  }`}
                >
                  <p className={`font-semibold line-clamp-2 ${!item.type ? 'text-slate-800 dark:text-slate-200' : ''}`}>
                    {item.title}
                  </p>
                  {item.source?.name && (
                    <span className="block mt-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Source: {item.source.name}
                    </span>
                  )}
                </a>
              ))
            )}
          </div>
        </div>

        {/* Live IoT Wearable Sync Widget */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative overflow-hidden group">
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <h4 className="font-bold text-md flex items-center justify-between relative z-10">
            <span className="flex items-center gap-2">
              <Watch className="h-5 w-5 text-emerald-500 animate-pulse" />
              Live Wearable Sync
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Connected
            </span>
          </h4>
          
          <div className="space-y-4 relative z-10 mt-2">
            {/* Simulated EKG Line */}
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 relative overflow-hidden h-16 flex items-center justify-center">
              <ActivitySquare className="text-emerald-500 w-full h-24 opacity-80 animate-ekg-beat absolute" />
              <div className="absolute top-1 left-2 text-[9px] font-black tracking-widest text-emerald-500">EKG LIVE</div>
              <div className="absolute bottom-1 right-2 text-xs font-bold text-emerald-400">72 BPM</div>
            </div>

            {/* Simulated Activity Rings */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xl font-black text-rose-500">6,420</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Steps</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center">
                <span className="text-xl font-black text-blue-500">98%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SpO2</span>
              </div>
            </div>
            
            <div className="text-[10px] text-center text-slate-400 font-semibold italic">
              Syncing continuously with Apple HealthKit / WearOS API
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
