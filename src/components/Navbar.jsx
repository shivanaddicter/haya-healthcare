import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X, 
  Shield, 
  Activity, 
  User, 
  LogOut,
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  FileText,
  Upload,
  Download,
  Users,
  Settings,
  Sliders,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const { user, switchRole, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { lang, changeLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideSlideOpen, setSideSlideOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Streamlined Top Navbar Items (Keeps Top Bar Clean & Uncluttered)
  const topNavItems = user ? [
    { name: t('home') || 'Home', path: '/' },
    { name: t('dashboard') || 'Dashboard', path: '/dashboard' },
    { name: t('prediction') || 'Disease Prediction', path: '/predict' },
    { name: t('aiAssistant') || 'AI Assistant', path: '/ai-assistant' }
  ] : [
    { name: t('home') || 'Home', path: '/' },
    { name: t('founder') || 'Founder Profile', path: '/founder' },
    { name: t('contactUs') || 'Contact Support', path: '/contact' }
  ];

  // Categorized Options for Side Slide Drawer
  const sideSlideCategories = user ? [
    {
      title: 'Clinical Diagnostics & AI Engine',
      items: [
        { name: t('dashboard') || 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
        { name: t('prediction') || 'Disease Prediction Models', path: '/predict', icon: Activity },
        { name: t('aiAssistant') || 'AI Medical Assistant', path: '/ai-assistant', icon: MessageSquare }
      ]
    },
    {
      title: 'Analytics & Clinical Records',
      items: [
        { name: t('analytics') || 'Analytics Dashboard', path: '/analytics', icon: BarChart3 },
        { name: t('reports') || 'Medical Diagnostic Reports', path: '/reports', icon: FileText },
        { name: t('patientManagement') || 'Patient Management Directory', path: '/patients', icon: Users },
        { name: t('datasetUpload') || 'Dataset Profiling & Upload', path: '/datasets', icon: Upload },
        { name: t('downloads') || 'Download Center & Exports', path: '/downloads', icon: Download }
      ]
    },
    {
      title: 'Information & Support',
      items: [
        { name: 'App SRS Documentation', path: '/docs', icon: FileText },
        { name: t('founder') || 'Founder & Platform Profile', path: '/founder', icon: User },
        { name: t('contactUs') || 'Contact Clinical Support', path: '/contact', icon: Globe }
      ]
    }
  ] : [
    {
      title: 'Navigation Links',
      items: [
        { name: t('home') || 'Home', path: '/', icon: LayoutDashboard },
        { name: t('founder') || 'Founder Profile', path: '/founder', icon: User },
        { name: t('contactUs') || 'Contact Support', path: '/contact', icon: Globe }
      ]
    }
  ];

  if (user?.role === 'admin') {
    sideSlideCategories.push({
      title: 'Master Control',
      items: [
        { name: t('adminPanel') || 'Platform Administration Panel', path: '/admin', icon: Settings }
      ]
    });
  }

  const allAuthenticatedMobileItems = user ? [
    { name: t('dashboard') || 'Dashboard', path: '/dashboard' },
    { name: t('prediction') || 'Disease Prediction', path: '/predict' },
    { name: t('aiAssistant') || 'AI Assistant', path: '/ai-assistant' },
    { name: t('analytics') || 'Analytics', path: '/analytics' },
    { name: t('reports') || 'Medical Reports', path: '/reports' },
    { name: t('datasetUpload') || 'Dataset Upload', path: '/datasets' },
    { name: t('downloads') || 'Download Center', path: '/downloads' },
    { name: t('patientManagement') || 'Patient Records', path: '/patients' },
    { name: t('founder') || 'Founder Profile', path: '/founder' },
    { name: t('contactUs') || 'Contact Support', path: '/contact' },
  ] : [];

  return (
    <>
      <nav className="sticky top-0 z-40 glass-panel shadow-md transition-all duration-300 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
            
            {/* Logo & Brand Title */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center gap-3 py-1 group shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Haya Health Care Logo" 
                  className="h-10 sm:h-12 w-auto object-contain shrink-0" 
                />
                <div className="hidden sm:flex flex-col shrink-0">
                  <span className="font-display font-black text-base sm:text-xl tracking-wider text-gradient-animated whitespace-nowrap leading-none">
                    HAYA HEALTH CARE
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold tracking-widest text-slate-400 uppercase whitespace-nowrap flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Clinical AI Engine
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Tags - Primary Essential Links Only */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 bg-slate-100/80 dark:bg-slate-800/70 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shrink-0">
              {topNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-xs xl:text-sm font-extrabold tracking-wide text-slate-700 dark:text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-medical-primary hover:to-blue-600 px-3.5 py-1.5 rounded-xl transition-all duration-300 whitespace-nowrap shadow-none hover:shadow-md"
                >
                  {item.name}
                </Link>
              ))}

              {/* Side Slide Trigger Button */}
              <button
                onClick={() => setSideSlideOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-medical-primary/10 hover:bg-medical-primary text-medical-primary hover:text-white font-extrabold text-xs transition-all duration-300 shadow-none hover:shadow-md border border-medical-primary/30 shrink-0 cursor-pointer"
                title="Open Extended Options Slide Drawer"
              >
                <Sliders className="h-3.5 w-3.5 animate-pulse" />
                <span>Side Options</span>
              </button>
            </div>

            {/* Action Buttons & Profile Controls */}
            <div className="hidden md:flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Side Options Button for Medium Screen */}
              <button
                onClick={() => setSideSlideOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-medical-primary/10 hover:bg-medical-primary text-medical-primary hover:text-white font-extrabold text-xs transition-all duration-300 border border-medical-primary/30 shrink-0 cursor-pointer"
                title="Open Side Menu Drawer"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Side Options</span>
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => changeLanguage(lang === 'en' ? 'ta' : 'en')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-medical-primary/10 hover:text-medical-primary transition-all text-slate-600 dark:text-slate-300 flex items-center gap-1 font-extrabold text-xs shrink-0"
                title="Switch Language"
              >
                <Globe className="h-4 w-4 text-medical-primary" />
                <span>{lang.toUpperCase()}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/10 transition-all text-slate-600 dark:text-slate-300 shrink-0"
                title="Toggle Theme"
              >
                {darkMode ? <Sun className="h-4 w-4 text-yellow-400 animate-rotate-slow" /> : <Moon className="h-4 w-4 text-indigo-400" />}
              </button>

              {/* Role Switcher Pill */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
                <button
                  onClick={() => { switchRole('doctor'); navigate('/dashboard'); }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${user?.role === 'doctor' ? 'bg-medical-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  title="Switch to Doctor Dashboard"
                >
                  Doctor
                </button>
                <button
                  onClick={() => { switchRole('patient'); navigate('/dashboard'); }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${user?.role === 'patient' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  title="Switch to Patient Dashboard"
                >
                  Patient
                </button>
              </div>

              {/* Auth Buttons */}
              {user ? (
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] px-2.5 py-1 rounded-xl font-black tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1 animate-meditation shrink-0 whitespace-nowrap">
                    <Shield className="h-3 w-3" />
                    {user.role.toUpperCase()}
                  </span>
                  <Link to="/dashboard" className="text-xs font-extrabold hover:text-medical-primary flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 shrink-0 whitespace-nowrap">
                    <User className="h-3.5 w-3.5 text-medical-primary" />
                    <span>{user.name}</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 px-2.5 py-1.5 rounded-xl hover:bg-rose-500 hover:text-white transition-all shrink-0 whitespace-nowrap">
                      {t('adminPanel')}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-xs font-extrabold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors py-1.5 px-2.5 rounded-xl border border-rose-200 dark:border-rose-900/40 shrink-0 whitespace-nowrap"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/login"
                    className="text-xs sm:text-sm font-extrabold hover:text-medical-primary px-3.5 py-2 rounded-xl transition-colors bg-slate-100 dark:bg-slate-800 whitespace-nowrap shrink-0"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-medical-primary text-white text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl hover:bg-medical-secondary shadow-sm transition-all whitespace-nowrap shrink-0"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center gap-1.5">
              <button
                onClick={() => setSideSlideOpen(true)}
                className="p-2 rounded-xl bg-medical-primary/10 text-medical-primary"
                title="Open Side Menu Drawer"
              >
                <Sliders className="h-5 w-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-slate-200 dark:border-slate-800 transition-all duration-300 max-h-[80vh] overflow-y-auto">
            <div className="px-3 pt-2 pb-6 space-y-1">
              {user ? (
                <>
                  <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-2">
                    <div>
                      <div className="text-base font-bold text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-medical-light text-medical-secondary">
                      {user.role}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-1 pb-1">Navigation</div>
                  {allAuthenticatedMobileItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      {t('adminPanel')}
                    </Link>
                  )}
                  <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      {t('logout')}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {topNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-2 px-1">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-base font-medium"
                    >
                      {t('login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 rounded-lg bg-medical-primary text-white text-base font-semibold shadow-sm"
                    >
                      {t('register')}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Side Slide Drawer Overlay */}
      {sideSlideOpen && (
        <div 
          onClick={() => setSideSlideOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Side Slide Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-80 sm:w-96 glass-panel border-l border-slate-200 dark:border-slate-800 shadow-2xl transition-transform duration-300 transform ${
          sideSlideOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto flex flex-col justify-between`}
      >
        <div className="p-6 space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Haya Logo" className="h-12 w-auto object-contain logo-viewing-size" />
              <div>
                <h3 className="font-black text-base font-display text-gradient-animated">HAYA HEALTH CARE</h3>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase">Side Slide Options</p>
              </div>
            </div>
            <button 
              onClick={() => setSideSlideOpen(false)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Categorized Options List */}
          <div className="space-y-6">
            {sideSlideCategories.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2">
                  {cat.title}
                </div>
                <div className="space-y-1">
                  {cat.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSideSlideOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-medical-primary hover:text-white transition-all group shadow-none hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-medical-primary group-hover:text-white transition-colors" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        {user && (
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-slate-900 dark:text-white">{user.name}</div>
                <div className="text-[10px] text-slate-400">{user.email}</div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                {user.role.toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => {
                setSideSlideOpen(false);
                handleLogout();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
