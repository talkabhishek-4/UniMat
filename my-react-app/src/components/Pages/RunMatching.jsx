import React from 'react';
import { Sparkles, Play, CheckCircle2, RefreshCw } from 'lucide-react';

const RunMatchingPage = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Run AI Matching Engine</h1>
        <p className="text-sm text-slate-500 mt-0.5">Execute Natural Language Processing & attribute matching across CPSE datasets</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs space-y-6">
        <h3 className="font-bold text-slate-800 text-base">Execution Parameters</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target CPSE Datasets</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800">
              <option>All CPSEs (7 Consortium Members)</option>
              <option>BHEL & NTPC Only</option>
              <option>ONGC & IOCL Only</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Matching Algorithm Confidence Threshold</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800">
              <option>Strict (&gt; 85% confidence)</option>
              <option>Balanced (&gt; 70% confidence)</option>
              <option>Lenient (&gt; 50% confidence)</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600">
            <p className="font-semibold text-slate-800">AI Model Mode: Hybrid Semantic Search</p>
            <p className="mt-0.5"> Combines BERT domain-trained NLP embeddings, attribute matching (size, material rating, pressure), and Levenshtein fuzzy string distance.</p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md">
          <Play className="w-4 h-4 fill-white" />
          <span>Start Matching Process</span>
        </button>
      </div>
    </div>
  );
};

export default RunMatchingPage;