import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Filter,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ArrowUpDown,
  Building2,
  Layers,
  Sparkles,
  History,
  Send,
  ExternalLink,
  ShieldCheck,
  Check,
  RefreshCw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from "lucide-react";

// Mock Data Source for Standard Materials
const SAMPLE_STANDARD_MATERIALS = [
  {
    id: "STM-000184",
    name: "Stainless Steel Hex Bolt M10 × 50 mm",
    category: "Fasteners",
    materialType: "Bolt",
    material: "Stainless Steel",
    grade: "SS304",
    spec: "M10 × 50 mm",
    diameter: "10 mm",
    length: "50 mm",
    uom: "PCS",
    cpseCount: 6,
    confidence: 98,
    status: "Verified",
    verifiedBy: "Material Expert",
    verifiedOn: "28 Sep 2026",
    verificationMethod: "AI Match + Human Review",
    createdOn: "24 Sep 2026",
    lastUpdated: "28 Sep 2026",
    matchingMethod: "Hybrid AI Matching",
    cpseMappings: [
      { cpse: "BHEL", code: "BHL1023", description: "SS HEX BOLT M10 X 50", source: "BHEL Procurement", confidence: 99, status: "Verified" },
      { cpse: "NTPC", code: "NTP5567", description: "STAINLESS STEEL HEX BOLT 10MM X 50MM", source: "NTPC Procurement", confidence: 98, status: "Verified" },
      { cpse: "ONGC", code: "ONGC-8841", description: "SS HEXAGONAL BOLT M10×50", source: "ONGC Procurement", confidence: 97, status: "Verified" },
      { cpse: "IOCL", code: "IOC-19283", description: "HEX BOLT SS304 M10 50MM", source: "IOCL Procurement", confidence: 98, status: "Verified" },
      { cpse: "GAIL", code: "GAIL-7721", description: "SS BOLT M10 X 50", source: "GAIL Procurement", confidence: 97, status: "Verified" },
      { cpse: "SAIL", code: "SAIL-10291", description: "SS304 HEX BOLT 10X50", source: "SAIL Procurement", confidence: 96, status: "Verified" }
    ],
    harmonizationFactors: [
      { label: "Same material", value: "Stainless Steel" },
      { label: "Same grade", value: "SS304" },
      { label: "Same diameter", value: "10 mm" },
      { label: "Same length", value: "50 mm" },
      { label: "Same UOM", value: "PCS" },
      { label: "Same category", value: "Fastener" }
    ],
    history: [
      { date: "28 Sep 2026", actor: "Material Expert", action: "Approved Standard Material" },
      { date: "27 Sep 2026", actor: "AI Matching Engine", action: "Created Standard Candidate" },
      { date: "26 Sep 2026", actor: "Data Import", action: "6 CPSE records detected" }
    ]
  },
  {
    id: "STM-000185",
    name: "Carbon Steel Pipe 2 inch",
    category: "Pipes",
    materialType: "Pipe",
    material: "Carbon Steel",
    grade: "ASTM A106 Gr B",
    spec: '2" SCH 40',
    diameter: '2"',
    length: "6 Mtr",
    uom: "MTR",
    cpseCount: 4,
    confidence: 96,
    status: "Verified",
    verifiedBy: "Senior Metallurgist",
    verifiedOn: "27 Sep 2026",
    verificationMethod: "AI Match + Human Review",
    createdOn: "23 Sep 2026",
    lastUpdated: "27 Sep 2026",
    matchingMethod: "Hybrid AI Matching",
    cpseMappings: [
      { cpse: "BHEL", code: "BHL-P8821", description: "CS PIPE 2 INCH SCH 40", source: "BHEL Procurement", confidence: 97, status: "Verified" },
      { cpse: "NTPC", code: "NTP-P3301", description: "CARBON STEEL PIPE 2 INCH", source: "NTPC Procurement", confidence: 96, status: "Verified" },
      { cpse: "IOCL", code: "IOC-P4402", description: "PIPE CS 2 INCH A106", source: "IOCL Procurement", confidence: 96, status: "Verified" },
      { cpse: "GAIL", code: "GAIL-P901", description: "CARBON STEEL PIPE 2 INCH ASTM", source: "GAIL Procurement", confidence: 95, status: "Verified" }
    ],
    harmonizationFactors: [
      { label: "Same material", value: "Carbon Steel" },
      { label: "Same grade", value: "ASTM A106 Gr B" },
      { label: "Same size", value: '2" Nominal Bore' },
      { label: "Same UOM", value: "MTR" },
      { label: "Same category", value: "Pipes" }
    ],
    history: [
      { date: "27 Sep 2026", actor: "Senior Metallurgist", action: "Approved Standard Material" },
      { date: "25 Sep 2026", actor: "AI Matching Engine", action: "Created Standard Candidate" }
    ]
  },
  {
    id: "STM-000186",
    name: "Deep Groove Ball Bearing 6205",
    category: "Bearings",
    materialType: "Bearing",
    material: "Chrome Steel",
    grade: "SAE 52100",
    spec: "25 × 52 × 15 mm",
    diameter: "25 mm ID",
    length: "15 mm Width",
    uom: "PCS",
    cpseCount: 5,
    confidence: 94,
    status: "Verified",
    verifiedBy: "Procurement Lead",
    verifiedOn: "26 Sep 2026",
    verificationMethod: "AI Match + Human Review",
    createdOn: "22 Sep 2026",
    lastUpdated: "26 Sep 2026",
    matchingMethod: "Hybrid AI Matching",
    cpseMappings: [
      { cpse: "BHEL", code: "BHL-BRG6205", description: "BEARING DEEP GROOVE 6205", source: "BHEL Procurement", confidence: 95, status: "Verified" },
      { cpse: "ONGC", code: "ONGC-BRG10", description: "BALL BEARING 6205 25MM", source: "ONGC Procurement", confidence: 94, status: "Verified" },
      { cpse: "SAIL", code: "SAIL-B6205", description: "BEARING 6205 C3", source: "SAIL Procurement", confidence: 94, status: "Verified" },
      { cpse: "IOCL", code: "IOC-BRG882", description: "DEEP GROOVE BALL BEARING 6205", source: "IOCL Procurement", confidence: 93, status: "Verified" },
      { cpse: "NTPC", code: "NTP-B9921", description: "BEARING BALL 6205 Z", source: "NTPC Procurement", confidence: 94, status: "Verified" }
    ],
    harmonizationFactors: [
      { label: "Same type", value: "Deep Groove Ball Bearing" },
      { label: "Same series", value: "6205" },
      { label: "Same dimensions", value: "25x52x15 mm" },
      { label: "Same UOM", value: "PCS" }
    ],
    history: [
      { date: "26 Sep 2026", actor: "Procurement Lead", action: "Approved Standard Material" },
      { date: "24 Sep 2026", actor: "AI Matching Engine", action: "Created Standard Candidate" }
    ]
  },
  {
    id: "STM-000187",
    name: "Industrial Pressure Gauge 0–10 Bar",
    category: "Instrumentation",
    materialType: "Gauge",
    material: "Stainless Steel Case",
    grade: "—",
    spec: "0–10 Bar / 1/2 in NPT",
    diameter: "100 mm Dial",
    length: "—",
    uom: "PCS",
    cpseCount: 3,
    confidence: 91,
    status: "Pending Review",
    verifiedBy: "—",
    verifiedOn: "—",
    verificationMethod: "Awaiting Expert Review",
    createdOn: "27 Sep 2026",
    lastUpdated: "27 Sep 2026",
    matchingMethod: "Hybrid AI Matching",
    cpseMappings: [
      { cpse: "ONGC", code: "ONGC-PG010", description: "PRESSURE GAUGE 0-10 BAR 1/2 NPT", source: "ONGC Procurement", confidence: 92, status: "Pending" },
      { cpse: "IOCL", code: "IOC-PG100", description: "IND PRESSURE GAUGE 0 TO 10 BAR", source: "IOCL Procurement", confidence: 91, status: "Pending" },
      { cpse: "GAIL", code: "GAIL-PG55", description: "GAUGE PRESSURE 0-10 BAR BOTTOM CONN", source: "GAIL Procurement", confidence: 90, status: "Pending" }
    ],
    harmonizationFactors: [
      { label: "Same range", value: "0 - 10 Bar" },
      { label: "Same connection", value: "1/2 inch NPT" },
      { label: "Same Dial", value: "100 mm" }
    ],
    history: [
      { date: "27 Sep 2026", actor: "AI Matching Engine", action: "Created Standard Candidate" }
    ]
  },
  {
    id: "STM-000188",
    name: "Gate Valve 4 inch Class 150",
    category: "Valves",
    materialType: "Valve",
    material: "Carbon Steel",
    grade: "WCB",
    spec: '4" Class 150 Flanged',
    diameter: '4"',
    length: "—",
    uom: "PCS",
    cpseCount: 4,
    confidence: 97,
    status: "Verified",
    verifiedBy: "Valve Specialist",
    verifiedOn: "25 Sep 2026",
    verificationMethod: "AI Match + Human Review",
    createdOn: "21 Sep 2026",
    lastUpdated: "25 Sep 2026",
    matchingMethod: "Hybrid AI Matching",
    cpseMappings: [
      { cpse: "BHEL", code: "BHL-VLV4150", description: "GATE VALVE 4 INCH CLASS 150", source: "BHEL Procurement", confidence: 98, status: "Verified" },
      { cpse: "ONGC", code: "ONGC-GV150", description: "VALVE GATE CS 4IN CL150", source: "ONGC Procurement", confidence: 97, status: "Verified" },
      { cpse: "IOCL", code: "IOC-VLV9012", description: "GATE VALVE CS 4 INCH #150", source: "IOCL Procurement", confidence: 97, status: "Verified" },
      { cpse: "GAIL", code: "GAIL-GV04", description: "CS GATE VALVE 4 INCH CLASS 150 RF", source: "GAIL Procurement", confidence: 96, status: "Verified" }
    ],
    harmonizationFactors: [
      { label: "Same valve type", value: "Gate Valve" },
      { label: "Same material", value: "Cast Carbon Steel (WCB)" },
      { label: "Same rating", value: "Class 150" },
      { label: "Same size", value: '4"' }
    ],
    history: [
      { date: "25 Sep 2026", actor: "Valve Specialist", action: "Approved Standard Material" },
      { date: "21 Sep 2026", actor: "AI Matching Engine", action: "Created Standard Candidate" }
    ]
  }
];

