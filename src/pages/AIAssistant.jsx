import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertOctagon, 
  Heart, 
  Utensils, 
  Dumbbell,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hello! I am Haya's AI Medical Assistant. How can I support you today? You can ask me to check symptoms, suggest diets, draft exercise plans, or provide lifestyle guidance.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const fetchGroqAI = async (promptText) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return null;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'You are Haya\'s AI Medical Assistant. Provide empathetic, accurate, concise healthcare, symptom analysis, dietary tips, and fitness advice. The founder and developer of this Haya Health Care app is Hariprasath L (AI Engineer & Full Stack Developer). If asked about the creator, owner, or founder, share his name and details.' },
            { role: 'user', content: promptText }
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data?.choices?.[0]?.message?.content || null;
      }
    } catch (err) {
      console.warn("Groq API call failed:", err);
    }
    return null;
  };

  const fetchHuggingFaceAI = async (promptText) => {
    const token = import.meta.env.VITE_HUGGINGFACE_TOKEN;
    if (!token) return null;

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          inputs: `<s>[INST] You are Haya's AI Medical Assistant. The founder of this app is Hariprasath L. Answer concisely: ${promptText} [/INST]`,
          parameters: { max_new_tokens: 500 }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const generated = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;
        if (generated) {
          return generated.replace(/<s>\[INST\].*?\[\/INST\]/s, '').trim();
        }
      }
    } catch (err) {
      console.warn("Hugging Face API call failed:", err);
    }
    return null;
  };

  const fetchGeminiAI = async (promptText) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return null;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              text: `You are Haya's AI Medical Assistant. Provide helpful, empathetic, and concise medical advice, symptom analysis, or dietary tips. The founder of this Haya Health Care app is Hariprasath L (AI Engineer & Full Stack Developer). If asked about the creator, owner, or founder, provide his details.\n\nUser Question: ${promptText}` 
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
      }
    } catch (err) {
      console.warn("Gemini API call failed:", err);
    }
    return null;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentPrompt = inputText;
    const userMessage = {
      sender: 'user',
      text: currentPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setTyping(true);

    // Multi-Provider AI Pipeline (Groq Llama 3 -> Gemini -> Hugging Face -> Fallback Engine)
    let botResponse = await fetchGroqAI(currentPrompt);

    if (!botResponse) {
      botResponse = await fetchGeminiAI(currentPrompt);
    }

    if (!botResponse) {
      botResponse = await fetchHuggingFaceAI(currentPrompt);
    }

    if (!botResponse) {
      // Fallback Engine Logic
      const text = currentPrompt.toLowerCase();
      if (text.includes('founder') || text.includes('creator') || text.includes('who built') || text.includes('hariprasath') || text.includes('who developed')) {
        botResponse = "👨‍💻 **Founder Details:** Haya Health Care was founded and developed by **Hariprasath L**, an AI Engineer and Full Stack Developer. He built this platform to bridge the gap between advanced machine learning and healthcare optimization.";
      } else if (text.includes('symptom') || text.includes('fever') || text.includes('cough') || text.includes('pain')) {
        botResponse = "🩺 **Symptom Checker Evaluation:** Based on your inputs, this could indicate a mild viral infection or localized inflammation. Please monitor your temperature. If you experience shortness of breath, severe pain, or a fever above 103°F (39.4°C), seek professional medical advice immediately.";
      } else if (text.includes('diet') || text.includes('food') || text.includes('eat')) {
        botResponse = "🥗 **Nutritional Guidance:** For general metabolic health, prioritize high-fiber vegetables, lean proteins, and complex grains. If managing Kidney health, carefully monitor sodium, potassium, and phosphorus intake. Stay hydrated with 2-3 liters of water daily.";
      } else if (text.includes('exercise') || text.includes('workout') || text.includes('gym')) {
        botResponse = "🏋️ **Physical Fitness Plan:** A recommended balanced routine includes: \n1. Aerobic: 30 mins of brisk walking or swimming (5x/week)\n2. Strength: Light resistance training (2x/week)\n3. Flexibility: 10 mins of daily stretching. Always monitor your heart rate.";
      } else if (text.includes('emergency') || text.includes('urgent') || text.includes('chest pain')) {
        botResponse = "🚨 **EMERGENCY WARNING:** If you are experiencing chest tightness, sudden numbness on one side of your body, severe breathing difficulties, or slurred speech, please dial **911** or your local emergency line immediately. Do not wait.";
      } else {
        botResponse = "💡 **Health Consultation:** I recommend regular health screenings. For personalized advice, please complete our Disease Prediction assessment or consult with Dr. Hari Prasath L on the platform.";
      }
    }

    setMessages(prev => [...prev, {
      sender: 'bot',
      text: botResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setTyping(false);

    if (voiceOutputEnabled) {
      speakText(botResponse);
    }
  };

  const loadSuggestion = (suggestion) => {
    setInputText(suggestion);
  };

  // --- Voice AI Integration ---
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Remove markdown for speech
      utterance.text = text.replace(/[*#]/g, '');
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English'));
      if (femaleVoice) utterance.voice = femaleVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

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
  // -----------------------------

  return (
    <div className="p-3 sm:p-6 max-w-5xl mx-auto space-y-3 sm:space-y-6 flex flex-col h-[calc(100dvh-8rem)] sm:h-[calc(100dvh-6rem)]">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4 gap-2 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 sm:p-2.5 bg-medical-light text-medical-primary rounded-xl dark:bg-slate-800">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl sm:text-2xl">AI Health Assistant</h1>
            <p className="text-xs text-slate-500">Powered by Groq & Gemini hybrid model</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setVoiceOutputEnabled(!voiceOutputEnabled)}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all ${voiceOutputEnabled ? 'bg-medical-light text-medical-primary border border-medical-primary/30' : 'bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}
            title="Toggle Bot Voice Output"
          >
            {voiceOutputEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden sm:inline">{voiceOutputEnabled ? 'Voice ON' : 'Voice OFF'}</span>
          </button>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 py-1.5 px-2 sm:px-3 rounded-full border border-emerald-200 dark:border-emerald-800 hidden sm:inline">
            Secure Sandbox Active
          </span>
        </div>
      </div>

      {/* Main chat window */}
      <div className="flex-1 glass-panel border border-slate-200 dark:border-slate-800 rounded-2xl overflow-y-auto p-3 sm:p-4 space-y-4 min-h-0">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
          >
            {msg.sender === 'bot' && (
              <div className="p-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg shrink-0">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div 
              className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-medical-primary text-white rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-slate-800/80 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <span className={`text-[10px] block mt-1.5 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                {msg.timestamp}
              </span>
            </div>
            {msg.sender === 'user' && (
              <div className="p-1.5 bg-medical-primary text-white rounded-lg shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex justify-start items-center gap-2.5">
            <div className="p-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-850 p-3.5 rounded-2xl rounded-tl-none text-xs flex gap-1 items-center">
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
              <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Quick Pills - horizontally scrollable on mobile */}
      <div className="flex gap-2 shrink-0 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {[
          { label: "Symptom Checker", text: "Evaluate symptoms: high fever, dry cough, fatigue", icon: Bot },
          { label: "Kidney Diet Plan", text: "Suggest a kidney-friendly low sodium diet plan", icon: Utensils },
          { label: "Hypertension Workouts", text: "Create a safe exercise plan for hypertension", icon: Dumbbell },
          { label: "Emergency Warning", text: "What are the early indicators of stroke emergency?", icon: AlertOctagon },
        ].map((pill, idx) => (
          <button
            key={idx}
            onClick={() => loadSuggestion(pill.text)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <pill.icon className="h-3.5 w-3.5 text-medical-primary" />
            {pill.label}
          </button>
        ))}
      </div>

      {/* Input panel */}
      <form onSubmit={handleSend} className="flex gap-2 shrink-0">
        <button
          type="button"
          onClick={isListening ? () => {} : startListening}
          className={`p-3 rounded-xl shadow-md transition-all flex items-center justify-center shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          title="Voice Type (Dictation)"
        >
          {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isListening ? "Listening..." : "Ask a medical query..."}
          className="flex-1 p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-medical-primary focus:outline-none"
        />
        <button 
          type="submit"
          className="p-3 bg-medical-primary hover:bg-medical-secondary text-white rounded-xl shadow-md transition-all flex items-center justify-center"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
