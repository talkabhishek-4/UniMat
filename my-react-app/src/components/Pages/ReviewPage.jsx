import React, { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  AlertTriangle, 
  Cpu, 
  Search, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Plus
} from "lucide-react";

export default function ReviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [confidenceFilter, setConfidenceFilter] = useState("all"); // 'all', 'high', 'medium', 'low'

  // Mock Review Queue Data mapping directly to your workflow
  const [queueItems, setQueueItems] = useState([
    {
      id: "REV-101",
      inputMaterial: "316L SS Rod 25mm x 1000mm",
      rawSource: "ERP System A (Vendor X)",
      candidateMatch: "Stainless Steel Bar 316L - 25mm Dia",
      standardId: "STD-MAT-8840",
      confidenceScore: 88, // %
      conflictFlags: ["Minor dimensional formatting discrepancy"],
      status: "Pending Review",
    },
    {
      id: "REV-102",
      inputMaterial: "Polyethylene High Density Sheet 10mm White",
      rawSource: "API Stream B",
      candidateMatch: "HDPE Sheet Grade 500 - Natural 10mm",
      standardId: "STD-MAT-2031",
      confidenceScore: 62,
      conflictFlags: ["Color specification mismatch (White vs Natural)", "Grade unverified"],
      status: "Pending Review",
    },
    {
      id: "REV-103",
      inputMaterial: "Custom Titanium Alloy Spacer Spec-09",
      rawSource: "Manual Upload (Batch #44)",
      candidateMatch: "Titanium Gr. 5 Spacer Ring",
      standardId: "STD-MAT-9012",
      confidenceScore: 35,
      conflictFlags: ["Low semantic similarity score", "No exact standard alloy match in database"],
      status: "Pending Review",
    },
    {
      id: "REV-104",
      inputMaterial: "Brass Hex Bar CZ121 1/2 Inch",
      rawSource: "ERP System A",
      candidateMatch: "Brass Free Cutting Hexagon Rod CZ121 - 12.7mm",
      standardId: "STD-MAT-4055",
      confidenceScore: 94,
      conflictFlags: [],
      status: "Pending Review",
    },
  ]);

  // Action Handlers for Material Expert
  const handleApprove = (id) => {
    setQueueItems((prev) => prev.filter((item) => item.id !== id));
    // Toast or feedback state can be added here
  };

  const handleReject = (id) => {
    setQueueItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreateNewId = (item) => {
    alert(`Initiated creation of new Standard Material Master for: "${item.inputMaterial}"`);
    setQueueItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const filteredItems = queueItems.filter((item) => {
    const matchesSearch = 
      item.inputMaterial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.candidateMatch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (confidenceFilter === "high") return matchesSearch && item.confidenceScore >= 80;
    if (confidenceFilter === "medium") return matchesSearch && item.confidenceScore >= 50 && item.confidenceScore < 80;
    if (confidenceFilter === "low") return matchesSearch && item.confidenceScore < 50;

    return matchesSearch;
  });

  const getConfidenceBadge = (score) => {
    if (score >= 80) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          {score}% High Confidence
        </span>
      );
    } else if (score >= 50) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          {score}% Medium Confidence
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        {score}% Conflict Detected
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Review Queue</h1>
          <p className="text-sm text-slate-500 mt-1">
            Material Expert verification workstation for AI candidate matches and conflict checks.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-600 px-2 font-medium">Items in Queue:</span>
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            {queueItems.length}
          </span>
        </div>
      </div>

      {/* Visual Workflow Tracker */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hidden md:block">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2 text-slate-800">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>1. AI Matching</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="flex items-center gap-2 text-slate-800">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>2. Candidate Match</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="flex items-center gap-2 text-slate-800">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>3. Conflict Check</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-md border border-blue-200">
            <span>4. Review Queue (Active)</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="flex items-center gap-2 text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>5. Standard Master</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setConfidenceFilter("all")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              confidenceFilter === "all"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setConfidenceFilter("high")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              confidenceFilter === "high"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            High Confidence
          </button>
          <button
            onClick={() => setConfidenceFilter("medium")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              confidenceFilter === "medium"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Medium Confidence
          </button>
          <button
            onClick={() => setConfidenceFilter("low")}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
              confidenceFilter === "low"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Conflicts / Low
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search input or candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Review Queue Cards */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all space-y-4"
          >
            {/* Top Bar of Item */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {item.id}
                </span>
                <span className="text-xs text-slate-400">Source: {item.rawSource}</span>
              </div>
              <div>{getConfidenceBadge(item.confidenceScore)}</div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200/60">
              {/* Input Material */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Raw Input Material
                </span>
                <p className="text-sm font-semibold text-slate-900">{item.inputMaterial}</p>
              </div>

              {/* Candidate Match */}
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    AI Suggested Match
                  </span>
                  <span className="text-xs font-mono font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {item.standardId}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{item.candidateMatch}</p>
              </div>
            </div>

            {/* Conflict / Risk Details */}
            {item.conflictFlags.length > 0 && (
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Conflict / Risk Flagged by System:</span>
                </div>
                <ul className="list-disc list-inside text-xs text-amber-700 space-y-0.5 pl-1">
                  {item.conflictFlags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Material Expert Action Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 italic">
                Role Required: <strong>Material Expert</strong>
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {/* Reject Button */}
                <button
                  onClick={() => handleReject(item.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject Match
                </button>

                {/* Create New ID Button */}
                <button
                  onClick={() => handleCreateNewId(item)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create New ID
                </button>

                {/* Approve Button */}
                <button
                  onClick={() => handleApprove(item.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve to Master
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">Queue is Clear</h3>
            <p className="text-xs text-slate-500 mt-1">
              No items require manual expert review based on current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}