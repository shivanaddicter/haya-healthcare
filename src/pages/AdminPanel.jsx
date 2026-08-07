import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Settings, 
  RefreshCcw, 
  Trash2, 
  CheckCircle, 
  AlertOctagon, 
  Activity, 
  ShieldAlert, 
  Percent, 
  Database,
  Edit,
  MapPin,
  Phone,
  Mail,
  User,
  PlusCircle,
  ShieldAlertIcon,
  Key,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminPanel() {
  const { 
    founder, updateFounder,
    contact, updateContact,
    doctors, updateDoctor, addDoctor, deleteDoctor,
    patients, updatePatient, deletePatient,
    models, retrainModel
  } = useSystem();

  const { adminCreds, updateAdminCredentials } = useAuth();
  const [activeTab, setActiveTab] = useState('models');
  const [retraining, setRetraining] = useState(false);

  // Admin Security & Credentials State
  const [adminSecurityForm, setAdminSecurityForm] = useState({
    email: adminCreds?.email || 'hariprasath72788@gmail.com',
    password: adminCreds?.password || 'Hari@2007',
    confirmPassword: adminCreds?.password || 'Hari@2007'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [securitySuccessMsg, setSecuritySuccessMsg] = useState('');
  const [securityErrMsg, setSecurityErrMsg] = useState('');

  const handleUpdateAdminSecurity = (e) => {
    e.preventDefault();
    setSecuritySuccessMsg('');
    setSecurityErrMsg('');

    if (!adminSecurityForm.email.trim()) {
      setSecurityErrMsg('Admin Gmail / Email address cannot be empty.');
      return;
    }
    if (adminSecurityForm.password !== adminSecurityForm.confirmPassword) {
      setSecurityErrMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (adminSecurityForm.password.length < 4) {
      setSecurityErrMsg('Password must be at least 4 characters long.');
      return;
    }

    updateAdminCredentials(adminSecurityForm.email, adminSecurityForm.password);
    setSecuritySuccessMsg('Administrator credentials (Gmail & Password) updated successfully!');
  };

  // Forms States
  const [editFounderForm, setEditFounderForm] = useState({
    name: founder.name,
    designation: founder.designation,
    about: founder.about,
    aboutDetailed: founder.aboutDetailed,
    image: founder.image
  });

  const [editContactForm, setEditContactForm] = useState({
    hq: contact.hq,
    phone: contact.phone,
    email: contact.email
  });

  const [newDoctorForm, setNewDoctorForm] = useState({
    name: '', spec: '', status: 'Available'
  });

  const [editPatientId, setEditPatientId] = useState(null);

  // Users registry state
  const [users, setUsers] = useState([
    { id: "USR-01", name: "System Administrator", email: "admin@haya.com", role: "admin", created: "2026-05-15" },
    { id: "USR-02", name: "Dr. Hari Prasath L", email: "doctor@haya.com", role: "doctor", created: "2026-05-20" },
    { id: "USR-03", name: "John Doe", email: "patient@haya.com", role: "patient", created: "2026-06-01" },
    { id: "USR-04", name: "Sarah Jenkins", email: "sarah.j@example.com", role: "doctor", created: "2026-06-11" }
  ]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user registration?")) {
      setUsers(users.filter(u => u.id !== id));
      alert("User record deleted successfully.");
    }
  };

  const handleUpdateFounder = (e) => {
    e.preventDefault();
    updateFounder(editFounderForm);
    alert("Founder profile details updated successfully!");
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    updateContact(editContactForm);
    alert("Contact information settings updated successfully!");
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoctorForm.name || !newDoctorForm.spec) {
      alert("Please enter doctor name and specialization");
      return;
    }
    const newDoc = {
      id: `DOC-${10 + Math.floor(Math.random() * 90)}`,
      name: newDoctorForm.name,
      spec: newDoctorForm.spec,
      status: newDoctorForm.status
    };
    addDoctor(newDoc);
    setNewDoctorForm({ name: '', spec: '', status: 'Available' });
    alert("New doctor profile successfully saved to directory!");
  };

  const handleRetrain = (modelName) => {
    setRetraining(true);
    setTimeout(() => {
      retrainModel(modelName);
      setRetraining(false);
      alert(`${modelName} retrained successfully. Metric verified.`);
    }, 1500);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl flex items-center gap-2">
            <ShieldAlert className="h-8 w-8 text-rose-500 animate-pulse" />
            Platform Control & Admin Panel
          </h1>
          <p className="text-sm text-slate-500">Configure machine learning pipeline weights, manage active users, and monitor engine status</p>
        </div>
      </div>

      {/* Admin tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
        {[
          { id: 'models', name: 'Models & Engine', icon: Settings },
          { id: 'security', name: 'Admin Security & Password', icon: Key },
          { id: 'founder', name: 'Founder Page Editor', icon: User },
          { id: 'doctors', name: 'Doctor Directory', icon: Users },
          { id: 'patients', name: 'Patients Registry', icon: Users },
          { id: 'contact', name: 'Contact Info Settings', icon: MapPin },
          { id: 'users', name: 'Users Registry', icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-medical-primary text-white shadow-md' 
                : 'text-slate-650 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Model Retraining Dashboard */}
      {activeTab === 'models' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-md flex items-center gap-1.5 border-b border-slate-250 dark:border-slate-800 pb-3">
              <Activity className="h-5 w-5 text-medical-primary" />
              Machine Learning Inference Diagnostics
            </h3>
            <div className="space-y-4">
              {models.map((model, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850 text-xs space-y-2 flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="font-bold text-sm block">{model.name}</span>
                    <span className="text-slate-450 block">Architecture: {model.type} • Last trained: {model.lastTrained}</span>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-[10px]">
                      Accuracy: {model.accuracy}
                    </span>
                  </div>
                  <button 
                    disabled={retraining}
                    onClick={() => handleRetrain(model.name)}
                    className="flex items-center gap-1 bg-medical-primary hover:bg-medical-secondary text-white py-1.5 px-3 rounded-lg font-bold shadow-sm transition-all"
                  >
                    <RefreshCcw className="h-3.5 w-3.5" />
                    Retrain
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Admin Gmail & Password Settings Tab */}
      {activeTab === 'security' && (
        <div className="max-w-2xl mx-auto glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-slide-up">
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white shadow-md">
              <Key className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl">Administrator Access Credentials</h3>
              <p className="text-xs text-slate-500">Update Administrator Gmail / Email address and login access password</p>
            </div>
          </div>

          {securitySuccessMsg && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center gap-2 animate-slide-up">
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
              <span>{securitySuccessMsg}</span>
            </div>
          )}

          {securityErrMsg && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-800 text-xs font-semibold flex items-center gap-2 animate-slide-up">
              <AlertOctagon className="h-5 w-5 shrink-0 text-rose-500" />
              <span>{securityErrMsg}</span>
            </div>
          )}

          <form onSubmit={handleUpdateAdminSecurity} className="space-y-5">
            {/* Admin Gmail Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-600 dark:text-slate-300">
                Administrator Gmail / Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminSecurityForm.email}
                  onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, email: e.target.value })}
                  placeholder="e.g. hariprasath72788@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-medical-primary focus:outline-none transition-all shadow-sm font-medium"
                />
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">This Gmail address will be granted master administrator privileges.</p>
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-600 dark:text-slate-300">
                New Administration Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminSecurityForm.password}
                  onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, password: e.target.value })}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-24 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-medical-primary focus:outline-none transition-all shadow-sm font-medium"
                />
                <Key className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-xs text-medical-primary hover:underline font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-600 dark:text-slate-300">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminSecurityForm.confirmPassword}
                  onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-medical-primary focus:outline-none transition-all shadow-sm font-medium"
                />
                <Key className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 btn-healthcare-anim text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all transform active:scale-95 text-sm"
            >
              <CheckCircle className="h-5 w-5 text-teal-300 animate-pulse" />
              <span>Save & Apply Admin Credentials</span>
            </button>
          </form>
        </div>
      )}

      {/* Founder Editor */}
      {activeTab === 'founder' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto shadow-sm space-y-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-1.5">
            <User className="h-5 w-5 text-medical-primary" />
            Edit Founder details (Hariprasath L)
          </h3>
          <form onSubmit={handleUpdateFounder} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-550">Full Name</label>
              <input 
                type="text"
                value={editFounderForm.name}
                onChange={(e) => setEditFounderForm({ ...editFounderForm, name: e.target.value })}
                className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-550">Designation / Heading</label>
              <input 
                type="text"
                value={editFounderForm.designation}
                onChange={(e) => setEditFounderForm({ ...editFounderForm, designation: e.target.value })}
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-550">Short Bio</label>
              <textarea 
                rows="2"
                value={editFounderForm.about}
                onChange={(e) => setEditFounderForm({ ...editFounderForm, about: e.target.value })}
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-550">Detailed "About Me" Profile</label>
              <textarea 
                rows="4"
                value={editFounderForm.aboutDetailed}
                onChange={(e) => setEditFounderForm({ ...editFounderForm, aboutDetailed: e.target.value })}
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-550">Profile Photo URL or local path</label>
              <input 
                type="text"
                value={editFounderForm.image}
                onChange={(e) => setEditFounderForm({ ...editFounderForm, image: e.target.value })}
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-2.5 bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg shadow-sm"
              >
                Apply Details to Founder Page
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Doctor Directory Editor */}
      {activeTab === 'doctors' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active doctors directory */}
          <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-md border-b border-slate-250 dark:border-slate-800 pb-3">
              Active Medical Practitioners
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                    <th className="p-2.5 font-bold">Doctor ID</th>
                    <th className="p-2.5 font-bold">Practitioner Name</th>
                    <th className="p-2.5 font-bold">Speciality</th>
                    <th className="p-2.5 font-bold">Status</th>
                    <th className="p-2.5 text-center font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="border-b border-slate-100 dark:border-slate-850">
                      <td className="p-2.5 font-bold text-slate-400">{doc.id}</td>
                      <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300">{doc.name}</td>
                      <td className="p-2.5 text-slate-500">{doc.spec}</td>
                      <td className="p-2.5">
                        <select
                          value={doc.status}
                          onChange={(e) => updateDoctor(doc.id, { status: e.target.value })}
                          className="p-1 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800"
                        >
                          <option value="Available">Available</option>
                          <option value="In Surgery">In Surgery</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </td>
                      <td className="p-2.5 text-center">
                        <button 
                          onClick={() => {
                            if (window.confirm(`Remove ${doc.name} from directory?`)) {
                              deleteDoctor(doc.id);
                            }
                          }}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-rose-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add doctor */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-md border-b border-slate-250 dark:border-slate-800 pb-3 flex items-center gap-1.5">
              <PlusCircle className="h-4.5 w-4.5 text-emerald-500" />
              Add Doctor Profile
            </h3>
            <form onSubmit={handleAddDoctor} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Name</label>
                <input 
                  type="text"
                  placeholder="Dr. Rajesh Kumar"
                  value={newDoctorForm.name}
                  onChange={(e) => setNewDoctorForm({ ...newDoctorForm, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Specialization</label>
                <input 
                  type="text"
                  placeholder="Oncologist"
                  value={newDoctorForm.spec}
                  onChange={(e) => setNewDoctorForm({ ...newDoctorForm, spec: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Status</label>
                <select
                  value={newDoctorForm.status}
                  onChange={(e) => setNewDoctorForm({ ...newDoctorForm, status: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                >
                  <option value="Available">Available</option>
                  <option value="In Surgery">In Surgery</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-2 bg-emerald-550 hover:bg-emerald-600 bg-medical-accent text-white font-bold rounded-lg shadow-sm"
              >
                Save Doctor Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Patient Registry Editor */}
      {activeTab === 'patients' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-md border-b border-slate-250 dark:border-slate-800 pb-3 flex items-center gap-1.5">
            <Users className="h-5 w-5 text-medical-primary" />
            Manage Registered Patient Profiles
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="p-2.5 font-bold">Patient ID</th>
                  <th className="p-2.5 font-bold">Name</th>
                  <th className="p-2.5 font-bold">Age / Gender</th>
                  <th className="p-2.5 font-bold">Phone</th>
                  <th className="p-2.5 font-bold">Email</th>
                  <th className="p-2.5 font-bold">Residential Address</th>
                  <th className="p-2.5 text-center font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((pat) => (
                  <tr key={pat.id} className="border-b border-slate-100 dark:border-slate-850">
                    <td className="p-2.5 font-bold text-slate-400">{pat.id}</td>
                    <td className="p-2.5">
                      {editPatientId === pat.id ? (
                        <input 
                          type="text" 
                          value={pat.name} 
                          onChange={(e) => updatePatient(pat.id, { name: e.target.value })}
                          className="p-1 border border-slate-300 dark:border-slate-705 rounded bg-white dark:bg-slate-800"
                        />
                      ) : (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{pat.name}</span>
                      )}
                    </td>
                    <td className="p-2.5">
                      {editPatientId === pat.id ? (
                        <div className="flex gap-1">
                          <input 
                            type="number" 
                            value={pat.age} 
                            onChange={(e) => updatePatient(pat.id, { age: e.target.value })}
                            className="w-12 p-1 border border-slate-300 dark:border-slate-705 rounded bg-white dark:bg-slate-800"
                          />
                          <select 
                            value={pat.gender} 
                            onChange={(e) => updatePatient(pat.id, { gender: e.target.value })}
                            className="p-1 border border-slate-300 dark:border-slate-705 rounded bg-white dark:bg-slate-800"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      ) : (
                        <span>{pat.age} yrs • {pat.gender}</span>
                      )}
                    </td>
                    <td className="p-2.5">
                      {editPatientId === pat.id ? (
                        <input 
                          type="text" 
                          value={pat.phone} 
                          onChange={(e) => updatePatient(pat.id, { phone: e.target.value })}
                          className="p-1 border border-slate-300 dark:border-slate-705 rounded bg-white dark:bg-slate-800"
                        />
                      ) : (
                        <span>{pat.phone}</span>
                      )}
                    </td>
                    <td className="p-2.5">
                      {editPatientId === pat.id ? (
                        <input 
                          type="text" 
                          value={pat.email} 
                          onChange={(e) => updatePatient(pat.id, { email: e.target.value })}
                          className="p-1 border border-slate-300 dark:border-slate-705 rounded bg-white dark:bg-slate-800"
                        />
                      ) : (
                        <span>{pat.email}</span>
                      )}
                    </td>
                    <td className="p-2.5">
                      {editPatientId === pat.id ? (
                        <input 
                          type="text" 
                          value={pat.address} 
                          onChange={(e) => updatePatient(pat.id, { address: e.target.value })}
                          className="p-1 border border-slate-300 dark:border-slate-705 rounded bg-white dark:bg-slate-800"
                        />
                      ) : (
                        <span>{pat.address}</span>
                      )}
                    </td>
                    <td className="p-2.5 text-center flex items-center justify-center gap-1.5">
                      {editPatientId === pat.id ? (
                        <button 
                          onClick={() => setEditPatientId(null)}
                          className="px-2 py-1 bg-emerald-500 text-white font-bold rounded"
                        >
                          Save
                        </button>
                      ) : (
                        <button 
                          onClick={() => setEditPatientId(pat.id)}
                          className="p-1 text-slate-400 hover:text-medical-primary rounded"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button 
                        onClick={() => deletePatient(pat.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Details Editor */}
      {activeTab === 'contact' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl mx-auto shadow-sm space-y-4">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-1.5">
            <MapPin className="h-5 w-5 text-medical-primary" />
            Edit Corporate Contact details
          </h3>
          <form onSubmit={handleUpdateContact} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-500 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> HQ Office Address
              </label>
              <input 
                type="text"
                value={editContactForm.hq}
                onChange={(e) => setEditContactForm({ ...editContactForm, hq: e.target.value })}
                className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-500 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-slate-400" /> Support Desk Phone
              </label>
              <input 
                type="text"
                value={editContactForm.phone}
                onChange={(e) => setEditContactForm({ ...editContactForm, phone: e.target.value })}
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-500 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-slate-400" /> Email Enquiries
              </label>
              <input 
                type="text"
                value={editContactForm.email}
                onChange={(e) => setEditContactForm({ ...editContactForm, email: e.target.value })}
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-2.5 bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg shadow-sm"
              >
                Apply Details to Contact Us Page
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Registry List */}
      {activeTab === 'users' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-md flex items-center gap-1.5 border-b border-slate-250 dark:border-slate-800 pb-3">
            <Users className="h-5 w-5 text-medical-primary" />
            Manage Platform Registrations
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="p-2 font-bold">User</th>
                  <th className="p-2 font-bold">Email</th>
                  <th className="p-2 font-bold">Role</th>
                  <th className="p-2 font-bold">Joined</th>
                  <th className="p-2 text-center font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 dark:border-slate-850">
                    <td className="p-2 font-bold text-slate-700 dark:text-slate-350">{u.name}</td>
                    <td className="p-2 text-slate-500">{u.email}</td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 rounded-full font-semibold uppercase text-[9px] ${
                        u.role === 'admin' 
                          ? 'bg-rose-100 text-rose-800' 
                          : u.role === 'doctor'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-2 text-slate-400">{u.created}</td>
                    <td className="p-2 text-center">
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-rose-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
