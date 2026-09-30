import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Sparkles, 
  Boxes, 
  ShieldCheck, 
  ClipboardList, 
  GitCompare, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  SlidersHorizontal,
  Workflow,
  X,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

const DashboardPage = ({ setActivePage }) => {
  // State for interactive modals and filters
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'upload' | 'ai' | null
  const [timeframe, setTimeframe] = useState('30days');
  const [isMatchingRunning, setIsMatchingRunning] = useState(false);
  const [matchingSuccess, setMatchingSuccess] = useState(false);

  // Dynamic CPSE Distribution Data based on timeframe filter
  const cpseDataMap = {
    '30days': [
      { name: 'BHEL', count: '31.8k', width: '80%' },
      { name: 'NTPC', count: '24.6k', width: '62%' },
      { name: 'ONGC', count: '21.3k', width: '54%' },
      { name: 'IOCL', count: '18.9k', width: '48%' },
      { name: 'GAIL', count: '14.2k', width: '36%' },
      { name: 'SAIL', count: '10.8k', width: '27%' },
      { name: 'Others', count: '6.9k', width: '18%' }
    ],
    '90days': [
      { name: 'BHEL', count: '94.2k', width: '85%' },
      { name: 'NTPC', count: '72.1k', width: '65%' },
      { name: 'ONGC', count: '63.9k', width: '58%' },
      { name: 'IOCL', count: '55.4k', width: '50%' },
      { name: 'GAIL', count: '41.0k', width: '37%' },
      { name: 'SAIL', count: '31.5k', width: '28%' },
      { name: 'Others', count: '19.8k', width: '18%' }
    ],
    '1year': [
      { name: 'BHEL', count: '380k', width: '90%' },
      { name: 'NTPC', count: '290k', width: '69%' },
      { name: 'ONGC', count: '255k', width: '60%' },
      { name: 'IOCL', count: '220k', width: '52%' },
      { name: 'GAIL', count: '165k', width: '39%' },
      { name: 'SAIL', count: '125k', width: '29%' },
      { name: 'Others', count: '78k', width: '18%' }
    ]
  };

  const recentActivity = [
    { desc: 'SS Hex Bolt M10 × 50', sub: 'Fasteners / Industrial', cpse: 'BHEL', standardId: 'STD-BOLT-001', confidence: 96, status: 'Matched', date: 'Today, 10:42 AM' },
    { desc: 'Gate Valve 100mm PN16', sub: 'Piping / Industrial', cpse: 'NTPC', standardId: 'STD-VALVE-014', confidence: 89, status: 'Review', date: 'Today, 09:18 AM' },
    { desc: 'Carbon Steel Pipe DN80', sub: 'Piping / Industrial', cpse: 'ONGC', standardId: 'STD-PIPE-008', confidence: 98, status: 'Matched', date: 'Yesterday, 04:52 PM' },
    { desc: 'Deep Groove Ball Bearing', sub: 'Mechanical / Industrial', cpse: 'IOCL', standardId: '-', confidence: 71, status: 'Conflict', date: 'Yesterday, 02:11 PM' }
  ];

  const conflicts = [
    { id: 1, title: 'SS Bolt vs MS Bolt', desc: 'Material type · BHEL · NTPC', score: '93%' },
    { id: 2, title: 'Grade M20 vs M24', desc: 'Grade mismatch · SAIL · GAIL', score: '88%' },
    { id: 3, title: 'PN16 vs PN25', desc: 'Pressure rating · IOCL · ONGC', score: '86%' }
  ];

  const handleRunMatching = () => {
    setIsMatchingRunning(true);
    setTimeout(() => {
      setIsMatchingRunning(false);
      setMatchingSuccess(true);
      setTimeout(() => setMatchingSuccess(false), 4000);
      setActiveModal(null);
    }, 2000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6 space-y-6 font-sans">
      {/* Toast Notification */}
      {matchingSuccess && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <p className="font-bold">AI Matching Completed</p>
            <p className="text-emerald-200 text-[11px]">Successfully mapped 12,400 new material entries.</p>
          </div>
        </div>
      )}

      {/* Header & Functional Main Actions */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Material Intelligence</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Material Intelligence Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">Harmonizing material codes across CPSEs using AI</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setActiveModal('add')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-500" />
            <span>Add Material</span>
          </button>
          <button 
            onClick={() => setActiveModal('upload')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Upload Dataset</span>
          </button>
          <button 
            onClick={() => setActiveModal('ai')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Run AI Matching</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row (Navigation Connected) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
        <div 
          onClick={() => setActivePage && setActivePage('all-materials')}
          className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-sky-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
              <Boxes className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> 8.2%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">128,430</h2>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">Total Materials</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Across 7 CPSEs</p>
          </div>
        </div>

        <div 
          onClick={() => setActivePage && setActivePage('standard-materials')}
          className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> 12.4%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">94,812</h2>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">Standardized Materials</p>
            <p className="text-[10px] text-slate-400 mt-0.5">73.8% of total</p>
          </div>
        </div>

        <div 
          onClick={() => setActivePage && setActivePage('review-queue')}
          className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <ClipboardList className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" /> 4.6%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">2,846</h2>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">Pending Review</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Needs human validation</p>
          </div>
        </div>

        <div 
          onClick={() => setActivePage && setActivePage('match-results')}
          className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <GitCompare className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> 18.7%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">8,291</h2>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">Potential Duplicates</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Across 1,942 clusters</p>
          </div>
        </div>

        <div 
          onClick={() => setActivePage && setActivePage('conflicts')}
          className="bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-rose-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-0.5">
              <ArrowDownRight className="w-3 h-3" /> 6.1%
            </span>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">342</h2>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">Specification Conflicts</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Requires attention</p>
          </div>
        </div>
      </div>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-12 gap-5">
        {/* CPSE Distribution Horizontal Progress Bars */}
        <div className="col-span-12 lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">CPSE material distribution</h3>
              <p className="text-[11px] text-slate-400">Records ingested by organization</p>
            </div>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
            >
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last 1 year</option>
            </select>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            {cpseDataMap[timeframe].map((item, idx) => (
              <div key={idx} className="flex items-center text-xs">
                <span className="w-16 font-semibold text-slate-600 text-[11px]">{item.name}</span>
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden mx-3">
                  <div className="bg-slate-800 h-full rounded-full transition-all duration-500" style={{ width: item.width }}></div>
                </div>
                <span className="w-12 text-right text-slate-500 font-medium text-[11px]">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-slate-800"></span>
              <span>Material records <strong className="text-slate-800">128,430</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              <span>7 organizations</span>
            </div>
          </div>
        </div>

        {/* AI Matching Overview Donut Chart */}
        <div className="col-span-12 lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-800 text-sm">AI matching overview</h3>
              <button 
                onClick={() => setActivePage && setActivePage('analytics')}
                className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors"
                title="Filter & Configure"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mb-4">Current classification of records</p>

            <div className="flex items-center justify-around py-2">
              <div className="relative w-32 h-32 rounded-full flex items-center justify-center shrink-0"
                   style={{ background: 'conic-gradient(#2563EB 0% 73.8%, #60A5FA 73.8% 92.2%, #F59E0B 92.2% 100%)' }}>
                <div className="w-22 h-22 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-xl font-extrabold text-slate-900">73.8%</span>
                  <span className="text-[9px] text-slate-400 font-medium tracking-tight">standardized</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="text-slate-600 w-22 text-[11px]">High confidence</span>
                  <span className="font-bold text-slate-800 text-[11px]">73.8%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span className="text-slate-600 w-22 text-[11px]">Human review</span>
                  <span className="font-bold text-slate-800 text-[11px]">18.4%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-slate-600 w-22 text-[11px]">Low confidence</span>
                  <span className="font-bold text-slate-800 text-[11px]">7.8%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-slate-400 text-[10px] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Hybrid AI combines semantic, attribute and fuzzy matching.</span>
          </div>
        </div>
      </div>

      {/* Activity Table & Conflicts Grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* Table Side */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Recent matching activity</h3>
              <p className="text-[11px] text-slate-400">Latest material intelligence events</p>
            </div>
            <button 
              onClick={() => setActivePage && setActivePage('match-results')}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th className="p-3 pl-4">Material Description</th>
                  <th className="p-3">CPSE</th>
                  <th className="p-3">Standard ID</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 pr-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentActivity.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors cursor-pointer">
                    <td className="p-3 pl-4">
                      <p className="font-semibold text-slate-800 leading-tight">{row.desc}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{row.sub}</p>
                    </td>
                    <td className="p-3">
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[10px]">
                        {row.cpse}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-600">{row.standardId}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[11px]">{row.confidence}%</span>
                        <div className="w-10 bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${row.confidence > 90 ? 'bg-emerald-500' : row.confidence > 80 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                            style={{ width: `${row.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center w-max gap-1 ${
                        row.status === 'Matched' ? 'bg-emerald-50 text-emerald-600' : 
                        row.status === 'Review' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          row.status === 'Matched' ? 'bg-emerald-500' : 
                          row.status === 'Review' ? 'bg-amber-500' : 'bg-rose-500'
                        }`}></span>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-slate-400 text-[10px]">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Specification Conflicts Side */}
        <div className="col-span-12 lg:col-span-4 bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-800 text-sm">Specification conflicts</h3>
              <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[10px] font-semibold">12 open</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">High similarity, different specs</p>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-0.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-200">
              {conflicts.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setActivePage && setActivePage('conflicts')}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-slate-100/60 flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-2">
                    <div className="p-1 rounded bg-amber-100/60 text-amber-600 mt-0.5 shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs font-bold text-rose-600">{item.score}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setActivePage && setActivePage('conflicts')}
            className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-slate-600 hover:text-indigo-600 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            Review all conflicts <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MatAlign Principle Banner */}
      <div className="bg-linear-to-r from-slate-100 via-sky-50/50 to-indigo-50/40 border border-slate-200/80 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">The MatAlign Principle</span>
            <h4 className="font-bold text-slate-800 text-xs mt-0.5">From different codes to a common identity</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">AI-powered material harmonization for smarter CPSE operations.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono self-end md:self-auto">
          <div>
            <span className="text-[9px] font-sans font-semibold text-slate-400 block mb-0.5 uppercase">Source Codes</span>
            <span className="text-slate-700 font-semibold text-[11px]">BHEL · NTPC · ONGC</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 font-sans" />
          <div>
            <span className="text-[9px] font-sans font-semibold text-slate-400 block mb-0.5 uppercase">Common Identity</span>
            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 text-[11px]">STD-BOLT-001</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 font-sans" />
          <div>
            <span className="text-[9px] font-sans font-semibold text-slate-400 block mb-0.5 uppercase">Verified</span>
            <span className="text-emerald-600 font-bold text-[11px]">✓ 96% match</span>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base">
                {activeModal === 'add' && 'Add Material Item'}
                {activeModal === 'upload' && 'Upload Material Dataset'}
                {activeModal === 'ai' && 'Execute AI Harmonization Engine'}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-xs space-y-3">
              {activeModal === 'add' && (
                <>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Material Name / Title</label>
                    <input type="text" placeholder="e.g. Stainless Steel Fastener M12" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-slate-700">Target CPSE Organization</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                      <option>BHEL</option>
                      <option>NTPC</option>
                      <option>ONGC</option>
                      <option>IOCL</option>
                    </select>
                  </div>
                </>
              )}

              {activeModal === 'upload' && (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <FileSpreadsheet className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700">Drop your CSV, XLSX or JSON file here</p>
                  <p className="text-[10px] text-slate-400 mt-1">Supports standard CPSE inventory formats up to 50MB</p>
                </div>
              )}

              {activeModal === 'ai' && (
                <div className="space-y-2">
                  <p className="text-slate-600">Running AI batch processing will match unmapped CPSE catalog codes against common standardization identities.</p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] space-y-1">
                    <p className="font-bold text-slate-700">Batch details:</p>
                    <p className="text-slate-500">• 2,846 pending queue items</p>
                    <p className="text-slate-500">• Confidence threshold: 85%</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleRunMatching}
                disabled={isMatchingRunning}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5"
              >
                {isMatchingRunning && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                <span>{isMatchingRunning ? 'Processing...' : 'Confirm & Proceed'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compact Footer */}
      <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <span>MatAlign v1.0</span>
        <span>Data refreshed 4 minutes ago</span>
        <span className="flex items-center gap-1.5 text-emerald-600">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          All systems operational
        </span>
      </div>
    </div>
  );
};

export default DashboardPage;