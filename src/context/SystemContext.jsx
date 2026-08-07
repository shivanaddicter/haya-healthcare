import React, { createContext, useContext, useState, useEffect } from 'react';
import founderDefaultImg from '../assets/founder.jpeg';

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  // Helper to load from localStorage or fallback
  const getLocalItem = (key, fallback) => {
    const saved = localStorage.getItem(key);
    try {
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  // States
  const [founder, setFounder] = useState(() => getLocalItem('sys_founder', {
    name: "Hariprasath L",
    designation: "AI Engineer • Full Stack Developer • Machine Learning Enthusiast",
    about: "Passionate software developer and AI engineer dedicated to creating high-performance, intelligent digital platforms that bridge the gap between engineering and healthcare optimization.",
    aboutDetailed: "I build scalable software solutions combined with statistical Artificial Intelligence pipelines. My experience spans full-stack web applications, database schema optimizations, deep learning vision models, and clinical natural language parsing structures. I am committed to advancing patient care with precise, proactive machine learning technologies.",
    image: founderDefaultImg,
    skills: {
      frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS", "React.js"],
      backend: ["Python", "Django", "FastAPI"],
      database: ["MySQL", "MongoDB"],
      ai: ["Machine Learning", "Deep Learning", "Data Analytics", "Natural Language Processing (NLP)", "Computer Vision"]
    }
  }));

  const [contact, setContact] = useState(() => getLocalItem('sys_contact', {
    hq: "128 Innovation Way, Chennai, TN, India",
    phone: "+91 44 2839 0012",
    email: "contact@hayahealthcare.com"
  }));

  const [doctors, setDoctors] = useState(() => getLocalItem('sys_doctors', [
    { id: "DOC-01", name: "Dr. Hari Prasath L", spec: "AI Specialist / Cardiologist", status: "Available" },
    { id: "DOC-02", name: "Dr. Sarah Jenkins", spec: "Nephrologist", status: "In Surgery" },
    { id: "DOC-03", name: "Dr. Arvind Kumar", spec: "Neurologist", status: "Available" }
  ]));

  const [patients, setPatients] = useState(() => getLocalItem('sys_patients', [
    {
      id: 'P-821',
      name: 'John Doe',
      age: 48,
      gender: 'Male',
      phone: '+1 (555) 019-2834',
      email: 'john.doe@example.com',
      address: '128 Medical Center Dr, Boston, MA',
      predictions: [
        { disease: 'Kidney Disease', date: '2026-06-12', risk: '12%', status: 'Low Risk' },
        { disease: 'Diabetes Risk', date: '2026-06-01', risk: '38%', status: 'Moderate Risk' }
      ],
      notes: 'Patient shows stable creatinine levels. Advised high fluid intake and low sodium.'
    },
    {
      id: 'P-822',
      name: 'Sarah Jenkins',
      age: 55,
      gender: 'Female',
      phone: '+1 (555) 304-9921',
      email: 'sarah.j@example.com',
      address: '42 Greenway Ln, Seattle, WA',
      predictions: [
        { disease: 'Heart Disease', date: '2026-06-11', risk: '74%', status: 'High Risk' }
      ],
      notes: 'Scheduled for ECG checkup. Recommended cardiac diet plan and regular heart rate monitoring.'
    },
    {
      id: 'P-823',
      name: 'Michael Chang',
      age: 32,
      gender: 'Male',
      phone: '+1 (555) 881-0022',
      email: 'm.chang@example.com',
      address: '711 Pine Blvd, Chicago, IL',
      predictions: [
        { disease: 'Diabetes Risk', date: '2026-06-10', risk: '18%', status: 'Low Risk' }
      ],
      notes: 'Routine employee screening. All metabolic parameters normal.'
    }
  ]));

  const [models, setModels] = useState(() => getLocalItem('sys_models', [
    { name: "Kidney Disease Model", type: "XGBoost", accuracy: "98.2%", status: "Active", lastTrained: "2 days ago" },
    { name: "Diabetes Model", type: "Random Forest", accuracy: "97.8%", status: "Active", lastTrained: "2 days ago" },
    { name: "Heart Disease Model", type: "Neural Network", accuracy: "98.9%", status: "Active", lastTrained: "2 days ago" },
    { name: "Liver Disease Model", type: "Logistic Regression", accuracy: "97.2%", status: "Active", lastTrained: "2 days ago" },
    { name: "Parkinson Model", type: "SVM", accuracy: "99.1%", status: "Active", lastTrained: "5 days ago" }
  ]));

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('sys_founder', JSON.stringify(founder));
  }, [founder]);

  useEffect(() => {
    localStorage.setItem('sys_contact', JSON.stringify(contact));
  }, [contact]);

  useEffect(() => {
    localStorage.setItem('sys_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('sys_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('sys_models', JSON.stringify(models));
  }, [models]);

  // Actions
  const updateFounder = (updatedFields) => {
    setFounder(prev => ({ ...prev, ...updatedFields }));
  };

  const updateContact = (updatedFields) => {
    setContact(prev => ({ ...prev, ...updatedFields }));
  };

  const updateDoctor = (id, updatedFields) => {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, ...updatedFields } : d));
  };

  const addDoctor = (doc) => {
    setDoctors(prev => [...prev, doc]);
  };

  const deleteDoctor = (id) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
  };

  const updatePatient = (id, updatedFields) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const addPatient = (pat) => {
    setPatients(prev => [pat, ...prev]);
  };

  const deletePatient = (id) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const retrainModel = (modelName) => {
    setModels(prev => prev.map(m => {
      if (m.name === modelName) {
        const currentAcc = parseFloat(m.accuracy);
        const newAcc = Math.min((currentAcc + 0.1 + Math.random() * 0.2), 99.9).toFixed(1);
        return {
          ...m,
          accuracy: `${newAcc}%`,
          lastTrained: "Just now"
        };
      }
      return m;
    }));
  };

  return (
    <SystemContext.Provider value={{
      founder, updateFounder,
      contact, updateContact,
      doctors, setDoctors, updateDoctor, addDoctor, deleteDoctor,
      patients, setPatients, updatePatient, addPatient, deletePatient,
      models, retrainModel
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => useContext(SystemContext);
