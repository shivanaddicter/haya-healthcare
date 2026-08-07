import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export default function ContactUs() {
  const { contact } = useSystem();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert("Your request has been submitted successfully. A Haya representative will contact you shortly.");
    }, 1000);
  };

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl font-display">Contact Haya Health Care</h1>
          <p className="text-sm text-slate-500">Reach out for business consultations, integration queries, or technical assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact details */}
        <div className="md:col-span-1 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="font-bold text-md border-b border-slate-200 dark:border-slate-800 pb-3">Office Contacts</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                <MapPin className="h-4.5 w-4.5 text-medical-primary shrink-0" />
                <div>
                  <span className="font-bold block text-slate-700 dark:text-slate-300">HQ Office</span>
                  <span>{contact.hq}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-650 dark:text-slate-400">
                <Phone className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-700 dark:text-slate-300">Support Desk</span>
                  <span>{contact.phone}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-slate-650 dark:text-slate-400">
                <Mail className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                <div>
                  <span className="font-bold block text-slate-700 dark:text-slate-300">Email Enquiries</span>
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="md:col-span-2">
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-1.5">
              <HelpCircle className="h-5 w-5 text-medical-primary" />
              Submit Consultation Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-500">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Integration, licensing, or report inquiry"
                  className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Message Inquiry Details *</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your request in detail..."
                  className="w-full p-2.5 border border-slate-355 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-medical-primary hover:bg-medical-secondary text-white font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="h-4.5 w-4.5" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
