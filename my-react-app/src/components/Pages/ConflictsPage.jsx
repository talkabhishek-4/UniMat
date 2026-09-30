import React, { useState, useMemo } from 'react';
import { 
  Search, AlertTriangle, CheckCircle, Clock, 
  X, Check, PlusCircle, ArrowRightLeft, RefreshCw 
} from 'lucide-react';

export default function ConflictPage() {
  const [selectedConflict, setSelectedConflict] = useState(null);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCpse, setSelectedCpse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [actionFeedback, setActionFeedback] = useState(null);

  // Initial Mock Conflict Data
  const [conflictList, setConflictList] = useState([
    {
      id: 1,
      priority: 'High',
      cpseA: 'BHEL',
      cpseB: 'NTPC',
      materialA: 'SS Bolt',
      materialB: 'MS Bolt',
      conflictType: 'Material',
      similarity: '96%',
      status: 'Open',
      detailA: {
        code: 'BHEL — BHL1023',
        description: 'SS HEX BOLT M10×50',
        material: 'SS304',
        diameter: '10 mm',
        length: '50 mm',
        uom: 'PCS'
      },
      detailB: {
        code: 'NTPC — NTP5567',
        description: 'MS HEX BOLT M10×50',
        material: 'Mild Steel',
        diameter: '10 mm',
        length: '50 mm',
        uom: 'PCS'
      },
      analysis: {
        descSimilarity: '96%',
        attrMatch: '92%',
        specMatch: '88%',
        criticalDifference: 'SS304 ≠ Mild Steel',
        recommendation: 'Do not automatically merge.'
      }
    },
    {
      id: 2,
      priority: 'High',
      cpseA: 'BHEL',
      cpseB: 'NTPC',
      materialA: 'Bearing',
      materialB: 'Bearing',
      conflictType: 'Dimension',
      similarity: '94%',
      status: 'Open',
      detailA: { code: 'BHEL — BHL2041', description: 'DEEP GROOVE BALL BEARING 6205', material: 'Chrome Steel', diameter: '25 mm', length: '15 mm', uom: 'PCS' },
      detailB: { code: 'NTPC — NTP8812', description: 'DEEP GROOVE BALL BEARING 6206', material: 'Chrome Steel', diameter: '30 mm', length: '16 mm', uom: 'PCS' },
      analysis: { descSimilarity: '94%', attrMatch: '85%', specMatch: '80%', criticalDifference: 'Inner Diameter: 25mm ≠ 30mm', recommendation: 'Keep records separate.' }
    },
    {
      id: 3,
      priority: 'Medium',
      cpseA: 'ONGC',
      cpseB: 'IOCL',
      materialA: 'Valve PN16',
      materialB: 'Valve PN25',
      conflictType: 'Pressure',
      similarity: '91%',
      status: 'Under Review',
      detailA: { code: 'ONGC — ONGC3310', description: 'GATE VALVE DN100 PN16', material: 'Cast Iron', diameter: '100 mm', length: '230 mm', uom: 'SET' },
      detailB: { code: 'IOCL — IOC4490', description: 'GATE VALVE DN100 PN25', material: 'Cast Iron', diameter: '100 mm', length: '230 mm', uom: 'SET' },
      analysis: { descSimilarity: '91%', attrMatch: '90%', specMatch: '75%', criticalDifference: 'Pressure Rating: PN16 ≠ PN25', recommendation: 'Review system pressure limits.' }
    },
    {
      id: 4,
      priority: 'Medium',
      cpseA: 'GAIL',
      cpseB: 'SAIL',
      materialA: 'Pipe Sch40',
      materialB: 'Pipe Sch80',
      conflictType: 'Specification',
      similarity: '89%',
      status: 'Open',
      detailA: { code: 'GAIL — GL5512', description: 'CS PIPE 4 INCH SCH 40', material: 'Carbon Steel', diameter: '4 inch', length: '6 m', uom: 'MTR' },
      detailB: { code: 'SAIL — SL1120', description: 'CS PIPE 4 INCH SCH 80', material: 'Carbon Steel', diameter: '4 inch', length: '6 m', uom: 'MTR' },
      analysis: { descSimilarity: '89%', attrMatch: '88%', specMatch: '70%', criticalDifference: 'Wall Thickness: Sch 40 ≠ Sch 80', recommendation: 'Requires engineering validation.' }
    }
  ]);

  // Reactive Filtering Logic
  const filteredConflicts = useMemo(() => {
    return conflictList.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.materialA.toLowerCase().includes(q) ||
        item.materialB.toLowerCase().includes(q) ||
        item.detailA.code.toLowerCase().includes(q) ||
        item.detailB.code.toLowerCase().includes(q) ||
        item.conflictType.toLowerCase().includes(q);

      const matchesType = selectedType === 'All' || item.conflictType === selectedType;
      const matchesPriority = selectedPriority === 'All' || item.priority === selectedPriority;
      const matchesCpse = selectedCpse === 'All' || item.cpseA === selectedCpse || item.cpseB === selectedCpse;
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

      return matchesSearch && matchesType && matchesPriority && matchesCpse && matchesStatus;
    });
  }, [conflictList, searchQuery, selectedType, selectedPriority, selectedCpse, selectedStatus]);

  // Reactive Overview Numbers
  const stats = useMemo(() => {
    const total = conflictList.length;
    const high = conflictList.filter(c => c.priority === 'High' && c.status !== 'Resolved').length;
    const underReview = conflictList.filter(c => c.status === 'Under Review').length;
    const resolved = conflictList.filter(c => c.status === 'Resolved').length;
    return [
      { label: 'Total Conflicts', value: total, border: 'border-slate-300', text: 'text-slate-800' },
      { label: 'High Priority', value: high, border: 'border-red-500', text: 'text-red-600' },
      { label: 'Under Review', value: underReview, border: 'border-amber-500', text: 'text-amber-600' },
      { label: 'Resolved', value: resolved, border: 'border-emerald-500', text: 'text-emerald-600' },
    ];
  }, [conflictList]);

  // Dynamic Type Breakdown Counts
  const conflictTypesCount = useMemo(() => {
    const counts = { Material: 186, Grade: 142, Dimension: 118, Specification: 96, UOM: 54, Pressure: 42 };
    conflictList.forEach((c) => {
      if (counts[c.conflictType] !== undefined) {
        counts[c.conflictType] += 1;
      }
    });
    return Object.entries(counts).map(([label, count]) => ({ label, count }));
  }, [conflictList]);

  // Handle Action Decisions
  const handleResolveAction = (conflictId, newStatus, message) => {
    setConflictList(prev =>
      prev.map(item => item.id === conflictId ? { ...item, status: newStatus } : item)
    );
    setSelectedConflict(null);
    setActionFeedback(message);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedPriority('All');
    setSelectedCpse('All');
    setSelectedStatus('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-3 sm:p-4 md:p-5 space-y-4 font-sans">
      
      {/* Action Notification Banner */}
      {actionFeedback && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4" />
          {actionFeedback}
        </div>
      )}

      {/* Header - Compact Spacing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">CONFLICTS</h1>
          <p className="text-xs text-slate-500">
            Identify material differences that may prevent safe harmonization.
          </p>
        </div>
        {(searchQuery || selectedType !== 'All' || selectedPriority !== 'All' || selectedCpse !== 'All' || selectedStatus !== 'All') && (
          <button
            onClick={handleResetFilters}
            className="self-start sm:self-auto text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-200/60 px-2 py-1 rounded"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Compact Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
        <div className="relative md:col-span-1">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">Conflict Type: All</option>
          <option value="Material">Material</option>
          <option value="Dimension">Dimension</option>
          <option value="Pressure">Pressure</option>
          <option value="Specification">Specification</option>
          <option value="Grade">Grade</option>
          <option value="UOM">UOM</option>
        </select>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">Severity: All</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
        </select>

        <select
          value={selectedCpse}
          onChange={(e) => setSelectedCpse(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">CPSE: All</option>
          <option value="BHEL">BHEL</option>
          <option value="NTPC">NTPC</option>
          <option value="ONGC">ONGC</option>
          <option value="IOCL">IOCL</option>
          <option value="GAIL">GAIL</option>
          <option value="SAIL">SAIL</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-2.5 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="All">Status: All</option>
          <option value="Open">Open</option>
          <option value="Under Review">Under Review</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Overview Cards - Compact Compact Grid */}
      <div>
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-white p-3 rounded-lg border-t-2 ${stat.border} shadow-sm border-x border-b border-slate-200`}
            >
              <p className="text-[11px] font-medium text-slate-500">{stat.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${stat.text}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Conflict List Table - Spans 3 columns */}
        <div className="lg:col-span-3 space-y-1.5">
          <div className="flex justify-between items-center">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conflict List</h2>
            <span className="text-[11px] text-slate-500">Showing {filteredConflicts.length} item(s)</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Priority</th>
                    <th className="py-2.5 px-3">Material A</th>
                    <th className="py-2.5 px-3">Material B</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Similarity</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredConflicts.map((item) => (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="py-2 px-3">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          item.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-medium text-slate-900">{item.materialA}</td>
                      <td className="py-2 px-3 font-medium text-slate-900">{item.materialB}</td>
                      <td className="py-2 px-3 text-slate-600">{item.conflictType}</td>
                      <td className="py-2 px-3 font-mono font-medium text-slate-800">{item.similarity}</td>
                      <td className="py-2 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          item.status === 'Open' ? 'bg-blue-50 text-blue-700' :
                          item.status === 'Under Review' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <button
                          onClick={() => setSelectedConflict(item)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-medium rounded transition-colors"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredConflicts.length === 0 && (
              <div className="p-6 text-center text-slate-500 text-xs">
                No matching conflicts found for selected filters.
              </div>
            )}
          </div>
        </div>

        {/* Conflict Types Breakdown - Spans 1 column */}
        <div className="space-y-1.5">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conflict Types Breakdown</h2>
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm space-y-2">
            {conflictTypesCount.map((type) => (
              <button
                key={type.label}
                onClick={() => setSelectedType(selectedType === type.label ? 'All' : type.label)}
                className={`w-full flex items-center justify-between text-xs py-1 px-2 rounded transition-colors ${
                  selectedType === type.label ? 'bg-indigo-50 text-indigo-900 font-semibold' : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span>{type.label}</span>
                <span className="font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[10px]">
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Functional Review Modal / Drawer */}
      {selectedConflict && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-3 sm:p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Conflict Resolution</h3>
                <p className="text-xs text-slate-500">Review material differences and trigger harmonization rules.</p>
              </div>
              <button 
                onClick={() => setSelectedConflict(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Material A */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Material A</div>
                <div className="text-xs font-bold text-indigo-700">{selectedConflict.detailA.code}</div>
                <div className="text-xs font-bold text-slate-900">{selectedConflict.detailA.description}</div>
                
                <div className="pt-1.5 text-[11px] space-y-1 text-slate-600 border-t border-slate-200">
                  <div><span className="text-slate-400">Material:</span> {selectedConflict.detailA.material}</div>
                  <div><span className="text-slate-400">Diameter:</span> {selectedConflict.detailA.diameter}</div>
                  <div><span className="text-slate-400">Length:</span> {selectedConflict.detailA.length}</div>
                  <div><span className="text-slate-400">UOM:</span> {selectedConflict.detailA.uom}</div>
                </div>
              </div>

              {/* Material B */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Material B</div>
                <div className="text-xs font-bold text-indigo-700">{selectedConflict.detailB.code}</div>
                <div className="text-xs font-bold text-slate-900">{selectedConflict.detailB.description}</div>
                
                <div className="pt-1.5 text-[11px] space-y-1 text-slate-600 border-t border-slate-200">
                  <div><span className="text-slate-400">Material:</span> {selectedConflict.detailB.material}</div>
                  <div><span className="text-slate-400">Diameter:</span> {selectedConflict.detailB.diameter}</div>
                  <div><span className="text-slate-400">Length:</span> {selectedConflict.detailB.length}</div>
                  <div><span className="text-slate-400">UOM:</span> {selectedConflict.detailB.uom}</div>
                </div>
              </div>
            </div>

            {/* AI Conflict Analysis Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                AI Conflict Analysis
              </h4>

              <div className="grid grid-cols-3 gap-1 text-center bg-white p-2 rounded border border-amber-100 text-[11px] font-medium text-slate-700">
                <div>Description: <span className="font-bold text-slate-900">{selectedConflict.analysis.descSimilarity}</span></div>
                <div>Attribute: <span className="font-bold text-slate-900">{selectedConflict.analysis.attrMatch}</span></div>
                <div>Spec: <span className="font-bold text-slate-900">{selectedConflict.analysis.specMatch}</span></div>
              </div>

              <div className="text-xs text-amber-900">
                <span className="font-bold">Critical Difference:</span> {selectedConflict.analysis.criticalDifference}
              </div>

              <div className="text-xs text-amber-900">
                <span className="font-bold">Recommendation:</span> {selectedConflict.analysis.recommendation}
              </div>
            </div>

            {/* Action Tabs / Buttons */}
            <div className="flex flex-wrap gap-2 pt-2 justify-end border-t border-slate-100">
              <button
                onClick={() => handleResolveAction(selectedConflict.id, 'Resolved', 'Match approved and standardized.')}
                className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Approve Match
              </button>
              
              <button
                onClick={() => handleResolveAction(selectedConflict.id, 'Resolved', 'Records set to stay separate.')}
                className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                Keep Separate
              </button>

              <button
                onClick={() => handleResolveAction(selectedConflict.id, 'Resolved', 'New unified standard item created.')}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-500 transition-colors flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Create New Standard
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
} 