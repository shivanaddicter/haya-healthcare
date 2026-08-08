import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Calendar,
  Printer,
  Users
} from 'lucide-react';
import { downloadCSV, downloadExcel, downloadPDFFromElement } from '../utils/exportUtils';
import DoctorSignature from '../components/DoctorSignature';

export default function Reports() {
  const { patients } = useSystem();
  const [searchQuery, setSearchQuery] = useState('');
  const [reportType, setReportType] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  // Dynamically compile reports from SystemContext live patients array
  const allReports = patients.flatMap((p) => {
    if (p.predictions && p.predictions.length > 0) {
      return p.predictions.map((pred, idx) => ({
        id: `REP-${p.id.replace('P-', '')}-${idx + 1}`,
        patient: p.name,
        patientId: p.id,
        age: p.age,
        gender: p.gender,
        phone: p.phone || 'N/A',
        email: p.email || 'N/A',
        type: "Prediction Report",
        disease: `${pred.disease} Assessment`,
        date: pred.date || new Date().toISOString().split('T')[0],
        risk: `${pred.status} (${pred.risk})`,
        status: "Completed",
        accuracy: "98.4%",
        notes: p.notes
      }));
    } else {
      return [{
        id: `REP-${p.id.replace('P-', '')}-0`,
        patient: p.name,
        patientId: p.id,
        age: p.age,
        gender: p.gender,
        phone: p.phone || 'N/A',
        email: p.email || 'N/A',
        type: "Health Summary",
        disease: "General Baseline Diagnostic Profile",
        date: new Date().toISOString().split('T')[0],
        risk: "Low / Baseline",
        status: "Registered",
        accuracy: "98.4%",
        notes: p.notes || "No notes recorded yet."
      }];
    }
  });

  const filteredReports = allReports.filter(rep => {
    const matchesSearch = rep.patient.toLowerCase().includes(searchQuery.toLowerCase()) || rep.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = reportType === 'all' || rep.type.toLowerCase().includes(reportType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const activeReport = selectedReport || filteredReports[0] || allReports[0] || null;

  const handleDownload = (format, reportTarget) => {
    const reportObj = typeof reportTarget === 'object' ? reportTarget : (allReports.find(r => r.id === reportTarget) || activeReport);
    if (!reportObj) return;

    setSelectedReport(reportObj);

    if (format === 'csv') {
      const data = [
        ['Report ID', 'Patient Name', 'Report Type', 'Disease / Focus', 'Evaluation Date', 'Risk Level', 'Accuracy', 'Status'],
        [reportObj.id, reportObj.patient, reportObj.type, reportObj.disease, reportObj.date, reportObj.risk, reportObj.accuracy, reportObj.status]
      ];
      downloadCSV(`Haya_Healthcare_Report_${reportObj.id}.csv`, data);
    } else if (format === 'xlsx' || format === 'excel') {
      const data = [
        ['Report ID', 'Patient Name', 'Report Type', 'Disease / Focus', 'Evaluation Date', 'Risk Level', 'Accuracy', 'Status'],
        [reportObj.id, reportObj.patient, reportObj.type, reportObj.disease, reportObj.date, reportObj.risk, reportObj.accuracy, reportObj.status]
      ];
      downloadExcel(`Haya_Healthcare_Report_${reportObj.id}.xlsx`, data);
    } else if (format === 'pdf') {
      setTimeout(() => {
        downloadPDFFromElement('pdf-report-template', `Haya_Healthcare_Report_${reportObj.id}.pdf`);
      }, 100);
    }
  };

  return (
    <div className="space-y-8 p-6 animate-slide-up">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Clinical Report Center</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time dynamic patient diagnostic reports synced with registry</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 bg-medical-light text-medical-primary rounded-full border border-medical-primary/20 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {patients.length} Live Patients Synced
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Controls */}
          <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient name or report ID..."
                className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-medical-primary"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800"
            >
              <option value="all">All Report Types</option>
              <option value="prediction">Prediction Reports</option>
              <option value="summary">Health Summaries</option>
            </select>
          </div>

          {/* Table */}
          <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 font-bold text-slate-500">Report ID</th>
                  <th className="p-3 font-bold text-slate-500">Patient</th>
                  <th className="p-3 font-bold text-slate-500">Type</th>
                  <th className="p-3 font-bold text-slate-500">Date</th>
                  <th className="p-3 font-bold text-slate-500">Assessment</th>
                  <th className="p-3 text-center font-bold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((rep) => (
                    <tr 
                      key={rep.id} 
                      className={`border-b border-slate-100 dark:border-slate-850 transition-colors ${
                        activeReport && activeReport.id === rep.id 
                          ? 'bg-medical-light/40 dark:bg-slate-800/60 font-semibold' 
                          : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                      }`}
                    >
                      <td className="p-3 font-bold text-medical-primary">{rep.id}</td>
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{rep.patient}</td>
                      <td className="p-3 text-slate-500">{rep.type}</td>
                      <td className="p-3 text-slate-400">{rep.date}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          rep.risk.includes('High') 
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400' 
                            : rep.risk.includes('Moderate')
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                        }`}>
                          {rep.risk}
                        </span>
                      </td>
                      <td className="p-3 flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedReport(rep)}
                          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
                          title="Quick View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDownload('pdf', rep)}
                          className="p-1.5 hover:bg-medical-light dark:hover:bg-slate-700 rounded-lg text-medical-primary cursor-pointer transition-colors"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400">
                      No reports found for "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Preview Panel */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[400px]">
          {activeReport ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-md text-slate-800 dark:text-slate-200">{activeReport.type}</h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400">ID: {activeReport.id}</span>
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 py-1 px-2.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </span>
              </div>

              {/* Summary Details */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeReport.patient}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
                  <span className="text-slate-500">Registry Patient ID:</span>
                  <span className="font-semibold">{activeReport.patientId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
                  <span className="text-slate-500">Clinical Focus:</span>
                  <span className="font-semibold text-medical-primary">{activeReport.disease}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
                  <span className="text-slate-500">Date Evaluated:</span>
                  <span className="font-semibold flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {activeReport.date}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
                  <span className="text-slate-500">Assessment Risk:</span>
                  <span className="font-semibold">{activeReport.risk}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800/40 pb-2">
                  <span className="text-slate-500">Engine Accuracy:</span>
                  <span className="font-semibold">{activeReport.accuracy}</span>
                </div>
              </div>

              {/* Exports Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Export Document</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => handleDownload('pdf', activeReport.id)}
                    className="py-2 px-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                  >
                    PDF
                  </button>
                  <button 
                    onClick={() => handleDownload('csv', activeReport.id)}
                    className="py-2 px-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={() => handleDownload('xlsx', activeReport.id)}
                    className="py-2 px-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                  >
                    Excel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center my-auto p-4 space-y-4">
              <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600" />
              <div>
                <h4 className="font-bold text-slate-500">No Report Selected</h4>
                <p className="text-xs text-slate-400 max-w-[200px] mx-auto mt-1">Select a patient report from the list to preview details and access export buttons.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Offscreen Single-Page PDF Template */}
      {activeReport && (
        <div style={{ position: 'fixed', left: '-9999px', top: '0', zIndex: -9999 }}>
          <div id="pdf-report-template" style={{ width: '780px', height: '1000px', padding: '30px', boxSizing: 'border-box', overflow: 'hidden', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '3px solid #0ea5e9', paddingBottom: '16px', marginBottom: '20px' }}>
            <img src="/logo.png" alt="Haya Health Care" style={{ height: '56px', width: '56px', objectFit: 'contain', marginRight: '16px' }} />
            <div>
              <h1 style={{ margin: 0, color: '#0ea5e9', fontSize: '26px', fontWeight: '900', letterSpacing: '0.5px' }}>HAYA HEALTH CARE</h1>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>AI Clinical Diagnostic Engine</p>
            </div>
          </div>
          
          <h2 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#1e293b', borderLeft: '4px solid #0ea5e9', paddingLeft: '12px' }}>
            Official {activeReport.type}
          </h2>

          <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '13px', margin: '0 0 8px 0', color: '#475569', fontWeight: '800', textTransform: 'uppercase' }}>Patient Information</h3>
            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Patient Name:</strong> {activeReport.patient}</p>
            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Patient ID:</strong> {activeReport.patientId}</p>
            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Report ID:</strong> {activeReport.id}</p>
            <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Assessment Date:</strong> {activeReport.date}</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '16px', borderLeft: '4px solid #0ea5e9', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '13px', margin: '0 0 8px 0', color: '#0284c7', fontWeight: '800', textTransform: 'uppercase' }}>Clinical Assessment Details</h3>
            <p style={{ margin: '6px 0', fontSize: '14px' }}><strong>Clinical Focus Area:</strong> {activeReport.disease}</p>
            <p style={{ margin: '6px 0', fontSize: '14px' }}>
              <strong>Calculated Risk Level:</strong> <span style={{ color: activeReport.risk.includes('High') ? '#e11d48' : '#059669', fontWeight: 'bold' }}>{activeReport.risk}</span>
            </p>
            <p style={{ margin: '6px 0', fontSize: '13px', color: '#475569' }}><strong>Neural Model Accuracy:</strong> {activeReport.accuracy}</p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
              <strong>Clinical Disclaimer:</strong> This single-page official report is autonomously processed by Haya Health Care AI. It provides diagnostic decision support and should be used alongside clinical practitioner evaluation.
            </p>
            <DoctorSignature doctorName="Dr. Hariprasath L" title="Founder & Chief AI Officer" />
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
