import React, { useState } from 'react';
import { Search, Pill, AlertTriangle, Info, CheckCircle, ShieldAlert } from 'lucide-react';

export default function DrugSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const popularDrugs = ["Tylenol", "Aspirin", "Ibuprofen", "Amoxicillin", "Lisinopril", "Metformin"];

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setQuery(searchQuery);

    const apiUrl = import.meta.env.VITE_OPENFDA_API_URL || 'https://api.fda.gov/drug/label.json';

    try {
      // First try searching by brand_name
      let response = await fetch(`${apiUrl}?search=openfda.brand_name:"${encodeURIComponent(searchQuery)}"&limit=1`);
      
      if (!response.ok && response.status === 404) {
        // If not found, try searching by generic_name
        response = await fetch(`${apiUrl}?search=openfda.generic_name:"${encodeURIComponent(searchQuery)}"&limit=1`);
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Medicine "${searchQuery}" not found in the FDA database.`);
        }
        throw new Error('Failed to fetch data from OpenFDA.');
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results[0]);
      } else {
        throw new Error('No detailed records found for this medicine.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl flex items-center gap-3">
            <Pill className="h-8 w-8 text-medical-primary" />
            Medicine Database
          </h1>
          <p className="text-sm text-slate-500 mt-1">Search the official US FDA database for drug interactions, side effects, and warnings.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            OpenFDA Integration
          </span>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicine by brand or generic name (e.g., Tylenol, Aspirin, Ibuprofen)..."
            className="w-full pl-12 pr-32 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-medical-primary focus:border-transparent transition-all shadow-sm"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 px-6 py-2.5 bg-medical-primary hover:bg-medical-secondary text-white font-bold text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {!results && !loading && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 animate-fade-in">
            <span className="text-xs font-semibold text-slate-500 mr-2">Try searching:</span>
            {popularDrugs.map((drug) => (
              <button
                key={drug}
                onClick={() => performSearch(drug)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-medical-primary/10 text-slate-600 hover:text-medical-primary dark:bg-slate-800 dark:hover:bg-medical-primary/20 dark:text-slate-300 dark:hover:text-medical-primary text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-medical-primary/30 transition-all cursor-pointer"
              >
                {drug}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="max-w-3xl mx-auto p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-3 animate-fade-in dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-semibold">{error}</span>
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Main Info Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-medical-primary" />
              General Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Brand Name</span>
                <span className="font-semibold text-lg">{results.openfda?.brand_name?.[0] || 'Unknown Brand'}</span>
              </div>
              
              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Generic Name</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {results.openfda?.generic_name?.[0] || 'Unknown Generic Name'}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Manufacturer</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {results.openfda?.manufacturer_name?.[0] || 'Unknown Manufacturer'}
                </span>
              </div>

              {results.active_ingredient && (
                <div>
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Active Ingredients</span>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {results.active_ingredient.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Usage & Indications */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              Indications & Usage
            </h3>
            <div className="text-sm text-slate-600 dark:text-slate-400 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
              {results.indications_and_usage ? (
                results.indications_and_usage.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))
              ) : (
                <p className="italic">No usage information available.</p>
              )}
            </div>
          </div>

          {/* Warnings & Side Effects (Full Width) */}
          <div className="md:col-span-2 glass-panel p-6 rounded-3xl border border-rose-200 dark:border-rose-900/30 shadow-sm space-y-6 bg-rose-50/30 dark:bg-rose-950/10">
            <h3 className="text-xl font-bold border-b border-rose-200 dark:border-rose-900/30 pb-3 flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="h-5 w-5" />
              Warnings & Side Effects
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">General Warnings</h4>
                <div className="text-sm text-slate-600 dark:text-slate-400 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                  {results.warnings ? (
                    results.warnings.map((text, idx) => (
                      <p key={idx}>{text}</p>
                    ))
                  ) : (
                    <p className="italic">No warning information available.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">Do Not Use (Contraindications)</h4>
                <div className="text-sm text-slate-600 dark:text-slate-400 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                  {results.do_not_use ? (
                    results.do_not_use.map((text, idx) => (
                      <p key={idx}>{text}</p>
                    ))
                  ) : (
                    <p className="italic">No contraindication information available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
