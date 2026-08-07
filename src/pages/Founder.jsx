import React from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  User, 
  Code2, 
  Cpu, 
  FolderGit2, 
  Award, 
  FileDown, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

export default function Founder() {
  const { founder } = useSystem();

  const projects = [
    {
      title: "Haya Health Care Platform",
      desc: "Full-stack AI healthcare analytics system with multi-disease prediction pipelines.",
      stack: "React, Tailwind, FastAPI, Scikit-learn, MongoDB"
    },
    {
      title: "BioNLP Assistant",
      desc: "An NLP pipeline to clean, classify, and summarize unstructured clinical medical notes.",
      stack: "Python, PyTorch, Transformers, HuggingFace"
    },
    {
      title: "Intelligent Retinopathy Classification",
      desc: "Deep learning convolutional models to classify eye pathology severity levels.",
      stack: "TensorFlow, OpenCV, Python"
    }
  ];

  const certifications = [
    { name: "Professional Machine Learning Engineer", issuer: "Google Cloud" },
    { name: "Deep Learning Specialization", issuer: "DeepLearning.AI" },
    { name: "Advanced React & Web Architecture", issuer: "Meta Developer" }
  ];

  return (
    <div className="space-y-12 p-6 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-medical-primary/5 via-transparent to-transparent">
        {/* Founder Photo */}
        <div className="h-32 w-32 rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-medical-primary">
          <img 
            src={founder.image} 
            alt={founder.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="font-display font-extrabold text-3xl">{founder.name}</h1>
            <p className="text-md font-semibold text-medical-primary">{founder.designation}</p>
          </div>
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            {founder.about}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 py-1.5 px-3 bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 text-xs font-bold rounded-lg hover:bg-blue-100 transition-all"
            >
              <User className="h-4 w-4" /> LinkedIn
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350 text-xs font-bold rounded-lg hover:bg-slate-200 transition-all"
            >
              <Code2 className="h-4 w-4" /> GitHub
            </a>
            <a 
              href="/resume.jpeg"
              download="Hariprasath_L_Resume.jpeg"
              className="flex items-center gap-1.5 py-1.5 px-3 bg-medical-primary text-white text-xs font-bold rounded-lg hover:bg-medical-secondary transition-all"
            >
              <FileDown className="h-4 w-4" /> Resume Download
            </a>
          </div>
        </div>
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - About & Skills */}
        <div className="md:col-span-2 space-y-8">
          {/* About Section */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-lg flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
              <User className="h-5 w-5 text-medical-primary" /> About Me
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line">
              {founder.aboutDetailed}
            </p>
          </div>

          {/* Projects */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
              <FolderGit2 className="h-5 w-5 text-indigo-500" /> Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-850 rounded-xl space-y-2 text-xs flex flex-col justify-between hover-scale">
                  <div className="space-y-1">
                    <span className="font-bold block text-slate-700 dark:text-slate-350">{proj.title}</span>
                    <p className="text-slate-500 leading-relaxed">{proj.desc}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block pt-2">{proj.stack}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Skills list */}
        <div className="space-y-6">
          {/* Technical Skills */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-md flex items-center gap-1.5 text-slate-850 dark:text-slate-200">
              <Code2 className="h-4.5 w-4.5 text-emerald-500" /> Technical Skills
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">AI & Machine Learning</span>
                <div className="flex flex-wrap gap-1.5">
                  {founder.skills.ai.map(s => <span key={s} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded font-semibold">{s}</span>)}
                </div>
              </div>
              <div>
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Frontend Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {founder.skills.frontend.map(s => <span key={s} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded font-semibold">{s}</span>)}
                </div>
              </div>
              <div>
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Backend Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {founder.skills.backend.map(s => <span key={s} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded font-semibold">{s}</span>)}
                </div>
              </div>
              <div>
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Database Structures</span>
                <div className="flex flex-wrap gap-1.5">
                  {founder.skills.database.map(s => <span key={s} className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded font-semibold">{s}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-md flex items-center gap-1.5 text-slate-850 dark:text-slate-200">
              <Award className="h-4.5 w-4.5 text-amber-500" /> Certifications
            </h3>
            <div className="space-y-2 text-xs">
              {certifications.map((c, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/30 p-2 rounded-lg border border-slate-100 dark:border-slate-850">
                  <div>
                    <span className="font-bold block text-slate-650 dark:text-slate-350">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.issuer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
