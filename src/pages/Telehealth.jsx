import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Calendar, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Clock, 
  User, 
  CheckCircle,
  AlertCircle,
  Grid
} from 'lucide-react';

export default function Telehealth() {
  const { doctors } = useSystem();
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState('2026-06-25');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [appointments, setAppointments] = useState([
    { id: "APT-101", doctor: "Dr. Hari Prasath L", date: "2026-06-25", time: "10:00 AM", status: "Scheduled" }
  ]);
  const [inCall, setInCall] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    const docObj = doctors.find(d => d.id === selectedDoctor);
    const newApt = {
      id: `APT-${100 + Math.floor(Math.random() * 900)}`,
      doctor: docObj ? docObj.name : "Medical Specialist",
      date: selectedDate,
      time: selectedTime,
      status: "Scheduled"
    };
    setAppointments([newApt, ...appointments]);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  const startCall = () => {
    setInCall(true);
    setVideoActive(true);
    setAudioActive(true);
  };

  const endCall = () => {
    setInCall(false);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl">Telehealth & Booking Hub</h1>
          <p className="text-sm text-slate-500">Schedule appointments and launch high-definition virtual consultations</p>
        </div>
      </div>

      {inCall ? (
        /* Video Consultation Call Interface */
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Video className="h-5 w-5 text-rose-500 animate-pulse" />
                Live Video Consultation
              </h3>
              <p className="text-xs text-slate-400">Consultation ID: CON-8820 • Doctor: Dr. Hari Prasath L</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 py-1 px-3 rounded-full flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Encrypted Peer-to-Peer Link Active
            </span>
          </div>

          {/* WebRTC Video Screen Simulators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Doctor Stream */}
            <div className="bg-slate-900 rounded-xl aspect-video relative overflow-hidden flex items-center justify-center border border-slate-800">
              {videoActive ? (
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-white">
                  <div className="text-center space-y-2">
                    <User className="h-16 w-16 mx-auto text-slate-500" />
                    <span className="font-bold block text-sm">Dr. Hari Prasath L</span>
                    <span className="text-xs text-slate-450">Remote Clinician Stream</span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-sm font-semibold">Doctor video turned off</div>
              )}
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded">Dr. Hari Prasath L</span>
            </div>

            {/* Patient Stream */}
            <div className="bg-slate-950 rounded-xl aspect-video relative overflow-hidden flex items-center justify-center border border-slate-800">
              {videoActive ? (
                <div className="absolute inset-0 bg-slate-850 flex items-center justify-center text-white">
                  <div className="text-center space-y-1">
                    <span className="font-semibold block text-xs">Self Camera Preview</span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-sm font-semibold">Camera is disabled</div>
              )}
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded">Patient Stream (Self)</span>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex justify-center items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setAudioActive(!audioActive)}
              className={`p-3.5 rounded-full border transition-all ${audioActive ? 'bg-slate-100 border-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-rose-100 border-rose-300 text-rose-600'}`}
              title={audioActive ? "Mute Microphone" : "Unmute Microphone"}
            >
              {audioActive ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            <button 
              onClick={() => setVideoActive(!videoActive)}
              className={`p-3.5 rounded-full border transition-all ${videoActive ? 'bg-slate-100 border-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-rose-100 border-rose-300 text-rose-600'}`}
              title={videoActive ? "Disable Camera" : "Enable Camera"}
            >
              {videoActive ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            <button 
              onClick={endCall}
              className="p-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all"
              title="Hang up Call"
            >
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        /* Regular list & Scheduling Form Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scheduling Form */}
          <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Calendar className="h-5 w-5 text-medical-primary" />
              Schedule Appointment
            </h3>
            
            {bookingSuccess && (
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg text-xs border border-emerald-250 dark:border-emerald-900/30">
                <CheckCircle className="h-4.5 w-4.5 shrink-0" />
                <span>Appointment booked successfully!</span>
              </div>
            )}

            <form onSubmit={handleBook} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Select Clinician</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.spec})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500">Time Slot</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg transition-all shadow-md"
              >
                Confirm Scheduling Slot
              </button>
            </form>
          </div>

          {/* Active Bookings Ledger */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-lg border-b border-slate-200 dark:border-slate-800 pb-3 flex justify-between items-center">
              <span>Appointment Ledger</span>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 py-1 px-2.5 rounded-full font-semibold">
                {appointments.length} Bookings
              </span>
            </h3>

            {appointments.length > 0 ? (
              <div className="space-y-3.5">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex flex-col md:flex-row md:items-center justify-between bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850 text-xs gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{apt.doctor}</span>
                        <span className="text-[10px] text-slate-400 font-bold">ID: {apt.id}</span>
                      </div>
                      <div className="flex gap-4 text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {apt.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-355 font-semibold">
                        {apt.status}
                      </span>
                      <button 
                        onClick={startCall}
                        className="flex items-center gap-1 bg-medical-primary hover:bg-medical-secondary text-white py-1.5 px-3 rounded-lg font-bold shadow-sm"
                      >
                        <Video className="h-3.5 w-3.5" />
                        Join Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-450">
                No active appointments booked. Use the form on the left to schedule a consult.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
