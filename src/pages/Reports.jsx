import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Calendar,
  Printer
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reportType, setReportType] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);

  const mockReports = [
    { id: "REP-9921", patient: "John Doe", type: "Prediction Report", disease: "Kidney Disease Assessment", date: "2026-06-12", risk: "Low (12%)", status: "Completed", accuracy: "98.2%" },
    { id: "REP-9922", patient: "Sarah Jenkins", type: "Risk Analysis", disease: "Heart Disease Risk Profile", date: "2026-06-11", risk: "High (74%)", status: "Completed", accuracy: "98.9%" },
    { id: "REP-9923", patient: "Michael Chang", type: "Health Summary", disease: "Full Metabolic Screening", date: "2026-06-10", risk: "Moderate (42%)", status: "Completed", accuracy: "97.8%" },
    { id: "REP-9924", patient: "Anna Kovalenko", type: "Analytics Report", disease: "Hepatic Parameters Profile", date: "2026-06-08", risk: "Low (8%)", status: "Completed", accuracy: "97.2%" }
  ];

  const handleDownload = (format, reportId) => {
    if (format === 'pdf' && selectedReport) {
      const element = document.getElementById('pdf-report-template');
      
      const opt = {
        margin:       0.5,
        filename:     `Haya_Healthcare_Report_${reportId}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Temporarily unhide the template for capture
      element.style.display = 'block';
      html2pdf().set(opt).from(element).save().then(() => {
        // Hide it again
        element.style.display = 'none';
      });
    } else {
      alert(`Downloading Report ${reportId} as ${format.toUpperCase()}...`);
    }
  };

  const filteredReports = mockReports.filter(rep => {
    const matchesSearch = rep.patient.toLowerCase().includes(searchQuery.toLowerCase()) || rep.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = reportType === 'all' || rep.type.toLowerCase().includes(reportType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 p-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Clinical Report Center</h1>
          <p className="text-sm text-slate-500">View, preview, and export comprehensive patient diagnostic files</p>
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
                placeholder="Search patient or report ID..."
                className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-medical-primary"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800"
            >
              <option value="all">All Types</option>
              <option value="prediction">Prediction Reports</option>
              <option value="risk">Risk Analysis</option>
              <option value="summary">Health Summary</option>
              <option value="analytics">Analytics Reports</option>
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
                {filteredReports.map((rep) => (
                  <tr key={rep.id} className="border-b border-slate-100 dark:border-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-medical-primary">{rep.id}</td>
                    <td className="p-3 font-semibold">{rep.patient}</td>
                    <td className="p-3 text-slate-500">{rep.type}</td>
                    <td className="p-3 text-slate-455">{rep.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${rep.risk.includes('High') ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'}`}>
                        {rep.risk}
                      </span>
                    </td>
                    <td className="p-3 flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setSelectedReport(rep)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-350 cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDownload('pdf', rep.id)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-medical-primary cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Preview Panel */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[400px]">
          {selectedReport ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-md">{selectedReport.type}</h3>
                  <span className="text-[10px] uppercase font-bold text-slate-400">ID: {selectedReport.id}</span>
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 py-1 px-2.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </span>
              </div>

              {/* Summary Details */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-semibold">{selectedReport.patient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinical Focus:</span>
                  <span className="font-semibold">{selectedReport.disease}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date Evaluated:</span>
                  <span className="font-semibold flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedReport.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assessment Risk:</span>
                  <span className="font-semibold">{selectedReport.risk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Engine Accuracy:</span>
                  <span className="font-semibold">{selectedReport.accuracy}</span>
                </div>
              </div>

              {/* Exports Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Export Document</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => handleDownload('pdf', selectedReport.id)}
                    className="py-1.5 px-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-455 text-xs font-bold rounded-lg transition-all"
                  >
                    PDF
                  </button>
                  <button 
                    onClick={() => handleDownload('csv', selectedReport.id)}
                    className="py-1.5 px-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-455 text-xs font-bold rounded-lg transition-all"
                  >
                    CSV
                  </button>
                  <button 
                    onClick={() => handleDownload('xlsx', selectedReport.id)}
                    className="py-1.5 px-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-455 text-xs font-bold rounded-lg transition-all"
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

      {/* Hidden PDF Template */}
      {selectedReport && (
        <div id="pdf-report-template" style={{ display: 'none', padding: '40px', backgroundColor: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #0ea5e9', paddingBottom: '20px', marginBottom: '30px' }}>
            <img src="/logo.png" alt="Haya Health Care" style={{ height: '60px', marginRight: '20px' }} />
            <div>
              <h1 style={{ margin: 0, color: '#0ea5e9', fontSize: '28px', fontWeight: '900', letterSpacing: '1px' }}>HAYA HEALTH CARE</h1>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>AI-Powered Clinical Diagnostics Platform</p>
              <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8' }}>Developed by Dr. Hari Prasath L (Founder & AI Engineer)</p>
            </div>
          </div>
          
          <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Official {selectedReport.type}
          </h2>

          <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '14px', margin: '0 0 10px 0', color: '#475569' }}>Patient Information</h3>
            <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Name:</strong> {selectedReport.patient}</p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Report ID:</strong> {selectedReport.id}</p>
            <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Date of Assessment:</strong> {selectedReport.date}</p>
          </div>

          <div style={{ marginBottom: '40px', padding: '20px', borderLeft: '4px solid #0ea5e9', backgroundColor: '#f0f9ff' }}>
            <h3 style={{ fontSize: '14px', margin: '0 0 10px 0', color: '#0284c7' }}>Clinical Assessment Details</h3>
            <p style={{ margin: '8px 0', fontSize: '16px' }}><strong>Focus Area:</strong> {selectedReport.disease}</p>
            <p style={{ margin: '8px 0', fontSize: '16px' }}>
              <strong>Calculated Risk Level:</strong> <span style={{ color: selectedReport.risk.includes('High') ? '#e11d48' : '#059669', fontWeight: 'bold' }}>{selectedReport.risk}</span>
            </p>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#475569' }}><strong>Neural Model Accuracy:</strong> {selectedReport.accuracy}</p>
          </div>

          <div style={{ marginTop: '50px', borderTop: '1px solid #cbd5e1', paddingTop: '20px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#64748b' }}>
              <strong>Disclaimer:</strong> This report is generated by the Haya Health Care AI Diagnostic Engine. It is intended to assist medical professionals and should not replace formal clinical diagnosis.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: '40px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#000' }}>_______________________</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#64748b' }}>Authorized Signature</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>Dr. Hari Prasath L</p>
                <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8' }}>Chief Medical AI Officer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
