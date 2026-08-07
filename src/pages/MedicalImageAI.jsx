import React, { useState } from 'react';
import { 
  Upload, 
  Trash2, 
  Image as ImageIcon, 
  Activity, 
  CheckCircle, 
  AlertCircle,
  Play,
  ActivitySquare
} from 'lucide-react';

export default function MedicalImageAI() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile({
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2) + ' KB',
        type: selectedFile.name.split('.').pop().toUpperCase()
      });
      setPreview(URL.createObjectURL(selectedFile));
      setAnalysisResults(null);
    }
  };

  const loadSampleXray = () => {
    setFile({
      name: "sample_chest_xray.png",
      size: "842 KB",
      type: "PNG"
    });
    // Use a placeholder preview indicating a chest X-Ray
    setPreview("https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&auto=format&fit=crop");
    setAnalysisResults(null);
  };

  const handleProcessImage = () => {
    if (!file) return;
    setScanning(true);
    setAnalysisResults(null);

    // Call backend API / simulated logic
    setTimeout(() => {
      setAnalysisResults({
        diagnosis: "Pneumonia Detected",
        confidence: 94.2,
        severity: "Moderate / Stage II",
        findings: [
          "Bilateral patchy opacities observed in lower lobes.",
          "Mild pleural effusion on the left lung segment.",
          "No visible hilar lymphadenopathy detected."
        ],
        box: { x: "42%", y: "55%", w: "30%", h: "25%" } // Bounding box simulation relative position
      });
      setScanning(false);
    }, 1800);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Medical Imaging AI (Computer Vision)</h1>
          <p className="text-sm text-slate-500">Upload chest X-Rays, Mammograms, or skin lesion images to invoke segmentation & classification models</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Upload Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-white dark:bg-slate-800/40 hover:border-medical-primary transition-all relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="space-y-4">
              <div className="p-4 bg-medical-light dark:bg-slate-850 text-medical-primary rounded-full inline-block">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <span className="font-bold text-sm block">Upload Medical Image</span>
                <span className="text-xs text-slate-400">Supports PNG, JPEG, or DICOM files</span>
              </div>
              <button type="button" className="bg-medical-primary text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
                Select File
              </button>
            </div>
          </div>

          {/* Sample Loader */}
          <div className="text-center">
            <span className="text-xs text-slate-400 block mb-2">Or load a sample clinical scan</span>
            <button 
              onClick={loadSampleXray}
              className="inline-flex items-center gap-1 text-xs font-bold text-medical-primary hover:underline"
            >
              Load sample_chest_xray.png
            </button>
          </div>

          {/* Active file */}
          {file && (
            <div className="glass-panel p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 rounded-lg">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-bold text-xs block truncate max-w-[150px]">{file.name}</span>
                  <span className="text-[10px] text-slate-400">{file.type} • {file.size}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setAnalysisResults(null);
                }}
                className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </button>
            </div>
          )}

          {file && (
            <button
              onClick={handleProcessImage}
              disabled={scanning}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-medical-primary hover:bg-medical-secondary text-white text-xs font-bold rounded-lg transition-all shadow-md disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              {scanning ? 'Invoking Vision Model...' : 'Run Neural Diagnostic'}
            </button>
          )}
        </div>

        {/* Right Canvas and Diagnostics */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Canvas box */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="font-bold text-sm border-b border-slate-200 dark:border-slate-800 pb-2.5 mb-3 flex items-center gap-1">
              <ImageIcon className="h-4 w-4 text-slate-400" />
              Image Canvas
            </h3>

            {preview ? (
              <div className="relative flex-1 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800 max-h-[350px]">
                <img 
                  src={preview} 
                  alt="Medical scan" 
                  className="w-full h-full object-contain"
                />
                
                {/* Simulated Bounding Box Overlay */}
                {analysisResults?.box && (
                  <div 
                    className="absolute border-2 border-red-500 bg-red-500/20 animate-pulse flex items-start justify-start p-1"
                    style={{
                      left: analysisResults.box.x,
                      top: analysisResults.box.y,
                      width: analysisResults.box.w,
                      height: analysisResults.box.h
                    }}
                  >
                    <span className="bg-red-500 text-white text-[8px] font-bold px-1 rounded uppercase">Infiltration</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-8">
                <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-650 mb-2" />
                <span>Upload a scan to view the canvas</span>
              </div>
            )}
          </div>

          {/* Diagnostic Metrics Box */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h3 className="font-bold text-sm border-b border-slate-200 dark:border-slate-800 pb-2.5 mb-3 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-medical-primary" />
              CNN Diagnostic Report
            </h3>

            {scanning ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-center my-auto">
                <span className="h-7 w-7 border-4 border-medical-primary border-t-transparent rounded-full animate-spin"></span>
                <span className="text-xs text-slate-450">Executing segmentation networks...</span>
              </div>
            ) : analysisResults ? (
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 p-3.5 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold block text-rose-700 dark:text-rose-400 text-sm">{analysisResults.diagnosis}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Severity: {analysisResults.severity}</span>
                    </div>
                    <span className="text-rose-500 font-extrabold text-lg">{analysisResults.confidence}% Acc</span>
                  </div>

                  <div className="space-y-2">
                    <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block">Clinical Observations:</span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                      {analysisResults.findings.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg text-[10px] text-slate-400 leading-normal">
                  <AlertCircle className="h-4 w-4 text-slate-450 shrink-0" />
                  <span>Disclaimer: Deep learning classifications are for reference. Decisions should be verified by certified radiologists.</span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-8">
                <ActivitySquare className="h-10 w-10 text-slate-300 dark:text-slate-655 mb-2" />
                <span>Diagnostics will compile once you trigger image processing</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
