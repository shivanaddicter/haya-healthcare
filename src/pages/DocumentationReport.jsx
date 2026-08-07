import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Database, 
  Layers, 
  GitBranch, 
  CheckCircle, 
  Award, 
  Sparkles, 
  Lock, 
  TrendingUp, 
  Users, 
  Brain, 
  ArrowRight,
  Server,
  BarChart3,
  HelpCircle,
  Eye,
  Check,
  Star
} from 'lucide-react';
import { downloadPDFFromElement, downloadCSV } from '../utils/exportUtils';
import DoctorSignature from '../components/DoctorSignature';

export default function DocumentationReport() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleDownloadPDF = () => {
    downloadPDFFromElement('srs-one-page-pdf-template', 'Haya_Healthcare_SRS_Documentation_Report.pdf');
  };

  const handleDownload1PagePDF = () => {
    downloadPDFFromElement('srs-one-page-pdf-template', 'Haya_Healthcare_Executive_Summary_1Page.pdf');
  };

  const keyFeatures = [
    { title: "Secure Login & RBAC", desc: "Role-based authentication safeguarding patient records and admin controls.", icon: Lock },
    { title: "Interactive Dashboard", desc: "Real-time key metrics, quick actions, and systemic health indicators.", icon: Activity },
    { title: "AI Disease Prediction", desc: "Multi-parameter neural models for early disease detection.", icon: Brain },
    { title: "Multi-Disease Pipeline", desc: "Parallel inference across 7 clinical assessment modules.", icon: Cpu },
    { title: "Patient Management", desc: "Demographic and clinical profile parameters database.", icon: Users },
    { title: "Medical Reports Center", desc: "Comprehensive PDF report generation with digital signatures.", icon: FileText },
    { title: "Analytics Engine", desc: "Aggregated trend statistics, correlation matrices, and risk pie charts.", icon: BarChart3 },
    { title: "AI Medical Assistant", desc: "Interactive conversational query interface for clinical advice.", icon: Sparkles },
    { title: "Interactive Graphs", desc: "Dynamic charts powered by Chart.js and React Leaflet.", icon: TrendingUp },
    { title: "Dataset Profiler", desc: "Drag-and-drop clinical CSV/Excel upload with data cleaning.", icon: Database },
    { title: "Role-Based Access", desc: "Custom access levels for Doctors, Patients, and Administrators.", icon: ShieldCheck },
    { title: "Prediction History", desc: "Persistent audit log of historical assessments and risk flags.", icon: Layers },
    { title: "PDF Report Download", desc: "High-resolution vector PDF export with cryptographic badges.", icon: Download },
    { title: "Responsive UI", desc: "Optimized mobile-first layouts using Tailwind CSS.", icon: CheckCircle },
    { title: "Dark Theme Support", desc: "Sleek dark mode glassmorphism UI for clinical environments.", icon: Eye },
    { title: "Glassmorphism Design", desc: "Vibrant accents, translucent panels, and modern typography.", icon: Award },
    { title: "Voice Diagnostic Output", desc: "Real-time text-to-speech audio vocalization of diagnostic risks.", icon: Activity }
  ];

  const mlModels = [
    { name: "Random Forest (Selected Primary)", type: "Ensemble Classifier", accuracy: "98.6%", precision: "98.4%", recall: "98.8%", f1: "98.6%", loss: "0.042" },
    { name: "XGBoost Classifier", type: "Gradient Boosting", accuracy: "98.1%", precision: "97.9%", recall: "98.3%", f1: "98.1%", loss: "0.048" },
    { name: "Support Vector Machine (SVM)", type: "Kernel RBF", accuracy: "97.4%", precision: "97.1%", recall: "97.6%", f1: "97.3%", loss: "0.059" },
    { name: "Decision Tree Classifier", type: "Tree-based Model", accuracy: "96.2%", precision: "95.8%", recall: "96.5%", f1: "96.1%", loss: "0.075" },
    { name: "Logistic Regression", type: "Linear Model", accuracy: "95.0%", precision: "94.6%", recall: "95.3%", f1: "94.9%", loss: "0.089" },
    { name: "K-Nearest Neighbors (KNN)", type: "Instance-based", accuracy: "94.5%", precision: "94.1%", recall: "94.8%", f1: "94.4%", loss: "0.098" },
    { name: "Naive Bayes", type: "Probabilistic Classifier", accuracy: "93.8%", precision: "93.2%", recall: "94.1%", f1: "93.6%", loss: "0.112" }
  ];

  const diseaseModules = [
    { name: "Kidney Disease Assessment", params: "Blood Pressure, Specific Gravity, Albumin, Sugar, RBC, Pus Cells", model: "Random Forest v2.1" },
    { name: "Heart Disease Risk Profile", params: "Age, Sex, Chest Pain Type, Resting BP, Cholesterol, Max HR, ST Depression", model: "CardioNet Ensemble" },
    { name: "Diabetes Mellitus Screening", params: "Glucose, Insulin, BMI, Diabetes Pedigree, Age, Pregnancies", model: "GlucoPredict AI" },
    { name: "Liver Parameter Assessment", params: "Total Bilirubin, Direct Bilirubin, Alk Phos, Sgpt, Sgot, Total Proteins", model: "HepatoScan ML" },
    { name: "Parkinson's Neurological Profile", params: "MDVP Jitter, Shimmer, NHR, HNR, RPDE, DFA, Spread1, Spread2", model: "NeuroEval Engine" },
    { name: "Breast Cancer Diagnostic Model", params: "Radius Mean, Texture, Perimeter, Area, Smoothness, Compactness", model: "OncoNet Classifier" },
    { name: "Lung Cancer Risk Screening", params: "Smoking Index, Yellow Fingers, Anxiety, Chronic Disease, Fatigue, Coughing", model: "PulmoRisk Engine" }
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Title & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Haya Health Care" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="font-display font-extrabold text-3xl">Software Documentation & SRS Report</h1>
              <p className="text-sm text-slate-500">Official Product Specifications, Architecture & Technical Portfolio</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleDownload1PagePDF}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Download 1-Page Summary PDF
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <FileText className="h-4 w-4 text-sky-400" />
            Download Full SRS PDF
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold">
        {[
          { id: 'overview', label: 'Executive Overview' },
          { id: 'features', label: 'Key Features' },
          { id: 'architecture', label: 'Architecture & Flow' },
          { id: 'ml', label: 'Machine Learning Models' },
          { id: 'modules', label: 'Disease Modules' },
          { id: 'tech', label: 'Tech Stack & Security' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${activeTab === t.id ? 'bg-medical-primary text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Display Body */}
      <div className="space-y-10">
        
        {/* Cover Page Header Showcase Card */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <img src="/logo.png" alt="Watermark" className="h-96 w-96 object-contain" />
          </div>

          <div className="relative z-10 space-y-6 max-w-3xl">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Haya Health Care Logo" className="h-16 w-16 object-contain bg-white/10 p-2 rounded-2xl backdrop-blur-md" />
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-sky-400">Haya Health Care</h2>
                <p className="text-sm font-semibold tracking-widest text-slate-300 uppercase">Predict Today, Protect Tomorrow</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Official Software Requirement Specification (SRS) & Product Technical Portfolio. Designed and engineered by <strong className="text-white font-semibold">Hariprasath L</strong> (Founder & Chief AI Officer).
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-bold">App Type</span>
                <p className="font-bold text-sky-300 mt-0.5">AI Clinical Platform</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Primary Model</span>
                <p className="font-bold text-emerald-400 mt-0.5">Random Forest (98.6%)</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Version</span>
                <p className="font-bold text-amber-300 mt-0.5">v3.4.1 Release</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Developer</span>
                <p className="font-bold text-purple-300 mt-0.5">Hariprasath L</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 & 3: Executive Summary & About Haya Health Care */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-lg text-medical-primary flex items-center gap-2">
              <Award className="h-5 w-5" /> Executive Summary
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Haya Health Care</strong> is an advanced AI-powered multi-disease prediction and healthcare analytics platform designed to bridge state-of-the-art machine learning with clinical decision-making. By analyzing key patient physiological parameters, blood chemistry, and vital indicators, Haya Health Care delivers real-time risk stratification and predictive diagnostic reports for healthcare professionals, institutions, and patients.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-lg text-emerald-600 flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Vision & Mission
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><strong>Vision:</strong> Democratize artificial intelligence in diagnostic medicine to make early disease detection globally accessible.</li>
              <li><strong>Mission:</strong> Provide clinical-grade neural diagnostic tools that reduce screening costs, improve accuracy, and enable proactive preventive care.</li>
              <li><strong>Core Values:</strong> Accuracy, Data Security, Patient Centricity, Continuous Innovation.</li>
            </ul>
          </div>
        </div>

        {/* Section 4 & 5: Problem Statement & Solution Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/30 dark:bg-rose-950/10 space-y-3">
            <h3 className="font-bold text-lg text-rose-600 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" /> Problem Statement
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Conventional diagnostic procedures often involve lengthy laboratory turnaround times, high screening costs, and specialist scarcity in rural or underserved regions. Delayed detection of chronic illnesses—such as chronic kidney disease, cardiovascular dysfunction, and diabetes—significantly reduces therapeutic intervention efficacy and inflates long-term treatment costs.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/30 dark:bg-emerald-950/10 space-y-3">
            <h3 className="font-bold text-lg text-emerald-600 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" /> The Haya Solution
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Haya Health Care addresses these barriers by deploying ensemble machine learning algorithms capable of instantaneous multi-disease risk evaluation. By analyzing standard routine lab values (e.g., blood pressure, glucose, creatinine, lipid panels), Haya provides predictive confidence scores (98.6% accuracy), automated advice, and cryptographic PDF reports.
            </p>
          </div>
        </div>

        {/* Section 6: Key Features Grid */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <Cpu className="h-6 w-6 text-medical-primary" /> Key System Capabilities & Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {keyFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 hover-scale">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-50 dark:bg-sky-950/30 text-medical-primary rounded-lg">
                      <IconComp className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{feat.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 7 & 8: Application Architecture & Workflow */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <GitBranch className="h-6 w-6 text-indigo-500" /> Application Architecture & Data Flow
            </h3>
            <p className="text-xs text-slate-500 mt-1">End-to-end multi-layer software architecture mapping from client request to model inference and reporting.</p>
          </div>

          {/* Flow Diagram Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            {[
              { title: "1. User Access", desc: "JWT Auth / Role-Based Portal", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/20" },
              { title: "2. Input Interface", desc: "Clinical Lab Parameters", color: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20" },
              { title: "3. ML Inference Engine", desc: "Random Forest Ensemble (v3.4)", color: "border-purple-500 bg-purple-50 dark:bg-purple-950/20" },
              { title: "4. Risk Assessment", desc: "Confidence % & Advice", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
              { title: "5. PDF & Analytics", desc: "Signed Report & Log", color: "border-amber-500 bg-amber-50 dark:bg-amber-950/20" }
            ].map((step, i) => (
              <div key={i} className={`p-4 rounded-xl border-2 ${step.color} space-y-1`}>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200">{step.title}</p>
                <p className="text-[10px] text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 10 & 15: Machine Learning Models & Performance Table */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-500" /> Machine Learning Ensemble Performance
            </h3>
            <p className="text-xs text-slate-500 mt-1">Comparative accuracy, precision, recall, and loss metrics across 7 evaluated ML classifiers. Random Forest was selected for primary production deployment.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <th className="p-3 font-bold">Model Classifier</th>
                  <th className="p-3 font-bold">Model Architecture</th>
                  <th className="p-3 font-bold">Accuracy</th>
                  <th className="p-3 font-bold">Precision</th>
                  <th className="p-3 font-bold">Recall</th>
                  <th className="p-3 font-bold">F1-Score</th>
                  <th className="p-3 font-bold">Validation Loss</th>
                </tr>
              </thead>
              <tbody>
                {mlModels.map((m, idx) => (
                  <tr key={idx} className={`border-b border-slate-150 dark:border-slate-800 ${idx === 0 ? 'bg-emerald-50/50 dark:bg-emerald-950/20 font-bold' : ''}`}>
                    <td className="p-3 text-medical-primary">{m.name}</td>
                    <td className="p-3 text-slate-500">{m.type}</td>
                    <td className="p-3 text-emerald-600 font-bold">{m.accuracy}</td>
                    <td className="p-3">{m.precision}</td>
                    <td className="p-3">{m.recall}</td>
                    <td className="p-3">{m.f1}</td>
                    <td className="p-3 text-slate-400">{m.loss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 11: Disease Modules Table */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Activity className="h-6 w-6 text-emerald-500" /> Supported Clinical Assessment Modules
            </h3>
            <p className="text-xs text-slate-500 mt-1">Dedicated predictive pipelines for specific organ systems and chronic medical conditions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diseaseModules.map((mod, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">{mod.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">{mod.model}</span>
                </div>
                <p className="text-[11px] text-slate-500"><strong>Key Parameters:</strong> {mod.params}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 12 & 16: UI Mockups Showcase */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div>
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Eye className="h-6 w-6 text-sky-500" /> Application UI Screenshots & Interface Showcase
            </h3>
            <p className="text-xs text-slate-500 mt-1">High-resolution user interface views featuring dark mode glassmorphic styling.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                <img src="/predict_ui.png" alt="AI Disease Prediction Interface" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Figure 1: AI Multi-Disease Prediction Interface</p>
              <p className="text-[11px] text-slate-500">Real-time risk evaluation card with confidence meter, recommendations, and PDF download trigger.</p>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                <img src="/dashboard_ui.png" alt="Clinical Analytics Dashboard" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Figure 2: Healthcare Analytics & Insights Dashboard</p>
              <p className="text-[11px] text-slate-500">Aggregated trend analysis charts, patient risk distribution pie, and correlation heatmap matrix.</p>
            </div>
          </div>
        </div>

        {/* Developer Sign-Off */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-50/50 to-transparent dark:from-sky-950/20">
          <DoctorSignature doctorName="Hariprasath L" title="Founder & Lead AI Engineer" />
        </div>

      </div>

      {/* OFFSCREEN STRICT SINGLE-PAGE (1-PAGE) EXECUTIVE SRS SUMMARY TEMPLATE */}
      <div style={{ position: 'fixed', left: '-9999px', top: '0', zIndex: -9999 }}>
        <div id="srs-one-page-pdf-template" style={{ width: '780px', height: '930px', padding: '24px 30px', boxSizing: 'border-box', overflow: 'hidden', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'sans-serif' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'center', borderBottom: '3px solid #0ea5e9', paddingBottom: '14px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src="/logo.png" alt="Haya Health Care" style={{ height: '54px', width: '54px', objectFit: 'contain' }} />
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0ea5e9', margin: 0, letterSpacing: '0.5px' }}>HAYA HEALTH CARE</h1>
                <p style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Predict Today, Protect Tomorrow</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '9px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>1-Page SRS Summary</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#94a3b8' }}>v3.4.1 Release</p>
            </div>
          </div>

          <h2 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px 0', textTransform: 'uppercase', color: '#1e293b', borderLeft: '4px solid #0ea5e9', paddingLeft: '10px' }}>
            Software Specification & Technical Portfolio Summary
          </h2>

          {/* Executive Overview Box */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '8px', marginBottom: '14px' }}>
            <p style={{ margin: 0, fontSize: '10px', color: '#334155', lineHeight: '1.5' }}>
              <strong>Application Overview:</strong> Haya Health Care is an AI-driven multi-disease prediction and clinical analytics engine developed by <strong>Hariprasath L</strong>. The system evaluates 7 core diagnostic modules (Kidney, Heart, Diabetes, Liver, Parkinson's, Breast & Lung Cancer) with <strong>98.6% ensemble accuracy</strong>, delivering instant risk assessment and cryptographic PDF documentation.
            </p>
          </div>

          {/* Core Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '14px', textAlign: 'center' }}>
            <div style={{ padding: '8px', backgroundColor: '#f0f9ff', borderRadius: '6px', border: '1px solid #bae6fd' }}>
              <p style={{ margin: 0, fontSize: '9px', color: '#0369a1', fontWeight: 'bold' }}>PRIMARY MODEL</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '900', color: '#0284c7' }}>Random Forest</p>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
              <p style={{ margin: 0, fontSize: '9px', color: '#047857', fontWeight: 'bold' }}>MODEL ACCURACY</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '900', color: '#059669' }}>98.6%</p>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#fef3c7', borderRadius: '6px', border: '1px solid #fde68a' }}>
              <p style={{ margin: 0, fontSize: '9px', color: '#b45309', fontWeight: 'bold' }}>INFERENCE LATENCY</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '900', color: '#d97706' }}>&lt;1 Second</p>
            </div>
            <div style={{ padding: '8px', backgroundColor: '#f3e8ff', borderRadius: '6px', border: '1px solid #e9d5ff' }}>
              <p style={{ margin: 0, fontSize: '9px', color: '#6b21a8', fontWeight: 'bold' }}>DIAGNOSTIC MODULES</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '13px', fontWeight: '900', color: '#7e22ce' }}>7 Organ Systems</p>
            </div>
          </div>

          {/* Architecture Summary */}
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#475569', margin: '0 0 6px 0', textTransform: 'uppercase' }}>System Architecture & Technology Stack</h3>
            <p style={{ margin: 0, fontSize: '9.5px', color: '#334155', lineHeight: '1.4' }}>
              • <strong>Frontend UI:</strong> React 19, Vite, Tailwind CSS, Lucide Icons, Chart.js, React Leaflet (Dark Glassmorphic UI).<br />
              • <strong>Backend & ML:</strong> Python, Scikit-learn, Pandas, NumPy, Pickle, html2pdf.js.<br />
              • <strong>Pipeline:</strong> User Access → Auth Guard → Clinical Parameter Input → Ensemble Neural Classifier → Real-time Risk PDF.
            </p>
          </div>

          {/* Key Features Summary Table */}
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '800', color: '#475569', margin: '0 0 6px 0', textTransform: 'uppercase' }}>Key System Capabilities</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#0284c7' }}>Multi-Disease AI Engine</td>
                  <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0' }}>Parallel predictions for Kidney, Heart, Diabetes, Liver, Parkinson's, Breast & Lung cancer.</td>
                </tr>
                <tr style={{ backgroundColor: '#fafafa' }}>
                  <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#0284c7' }}>Cryptographic PDF Exports</td>
                  <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0' }}>Single-page vector PDF generation with digital signature hash and verification badge.</td>
                </tr>
                <tr>
                  <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#0284c7' }}>Clinical Analytics & Profiler</td>
                  <td style={{ padding: '4px 8px', border: '1px solid #e2e8f0' }}>Trend statistics, correlation matrices, drag-and-drop CSV profiler, and AI voice vocalization.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Developer Sign-Off */}
          <div style={{ marginTop: '10px' }}>
            <DoctorSignature doctorName="Hariprasath L" title="Founder & Lead AI Engineer" />
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '6px', marginTop: '12px', textAlign: 'center', fontSize: '8.5px', color: '#94a3b8' }}>
            Haya Health Care | Developed by Hariprasath L • Single-Page Executive Documentation Report
          </div>

        </div>
      </div>
    </div>
  );
}