export default function StandardMaterialsPage() {
  const [data, setData] = useState(SAMPLE_STANDARD_MATERIALS);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [cpseFilter, setCpseFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [confidenceFilter, setConfidenceFilter] = useState("ALL");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  
  // Toast notifications state
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter & Search Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === "ALL" || item.category === categoryFilter;
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

      const matchesCPSE =
        cpseFilter === "ALL" ||
        item.cpseMappings.some((m) => m.cpse === cpseFilter);

      const matchesConfidence =
        confidenceFilter === "ALL" ||
        (confidenceFilter === "95+" && item.confidence >= 95) ||
        (confidenceFilter === "90-94" && item.confidence >= 90 && item.confidence < 95) ||
        (confidenceFilter === "<90" && item.confidence < 90);

      return matchesSearch && matchesCategory && matchesStatus && matchesCPSE && matchesConfidence;
    });
  }, [data, searchQuery, categoryFilter, cpseFilter, statusFilter, confidenceFilter]);

  // Sorting Logic
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  // Export CSV Action
  const handleExportCSV = () => {
    const headers = ["Standard ID", "Standard Material", "Category", "Grade", "UOM", "CPSE Count", "Confidence %", "Status"];
    const csvRows = [
      headers.join(","),
      ...sortedData.map(item => [
        `"${item.id}"`,
        `"${item.name}"`,
        `"${item.category}"`,
        `"${item.grade}"`,
        `"${item.uom}"`,
        item.cpseCount,
        `${item.confidence}%`,
        `"${item.status}"`
      ].join(","))
    ];
    
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MatAlign_Standard_Materials_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    triggerToast("Exported standard materials list as CSV");
  };

  // Handle Review Queue Action
  const handleSendToReview = (materialId) => {
    setData(prev => prev.map(item => {
      if (item.id === materialId) {
        return {
          ...item,
          status: "Pending Review",
          history: [
            { date: "Today", actor: "CPSE Data Admin", action: "Sent to Review Queue" },
            ...item.history
          ]
        };
      }
      return item;
    }));
    
    if (selectedMaterial && selectedMaterial.id === materialId) {
      setSelectedMaterial(prev => ({
        ...prev,
        status: "Pending Review",
        history: [
          { date: "Today", actor: "CPSE Data Admin", action: "Sent to Review Queue" },
          ...prev.history
        ]
      }));
    }
    triggerToast(`Sent ${materialId} to Review Queue`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2.5 rounded-lg shadow-lg border bg-slate-900 border-slate-800 text-white text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main View vs Detail View Handler */}
      {!selectedMaterial ? (
        <>
          {/* PAGE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <span>Materials</span>
                <span>/</span>
                <span className="text-slate-600">Standard Materials</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Standard Materials
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-[11px] border border-slate-200">
                  {filteredData.length.toLocaleString()} Standard Materials
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Unified material identities created by harmonizing equivalent materials across CPSEs.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* CONCEPT BREADCRUMB INDICATOR */}
          <div className="bg-slate-50 rounded-lg border border-slate-200/80 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="font-semibold text-slate-900">Harmonization Logic:</span>
              <span className="hidden md:inline text-slate-500">Multiple CPSE Material Codes</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">BHEL</span>
              <span className="text-slate-400">•</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">NTPC</span>
              <span className="text-slate-400">•</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">ONGC</span>
              <span className="text-slate-400">•</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">IOCL</span>
              <span className="text-slate-400">•</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">GAIL</span>
              <span className="text-slate-400">•</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium">SAIL</span>
              <span className="text-indigo-600 font-bold ml-1">➔ ONE Standard Material</span>
            </div>
          </div>

          {/* SEARCH AND FILTERS */}
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Standard ID, material name or specification..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Fasteners">Fasteners</option>
                  <option value="Pipes">Pipes</option>
                  <option value="Bearings">Bearings</option>
                  <option value="Instrumentation">Instrumentation</option>
                  <option value="Valves">Valves</option>
                </select>

                <select
                  value={cpseFilter}
                  onChange={(e) => setCpseFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="ALL">All CPSEs</option>
                  <option value="BHEL">BHEL</option>
                  <option value="NTPC">NTPC</option>
                  <option value="ONGC">ONGC</option>
                  <option value="IOCL">IOCL</option>
                  <option value="GAIL">GAIL</option>
                  <option value="SAIL">SAIL</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="ALL">All Status</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending Review">Pending Review</option>
                </select>

                <select
                  value={confidenceFilter}
                  onChange={(e) => setConfidenceFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="ALL">All Confidence</option>
                  <option value="95+">≥ 95% Confidence</option>
                  <option value="90-94">90% - 94%</option>
                  <option value="<90">&lt; 90%</option>
                </select>
              </div>
            </div>
          </div>

          {/* STANDARD MATERIAL TABLE (Desktop/Tablet) */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none">
                    <th
                      className="p-3 pl-4 cursor-pointer hover:bg-slate-100/60"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center gap-1">
                        <span>STANDARD ID</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-100/60"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        <span>STANDARD MATERIAL</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">MATERIAL / GRADE</th>
                    <th className="p-3">UOM</th>
                    <th className="p-3 text-center">CPSE CODES</th>
                    <th
                      className="p-3 cursor-pointer hover:bg-slate-100/60"
                      onClick={() => handleSort("confidence")}
                    >
                      <div className="flex items-center gap-1">
                        <span>CONFIDENCE</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 pr-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {sortedData.length > 0 ? (
                    sortedData.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedMaterial(item)}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      >
                        <td className="p-3 pl-4 font-mono font-bold text-indigo-600">
                          {item.id}
                        </td>
                        <td className="p-3 font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {item.name}
                        </td>
                        <td className="p-3 text-slate-600">{item.category}</td>
                        <td className="p-3 font-mono text-slate-600">
                          {item.grade !== "—" ? item.grade : item.material}
                        </td>
                        <td className="p-3 font-mono text-slate-500">{item.uom}</td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {item.cpseCount}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-900">{item.confidence}%</span>
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  item.confidence >= 95
                                    ? "bg-emerald-500"
                                    : item.confidence >= 90
                                    ? "bg-indigo-500"
                                    : "bg-amber-500"
                                }`}
                                style={{ width: `${item.confidence}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          {item.status === "Verified" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              <AlertTriangle className="w-3 h-3 text-amber-500" />
                              Pending Review
                            </span>
                          )}
                        </td>
                        <td className="p-3 pr-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMaterial(item);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 shadow-2xs transition-colors"
                          >
                            <span>View</span>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-500">
                        No standard materials match your current filter parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-3 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {sortedData.length} of {data.length} entries</span>
              <div className="flex items-center gap-1">
                <button disabled className="p-1 rounded border border-slate-200 text-slate-400 bg-white opacity-50 cursor-not-allowed">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 py-1 font-semibold text-slate-700">1</span>
                <button disabled className="p-1 rounded border border-slate-200 text-slate-400 bg-white opacity-50 cursor-not-allowed">
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* COMPACT MATERIAL CARDS (Mobile Responsive View) */}
          <div className="block md:hidden space-y-3">
            {sortedData.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMaterial(item)}
                className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3 active:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-indigo-600 text-xs">{item.id}</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{item.name}</h3>
                  </div>
                  {item.status === "Verified" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      Pending
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-100 py-2">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Category</span>
                    <span className="text-slate-700 font-medium">{item.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Grade / Spec</span>
                    <span className="text-slate-700 font-mono">{item.grade !== "—" ? item.grade : item.spec}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Mapped CPSEs</span>
                    <span className="text-indigo-600 font-bold">{item.cpseCount} Codes</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Confidence</span>
                    <span className="text-slate-900 font-bold">{item.confidence}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 font-mono text-[11px]">UOM: {item.uom}</span>
                  <span className="text-indigo-600 font-semibold flex items-center gap-1">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* STANDARD MATERIAL DETAIL VIEW */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header & Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Standard Materials</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                  {selectedMaterial.id}
                </span>
                {selectedMaterial.status === "Verified" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Pending Verification
                  </span>
                )}
                <span className="text-xs font-bold text-slate-500">
                  {selectedMaterial.confidence}% Confidence
                </span>
              </div>

              <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
                {selectedMaterial.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                Export Master Entry
              </button>
            </div>
          </div>

          {/* TWO COLUMN LAYOUT: Technical Info & Verification */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* TECHNICAL SPECIFICATIONS (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Material Information Box */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4 space-y-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Standard Material Information
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard ID</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedMaterial.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                    <span className="font-semibold text-slate-900">{selectedMaterial.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Material Type</span>
                    <span className="font-semibold text-slate-900">{selectedMaterial.materialType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Material</span>
                    <span className="font-semibold text-slate-900">{selectedMaterial.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Grade</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedMaterial.grade}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Diameter / Size</span>
                    <span className="font-semibold text-slate-900">{selectedMaterial.diameter}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Length</span>
                    <span className="font-semibold text-slate-900">{selectedMaterial.length}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">UOM</span>
                    <span className="font-mono font-semibold text-slate-900">{selectedMaterial.uom}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Specification</span>
                    <span className="font-mono text-slate-800">{selectedMaterial.spec}</span>
                  </div>
                </div>
              </div>

              {/* CPSE MATERIAL MAPPING TABLE (Primary Focus) */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="text-sm font-bold text-slate-900">CPSE Material Mapping</h2>
                  <p className="text-xs text-slate-500">
                    Equivalent material codes mapped to this Standard Material from individual CPSE datasets.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="p-3 pl-4">CPSE</th>
                        <th className="p-3">MATERIAL CODE</th>
                        <th className="p-3">ORIGINAL DESCRIPTION</th>
                        <th className="p-3">SOURCE</th>
                        <th className="p-3">CONFIDENCE</th>
                        <th className="p-3 pr-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedMaterial.cpseMappings.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-3 pl-4">
                            <span className="font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-mono">
                              {m.cpse}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-semibold text-indigo-600">
                            {m.code}
                          </td>
                          <td className="p-3 font-mono text-slate-800 max-w-xs truncate">
                            {m.description}
                          </td>
                          <td className="p-3 text-slate-500">{m.source}</td>
                          <td className="p-3 font-semibold text-slate-900">{m.confidence}%</td>
                          <td className="p-3 pr-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AI HARMONIZATION EXPLANATION */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Why These Materials Were Harmonized</h2>
                    <p className="text-xs text-slate-500">
                      Automated match rationale generated by MatAlign's ML engine.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">AI Confidence</span>
                    <span className="text-base font-extrabold text-indigo-600">{selectedMaterial.confidence}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {selectedMaterial.harmonizationFactors.map((factor, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-md border border-slate-200/80 text-xs">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                        <Check className="w-3 h-3 text-emerald-600" /> {factor.label}
                      </span>
                      <span className="font-medium text-slate-900 block mt-0.5 pl-4">{factor.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Matching Method: <strong className="text-slate-800">{selectedMaterial.matchingMethod}</strong></span>
                  <span className="font-mono text-[11px] text-slate-400">Semantic + Attribute + Specification</span>
                </div>
              </div>
            </div>

            {/* SIDE PANEL: Traceability, Verification & History (1 col) */}
            <div className="space-y-6">
              {/* VERIFICATION PANEL */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4 space-y-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Verification Status
                </h2>

                {selectedMaterial.status === "Verified" ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>● Verified Material Master</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[11px] text-emerald-800 pt-1">
                        <div>Verified By: <strong>{selectedMaterial.verifiedBy}</strong></div>
                        <div>Verified On: <strong>{selectedMaterial.verifiedOn}</strong></div>
                        <div>Method: <strong>{selectedMaterial.verificationMethod}</strong></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>⚠ Pending Verification</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        This standard material was automatically generated but has not yet been approved by a material expert.
                      </p>
                    </div>

                    <button
                      onClick={() => handleSendToReview(selectedMaterial.id)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to Review Queue</span>
                    </button>
                  </div>
                )}
              </div>

              {/* TRACEABILITY */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4 space-y-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Traceability Tree
                </h2>

                <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-xs space-y-1 overflow-x-auto">
                  <div className="text-indigo-400 font-bold">{selectedMaterial.id}</div>
                  <div className="pl-2 border-l border-slate-700 space-y-1 mt-1 text-[11px]">
                    {selectedMaterial.cpseMappings.map((m, idx) => (
                      <div key={idx} className="text-slate-300">
                        ├── <span className="text-amber-400">{m.cpse}</span> ➔ {m.code}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
                  <div className="flex justify-between text-slate-500">
                    <span>Source Datasets:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedMaterial.cpseMappings.map(m => m.cpse).join(" / ")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Created:</span>
                    <span className="font-semibold text-slate-800">{selectedMaterial.createdOn}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Last Updated:</span>
                    <span className="font-semibold text-slate-800">{selectedMaterial.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* REVIEW HISTORY TIMELINE */}
              <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4 space-y-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-slate-400" />
                  <span>Review History</span>
                </h2>

                <div className="space-y-3 pl-2 border-l-2 border-slate-100">
                  {selectedMaterial.history.map((h, idx) => (
                    <div key={idx} className="relative pl-3 text-xs space-y-0.5">
                      <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white" />
                      <div className="text-[10px] text-slate-400 font-semibold">{h.date}</div>
                      <div className="font-semibold text-slate-900">{h.action}</div>
                      <div className="text-[11px] text-slate-500">{h.actor}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}