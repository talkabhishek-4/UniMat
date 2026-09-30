import React, { useState, useMemo } from 'react';
import {
  Download,
  Filter,
  Calendar,
  Building2,
  FolderTree,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HelpCircle,
  ArrowUpRight,
  ChevronRight,
  X,
  FileSpreadsheet,
  Activity,
  Zap,
  BarChart2,
  Layers,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';

const BASE_CPSE_DATA = [
  { cpse: 'BHEL', total: 5420, standardized: 4210, pending: 520, unmapped: 540, conflicts: 150, rate: 77.7, category: 'Fasteners' },
  { cpse: 'NTPC', total: 4860, standardized: 3820, pending: 410, unmapped: 490, conflicts: 140, rate: 78.6, category: 'Valves' },
  { cpse: 'ONGC', total: 4210, standardized: 3080, pending: 390, unmapped: 610, conflicts: 130, rate: 73.2, category: 'Pipes & Tubes' },
  { cpse: 'IOCL', total: 3940, standardized: 2940, pending: 350, unmapped: 530, conflicts: 120, rate: 74.6, category: 'Electrical Equipment' },
  { cpse: 'GAIL', total: 3180, standardized: 2420, pending: 260, unmapped: 430, conflicts: 70, rate: 76.1, category: 'Instrumentation' },
  { cpse: 'SAIL', total: 3070, standardized: 1950, pending: 254, unmapped: 812, conflicts: 54, rate: 63.5, category: 'Bearings' },
];

const BASE_CATEGORY_DATA = [
  { name: 'Fasteners', count: 5240, standardized: 4180, percent: 79.7 },
  { name: 'Pipes & Tubes', count: 4820, standardized: 3650, percent: 75.7 },
  { name: 'Valves', count: 4120, standardized: 3140, percent: 76.2 },
  { name: 'Electrical Equipment', count: 3680, standardized: 2710, percent: 73.6 },
  { name: 'Instrumentation', count: 2890, standardized: 2190, percent: 75.7 },
  { name: 'Bearings', count: 2140, standardized: 1420, percent: 66.3 },
  { name: 'Pumps', count: 1790, standardized: 1130, percent: 63.1 },
];

const CONFLICT_BREAKDOWN = [
  { type: 'Material Mismatch', count: 248, percentage: 37.3, severity: 'High', description: 'SS 304 vs Mild Steel discrepancies across CPSEs' },
  { type: 'Specification Mismatch', count: 182, percentage: 27.4, severity: 'Medium', description: 'Pressure class or temperature tolerance deviations' },
  { type: 'Dimension Mismatch', count: 114, percentage: 17.2, severity: 'High', description: 'Metric (M10) vs Imperial (3/8 in) sizing conflicts' },
  { type: 'UOM Mismatch', count: 78, percentage: 11.7, severity: 'Low', description: 'NOS vs SET vs MTR unit mismatches' },
  { type: 'Grade Mismatch', count: 42, percentage: 6.3, severity: 'Medium', description: 'ASTM A106 Grade B vs Grade C classification errors' },
];

const TREND_DATA = [
  { month: 'Oct 2025', processed: 3200, matches: 2400, reviews: 450 },
  { month: 'Nov 2025', processed: 3800, matches: 2900, reviews: 510 },
  { month: 'Dec 2025', processed: 4100, matches: 3150, reviews: 480 },
  { month: 'Jan 2026', processed: 4400, matches: 3380, reviews: 520 },
  { month: 'Feb 2026', processed: 4300, matches: 3260, reviews: 490 },
  { month: 'Mar 2026', processed: 4880, matches: 3820, reviews: 540 },
];

const RECENT_ACTIVITIES = [
  { id: 1, event: 'Dataset imported from CPSE source', cpse: 'ONGC', details: 'Imported 1,240 raw materials (Pipes & Fittings)', time: '12 mins ago', badge: 'Import' },
  { id: 2, event: 'AI matching run completed', cpse: 'BHEL & NTPC', details: '5,280 pair comparisons evaluated across Fasteners', time: '45 mins ago', badge: 'AI Engine' },
  { id: 3, event: '428 materials standardized', cpse: 'IOCL', details: 'Automated high-confidence merge approved', time: '2 hours ago', badge: 'Success' },
  { id: 4, event: '86 mappings sent for review', cpse: 'SAIL', details: 'Low confidence (65-79%) routed to Review Queue', time: '3.5 hours ago', badge: 'Review' },
  { id: 5, event: '12 specification conflicts detected', cpse: 'GAIL', details: 'Dimension and UOM conflicts flagged for human audit', time: '5 hours ago', badge: 'Conflict' },
];

export default function AnalyticsPage() {
  // Global Filter States
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedCpse, setSelectedCpse] = useState('All CPSEs');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Modal & Toast Interactive States
  const [activeCpseModal, setActiveCpseModal] = useState(null);
  const [activeConflictModal, setActiveConflictModal] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper for displaying user action feedback
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCpseData = useMemo(() => {
    return BASE_CPSE_DATA.filter((item) => {
      const cpseMatch = selectedCpse === 'All CPSEs' || item.cpse === selectedCpse;
      const catMatch = selectedCategory === 'All Categories' || item.category === selectedCategory;
      return cpseMatch && catMatch;
    });
  }, [selectedCpse, selectedCategory]);

  const overviewStats = useMemo(() => {
    let multiplier = 1;
    if (dateRange === 'Last 6 Months') multiplier = 1.35;
    if (dateRange === 'YTD') multiplier = 1.8;
    if (dateRange === 'Custom') multiplier = 1.1;

    let total = 0;
    let standardized = 0;
    let pending = 0;
    let unmapped = 0;
    let conflicts = 0;

    if (filteredCpseData.length > 0) {
      filteredCpseData.forEach((row) => {
        total += Math.round(row.total * multiplier);
        standardized += Math.round(row.standardized * multiplier);
        pending += Math.round(row.pending * multiplier);
        unmapped += Math.round(row.unmapped * multiplier);
        conflicts += Math.round(row.conflicts * multiplier);
      });
    } else {
      total = Math.round(24680 * multiplier);
      standardized = Math.round(18420 * multiplier);
      pending = Math.round(2184 * multiplier);
      unmapped = Math.round(3412 * multiplier);
      conflicts = Math.round(664 * multiplier);
    }

    const rate = total > 0 ? ((standardized / total) * 100).toFixed(1) : '0.0';

    return { total, standardized, pending, unmapped, conflicts, rate };
  }, [filteredCpseData, dateRange]);

  const aiStats = useMemo(() => {
    const totalComparisons = Math.round(overviewStats.total * 2.14);
    const highConf = Math.round(totalComparisons * 0.592);
    const possibleMatches = Math.round(totalComparisons * 0.159);
    const conflictsDetected = overviewStats.conflicts;
    const noMatch = totalComparisons - highConf - possibleMatches - conflictsDetected;

    return { totalComparisons, highConf, possibleMatches, conflictsDetected, noMatch };
  }, [overviewStats]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ------------------------------------------------------------- */}
        {/* HEADER & GLOBAL CONTROLS SECTION                              */}
        {/* ------------------------------------------------------------- */}
        {}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>MatAlign</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-indigo-600">Analytics</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Analytics & Material Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Monitor material harmonization progress, matching performance, and CPSE-level insights.
            </p>
          </div>

          {/* Interactive Global Filters Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            {/* Date Range Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-semibold text-slate-800"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="YTD">YTD (2026)</option>
                <option value="Custom">Custom Range</option>
              </select>
            </div>

            {/* CPSE Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-700">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedCpse}
                onChange={(e) => setSelectedCpse(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-semibold text-slate-800"
              >
                <option value="All CPSEs">All CPSEs</option>
                <option value="BHEL">BHEL</option>
                <option value="NTPC">NTPC</option>
                <option value="ONGC">ONGC</option>
                <option value="IOCL">IOCL</option>
                <option value="GAIL">GAIL</option>
                <option value="SAIL">SAIL</option>
              </select>
            </div>

            {/* Category Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-700">
              <FolderTree className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-semibold text-slate-800"
              >
                <option value="All Categories">All Categories</option>
                <option value="Fasteners">Fasteners</option>
                <option value="Pipes & Tubes">Pipes & Tubes</option>
                <option value="Valves">Valves</option>
                <option value="Electrical Equipment">Electrical Equipment</option>
                <option value="Instrumentation">Instrumentation</option>
                <option value="Bearings">Bearings</option>
                <option value="Pumps">Pumps</option>
              </select>
            </div>

            {/* Export Trigger Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Active Filter Pill Bar (If Filters Applied) */}
        {(selectedCpse !== 'All CPSEs' || selectedCategory !== 'All Categories' || dateRange !== 'Last 30 Days') && (
          <div className="flex items-center justify-between bg-indigo-50/60 border border-indigo-100 rounded-md px-3.5 py-2 text-xs text-indigo-900">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-indigo-600" /> Active Filters:
              </span>
              {selectedCpse !== 'All CPSEs' && (
                <span className="bg-white border border-indigo-200 px-2 py-0.5 rounded font-mono font-medium text-indigo-800">
                  CPSE: {selectedCpse}
                </span>
              )}
              {selectedCategory !== 'All Categories' && (
                <span className="bg-white border border-indigo-200 px-2 py-0.5 rounded font-mono font-medium text-indigo-800">
                  Category: {selectedCategory}
                </span>
              )}
              {dateRange !== 'Last 30 Days' && (
                <span className="bg-white border border-indigo-200 px-2 py-0.5 rounded font-mono font-medium text-indigo-800">
                  Period: {dateRange}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedCpse('All CPSEs');
                setSelectedCategory('All Categories');
                setDateRange('Last 30 Days');
              }}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SECTION 1 — OVERVIEW METRICS CARDS                            */}
        {/* ------------------------------------------------------------- */}
        {}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Materials */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Materials</span>
              <div className="p-1.5 bg-slate-100 rounded-md text-slate-600">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 font-mono tracking-tight">
                {overviewStats.total.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                +4.2% MoM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Raw records collected across CPSEs</p>
          </div>

          {/* Card 2: Standardized Materials */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Standardized</span>
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 font-mono tracking-tight">
                {overviewStats.standardized.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                Unified
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Mapped to Standard Material Catalog</p>
          </div>

          {/* Card 3: Standardization Rate */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Standardization Rate</span>
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-indigo-950 font-mono tracking-tight">
                {overviewStats.rate}%
              </span>
              <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                Target: 80%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Overall system harmonization index</p>
          </div>

          {/* Card 4: Pending Review (Interactive Route) */}
          <div
            onClick={() => triggerToast('Routing to Human Review Queue workspace...')}
            className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-amber-700 transition-colors">
                Pending Review
              </span>
              <div className="p-1.5 bg-amber-50 text-amber-600 rounded-md border border-amber-100">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 font-mono tracking-tight">
                {overviewStats.pending.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-0.5">
                Review Queue <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Awaiting expert approval decision</p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 2 — STANDARDIZATION PROGRESS                           */}
        {/* ------------------------------------------------------------- */}
        {}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                Standardization Progress Breakdown
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current status distribution across total ingested material records
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
              Total Evaluated: <strong className="text-slate-800">{overviewStats.total.toLocaleString()}</strong>
            </div>
          </div>

          {/* Clean Horizontal Stacked Visualization Bar */}
          <div className="space-y-2">
            <div className="w-full h-5 bg-slate-100 rounded-md overflow-hidden flex border border-slate-200/80 p-0.5 gap-0.5">
              <div
                style={{ width: `${(overviewStats.standardized / overviewStats.total) * 100}%` }}
                className="bg-emerald-600 h-full rounded-xs transition-all duration-500"
                title={`Standardized: ${overviewStats.standardized.toLocaleString()}`}
              />
              <div
                style={{ width: `${(overviewStats.pending / overviewStats.total) * 100}%` }}
                className="bg-amber-500 h-full rounded-xs transition-all duration-500"
                title={`Pending Review: ${overviewStats.pending.toLocaleString()}`}
              />
              <div
                style={{ width: `${(overviewStats.unmapped / overviewStats.total) * 100}%` }}
                className="bg-slate-400 h-full rounded-xs transition-all duration-500"
                title={`Unmapped: ${overviewStats.unmapped.toLocaleString()}`}
              />
              <div
                style={{ width: `${(overviewStats.conflicts / overviewStats.total) * 100}%` }}
                className="bg-rose-600 h-full rounded-xs transition-all duration-500"
                title={`Conflicts: ${overviewStats.conflicts.toLocaleString()}`}
              />
            </div>

            {/* Detailed Legend Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                  Standardized
                </div>
                <p className="text-lg font-bold text-slate-900 font-mono mt-1">
                  {overviewStats.standardized.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">
                  {((overviewStats.standardized / overviewStats.total) * 100).toFixed(1)}% of total
                </p>
              </div>

              <div
                onClick={() => triggerToast('Opening Pending Review items in Review Queue...')}
                className="p-3 bg-slate-50 rounded-md border border-slate-200 hover:border-amber-300 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  Pending Review
                </div>
                <p className="text-lg font-bold text-slate-900 font-mono mt-1">
                  {overviewStats.pending.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">
                  {((overviewStats.pending / overviewStats.total) * 100).toFixed(1)}% of total
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                  Unmapped
                </div>
                <p className="text-lg font-bold text-slate-900 font-mono mt-1">
                  {overviewStats.unmapped.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">
                  {((overviewStats.unmapped / overviewStats.total) * 100).toFixed(1)}% of total
                </p>
              </div>

              <div
                onClick={() => triggerToast('Routing to Conflicts Management page...')}
                className="p-3 bg-slate-50 rounded-md border border-slate-200 hover:border-rose-300 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                  Conflicts
                </div>
                <p className="text-lg font-bold text-slate-900 font-mono mt-1">
                  {overviewStats.conflicts.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">
                  {((overviewStats.conflicts / overviewStats.total) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 3 & SECTION 7 — AI MATCHING PERFORMANCE & CONFLICTS   */}
        {/* ------------------------------------------------------------- */}
        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* SECTION 3 — AI MATCHING PERFORMANCE */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  AI Matching Engine Performance
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Semantic vector and rule-based similarity outcomes</p>
              </div>
              <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold rounded">
                v2.4 LLM Active
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Pairs</span>
                <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
                  {aiStats.totalComparisons.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 bg-emerald-50/60 rounded border border-emerald-100">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">High Conf (&gt;90%)</span>
                <span className="text-base font-bold text-emerald-900 font-mono mt-0.5 block">
                  {aiStats.highConf.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 bg-amber-50/60 rounded border border-amber-100">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">Possible (70-89%)</span>
                <span className="text-base font-bold text-amber-900 font-mono mt-0.5 block">
                  {aiStats.possibleMatches.toLocaleString()}
                </span>
              </div>
              <div className="p-2.5 bg-rose-50/60 rounded border border-rose-100">
                <span className="text-[10px] uppercase font-bold text-rose-800 block">Conflicts Flagged</span>
                <span className="text-base font-bold text-rose-900 font-mono mt-0.5 block">
                  {aiStats.conflictsDetected.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Outcome Distribution Bars */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-semibold text-slate-700 block">Outcome Distribution</span>

              {/* High Confidence Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Auto-Merge Match (High Confidence)</span>
                  <span className="font-mono font-bold text-slate-800">
                    {((aiStats.highConf / aiStats.totalComparisons) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(aiStats.highConf / aiStats.totalComparisons) * 100}%` }}
                    className="bg-emerald-600 h-full rounded-full"
                  />
                </div>
              </div>

              {/* Possible Match Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Human Review Queue (Possible Match)</span>
                  <span className="font-mono font-bold text-slate-800">
                    {((aiStats.possibleMatches / aiStats.totalComparisons) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(aiStats.possibleMatches / aiStats.totalComparisons) * 100}%` }}
                    className="bg-amber-500 h-full rounded-full"
                  />
                </div>
              </div>

              {/* Conflict Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Specification / Attribute Conflict</span>
                  <span className="font-mono font-bold text-slate-800">
                    {((aiStats.conflictsDetected / aiStats.totalComparisons) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(aiStats.conflictsDetected / aiStats.totalComparisons) * 100}%` }}
                    className="bg-rose-500 h-full rounded-full"
                  />
                </div>
              </div>

              {/* Unique / Distinct Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600 font-medium">
                  <span>Unique / Distinct Material (No Equivalent)</span>
                  <span className="font-mono font-bold text-slate-800">
                    {((aiStats.noMatch / aiStats.totalComparisons) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(aiStats.noMatch / aiStats.totalComparisons) * 100}%` }}
                    className="bg-slate-400 h-full rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 7 — CONFLICT ANALYSIS */}
          {}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Conflict Classification Analysis
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Click any category to open Conflict workspace</p>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                {overviewStats.conflicts} Total Conflicts
              </span>
            </div>

            <div className="space-y-2.5">
              {CONFLICT_BREAKDOWN.map((conflict, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveConflictModal(conflict)}
                  className="p-3 bg-slate-50 rounded-md border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{conflict.type}</span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                          conflict.severity === 'High'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : conflict.severity === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {conflict.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{conflict.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900 font-mono block">
                      {conflict.count}
                    </span>
                    <span className="text-[11px] text-slate-500 block font-mono">
                      {conflict.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 4 — CPSE OVERVIEW TABLE                               */}
        {/* ------------------------------------------------------------- */}
        {}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                CPSE Harmonization Performance
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Detailed standardization metrics by Central Public Sector Enterprise
              </p>
            </div>
            <span className="text-xs text-indigo-600 font-medium">Click row for detailed CPSE analytics</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">CPSE Enterprise</th>
                  <th className="py-3 px-4 text-right">Total Materials</th>
                  <th className="py-3 px-4 text-right">Standardized</th>
                  <th className="py-3 px-4 text-right">Pending Review</th>
                  <th className="py-3 px-4 text-right">Conflicts</th>
                  <th className="py-3 px-4 min-w-[180px]">Standardization Rate</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCpseData.map((row, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setActiveCpseModal(row)}
                    className="hover:bg-indigo-50/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      {row.cpse}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800">
                      {row.total.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-emerald-700">
                      {row.standardized.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-amber-700">
                      {row.pending.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-rose-600">
                      {row.conflicts}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${row.rate}%` }}
                            className={`h-full rounded-full ${
                              row.rate >= 75 ? 'bg-emerald-600' : row.rate >= 70 ? 'bg-indigo-600' : 'bg-amber-500'
                            }`}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-900 w-12 text-right">{row.rate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] text-indigo-600 font-semibold hover:underline">
                        Details →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 5 & SECTION 6 — CATEGORY DISTRIBUTION & TRENDS       */}
        {/* ------------------------------------------------------------- */}
        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* SECTION 5 — CATEGORY DISTRIBUTION */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-indigo-600" />
                  Category Material Distribution
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Volume and standardization rate grouped by domain</p>
              </div>
            </div>

            <div className="space-y-3">
              {BASE_CATEGORY_DATA.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{cat.name}</span>
                    <div className="font-mono text-slate-600 space-x-2">
                      <span>{cat.standardized.toLocaleString()} / {cat.count.toLocaleString()}</span>
                      <strong className="text-indigo-900">({cat.percent}%)</strong>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${cat.percent}%` }}
                      className="bg-indigo-600 h-full rounded-full"
                      title={`Standardized: ${cat.percent}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6 — MATCHING TRENDS (6 MONTH TIME-SERIES) */}
          {}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  Harmonization Velocity Trends
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">6-month operational activity timeline</p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded bg-indigo-600 inline-block" /> Processed
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Matches
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> Reviews
                </span>
              </div>
            </div>

            {/* Custom Interactive SVG Time-Series Chart */}
            <div className="pt-2">
              <div className="h-48 w-full flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-200 relative">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                  <div className="border-b border-dashed border-slate-200 w-full" />
                  <div className="border-b border-dashed border-slate-200 w-full" />
                  <div className="border-b border-dashed border-slate-200 w-full" />
                </div>

                {TREND_DATA.map((item, idx) => {
                  const maxVal = 5000;
                  const hProcessed = (item.processed / maxVal) * 100;
                  const hMatches = (item.matches / maxVal) * 100;
                  const hReviews = (item.reviews / maxVal) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end z-10 group">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        {/* Bar 1: Processed */}
                        <div
                          style={{ height: `${hProcessed}%` }}
                          className="w-2 sm:w-3 bg-indigo-600 rounded-t-xs transition-all group-hover:bg-indigo-700"
                          title={`Processed: ${item.processed}`}
                        />
                        {/* Bar 2: Matches */}
                        <div
                          style={{ height: `${hMatches}%` }}
                          className="w-2 sm:w-3 bg-emerald-500 rounded-t-xs transition-all group-hover:bg-emerald-600"
                          title={`Matches: ${item.matches}`}
                        />
                        {/* Bar 3: Reviews */}
                        <div
                          style={{ height: `${hReviews}%` }}
                          className="w-2 sm:w-3 bg-amber-500 rounded-t-xs transition-all group-hover:bg-amber-600"
                          title={`Reviews: ${item.reviews}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono font-medium text-slate-600 pt-1">
                        {item.month.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
                <span>Oct 2025</span>
                <span>March 2026 (Current)</span>
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 8 — RECENT ACTIVITY LOG                              */}
        {/* ------------------------------------------------------------- */}
        {}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Recent System Activity & Ingestion Audit Log
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time system harmonization events across connected CPSE sources</p>
            </div>
            <button
              onClick={() => triggerToast('Refreshing audit activity log...')}
              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
              title="Refresh Activity"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 font-bold rounded text-[10px] font-mono uppercase ${
                      act.badge === 'Import'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : act.badge === 'AI Engine'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : act.badge === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : act.badge === 'Review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {act.badge}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">{act.event}</span>
                    <span className="text-slate-400 mx-1.5">•</span>
                    <span className="text-slate-600">{act.details}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-500 shrink-0">
                  <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[10px]">
                    {act.cpse}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE MODALS & DRILL-DOWN DRAWERS                        */}
      {/* ------------------------------------------------------------- */}
      {}

      {/* Modal 1: CPSE Detail Analytics Modal */}
      {activeCpseModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {activeCpseModal.cpse} — Enterprise Analytics
                </h3>
              </div>
              <button
                onClick={() => setActiveCpseModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Total Ingested Materials</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">
                    {activeCpseModal.total.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Standardization Rate</span>
                  <span className="text-lg font-bold text-indigo-700 font-mono">
                    {activeCpseModal.rate}%
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Standardized:</span>
                  <span className="font-mono text-emerald-700">{activeCpseModal.standardized.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Pending Human Review:</span>
                  <span className="font-mono text-amber-700">{activeCpseModal.pending.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Unmapped Raw Items:</span>
                  <span className="font-mono text-slate-600">{activeCpseModal.unmapped.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Active Conflicts:</span>
                  <span className="font-mono text-rose-600">{activeCpseModal.conflicts}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedCpse(activeCpseModal.cpse);
                  setActiveCpseModal(null);
                  triggerToast(`Filtered entire dashboard for ${activeCpseModal.cpse}`);
                }}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700"
              >
                Filter Analytics by {activeCpseModal.cpse}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Conflict Category Drill-Down Modal */}
      {activeConflictModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">{activeConflictModal.type}</h3>
              </div>
              <button
                onClick={() => setActiveConflictModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">{activeConflictModal.description}</p>

              <div className="bg-amber-50/60 p-3 rounded border border-amber-200 space-y-1">
                <div className="flex justify-between font-bold text-amber-900">
                  <span>Total Affected Records:</span>
                  <span className="font-mono">{activeConflictModal.count} items</span>
                </div>
                <div className="flex justify-between text-amber-800">
                  <span>Share of Total Conflicts:</span>
                  <span className="font-mono">{activeConflictModal.percentage}%</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  setActiveConflictModal(null);
                  triggerToast(`Navigating to Conflict Resolution Workspace for ${activeConflictModal.type}...`);
                }}
                className="px-3 py-1.5 bg-rose-600 text-white rounded text-xs font-semibold hover:bg-rose-700"
              >
                Open Conflict Resolution Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Export Master Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Export Analytics Data</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select your preferred export format for the current analytics dataset ({selectedCpse}, {selectedCategory}).
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowExportModal(false);
                  triggerToast('Generated MatAlign_Analytics_Report.xlsx (Excel Downloaded)');
                }}
                className="w-full text-left p-3 border border-slate-200 rounded-md hover:bg-indigo-50/50 flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>Formatted Excel Workbook (.xlsx)</span>
                <Download className="w-4 h-4 text-indigo-600" />
              </button>

              <button
                onClick={() => {
                  setShowExportModal(false);
                  triggerToast('Exported MatAlign_Analytics_Data.csv (CSV Downloaded)');
                }}
                className="w-full text-left p-3 border border-slate-200 rounded-md hover:bg-indigo-50/50 flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>Raw Comma-Separated Values (.csv)</span>
                <Download className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Confirmation Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-xs font-medium z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}