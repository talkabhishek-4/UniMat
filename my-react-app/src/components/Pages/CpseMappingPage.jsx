import React, { useState } from "react";
import {
  Download,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Link2
} from "lucide-react";

export default function CpseMappingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCpse, setSelectedCpse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [minConfidence, setMinConfidence] = useState(0);
  const [selectedMapping, setSelectedMapping] = useState(null);

  // Mock CPSE Mapping Dataset
  const [mappingData, setMappingData] = useState([
    {
      id: "MAP-001",
      cpse: "BHEL",
      code: "BHL1023",
      description: "SS HEX BOLT M10 X 50",
      category: "Fasteners",
      standardId: "STM-000184",
      standardName: "Stainless Steel Hex Bolt M10 × 50",
      confidence: 98,
      status: "Mapped",
      mappedDate: "2026-03-15",
      mappedBy: "AI Engine (Auto-Approved)",
      equivalentCodes: [
        { cpse: "NTPC", code: "NTP5567" },
        { cpse: "ONGC", code: "ONGC8841" },
        { cpse: "IOCL", code: "IOC19283" }
      ]
    },
    {
      id: "MAP-002",
      cpse: "NTPC",
      code: "NTP5567",
      description: "SS BOLT 10MM X 50",
      category: "Fasteners",
      standardId: "STM-000184",
      standardName: "Stainless Steel Hex Bolt M10 × 50",
      confidence: 97,
      status: "Mapped",
      mappedDate: "2026-03-15",
      mappedBy: "AI Engine (Auto-Approved)",
      equivalentCodes: [
        { cpse: "BHEL", code: "BHL1023" },
        { cpse: "ONGC", code: "ONGC8841" },
        { cpse: "IOCL", code: "IOC19283" }
      ]
    },
    {
      id: "MAP-003",
      cpse: "ONGC",
      code: "ONGC8841",
      description: "MS HEX BOLT M10 X 50",
      category: "Fasteners",
      standardId: "STM-000184",
      standardName: "Stainless Steel Hex Bolt M10 × 50",
      confidence: 96,
      status: "Pending Review",
      mappedDate: "-",
      mappedBy: "Pending Verification",
      equivalentCodes: [
        { cpse: "BHEL", code: "BHL1023" },
        { cpse: "NTPC", code: "NTP5567" }
      ]
    },
    {
      id: "MAP-004",
      cpse: "IOCL",
      code: "IOC19283",
      description: "HEX HEAD BOLT SS304 M10X50MM",
      category: "Fasteners",
      standardId: "STM-000184",
      standardName: "Stainless Steel Hex Bolt M10 × 50",
      confidence: 99,
      status: "Mapped",
      mappedDate: "2026-03-18",
      mappedBy: "Rajesh Kumar (Expert)",
      equivalentCodes: [
        { cpse: "BHEL", code: "BHL1023" },
        { cpse: "NTPC", code: "NTP5567" }
      ]
    },
    {
      id: "MAP-005",
      cpse: "GAIL",
      code: "GL-PIPE-882",
      description: "CS PIPE SEAMLESS 2IN SCH40",
      category: "Pipes & Tubes",
      standardId: "STM-000412",
      standardName: "Seamless Carbon Steel Pipe 2 inch Sch 40",
      confidence: 92,
      status: "Mapped",
      mappedDate: "2026-03-10",
      mappedBy: "AI Engine",
      equivalentCodes: [
        { cpse: "ONGC", code: "ONGC-7741" },
        { cpse: "IOCL", code: "IOC-88219" }
      ]
    },
    {
      id: "MAP-006",
      cpse: "HPCL",
      code: "HP-VALVE-01",
      description: "GATE VALVE 4IN 150# RF FLANGED",
      category: "Valves",
      standardId: "Unassigned",
      standardName: "Unmapped Identity",
      confidence: 45,
      status: "Unmapped",
      mappedDate: "-",
      mappedBy: "None",
      equivalentCodes: []
    }
  ]);

  // Filtering Logic
  const filteredData = mappingData.filter((item) => {
    const matchesSearch =
      item.cpse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.standardId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCpse = selectedCpse === "all" || item.cpse === selectedCpse;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesConfidence = item.confidence >= minConfidence;

    return matchesSearch && matchesCpse && matchesCategory && matchesStatus && matchesConfidence;
  });

  const handleExport = () => {
    alert("Exporting CPSE Mapping Master Data as CSV...");
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full flex items-center gap-1">
              <Link2 className="w-3 h-3" /> Step 8 of Workflow
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">CPSE Mapping</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Map CPSE material codes to unified Standard IDs
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-slate-500" />
          Export
        </button>
      </div>

      {/* 2. Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search CPSE, code, description, or Standard ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* CPSE Filter */}
          <select
            value={selectedCpse}
            onChange={(e) => setSelectedCpse(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="all">CPSE: All</option>
            <option value="BHEL">BHEL</option>
            <option value="NTPC">NTPC</option>
            <option value="ONGC">ONGC</option>
            <option value="IOCL">IOCL</option>
            <option value="GAIL">GAIL</option>
            <option value="HPCL">HPCL</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="all">Category: All</option>
            <option value="Fasteners">Fasteners</option>
            <option value="Pipes & Tubes">Pipes & Tubes</option>
            <option value="Valves">Valves</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="all">Status: All</option>
            <option value="Mapped">Mapped</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Unmapped">Unmapped</option>
          </select>

          {/* Confidence Slider */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 border border-slate-200 rounded-lg">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Confidence:</span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
              className="w-16 accent-purple-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-800 w-8">{minConfidence}%+</span>
          </div>
        </div>
      </div>

      {/* 3. Metrics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">12,480</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Mapped
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">9,842</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-amber-600 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Pending
          </p>
          <p className="text-2xl font-bold text-amber-700 mt-1">1,426</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-medium text-rose-600 uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Unmapped
          </p>
          <p className="text-2xl font-bold text-rose-700 mt-1">1,212</p>
        </div>
      </div>

      {/* 4. CPSE Mapping Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            CPSE Mapping Table
          </h2>
          <span className="text-xs text-slate-400">Click any row to open Mapping Detail</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">CPSE</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Standard ID</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedMapping(row)}
                  className="hover:bg-purple-50/40 cursor-pointer transition-colors"
                >
                  {/* CPSE */}
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs">
                      {row.cpse}
                    </span>
                  </td>

                  {/* Code */}
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-slate-800">
                    {row.code}
                  </td>

                  {/* Description */}
                  <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs truncate">
                    {row.description}
                  </td>

                  {/* Standard ID */}
                  <td className="py-3.5 px-4 font-mono text-xs font-bold text-purple-700">
                    {row.standardId}
                  </td>

                  {/* Confidence */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-800">{row.confidence}%</span>
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            row.confidence >= 95
                              ? "bg-emerald-500"
                              : row.confidence >= 80
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${row.confidence}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status Indicator Icon */}
                  <td className="py-3.5 px-4 text-center">
                    {row.status === "Mapped" && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700" title="Mapped">
                        ✓
                      </span>
                    )}
                    {row.status === "Pending Review" && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs" title="Pending Review">
                        ⚠
                      </span>
                    )}
                    {row.status === "Unmapped" && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs" title="Unmapped">
                        ✕
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm font-semibold text-slate-700">No mappings matched your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting search terms or adjusting filters.</p>
          </div>
        )}
      </div>

      {/* 5. Mapping Detail Drawer / Modal (Click row → Mapping Detail) */}
      {selectedMapping && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-end transition-opacity">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider font-mono">
                  Mapping Detail — {selectedMapping.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedMapping.cpse} Code Breakdown
                </h3>
              </div>
              <button
                onClick={() => setSelectedMapping(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* CPSE Source Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  CPSE Material Record
                </span>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-bold rounded text-xs">
                    {selectedMapping.cpse}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">
                    Code: {selectedMapping.code}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">{selectedMapping.description}</p>
                <div className="text-xs text-slate-500 pt-1 border-t border-slate-200/60 flex justify-between">
                  <span>Category: {selectedMapping.category}</span>
                </div>
              </div>

              {/* Mapped Standard Identity Card */}
              <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-200 space-y-2">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Mapped Standard Material
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-purple-700">
                    {selectedMapping.standardId}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {selectedMapping.confidence}% AI Confidence
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">{selectedMapping.standardName}</p>
              </div>

              {/* Mapping Provenance */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider">Audit Metadata</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="text-slate-400">Mapping Status:</span>{" "}
                    <strong className="text-slate-800">{selectedMapping.status}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Approved By:</span>{" "}
                    <strong className="text-slate-800">{selectedMapping.mappedBy}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Mapped Date:</span>{" "}
                    <strong className="text-slate-800">{selectedMapping.mappedDate}</strong>
                  </div>
                </div>
              </div>

              {/* Cross-CPSE Mapped Equivalents */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Other CPSE Codes Mapped to {selectedMapping.standardId}
                </h4>
                {selectedMapping.equivalentCodes.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMapping.equivalentCodes.map((eq, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs"
                      >
                        <span className="font-bold text-slate-800">{eq.cpse}</span>
                        <span className="font-mono font-bold text-purple-700">{eq.code}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No other CPSE codes mapped to this standard ID yet.</p>
                )}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedMapping(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}