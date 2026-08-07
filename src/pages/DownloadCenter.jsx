import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  HardDriveDownload 
} from 'lucide-react';
import { downloadCSV, downloadExcel, downloadPDFFromElement } from '../utils/exportUtils';
import DoctorSignature from '../components/DoctorSignature';

export default function DownloadCenter() {
  const [activePdfData, setActivePdfData] = useState(null);

  const downloadableFiles = [
    { name: "Prediction Results CSV", desc: "List of all historical multi-disease assessments and risk scores.", size: "45 KB", code: "PRED_RES" },
    { name: "Patient Records CSV", desc: "Demographic profile parameters database of patients.", size: "128 KB", code: "PAT_REC" },
    { name: "Analytics CSV", desc: "Aggregated trend statistics, monthly prediction count records.", size: "32 KB", code: "ANALYTICS" },
    { name: "Disease Reports CSV", desc: "Aggregated classification counts grouped by disease flags.", size: "18 KB", code: "DIS_REP" },
    { name: "Model Results CSV", desc: "Calculated error profiles, weights, and confidence margins of models.", size: "8 KB", code: "MODEL_RES" },
  ];

  const datasets = {
    PRED_RES: [
      ['Patient ID', 'Patient Name', 'Disease Target', 'Risk Level (%)', 'Confidence (%)', 'Assessment Date', 'Status'],
      ['PAT-101', 'John Doe', 'Kidney Disease', '12%', '98.2%', '2026-06-12', 'Completed'],
      ['PAT-102', 'Sarah Jenkins', 'Heart Disease', '74%', '98.9%', '2026-06-11', 'Completed'],
      ['PAT-103', 'Michael Chang', 'Metabolic Screening', '42%', '97.8%', '2026-06-10', 'Completed'],
      ['PAT-104', 'Anna Kovalenko', 'Hepatic Profile', '8%', '97.2%', '2026-06-08', 'Completed']
    ],
    PAT_REC: [
      ['Patient ID', 'Full Name', 'Age', 'Gender', 'Blood Pressure', 'Cholesterol (mg/dL)', 'Glucose (mg/dL)', 'BMI', 'Status'],
      ['PAT-101', 'John Doe', '45', 'Male', '120/80', '195', '98', '24.2', 'Active'],
      ['PAT-102', 'Sarah Jenkins', '58', 'Female', '142/90', '240', '135', '28.6', 'Active'],
      ['PAT-103', 'Michael Chang', '39', 'Male', '128/84', '210', '110', '26.1', 'Active'],
      ['PAT-104', 'Anna Kovalenko', '62', 'Female', '118/75', '180', '92', '22.4', 'Active']
    ],
    ANALYTICS: [
      ['Month', 'Total Predictions', 'High Risk Cases', 'Moderate Risk Cases', 'Low Risk Cases', 'Average AI Confidence'],
      ['Jan 2026', '340', '45', '110', '185', '98.1%'],
      ['Feb 2026', '410', '52', '128', '230', '98.4%'],
      ['Mar 2026', '390', '48', '115', '227', '98.2%'],
      ['Apr 2026', '520', '71', '165', '284', '98.7%'],
      ['May 2026', '610', '84', '190', '336', '98.9%'],
      ['Jun 2026', '580', '78', '182', '320', '98.8%']
    ],
    DIS_REP: [
      ['Disease Category', 'Evaluated Cases', 'Positive Flags', 'High Risk Rate (%)', 'Primary AI Engine'],
      ['Cardiovascular', '850', '210', '24.7%', 'Neural-X Heart v4'],
      ['Renal Health', '620', '95', '15.3%', 'Kidney-Net v2'],
      ['Diabetes / Metabolic', '1100', '340', '30.9%', 'GlucoPredict AI'],
      ['Hepatic Health', '430', '42', '9.7%', 'LiverScan AI'],
      ['Neurological', '290', '31', '10.6%', 'NeuroEval AI']
    ],
    MODEL_RES: [
      ['Model Name', 'Version', 'Accuracy', 'Precision', 'Recall', 'F1-Score', 'Validation Loss', 'Training Samples'],
      ['Haya Multi-Disease Ensemble', 'v3.4.1', '98.6%', '98.4%', '98.8%', '98.6%', '0.042', '150,000'],
      ['CardioRisk Predictor', 'v4.0.2', '98.9%', '98.7%', '99.1%', '98.9%', '0.035', '85,000'],
      ['RenalScan AI', 'v2.1.0', '98.2%', '97.9%', '98.5%', '98.2%', '0.051', '62,000'],
      ['MetabolicNet', 'v3.0.0', '97.8%', '97.5%', '98.1%', '97.8%', '0.060', '95,000']
    ]
  };

  const handleDownload = (format, fileObj) => {
    const data = datasets[fileObj.code] || datasets.PRED_RES;
    const sanitizedName = fileObj.name.replace(/\s+/g, '_');

    if (format === 'csv') {
      downloadCSV(`${sanitizedName}.csv`, data);
    } else if (format === 'excel') {
      downloadExcel(`${sanitizedName}.xlsx`, data);
    } else if (format === 'pdf') {
      setActivePdfData({ name: fileObj.name, rows: data });
      setTimeout(() => {
        downloadPDFFromElement('download-center-pdf-template', `${sanitizedName}.pdf`);
      }, 100);
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl">CSV Download Center</h1>
          <p className="text-sm text-slate-500">Access structured healthcare datasets, clinical predictions, and model logs</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadableFiles.map((file, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover-scale duration-300">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/20 text-medical-primary rounded-xl">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">{file.name}</h3>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">{file.size}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{file.desc}</p>
            </div>

            {/* Downloads Buttons */}
            <div className="pt-4 mt-4 border-t border-slate-150 dark:border-slate-800 flex gap-2">
              <button 
                onClick={() => handleDownload('csv', file)}
                className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all"
              >
                <Download className="h-3.5 w-3.5 text-medical-primary" />
                CSV
              </button>
              <button 
                onClick={() => handleDownload('excel', file)}
                className="flex-1 py-1.5 px-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Excel
              </button>
              <button 
                onClick={() => handleDownload('pdf', file)}
                className="flex-1 py-1.5 px-3 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all"
              >
                <FileText className="h-3.5 w-3.5" />
                PDF
              </button>
            </div>
          </div>
        ))}

        {/* Bulk Predictions CSV Upload Widget */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover-scale duration-300 bg-gradient-to-br from-medical-primary/5 to-transparent">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 rounded-xl">
                <HardDriveDownload className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-850 dark:text-slate-200">Bulk Prediction Engine</h3>
                <span className="text-[10px] text-indigo-500 font-semibold uppercase">Real-time Batch Inference</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload patient clinical dataset to run multi-disease prediction algorithms in parallel. The engine returns updated schema columns with Prediction and Risk score values.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button 
              onClick={() => alert("Redirecting to Dataset Management for bulk validation...")}
              className="py-2 px-4 bg-medical-primary hover:bg-medical-secondary text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4 animate-spin" />
              Run Batch Inference
            </button>
          </div>
        </div>
      </div>

      {/* Offscreen PDF Template */}
      {activePdfData && (
        <div style={{ position: 'fixed', left: '-9999px', top: '0', zIndex: -9999 }}>
          <div id="download-center-pdf-template" style={{ width: '800px', padding: '40px', backgroundColor: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #0ea5e9', paddingBottom: '20px', marginBottom: '30px' }}>
              <img src="/logo.png" alt="Haya Healthcare" style={{ height: '60px', marginRight: '20px' }} />
              <div>
                <h1 style={{ margin: 0, color: '#0ea5e9', fontSize: '26px', fontWeight: 'bold' }}>HAYA HEALTHCARE</h1>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Clinical Dataset Export - {activePdfData.name}</p>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  {activePdfData.rows[0].map((col, idx) => (
                    <th key={idx} style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'left' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activePdfData.rows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '8px', border: '1px solid #e2e8f0' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '24px' }}>
              <DoctorSignature doctorName="Dr. Hariprasath L" title="Founder & Chief AI Officer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
