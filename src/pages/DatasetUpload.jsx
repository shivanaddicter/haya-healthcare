import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Database,
  Grid,
  BarChart,
  ArrowRight
} from 'lucide-react';

export default function DatasetUpload() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (fileObj) => {
    setFile({
      name: fileObj.name,
      size: (fileObj.size / 1024).toFixed(2) + ' KB',
      type: fileObj.name.split('.').pop().toUpperCase()
    });
    triggerAnalysis();
  };

  const triggerAnalysis = () => {
    setAnalyzing(true);
    setAnalysisResults(null);
    setTimeout(() => {
      setAnalysisResults({
        rows: 240,
        cols: 12,
        missing: 4,
        duplicates: 0,
        columns: [
          { name: 'Age', type: 'Numeric', missing: 0, min: 21, max: 78, mean: 49.2 },
          { name: 'BloodPressure', type: 'Numeric', missing: 1, min: 60, max: 180, mean: 122.4 },
          { name: 'Glucose', type: 'Numeric', missing: 0, min: 70, max: 280, mean: 118.6 },
          { name: 'HeartRate', type: 'Numeric', missing: 2, min: 55, max: 160, mean: 78.2 },
          { name: 'Outcome', type: 'Categorical', missing: 1, min: 0, max: 1, mean: 0.35 }
        ],
        validationStatus: "Verified & Validated"
      });
      setAnalyzing(false);
    }, 1500);
  };

  const handleCleanData = () => {
    if (!analysisResults) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysisResults(prev => ({
        ...prev,
        missing: 0,
        validationStatus: "Cleaned (Missing values imputed via mean value)"
      }));
      setAnalyzing(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Dataset Management</h1>
          <p className="text-sm text-slate-500">Upload clinical study files to analyze structure and prepare data for bulk inference</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload section */}
        <div className="lg:col-span-1 space-y-6">
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-white dark:bg-slate-800/40 hover:border-medical-primary transition-all cursor-pointer relative"
          >
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="space-y-4">
              <div className="p-4 bg-medical-light dark:bg-slate-850 text-medical-primary rounded-full inline-block">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <span className="font-bold text-sm block">Drag & Drop Dataset File</span>
                <span className="text-xs text-slate-400">Supports CSV, Excel, or JSON format</span>
              </div>
              <button className="bg-medical-primary hover:bg-medical-secondary text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
                Browse Files
              </button>
            </div>
          </div>

          {/* Load Sample Button */}
          <div className="text-center">
            <span className="text-xs text-slate-400 block mb-2">Or test our platform instantly</span>
            <button 
              onClick={() => processFile({ name: "patient_study_data.csv", size: 45200 })}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-medical-primary hover:underline"
            >
              Load sample kidney_study.csv <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Selected File Details */}
          {file && (
            <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block truncate max-w-[150px]">{file.name}</span>
                  <span className="text-[10px] text-slate-400">{file.type} • {file.size}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setFile(null);
                  setAnalysisResults(null);
                }}
                className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            </div>
          )}
        </div>

        {/* Dataset analysis output */}
        <div className="lg:col-span-2">
          {analyzing ? (
            <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[350px]">
              <span className="h-8 w-8 border-4 border-medical-primary border-t-transparent rounded-full animate-spin"></span>
              <span className="text-xs font-semibold text-slate-500">Analyzing dataset schema & compiling statistial features...</span>
            </div>
          ) : analysisResults ? (
            <div className="space-y-6">
              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Rows Count", value: analysisResults.rows, icon: Grid, color: "text-blue-500" },
                  { label: "Columns Count", value: analysisResults.cols, icon: Database, color: "text-indigo-500" },
                  { label: "Missing Values", value: analysisResults.missing, icon: AlertCircle, color: analysisResults.missing > 0 ? "text-amber-500" : "text-emerald-500" },
                  { label: "Duplicates Detected", value: analysisResults.duplicates, icon: Trash2, color: "text-rose-500" },
                ].map((stat, idx) => (
                  <div key={idx} className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-850 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block">{stat.label}</span>
                      <span className="text-lg font-extrabold font-display">{stat.value}</span>
                    </div>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                ))}
              </div>

              {/* Data Table Preview */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    <BarChart className="h-4.5 w-4.5 text-medical-primary" />
                    Feature Statistics & Profile
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 rounded-md">
                    {analysisResults.validationStatus}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                        <th className="p-2 font-bold">Feature Name</th>
                        <th className="p-2 font-bold">Data Type</th>
                        <th className="p-2 font-bold">Missing Values</th>
                        <th className="p-2 font-bold text-center">Min / Max</th>
                        <th className="p-2 font-bold text-right">Mean</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisResults.columns.map((col, i) => (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-850">
                          <td className="p-2 font-bold text-slate-700 dark:text-slate-300">{col.name}</td>
                          <td className="p-2 text-slate-500">{col.type}</td>
                          <td className="p-2">
                            <span className={col.missing > 0 ? 'text-amber-500 font-bold' : 'text-slate-400'}>
                              {col.missing}
                            </span>
                          </td>
                          <td className="p-2 text-center text-slate-500">{col.min} / {col.max}</td>
                          <td className="p-2 text-right font-semibold">{col.mean}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Operations Buttons */}
                {analysisResults.missing > 0 && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={handleCleanData}
                      className="bg-medical-primary hover:bg-medical-secondary text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm"
                    >
                      Clean Data (Impute missing fields)
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[350px]">
              <Database className="h-12 w-12 text-slate-300 dark:text-slate-600 animate-pulse" />
              <div>
                <h4 className="font-bold text-slate-500">No Dataset Uploaded</h4>
                <p className="text-xs text-slate-400 max-w-[240px] mx-auto mt-1">Upload a clinical study file on the left to review structure, missing details, and statistics.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
