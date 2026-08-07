import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Activity, ShieldCheck, Cpu, ArrowRight, CheckCircle2, User, Database, LayoutDashboard, Stethoscope } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Predictions",
      description: "Uses advanced Machine Learning algorithms (XGBoost, Random Forests, Neural Networks) to accurately assess disease risks based on your clinical inputs."
    },
    {
      icon: ShieldCheck,
      title: "Secure & Encrypted",
      description: "All patient records and uploaded datasets are processed using state-of-the-art security measures and strict privacy protocols."
    },
    {
      icon: Database,
      title: "Advanced Dataset Analysis",
      description: "Upload clinical datasets in CSV, Excel, or JSON formats, view missing data summaries, and perform automated statistical validations instantly."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-radial-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-medical-light text-medical-secondary dark:bg-slate-800 dark:text-medical-primary">
                <Activity className="h-3.5 w-3.5" />
                Next Generation Healthcare Platform
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight leading-tight">
                Predict <span className="text-medical-primary">Today</span>,<br />
                Protect <span className="text-medical-accent">Tomorrow</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
                {t('description')}
              </p>
              
              {/* Doctor or Patient Dashboard Access Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                <button
                  onClick={() => {
                    switchRole('doctor');
                    navigate('/dashboard');
                  }}
                  className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-medical-primary to-blue-600 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer text-sm"
                >
                  <Stethoscope className="h-5 w-5 text-teal-300 animate-pulse" />
                  <span>Go to Doctor Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    switchRole('patient');
                    navigate('/dashboard');
                  }}
                  className="flex items-center justify-center gap-2.5 glass-panel border border-slate-300 dark:border-slate-700 font-extrabold px-6 py-3.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 shadow-md hover:scale-105 transition-all cursor-pointer text-sm text-slate-800 dark:text-slate-200"
                >
                  <User className="h-5 w-5 text-emerald-500" />
                  <span>Go to Patient Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Hero Graphic */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-md p-8 glass-panel rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 hover-scale duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-medical-primary p-2 rounded-lg text-white">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Haya ML Engine</h3>
                      <p className="text-xs text-slate-500">Live Health Analytics</p>
                    </div>
                  </div>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-sm font-medium">Kidney Risk Profile</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-md">Low (12%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-sm font-medium">Heart Health Status</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-md">Moderate (34%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-sm font-medium">Diabetes Assessment</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 rounded-md">High Risk (89%)</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Accuracy Rate: 98.4%</span>
                  <span>Tested Models: 7/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Counter Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-medical-primary font-display">15,240+</div>
              <div className="text-sm text-slate-500 font-medium">Total Predictions</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-medical-accent font-display">3,450+</div>
              <div className="text-sm text-slate-500 font-medium">Active Patients</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-medical-secondary font-display">98.4%</div>
              <div className="text-sm text-slate-500 font-medium">Model Accuracy</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-500 font-display">250+</div>
              <div className="text-sm text-slate-500 font-medium">Doctors Registered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Comprehensive Healthcare Solutions</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Haya Health Care leverages top-tier machine learning models and dataset capabilities to provide robust analytics and predictive power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-8 glass-panel rounded-2xl text-left border border-slate-200 dark:border-slate-800 space-y-4 hover-scale duration-300">
                <div className="p-3 bg-medical-light dark:bg-slate-800 text-medical-primary rounded-xl inline-block">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
