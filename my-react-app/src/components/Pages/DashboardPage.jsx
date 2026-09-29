import React from 'react';
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
  Workflow
} from 'lucide-react';

const DashboardPage = () => {
  const cpseData = [
    { name: 'BHEL', count: '31.8k', width: '80%' },
    { name: 'NTPC', count: '24.6k', width: '62%' },
    { name: 'ONGC', count: '21.3k', width: '54%' },
    { name: 'IOCL', count: '18.9k', width: '48%' },
    { name: 'GAIL', count: '14.2k', width: '36%' },
    { name: 'SAIL', count: '10.8k', width: '27%' },
    { name: 'Others', count: '6.9k', width: '18%' }
  ];

  const recentActivity = [
    { desc: 'SS Hex Bolt M10 × 50', sub: 'Fasteners / Industrial', cpse: 'BHEL', standardId: 'STD-BOLT-001', confidence: 96, status: 'Matched', date: 'Today, 10:42 AM' },
    { desc: 'Gate Valve 100mm PN16', sub: 'Piping / Industrial', cpse: 'NTPC', standardId: 'STD-VALVE-014', confidence: 89, status: 'Review', date: 'Today, 09:18 AM' },
    { desc: 'Carbon Steel Pipe DN80', sub: 'Piping / Industrial', cpse: 'ONGC', standardId: 'STD-PIPE-008', confidence: 98, status: 'Matched', date: 'Yesterday, 04:52 PM' },
    { desc: 'Deep Groove Ball Bearing', sub: 'Mechanical / Industrial', cpse: 'IOCL', standardId: '-', confidence: 71, status: 'Conflict', date: 'Yesterday, 02:11 PM' }
  ];

  const conflicts = [
    { title: 'SS Bolt vs MS Bolt', desc: 'Material type · BHEL · NTPC', score: '93%' },
    { title: 'Grade M20 vs M24', desc: 'Grade mismatch · SAIL · GAIL', score: '88%' },
    { title: 'PN16 vs PN25', desc: 'Pressure rating · IOCL · ONGC', score: '86%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Main Actions */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Material Intelligence</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Material Intelligence Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Harmonizing material codes across CPSEs using AI</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs">
            <Plus className="w-4 h-4 text-slate-500" />
            <span>Add Material</span>
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs">
            <Upload className="w-4 h-4 text-slate-500" />
            <span>Upload Dataset</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E1E38] text-white text-sm font-semibold hover:bg-[#162A45] transition-all shadow-md">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Run AI Matching</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
              <Boxes className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> 8.2%
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">128,430</h2>
            <p className="text-xs font-medium text-slate-700 mt-1">Total Materials</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across 7 CPSEs</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> 12.4%
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">94,812</h2>
            <p className="text-xs font-medium text-slate-700 mt-1">Standardized Materials</p>
            <p className="text-[11px] text-slate-400 mt-0.5">73.8% of total</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-amber-600 flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" /> 4.6%
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">2,846</h2>
            <p className="text-xs font-medium text-slate-700 mt-1">Pending Review</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Needs human validation</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <GitCompare className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> 18.7%
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">8,291</h2>
            <p className="text-xs font-medium text-slate-700 mt-1">Potential Duplicates</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Across 1,942 clusters</p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-rose-600 flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" /> 6.1%
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">342</h2>
            <p className="text-xs font-medium text-slate-700 mt-1">Specification Conflicts</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Requires attention</p>
          </div>
        </div>
      </div>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* CPSE Distribution Horizontal Progress Bars */}
        <div className="col-span-7 bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-slate-800 text-base">CPSE material distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Records ingested by organization</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 rounded-lg px-2.5 py-1.5 focus:outline-none">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="space-y-4">
            {cpseData.map((item, idx) => (
              <div key={idx} className="flex items-center text-xs">
                <span className="w-16 font-semibold text-slate-600">{item.name}</span>
                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden mx-4">
                  <div className="bg-slate-700 h-full rounded-full" style={{ width: item.width }}></div>
                </div>
                <span className="w-12 text-right text-slate-500 font-medium">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              <span>Material records <strong className="text-slate-800">128,430</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span>7 organizations</span>
            </div>
          </div>
        </div>

        {/* AI Matching Overview Donut Chart */}
        <div className="col-span-5 bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-800 text-base">AI matching overview</h3>
              <button className="text-slate-400 hover:text-slate-600 p-1">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-6">Current classification of records</p>

            <div className="flex items-center justify-around py-4">
              {/* CSS Donut Ring Representation */}
              <div className="relative w-40 h-40 rounded-full flex items-center justify-center"
                   style={{ background: 'conic-gradient(#2563EB 0% 73.8%, #60A5FA 73.8% 92.2%, #F59E0B 92.2% 100%)' }}>
                <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-extrabold text-slate-900">73.8%</span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-tight">standardized</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-600 w-24">High confidence</span>
                  <span className="font-bold text-slate-800">73.8%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  <span className="text-slate-600 w-24">Human review</span>
                  <span className="font-bold text-slate-800">18.4%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-slate-600 w-24">Low confidence</span>
                  <span className="font-bold text-slate-800">7.8%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-slate-400 text-[11px] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Hybrid AI combines semantic, attribute and fuzzy matching.</span>
          </div>
        </div>
      </div>

      {/* Activity Table & Conflicts Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Table Side */}
        <div className="col-span-8 bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-5 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Recent matching activity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Latest material intelligence events</p>
            </div>
            <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-3.5 pl-5">Material Description</th>
                <th className="p-3.5">CPSE</th>
                <th className="p-3.5">Standard ID</th>
                <th className="p-3.5">Confidence</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentActivity.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3.5 pl-5">
                    <p className="font-semibold text-slate-800">{row.desc}</p>
                    <p className="text-[10px] text-slate-400">{row.sub}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[10px]">
                      {row.cpse}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-600">{row.standardId}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{row.confidence}%</span>
                      <div className="w-12 bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${row.confidence > 90 ? 'bg-emerald-500' : row.confidence > 80 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                          style={{ width: `${row.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
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
                  <td className="p-3.5 pr-5 text-slate-400 text-[11px]">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Specification Conflicts Side */}
        <div className="col-span-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-slate-800 text-base">Specification conflicts</h3>
              <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded text-[11px] font-semibold">12 open</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">High similarity, different specs</p>

            <div className="space-y-3">
              {conflicts.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 flex items-center justify-between transition-all cursor-pointer">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1 rounded bg-amber-100/60 text-amber-600 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 leading-tight">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-rose-600">{item.score}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-4 py-2 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1 transition-colors">
            Review all conflicts <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MatAlign Principle Banner */}
      <div className="bg-gradient-to-r from-slate-100 via-sky-50/50 to-indigo-50/40 border border-slate-200/80 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-indigo-600">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">The MatAlign Principle</span>
            <h4 className="font-bold text-slate-800 text-sm mt-0.5">From different codes to a common identity</h4>
            <p className="text-xs text-slate-500 mt-0.5">AI-powered material harmonization for smarter and more consistent CPSE operations.</p>
          </div>
        </div>

        <div className="flex items-center gap-8 text-xs font-mono">
          <div>
            <span className="text-[10px] font-sans font-semibold text-slate-400 block mb-0.5 uppercase">Source Codes</span>
            <span className="text-slate-700 font-semibold">BHEL · NTPC · ONGC</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 font-sans" />
          <div>
            <span className="text-[10px] font-sans font-semibold text-slate-400 block mb-0.5 uppercase">Common Identity</span>
            <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">STD-BOLT-001</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 font-sans" />
          <div>
            <span className="text-[10px] font-sans font-semibold text-slate-400 block mb-0.5 uppercase">Verified</span>
            <span className="text-emerald-600 font-bold">✓ 96% match</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
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