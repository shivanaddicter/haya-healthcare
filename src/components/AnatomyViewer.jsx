import React from 'react';
import { Brain, Heart, Wind, Droplets, Activity, Accessibility, Zap, Dna } from 'lucide-react';

export default function AnatomyViewer({ activeTab, setActiveTab }) {
  const organs = [
    {
      id: 'head',
      label: 'Neurological',
      icon: Brain,
      diseases: [
        { id: 'stroke', name: 'Stroke' },
        { id: 'parkinson', name: "Parkinson's" }
      ],
      position: 'col-start-2 row-start-1'
    },
    {
      id: 'chest',
      label: 'Cardiopulmonary',
      icon: Heart,
      diseases: [
        { id: 'heart', name: 'Heart Disease' },
        { id: 'lung', name: 'Lung Cancer' }
      ],
      position: 'col-start-2 row-start-2'
    },
    {
      id: 'abdomen',
      label: 'Metabolic & Renal',
      icon: Activity,
      diseases: [
        { id: 'kidney', name: 'Kidney Disease' },
        { id: 'liver', name: 'Liver Disease' },
        { id: 'diabetes', name: 'Diabetes' }
      ],
      position: 'col-start-2 row-start-3'
    }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative animate-fade-in">
      
      {/* Decorative Background Elements to simulate a Scanner */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-10">
        <div className="w-64 h-[400px] border-2 border-blue-500 rounded-[100px] animate-pulse"></div>
        <div className="absolute w-full h-[2px] bg-cyan-400 opacity-50 scanner-beam"></div>
      </div>

      <div className="z-10 grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-2xl relative">
        {/* Silhouette overlay simulation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
           <Accessibility className="w-[300px] h-[500px]" />
        </div>

        {organs.map((organ) => (
          <div key={organ.id} className={`flex flex-col items-center ${organ.position} group`}>
            
            {/* Organ Node */}
            <div className={`relative p-5 rounded-full mb-4 border-2 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10
              ${organ.diseases.some(d => d.id === activeTab) 
                ? 'border-medical-primary shadow-[0_0_40px_rgba(16,185,129,0.4)] scale-110' 
                : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400 group-hover:scale-105'
              }`}
            >
              <organ.icon className={`w-8 h-8 ${organ.diseases.some(d => d.id === activeTab) ? 'text-medical-primary animate-pulse' : 'text-slate-400 group-hover:text-blue-500'}`} />
              
              {/* Connecting line simulation */}
              <div className="absolute w-[2px] h-12 bg-slate-200 dark:bg-slate-800 -bottom-14 left-1/2 -translate-x-1/2 -z-10 hidden md:block"></div>
            </div>

            {/* Disease Selectors */}
            <div className="flex flex-col gap-2 w-full max-w-[180px] z-20">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 text-center mb-1">{organ.label}</span>
              {organ.diseases.map((disease) => (
                <button
                  key={disease.id}
                  onClick={() => setActiveTab(disease.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-between
                    ${activeTab === disease.id 
                      ? 'bg-gradient-to-r from-medical-primary to-emerald-500 text-white shadow-lg shadow-emerald-500/30 translate-x-2 md:translate-x-4 scale-105 border-0' 
                      : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-blue-300'
                    }`}
                >
                  {disease.name}
                  {activeTab === disease.id && <Zap className="w-3.5 h-3.5 fill-current" />}
                </button>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
