import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  Activity, 
  MessageSquare, 
  BarChart3, 
  FileText, 
  Upload, 
  Download, 
  Users, 
  Settings,
  Pill,
  Video,
  Database,
  Search,
  ScanLine,
  MapPin
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const menuItems = [
    { name: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('prediction') || 'Disease Prediction', path: '/predict', icon: Activity },
    { name: t('aiAssistant') || 'AI Assistant', path: '/ai-assistant', icon: MessageSquare },
    { name: 'Medical Image AI', path: '/medical-image', icon: ScanLine },
    { name: 'Drug Search', path: '/drugs', icon: Pill },
    { name: 'Virtual Clinic', path: '/telemedicine', icon: Video },
    { name: 'Global Health Map', path: '/map', icon: MapPin },
    { name: 'Blockchain Ledger', path: '/blockchain', icon: Database },
    { name: t('analytics') || 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: t('reports') || 'Medical Reports', path: '/reports', icon: FileText },
    { name: t('datasetUpload'), path: '/datasets', icon: Upload },
    { name: t('downloads'), path: '/downloads', icon: Download },
    { name: t('patientManagement') || 'Patients', path: '/patients', icon: Users }
  ];

  if (user?.role === 'admin') {
    menuItems.push({ name: t('adminPanel'), path: '/admin', icon: Settings });
  }

  return (
    <aside className="w-64 glass-panel border-r border-slate-200 dark:border-slate-800 hidden md:block min-h-[calc(100vh-4rem)] p-4 sticky top-16 transition-all duration-300">
      <div className="flex items-center space-x-3 px-3 py-3 mb-5 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl">
        <img 
          src="/logo.png" 
          alt="Haya Logo" 
          className="h-10 sm:h-12 w-auto object-contain cursor-pointer shrink-0" 
        />
        <div className="overflow-hidden">
          <h2 className="text-sm sm:text-base font-black tracking-wide font-display text-gradient-animated uppercase leading-snug">
            HAYA HEALTH CARE
          </h2>
          <div className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Clinical AI Platform
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform ${
                isActive
                  ? 'bg-gradient-to-r from-medical-primary to-blue-600 text-white shadow-md shadow-blue-500/20 translate-x-1'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:translate-x-1'
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
