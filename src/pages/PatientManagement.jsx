import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Users, 
  UserPlus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  FileCheck,
  PlusCircle,
  Stethoscope,
  Trash2,
  Edit3
} from 'lucide-react';

export default function PatientManagement() {
  const { patients, addPatient, deletePatient, updatePatient } = useSystem();
  const [activeTab, setActiveTab] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [registerForm, setRegisterForm] = useState({
    name: '', age: '', gender: 'Male', phone: '', email: '', address: '', notes: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.age) {
      alert("Please fill in Name and Age");
      return;
    }
    const newPatient = {
      id: `P-${800 + Math.floor(Math.random() * 200)}`,
      name: registerForm.name,
      age: parseInt(registerForm.age),
      gender: registerForm.gender,
      phone: registerForm.phone || 'N/A',
      email: registerForm.email || 'N/A',
      address: registerForm.address || 'N/A',
      predictions: [],
      notes: registerForm.notes || 'No notes added yet.'
    };

    addPatient(newPatient);
    setSelectedPatientId(newPatient.id);
    setRegisterForm({ name: '', age: '', gender: 'Male', phone: '', email: '', address: '', notes: '' });
    setActiveTab('list');
    alert("Patient Registered Successfully!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient record?")) {
      deletePatient(id);
      if (selectedPatientId === id) {
        const remaining = patients.filter(p => p.id !== id);
        if (remaining.length > 0) {
          setSelectedPatientId(remaining[0].id);
        } else {
          setSelectedPatientId('');
        }
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePatient(selectedPatient.id, {
      name: selectedPatient.name,
      age: parseInt(selectedPatient.age),
      gender: selectedPatient.gender,
      phone: selectedPatient.phone,
      email: selectedPatient.email,
      address: selectedPatient.address,
      notes: selectedPatient.notes
    });
    setIsEditing(false);
    alert("Patient Profile Updated Successfully!");
  };

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl font-display">Patient Management</h1>
          <p className="text-sm text-slate-500">Register new patient records, review clinical profile history, and add consult notes</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-bold shrink-0">
          <button 
            onClick={() => {
              setActiveTab('list');
              setIsEditing(false);
            }}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-md transition-all ${activeTab === 'list' && !isEditing ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
          >
            <Users className="h-3.5 w-3.5" />
            Registry List
          </button>
          <button 
            onClick={() => {
              setActiveTab('register');
              setIsEditing(false);
            }}
            className={`flex items-center gap-1 py-1.5 px-3 rounded-md transition-all ${activeTab === 'register' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
          >
            <UserPlus className="h-3.5 w-3.5" />
            Register Patient
          </button>
        </div>
      </div>

      {activeTab === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patients list sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-medical-primary"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>

            <div className="glass-panel border border-slate-200 dark:border-slate-850 rounded-2xl p-3 space-y-2 max-h-[500px] overflow-y-auto">
              {filteredPatients.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    setSelectedPatientId(p.id);
                    setIsEditing(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    p.id === selectedPatientId 
                      ? 'bg-medical-light border-medical-primary dark:bg-slate-805 text-medical-secondary dark:text-medical-primary' 
                      : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <span className="font-bold text-xs block">{p.name}</span>
                    <span className="text-[10px] text-slate-400">ID: {p.id} • {p.age} yrs • {p.gender}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-500 rounded-md"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed profile window */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              isEditing ? (
                /* Edit Mode */
                <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg mb-4">Edit Patient Profile: {selectedPatient.id}</h3>
                  <form onSubmit={handleUpdate} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-450">Name</label>
                        <input 
                          type="text"
                          value={selectedPatient.name}
                          onChange={(e) => updatePatient(selectedPatient.id, { name: e.target.value })}
                          className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-450">Age</label>
                        <input 
                          type="number"
                          value={selectedPatient.age}
                          onChange={(e) => updatePatient(selectedPatient.id, { age: e.target.value })}
                          className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-455">Gender</label>
                        <select 
                          value={selectedPatient.gender}
                          onChange={(e) => updatePatient(selectedPatient.id, { gender: e.target.value })}
                          className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-455">Phone</label>
                        <input 
                          type="text"
                          value={selectedPatient.phone}
                          onChange={(e) => updatePatient(selectedPatient.id, { phone: e.target.value })}
                          className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-455">Email</label>
                      <input 
                        type="text"
                        value={selectedPatient.email}
                        onChange={(e) => updatePatient(selectedPatient.id, { email: e.target.value })}
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-455">Address</label>
                      <input 
                        type="text"
                        value={selectedPatient.address}
                        onChange={(e) => updatePatient(selectedPatient.id, { address: e.target.value })}
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-455">Consultation Notes</label>
                      <textarea 
                        rows="3"
                        value={selectedPatient.notes}
                        onChange={(e) => updatePatient(selectedPatient.id, { notes: e.target.value })}
                        className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-705 rounded-lg text-slate-500 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-medical-primary hover:bg-medical-secondary text-white rounded-lg"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* View Mode */
                <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                      <h3 className="font-bold text-xl">{selectedPatient.name}</h3>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Registry ID: {selectedPatient.id}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 flex items-center gap-1 text-xs font-semibold"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        Edit Profile
                      </button>
                      <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 py-1 px-3 rounded-full">
                        Age: {selectedPatient.age}
                      </span>
                      <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 py-1 px-3 rounded-full">
                        {selectedPatient.gender}
                      </span>
                    </div>
                  </div>

                  {/* Patient Contacts info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center space-x-2 text-slate-650 dark:text-slate-355">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span>{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-650 dark:text-slate-355">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span>{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-650 dark:text-slate-355">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span>{selectedPatient.address}</span>
                    </div>
                  </div>

                  {/* Prediction assessment History */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Historical Risk Assessments</h4>
                    {selectedPatient.predictions && selectedPatient.predictions.length > 0 ? (
                      <div className="space-y-2.5">
                        {selectedPatient.predictions.map((pred, i) => (
                          <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-850 text-xs">
                            <div className="flex items-center space-x-2">
                              <Stethoscope className="h-4 w-4 text-medical-primary" />
                              <span className="font-bold">{pred.disease}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-slate-400 flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {pred.date}
                              </span>
                              <span className={`font-semibold px-2 py-0.5 rounded-full ${pred.status === 'High Risk' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                {pred.status} ({pred.risk})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/20 text-slate-400 text-xs text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                        No prediction logs found. Open prediction module to evaluate patient.
                      </div>
                    )}
                  </div>

                  {/* Notes and consultations */}
                  <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Consultation Notes</h4>
                    <p className="text-xs leading-relaxed text-slate-650 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/20 p-3 rounded-lg border border-slate-100 dark:border-slate-855 whitespace-pre-line">
                      {selectedPatient.notes}
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="glass-panel p-12 text-center text-slate-400">
                Registry list is empty. Add patients to proceed.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'register' && (
        <div className="glass-panel max-w-xl mx-auto p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-1.5">
            <PlusCircle className="h-5 w-5 text-medical-primary" />
            Patient Registration Form
          </h3>

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Full Name *</label>
                <input
                  type="text"
                  required
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Age *</label>
                <input
                  type="number"
                  required
                  value={registerForm.age}
                  onChange={(e) => setRegisterForm({ ...registerForm, age: e.target.value })}
                  placeholder="35"
                  className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Gender</label>
                <select
                  value={registerForm.gender}
                  onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                  className="w-full p-2.5 border border-slate-350 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Phone Number</label>
                <input
                  type="text"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-500">Email Address</label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-500">Residential Address</label>
              <input
                type="text"
                value={registerForm.address}
                onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                placeholder="Street name, City, Zip"
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-500">Consultation Notes / History Details</label>
              <textarea
                rows="3"
                value={registerForm.notes}
                onChange={(e) => setRegisterForm({ ...registerForm, notes: e.target.value })}
                placeholder="Add initial diagnosis notes..."
                className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-2.5 bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg transition-all shadow-md"
              >
                Register & Save Patient Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
