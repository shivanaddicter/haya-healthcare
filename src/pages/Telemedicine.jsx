import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, MonitorUp, PhoneOff, User, Activity, HeartPulse, Stethoscope, MessageSquare } from 'lucide-react';

export default function Telemedicine() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);

  return (
    <div className="p-3 sm:p-6 max-w-[1600px] mx-auto h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-6rem)] animate-slide-up flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-6 shrink-0">
        <div>
          <h1 className="font-display font-extrabold text-3xl flex items-center gap-3">
            <Video className="h-8 w-8 text-medical-primary" />
            Telemedicine Clinic
          </h1>
          <p className="text-sm text-slate-500 mt-1">Secure, HIPAA-compliant virtual consultations.</p>
        </div>
        {!isCallActive && (
          <button 
            onClick={() => setIsCallActive(true)}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Video className="h-5 w-5" />
            Start Consultation
          </button>
        )}
      </div>

      {!isCallActive ? (
        <div className="flex-1 flex flex-col items-center justify-center glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center p-8">
          <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
            <Stethoscope className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Waiting for Patient...</h2>
          <p className="text-slate-500 max-w-md">Your virtual clinic room is ready. When the patient connects, you can begin the secure consultation.</p>
        </div>
      ) : (
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Video Area */}
          <div className="flex-1 flex flex-col relative glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm bg-black/5 dark:bg-black/20">
            
            {/* Remote Video Feed (Mocked with gradient/image) */}
            <div className="flex-1 relative w-full h-full bg-slate-800 rounded-3xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" 
                alt="Patient" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                LIVE: Sarah Jenkins
              </div>
            </div>

            {/* Local Video PIP */}
            <div className={`absolute bottom-28 right-6 w-48 h-64 bg-slate-800 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl transition-all duration-300 ${!isVideoOn && 'flex items-center justify-center bg-slate-900'}`}>
              {isVideoOn ? (
                <img 
                  src="/founder.jpeg" 
                  alt="Doctor" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-slate-600" />
              )}
              <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-white text-[10px] font-semibold">
                You (Dr. Hari Prasath L)
              </div>
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
              <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMicOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVideoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all">
                <MonitorUp className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setIsCallActive(false)}
                className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all ml-4"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Vitals & Chat */}
          <div className="w-80 flex flex-col gap-6 shrink-0 hidden xl:flex">
            {/* Patient Vitals Widget */}
            <div className="glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white/50 dark:bg-slate-900/50">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                Live Vitals Sync
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-semibold text-slate-500">Heart Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-rose-500">84</span>
                    <span className="text-[10px] text-slate-400">bpm</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs font-semibold text-slate-500">Blood Pressure</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-700 dark:text-slate-200">120/80</span>
                    <span className="text-[10px] text-slate-400">mmHg</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs font-semibold text-slate-500">Oxygen (SpO2)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-blue-500">98%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Chat Box */}
            <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col overflow-hidden bg-white/50 dark:bg-slate-900/50">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/50">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-sm">Consultation Notes</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="text-xs p-3 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-xl rounded-tl-sm">
                  Patient reports mild chest pain starting yesterday.
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700">
                <input 
                  type="text" 
                  placeholder="Type notes here..." 
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm px-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
