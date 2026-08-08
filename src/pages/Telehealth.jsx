import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  Bot,
  Send,
  Volume2,
  VolumeX,
  Languages,
  Activity,
  HeartPulse,
  Heart
} from 'lucide-react';

export default function Telehealth() {
  const { doctors } = useSystem();

  // Consultation Mode State: 'ai_doctor' or 'appointments'
  const [activeTab, setActiveTab] = useState('ai_doctor');

  // AI Female Doctor Chat & Speech State
  const [messages, setMessages] = useState([
    {
      sender: 'ai_doctor',
      text: "வணக்கம்! நான் Dr. Haya, உங்களின் AI பெண் மருத்துவர் (AI Female Doctor). உங்களுக்கு என்ன உடல்நல பிரச்சனை அல்லது கேள்வி இருக்கு? தமிழ் அல்லது ஆங்கிலத்தில் கேளுங்கள்!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [languageMode, setLanguageMode] = useState('ta-IN'); // 'ta-IN' or 'en-US'
  const chatEndRef = useRef(null);

  // Human Scheduling State
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState('2026-06-25');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [appointments, setAppointments] = useState([
    { id: "APT-101", doctor: "Dr. Hari Prasath L", date: "2026-06-25", time: "10:00 AM", status: "Scheduled" }
  ]);
  const [inHumanCall, setInHumanCall] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [audioActive, setAudioActive] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speech Output Function for AI Female Doctor in Tamil / English
  const speakDoctorResponse = (text) => {
    if (!voiceOutputEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean text for speech
    const cleanText = text.replace(/[*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voices = window.speechSynthesis.getVoices();
    // Try to find a Tamil or Female voice
    const tamilVoice = voices.find(v => v.lang.includes('ta') || v.name.includes('Tamil') || v.name.includes('Lekha'));
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English'));

    if (languageMode === 'ta-IN' && tamilVoice) {
      utterance.voice = tamilVoice;
      utterance.lang = 'ta-IN';
    } else if (femaleVoice) {
      utterance.voice = femaleVoice;
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.1; // Female pitch

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // AI Response Fetcher (Groq Llama 3 -> Gemini -> Tamil Medical Engine)
  const fetchAIDoctorResponse = async (patientQuery) => {
    const prompt = `You are Dr. Haya, a caring, expert female AI medical doctor at Haya Health Care Virtual Clinic.
The patient is asking you a medical/health question.

Rules:
1. If the user writes in Tamil or Tanglish (Tamil in Roman script) or Tamil script, answer primarily in warm, helpful Tamil or Tanglish!
2. If the user writes in English, answer in clear English.
3. Be empathetic, polite, and provide actionable medical recommendations, dietary advice, and symptom evaluations.
4. Keep response to 3-5 concise sentences suitable for spoken voice output.
5. Founder of Haya Health Care is Hariprasath L.

Patient Query: ${patientQuery}`;

    // 1. Try Groq API
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    if (groqKey) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: 'You are Dr. Haya, a female AI medical doctor at Haya Health Care Virtual Clinic. Respond fluently in Tamil, Tanglish, and English.' },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 500
          })
        });
        if (response.ok) {
          const data = await response.json();
          const text = data?.choices?.[0]?.message?.content;
          if (text) return text;
        }
      } catch (e) {
        console.warn("Groq AI Doctor Error:", e);
      }
    }

    // 2. Try Gemini API
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });
        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      } catch (e) {
        console.warn("Gemini AI Doctor Error:", e);
      }
    }

    // 3. Intelligent Tamil Medical Engine Fallback
    const qLower = patientQuery.toLowerCase();
    if (qLower.includes('fever') || qLower.includes('காய்ச்சல்') || qLower.includes('kaichal') || qLower.includes('headache')) {
      return "வணக்கம்! காய்ச்சல் மற்றும் தலைவலி இருந்தால் போதுமான அளவு தண்ணீர் குடியுங்கள் மற்றும் ஓய்வு எடுங்கள். காய்ச்சல் 102°Fக்கு மேல் இருந்தால் அல்லது மூச்சுத்திணறல் இருந்தால் உடனடியாக மருத்துவரை அணுகவும்.";
    } else if (qLower.includes('diet') || qLower.includes('உணவு') || qLower.includes('food') || qLower.includes('sugar') || qLower.includes('diabetes')) {
      return "வணக்கம்! சர்க்கரை நோய் மற்றும் பொது சுகாதாரத்திற்கு அதிக நார்ச்சத்துள்ள காய்கறிகள், கீரைகள் மற்றும் தானியங்களை உணவில் சேர்த்துக்கொள்ளுங்கள். சுத்திகரிக்கப்பட்ட சர்க்கரை மற்றும் எண்ணெயைக் குறைப்பது நல்லது.";
    } else if (qLower.includes('heart') || qLower.includes('இதயம்') || qLower.includes('bp') || qLower.includes('pressure')) {
      return "வணக்கம்! இதய ஆரோக்கியத்திற்காக தினமும் 30 நிமிடம் நடைபயிற்சி செய்யுங்கள். உணவில் உப்பின் அளவைக் குறைத்து, மனஅழுத்தம் இல்லாமல் இருப்பது அவசியம்.";
    } else if (qLower.includes('who') || qLower.includes('founder') || qLower.includes('hariprasath')) {
      return "ஹாய்! ஹயா ஹெல்த்கேர் (Haya Health Care) தளத்தின் நிறுவனர் மற்றும் AI பொறியாளர் திரு. ஹரிபிரசாத் L (Hariprasath L) ஆவார்.";
    } else {
      return `வணக்கம்! நான் Dr. Haya (AI Female Doctor). உங்கள் கேள்வி: "${patientQuery}". நீங்கள் நன்றாக ஓய்வெடுத்து, தேவையான நீர்ச்சத்து மற்றும் சத்தான உணவை உட்கொள்ளுங்கள். ஏதேனும் கடுமையான அறிகுறி இருந்தால் மருத்துவரை அணுகவும்.`;
    }
  };

  const handleSendQuery = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    const userMsg = {
      sender: 'patient',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const aiDoctorReply = await fetchAIDoctorResponse(userText);

    const doctorMsg = {
      sender: 'ai_doctor',
      text: aiDoctorReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, doctorMsg]);
    setIsTyping(false);

    speakDoctorResponse(aiDoctorReply);
  };

  // Tamil Dictation Speech Recognition
  const startSpeechDictation = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = languageMode;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setInputText(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Scheduling Handlers
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

  return (
    <div className="space-y-6 p-3 sm:p-6 max-w-7xl mx-auto animate-slide-up">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
              Virtual AI Clinic
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              Dr. Haya (AI Female Doctor) • தமிழ் & English
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl mt-1.5 flex items-center gap-2">
            Telehealth & AI Virtual Clinic
          </h1>
          <p className="text-sm text-slate-500 mt-1">Consult with Dr. Haya (AI Female Doctor) in Tamil or schedule human specialist appointments</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-bold border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('ai_doctor')}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all cursor-pointer ${activeTab === 'ai_doctor' ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Bot className="h-4 w-4" />
            AI Female Doctor (தமிழ் AI)
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all cursor-pointer ${activeTab === 'appointments' ? 'bg-white dark:bg-slate-700 text-medical-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            <Calendar className="h-4 w-4" />
            Human Doctor Consultations
          </button>
        </div>
      </div>

      {/* TAB 1: AI FEMALE DOCTOR CONSULTATION (தமிழ் / ENGLISH) */}
      {activeTab === 'ai_doctor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: AI Female Doctor Avatar Stream & Controls */}
          <div className="lg:col-span-1 glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 flex flex-col items-center justify-between text-center relative overflow-hidden bg-gradient-to-b from-teal-500/10 via-indigo-500/5 to-slate-900/40">
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-full flex justify-between items-center z-10">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Doctor Online
              </span>
              <button
                onClick={() => setVoiceOutputEnabled(!voiceOutputEnabled)}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${voiceOutputEnabled ? 'bg-teal-500 text-white border-teal-400 shadow-md' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800'}`}
                title="Toggle Voice Output"
              >
                {voiceOutputEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {voiceOutputEnabled ? 'Voice ON' : 'Voice OFF'}
              </button>
            </div>

            {/* Simulated Animated AI Female Doctor Avatar Screen */}
            <div className="w-full aspect-square max-w-[280px] bg-slate-950 rounded-3xl relative overflow-hidden border-2 border-teal-500/40 shadow-2xl flex flex-col items-center justify-center group my-2">
              
              {/* Doctor Avatar Image / Graphic */}
              <div className="relative flex flex-col items-center">
                {/* Audio Equalizer Rings */}
                <div className={`absolute -inset-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 rounded-full opacity-40 blur-md ${isSpeaking ? 'animate-ping' : ''}`}></div>
                
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-teal-400 via-indigo-500 to-purple-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                    <User className="h-16 w-16 text-teal-300 animate-pulse" />
                  </div>
                </div>

                {/* Lip-sync Speech Waves */}
                {isSpeaking ? (
                  <div className="flex items-center gap-1 mt-4">
                    <span className="h-4 w-1 bg-teal-400 rounded-full animate-bounce"></span>
                    <span className="h-6 w-1 bg-teal-300 rounded-full animate-bounce delay-100"></span>
                    <span className="h-8 w-1 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
                    <span className="h-5 w-1 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                    <span className="h-3 w-1 bg-teal-400 rounded-full animate-bounce"></span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 mt-4 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                    <HeartPulse className="h-4 w-4 text-emerald-500 animate-ekg-beat" />
                    <span>Listening & Ready</span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-800 text-center">
                <span className="font-extrabold text-xs text-white block">Dr. Haya (AI Medical Specialist)</span>
                <span className="text-[10px] text-teal-400 font-semibold">Specialty: General Medicine & AI Diagnostics</span>
              </div>
            </div>

            {/* Language Switcher Control */}
            <div className="w-full flex items-center justify-center gap-2 pt-2">
              <Languages className="h-4 w-4 text-slate-400" />
              <button
                onClick={() => setLanguageMode('ta-IN')}
                className={`py-1 px-3 rounded-lg text-xs font-bold transition-all ${languageMode === 'ta-IN' ? 'bg-teal-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}
              >
                தமிழ் Mode
              </button>
              <button
                onClick={() => setLanguageMode('en-US')}
                className={`py-1 px-3 rounded-lg text-xs font-bold transition-all ${languageMode === 'en-US' ? 'bg-teal-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}
              >
                English Mode
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Chat & Voice Dictation */}
          <div className="lg:col-span-2 glass-panel p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-[600px] justify-between">
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'} items-start gap-2.5`}
                >
                  {msg.sender === 'ai_doctor' && (
                    <div className="p-2 bg-gradient-to-tr from-teal-500 to-indigo-600 text-white rounded-xl shadow-md shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'patient' 
                        ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-tr-none font-semibold' 
                        : 'bg-slate-100 dark:bg-slate-800/90 rounded-tl-none text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-750'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div className="flex justify-between items-center mt-2 text-[10px] opacity-75">
                      <span>{msg.sender === 'ai_doctor' ? 'Dr. Haya (AI Doctor)' : 'You (Patient)'}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                  {msg.sender === 'patient' && (
                    <div className="p-2 bg-indigo-600 text-white rounded-xl shrink-0 shadow-md">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start items-center gap-2">
                  <div className="p-2 bg-teal-500 text-white rounded-xl">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-xs flex gap-1.5 items-center">
                    <span className="h-2 w-2 bg-teal-500 rounded-full animate-bounce"></span>
                    <span className="h-2 w-2 bg-teal-500 rounded-full animate-bounce delay-100"></span>
                    <span className="h-2 w-2 bg-teal-500 rounded-full animate-bounce delay-200"></span>
                    <span className="text-[11px] text-slate-400 font-semibold ml-1">Dr. Haya is thinking in தமிழ்...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Tamil Query Pills */}
            <div className="my-3 flex gap-2 overflow-x-auto pb-1 shrink-0">
              {[
                { label: "🩺 காய்ச்சல் & தலைவலி", text: "எனக்கு 2 நாளா காய்ச்சல் மற்றும் தலைவலி இருக்கு" },
                { label: "🥗 சர்க்கரை நோய் உணவு", text: "சர்க்கரை நோய்க்கு என்ன உணவு சாப்பிடலாம்?" },
                { label: "🫀 இதய நலம் ஆலோசனை", text: "இதயத்தை ஆரோக்கியமாக வைத்துக்கொள்ள என்ன செய்ய வேண்டும்?" },
                { label: "💊 மாத்திரை வழிகாட்டல்", text: "மருந்துகளை எப்போது சாப்பிட வேண்டும்?" },
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(pill.text)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/30 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 hover:border-teal-400 transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Input Form & Speech Microphone */}
            <form onSubmit={handleSendQuery} className="flex gap-2 shrink-0 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={startSpeechDictation}
                className={`p-3 rounded-xl shadow-md transition-all flex items-center justify-center shrink-0 cursor-pointer ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                title="Voice Type (தமிழ் / English Dictation)"
              >
                {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isListening ? "கேட்கிறது (Listening in தமிழ்)..." : "உங்கள் மருத்துவ கேள்வியை தமிழில் டைப் செய்யவும் (Type in Tamil or English)..."}
                className="flex-1 p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />

              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: HUMAN DOCTOR CONSULTATIONS */}
      {activeTab === 'appointments' && (
        <>
          {inHumanCall ? (
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
                  onClick={() => setInHumanCall(false)}
                  className="p-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-all cursor-pointer"
                  title="Hang up Call"
                >
                  <PhoneOff className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            /* Scheduling Form Layout */
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
                    className="w-full py-2.5 bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg transition-all shadow-md cursor-pointer"
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
                            onClick={() => setInHumanCall(true)}
                            className="flex items-center gap-1 bg-medical-primary hover:bg-medical-secondary text-white py-1.5 px-3 rounded-lg font-bold shadow-sm cursor-pointer"
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
        </>
      )}
    </div>
  );
}
