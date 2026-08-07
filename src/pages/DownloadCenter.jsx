import React from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  HardDriveDownload 
} from 'lucide-react';

export default function DownloadCenter() {
  const downloadableFiles = [
    { name: "Prediction Results CSV", desc: "List of all historical multi-disease assessments and risk scores.", size: "45 KB", code: "PRED_RES" },
    { name: "Patient Records CSV", desc: "Demographic profile parameters database of patients.", size: "128 KB", code: "PAT_REC" },
    { name: "Analytics CSV", desc: "Aggregated trend statistics, monthly prediction count records.", size: "32 KB", code: "ANALYTICS" },
    { name: "Disease Reports CSV", desc: "Aggregated classification counts grouped by disease flags.", size: "18 KB", code: "DIS_REP" },
    { name: "Model Results CSV", desc: "Calculated error profiles, weights, and confidence margins of models.", size: "8 KB", code: "MODEL_RES" },
  ];

  const handleDownload = (format, name) => {
    alert(`Starting download of ${name} in ${format.toUpperCase()} format...`);
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
                onClick={() => handleDownload('csv', file.name)}
                className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all"
              >
                <Download className="h-3.5 w-3.5 text-medical-primary" />
                CSV
              </button>
              <button 
                onClick={() => handleDownload('excel', file.name)}
                className="flex-1 py-1.5 px-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all"
              >
                <FileSpreadsheet className="h-3.5 w-3.5" />
                Excel
              </button>
              <button 
                onClick={() => handleDownload('pdf', file.name)}
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
    </div>
  );
}
