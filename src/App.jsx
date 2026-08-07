import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { SystemProvider } from './context/SystemContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DiseasePrediction from './pages/DiseasePrediction';
import AIAssistant from './pages/AIAssistant';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import DatasetUpload from './pages/DatasetUpload';
import DownloadCenter from './pages/DownloadCenter';
import PatientManagement from './pages/PatientManagement';
import Founder from './pages/Founder';
import ContactUs from './pages/ContactUs';
import AdminPanel from './pages/AdminPanel';
import DrugSearch from './pages/DrugSearch';
import Telemedicine from './pages/Telemedicine';
import BlockchainRecords from './pages/BlockchainRecords';
import HospitalLocator from './pages/HospitalLocator';
import MedicalImageAI from './pages/MedicalImageAI';

// Open Route Wrap (Login is optional)
function ProtectedRoute({ children }) {
  const { loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Loading Haya Engine...</div>;
  return children;
}

// Admin Route Wrap for administrative roles
function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-500">Loading Haya Engine...</div>;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
}

// Master Layout selector wrapper
function LayoutWrapper({ children, hasSidebar = false }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {hasSidebar ? (
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 min-w-0 bg-slate-50/50 dark:bg-slate-900/40 pb-16 md:pb-0">
            {children}
          </main>
        </div>
      ) : (
        <main className="flex-1">
          {children}
        </main>
      )}
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SystemProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
                <Route path="/login" element={<LayoutWrapper><Login /></LayoutWrapper>} />
                <Route path="/register" element={<LayoutWrapper><Register /></LayoutWrapper>} />
                <Route path="/founder" element={<LayoutWrapper><Founder /></LayoutWrapper>} />
                <Route path="/contact" element={<LayoutWrapper><ContactUs /></LayoutWrapper>} />

                {/* Protected Dashboard/App Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <Dashboard />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/predict" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <DiseasePrediction />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/ai-assistant" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <AIAssistant />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <Analytics />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/reports" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <Reports />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/datasets" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <DatasetUpload />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/drugs" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <DrugSearch />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/telemedicine" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <Telemedicine />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/downloads" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <DownloadCenter />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/patients" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <PatientManagement />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />

                {/* Global Health Map */}
                <Route 
                  path="/map" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <HospitalLocator />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />

                {/* Blockchain Ledger */}
                <Route 
                  path="/blockchain" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <BlockchainRecords />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />

                {/* Medical Image AI */}
                <Route 
                  path="/medical-image" 
                  element={
                    <ProtectedRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <MedicalImageAI />
                      </LayoutWrapper>
                    </ProtectedRoute>
                  } 
                />

                {/* Admin specific route */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <LayoutWrapper hasSidebar={true}>
                        <AdminPanel />
                      </LayoutWrapper>
                    </AdminRoute>
                  } 
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </SystemProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
