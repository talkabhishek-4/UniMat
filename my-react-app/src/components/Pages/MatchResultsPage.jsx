import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Layers,
  Send,
  ExternalLink,
  ShieldCheck,
  Check,
  X
} from "lucide-react";

export default function MatchResultsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minConfidence, setMinConfidence] = useState(0);
  const [expandedMatchId, setExpandedMatchId] = useState("MATCH-001");

  // Mock Match Results AI Engine Output
  const [matches, setMatches] = useState([
    {
      id: "MATCH-001",
      confidence: 98,
      category: "Fasteners",
      suggestedStandardId: "STM-000184",
      suggestedStandardName: "Stainless Steel Hex Bolt M10 × 50",
      materialA: {
        cpse: "BHEL",
        code: "BHL1023",
        description: "SS HEX BOLT M10 X 50",
        uom: "NOS",
        grade: "SS 304",
        dimensions: "M10 x 50mm",
      },
      materialB: {
        cpse: "NTPC",
        code: "NTP5567",
        description: "SS BOLT 10MM X 50",
        uom: "NOS",
        grade: "SS 304",
        dimensions: "10mm x 50mm",
      },
      metrics: {
        semanticSimilarity: 99,
        attributeMatch: 97,
        specificationMatch: 98,
      },
      evidence: [
        { label: "Material Composition", match: true, detail: "Both resolve to Stainless Steel (Grade 304)" },
        { label: "Diameter & Size", match: true, detail: "M10 equals 10mm nominal thread diameter" },
        { label: "Length Parameter", match: true, detail: "Exact match: 50mm length" },
        { label: "Unit of Measurement", match: true, detail: "Both recorded in NOS (Numbers)" },
      ],
      status: "AI Detected",
    },
    {
      id: "MATCH-002",
      confidence: 91,
      category: "Pipes & Tubes",
      suggestedStandardId: "STM-000412",
      suggestedStandardName: "Seamless Carbon Steel Pipe 2 inch Sch 40",
      materialA: {
        cpse: "ONGC",
        code: "ONGC-7741",
        description: "CS PIPE SEAMLESS 2IN SCH40 API 5L",
        uom: "MTR",
        grade: "API 5L Gr B",
        dimensions: "2 inch SCH 40",
      },
      materialB: {
        cpse: "IOCL",
        code: "IOC-88219",
        description: "PIPE CS SEAMLESS 50MM SCH 40",
        uom: "MTR",
        grade: "API 5L",
        dimensions: "50mm SCH 40",
      },
      metrics: {
        semanticSimilarity: 92,
        attributeMatch: 90,
        specificationMatch: 91,
      },
      evidence: [
        { label: "Material Composition", match: true, detail: "Carbon Steel (API 5L Grade standard)" },
        { label: "Nominal Bore", match: true, detail: "2 inch corresponds directly to 50mm NB" },
        { label: "Schedule Class", match: true, detail: "Schedule 40 wall thickness matched" },
        { label: "Unit of Measurement", match: true, detail: "Both recorded in MTR (Meters)" },
      ],
      status: "AI Detected",
    },
    {
      id: "MATCH-003",
      confidence: 84,
      category: "Electrical Switchgear",
      suggestedStandardId: "STM-000955",
      suggestedStandardName: "Molded Case Circuit Breaker 100A 3P 25kA",
      materialA: {
        cpse: "GAIL",
        code: "GL-EL-332",
        description: "MCCB 100A 3 POLE 25KA BREAKER",
        uom: "SET",
        grade: "Class C",
        dimensions: "3 Pole",
      },
      materialB: {
        cpse: "BHEL",
        code: "BHL-9011",
        description: "CIRCUIT BREAKER MCCB 3P 100 AMP",
        uom: "NOS",
        grade: "Unspecified",
        dimensions: "3P",
      },
      metrics: {
        semanticSimilarity: 88,
        attributeMatch: 82,
        specificationMatch: 82,
      },
      evidence: [
        { label: "Device Classification", match: true, detail: "Molded Case Circuit Breaker (MCCB)" },
        { label: "Current Rating", match: true, detail: "100 Ampere capacity match" },
        { label: "Pole Configuration", match: true, detail: "3 Pole / 3P structural match" },
        { label: "UOM Discrepancy", match: false, detail: "SET vs NOS (Requires normalization)" },
      ],
      status: "AI Detected",
    },
  ]);

  const toggleExpand = (id) => {
    setExpandedMatchId(expandedMatchId === id ? null : id);
  };

  const handleSendToReview = (id) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
    alert(`Match ${id} routed to the Review Queue for Material Expert decision.`);
  };

  const handleFlagConflict = (id) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
    alert(`Match ${id} flagged and moved to the Conflicts queue due to material/spec deviation.`);
  };

  const filteredMatches = matches.filter((m) => {
    const matchesSearch =
      m.materialA.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.materialB.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.materialA.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.materialB.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.suggestedStandardId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || m.category === selectedCategory;
    const matchesScore = m.confidence >= minConfidence;

    return matchesSearch && matchesCategory && matchesScore;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Step 5 of Workflow
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Match Results</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            AI-discovered material equivalencies across CPSE datasets with confidence breakdown and evidence.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium">
          <span>Discovered Matches:</span>
          <span className="bg-purple-600 text-white font-bold px-2 py-0.5 rounded-lg">
            {matches.length}
          </span>
        </div>
      </div>

      {/* Summary KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Average AI Confidence</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">91.0%</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Cross-CPSE Duplicates</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">1,482</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <Layers className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Action Required</p>
            <p className="text-xs text-slate-400 mt-1">Route to Review / Conflicts</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            {matches.length} Pending Step
          </span>
        </div>
      </div>

      {/* Search & Filtering Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search CPSE, codes, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            >
              <option value="all">All Categories</option>
              <option value="Fasteners">Fasteners</option>
              <option value="Pipes & Tubes">Pipes & Tubes</option>
              <option value="Electrical Switchgear">Electrical Switchgear</option>
            </select>
          </div>

          {/* Min Confidence Threshold Slider */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 border border-slate-200 rounded-lg">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Min Confidence:</span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
              className="w-20 accent-purple-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-800 w-8">{minConfidence}%</span>
          </div>
        </div>
      </div>

      {/* Match Results List */}
      <div className="space-y-4">
        {filteredMatches.map((item) => {
          const isExpanded = expandedMatchId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-slate-300"
            >
              {/* Card Header Bar */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-4 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 bg-slate-200/70 px-2.5 py-1 rounded-md font-mono">
                    {item.id}
                  </span>
                  <span className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400">Suggested: <strong className="text-purple-700 font-mono">{item.suggestedStandardId}</strong></span>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4">
                  {/* Confidence Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">AI Confidence:</span>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        item.confidence >= 90
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {item.confidence}% Match
                    </span>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Pairwise Material Comparison */}
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                  {/* Pairwise Link Badge */}
                  <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white rounded-full p-2 shadow-md z-10 border-2 border-white">
                    <ArrowRightLeft className="w-4 h-4" />
                  </div>

                  {/* Material A (Source CPSE) */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded border border-blue-200">
                        {item.materialA.cpse}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-500">
                        Code: {item.materialA.code}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 pt-1">{item.materialA.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                      <div><span className="text-slate-400">Grade:</span> {item.materialA.grade}</div>
                      <div><span className="text-slate-400">UOM:</span> {item.materialA.uom}</div>
                      <div><span className="text-slate-400">Dimensions:</span> {item.materialA.dimensions}</div>
                    </div>
                  </div>

                  {/* Material B (Target CPSE) */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                        {item.materialB.cpse}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-500">
                        Code: {item.materialB.code}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 pt-1">{item.materialB.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                      <div><span className="text-slate-400">Grade:</span> {item.materialB.grade}</div>
                      <div><span className="text-slate-400">UOM:</span> {item.materialB.uom}</div>
                      <div><span className="text-slate-400">Dimensions:</span> {item.materialB.dimensions}</div>
                    </div>
                  </div>
                </div>

                {/* Expanded Section: AI Evidence & Vector Similarity Breakdown */}
                {isExpanded && (
                  <div className="space-y-4 pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" /> AI Evidence & Matching Reasoning
                    </h4>

                    {/* Metric Bars */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-600">Semantic Similarity</span>
                          <span className="font-bold text-slate-900">{item.metrics.semanticSimilarity}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-600 h-full" style={{ width: `${item.metrics.semanticSimilarity}%` }} />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-600">Attribute Match</span>
                          <span className="font-bold text-slate-900">{item.metrics.attributeMatch}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: `${item.metrics.attributeMatch}%` }} />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span className="text-slate-600">Specification Match</span>
                          <span className="font-bold text-slate-900">{item.metrics.specificationMatch}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-600 h-full" style={{ width: `${item.metrics.specificationMatch}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Evidence Checklist */}
                    <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-200 space-y-2">
                      <p className="text-xs font-semibold text-slate-700">Verification Checklist:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.evidence.map((ev, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            {ev.match ? (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <span className="font-semibold text-slate-800">{ev.label}:</span>{" "}
                              <span className="text-slate-600">{ev.detail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Workflow Routing Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    Suggested Standard Master: <strong className="text-slate-800">{item.suggestedStandardName}</strong>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Flag Conflict */}
                    <button
                      onClick={() => handleFlagConflict(item.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Flag as Conflict
                    </button>

                    {/* Route to Review Queue */}
                    <button
                      onClick={() => handleSendToReview(item.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send to Review Queue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredMatches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">No Matches Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Adjust your search filters or confidence threshold to display AI matches.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}