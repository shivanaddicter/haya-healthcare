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
  Settings 
} from 'lucide-react';

export default function MobileNav() {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const quickNavItems = [
    { name: t('dashboard') || 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: t('prediction') || 'Predict', path: '/predict', icon: Activity },
    { name: t('aiAssistant') || 'Assistant', path: '/ai-assistant', icon: MessageSquare },
    { name: t('analytics') || 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: t('patientManagement') || 'Patients', path: '/patients', icon: Users },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1 shadow-lg transition-all duration-300">
      <div className="flex items-center justify-around">
        {quickNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[11px] font-medium transition-all ${
                isActive
                  ? 'text-medical-primary font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5 mb-0.5" />
            <span className="truncate max-w-[64px] text-center leading-tight">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
