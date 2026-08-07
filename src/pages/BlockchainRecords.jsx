import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, Link2, Key, Search, Activity, Cpu } from 'lucide-react';

export default function BlockchainRecords() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate mock blockchain ledger data
    const generateBlocks = () => {
      const mockBlocks = [];
      let previousHash = "0000000000000000000000000000000000000000000000000000000000000000";
      
      for (let i = 0; i < 12; i++) {
        // Pseudo SHA-256 generation for visual effect
        const currentHash = Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        
        mockBlocks.push({
          blockHeight: 184920 + i,
          timestamp: new Date(Date.now() - (12 - i) * 60000).toLocaleTimeString(),
          patientId: `PT-${Math.floor(Math.random() * 9000) + 1000}`,
          recordType: ['Diagnostic', 'Prescription', 'Vitals Sync', 'Lab Results'][Math.floor(Math.random() * 4)],
          previousHash: previousHash,
          hash: currentHash,
          validator: ['Node-Alpha', 'Node-Beta', 'Haya-Core'][Math.floor(Math.random() * 3)]
        });
        
        previousHash = currentHash;
      }
      setBlocks(mockBlocks.reverse());
      setLoading(false);
    };

    setTimeout(generateBlocks, 1000);
  }, []);

  return (
    <div className="space-y-8 p-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-3xl flex items-center gap-3">
            <Database className="h-8 w-8 text-indigo-500" />
            Blockchain Health Ledger
          </h1>
          <p className="text-sm text-slate-500 mt-1">Decentralized, cryptographically secured electronic health records.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-100 dark:border-indigo-900/30 text-xs font-bold">
          <Activity className="h-4 w-4 animate-pulse" />
          Network Status: Connected & Syncing
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Network Stats */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
            <h3 className="font-bold flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-500" />
              Node Analytics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Active Validators</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">12</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Hash Rate</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">2.4 TH/s</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Avg Block Time</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">12.5s</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Encryption Level</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> SHA-256</span>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Key className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h4 className="font-bold text-sm">HIPAA Compliant</h4>
            <p className="text-[10px] text-slate-500 mt-1">All patient data is encrypted locally before being hashed to the decentralized ledger.</p>
          </div>
        </div>

        {/* Ledger Block List */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
            <h3 className="font-bold text-sm">Recent Ledger Blocks</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Block Hash or Patient ID..." 
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 w-64 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            </div>
          </div>
          
          <div className="flex-1 overflow-x-auto p-4">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-xs font-semibold text-slate-500">Syncing with blockchain network...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blocks.map((block, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-100 dark:bg-slate-900 p-2.5 rounded-lg text-center min-w-[70px]">
                          <span className="block text-[9px] uppercase font-bold text-slate-400">Block</span>
                          <span className="block text-sm font-black text-slate-700 dark:text-slate-200">#{block.blockHeight}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-md">
                              {block.recordType}
                            </span>
                            <span className="text-xs text-slate-500 font-semibold">{block.timestamp}</span>
                          </div>
                          <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                            Patient ID: <span className="font-mono font-semibold">{block.patientId}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 max-w-lg bg-slate-50 dark:bg-slate-900 p-3 rounded-lg font-mono text-[10px] text-slate-500 space-y-1.5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-start gap-2">
                          <Link2 className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
                          <div className="truncate w-full" title={block.previousHash}>
                            <span className="font-semibold text-slate-400">Prev: </span>
                            {block.previousHash}
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                          <div className="truncate w-full font-bold text-emerald-600 dark:text-emerald-400" title={block.hash}>
                            <span className="font-semibold text-slate-400">Hash: </span>
                            {block.hash}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
