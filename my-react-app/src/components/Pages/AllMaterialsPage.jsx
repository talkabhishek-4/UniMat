import React from 'react';
import { Search, Filter, Plus, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

const AllMaterialsPage = () => {
  const dummyMaterials = [
    { code: 'BHEL-90122', name: 'SS Hex Bolt M10 x 50', category: 'Fasteners', cpse: 'BHEL', stdCode: 'STD-BOLT-001', status: 'Mapped' },
    { code: 'NTPC-44102', name: 'Gate Valve 100mm PN16', category: 'Valves', cpse: 'NTPC', stdCode: 'STD-VALVE-014', status: 'Mapped' },
    { code: 'ONGC-11009', name: 'Carbon Steel Pipe DN80', category: 'Piping', cpse: 'ONGC', stdCode: 'STD-PIPE-008', status: 'Mapped' },
    { code: 'IOCL-77123', name: 'Deep Groove Ball Bearing', category: 'Bearings', cpse: 'IOCL', stdCode: 'STD-BRG-102', status: 'Pending' },
    { code: 'GAIL-33211', name: 'Flange ANSI B16.5 Class 150', category: 'Piping', cpse: 'GAIL', stdCode: 'STD-FLG-055', status: 'Mapped' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Materials Master Repository</h1>
          <p className="text-sm text-slate-500 mt-0.5">Centralized listing of material codes across all CPSE ERP systems</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-2xs">
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search material description, local code, or standardized code..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filters</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <th className="p-4 pl-6">CPSE Material Code</th>
              <th className="p-4">Description</th>
              <th className="p-4">Category</th>
              <th className="p-4">Source CPSE</th>
              <th className="p-4">Unified Standard Code</th>
              <th className="p-4 pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {dummyMaterials.map((mat, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 pl-6 font-mono font-semibold text-slate-800">{mat.code}</td>
                <td className="p-4 font-medium text-slate-900">{mat.name}</td>
                <td className="p-4 text-slate-500">{mat.category}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[10px]">
                    {mat.cpse}
                  </span>
                </td>
                <td className="p-4 font-mono text-indigo-600 font-semibold">{mat.stdCode}</td>
                <td className="p-4 pr-6">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    mat.status === 'Mapped' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {mat.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing 1 to 5 of 128,430 items</span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 border border-slate-200 rounded hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMaterialsPage;
