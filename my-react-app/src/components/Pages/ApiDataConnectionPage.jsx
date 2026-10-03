import React, { useState } from 'react';
import { 
  Webhook, 
  Key, 
  Database, 
  RefreshCw, 
  Plus, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  Activity
} from 'lucide-react';

const ApiDataConnectionPage = () => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTab, setActiveTab] = useState('integrations'); // 'integrations' | 'keys' | 'webhooks' | 'logs'
  const [isSyncing, setIsSyncing] = useState(false);

  const apiKeys = [
    { id: 1, name: 'Production ERP Sync API', key: 'ma_live_98a7x...2026k9', created: '12 Jan 2026', lastUsed: '2 mins ago', status: 'Active' },
    { id: 2, name: 'BHEL Portal Connector', key: 'ma_live_45f32...1109a1', created: '03 Feb 2026', lastUsed: '1 hour ago', status: 'Active' },
    { id: 3, name: 'Staging Environment', key: 'ma_test_001a9...9928bc', created: '20 May 2026', lastUsed: '3 days ago', status: 'Inactive' }
  ];

  const erpConnections = [
    { name: 'SAP S/4HANA', cpse: 'BHEL Consortium', type: 'REST API / RFC', status: 'Connected', latency: '42ms', lastSync: '10 mins ago', iconColor: 'bg-blue-600' },
    { name: 'Oracle ERP Cloud', cpse: 'NTPC Limited', type: 'GraphQL / Webhook', status: 'Connected', latency: '58ms', lastSync: '15 mins ago', iconColor: 'bg-red-600' },
    { name: 'Infor Baan VI', cpse: 'ONGC', type: 'ODBC Direct Gateway', status: 'Warning', latency: '210ms', lastSync: '2 hours ago', iconColor: 'bg-amber-600' },
    { name: 'Custom ERP Gateway', cpse: 'SAIL', type: 'SFTP Automated Batch', status: 'Disconnected', latency: '-', lastSync: '1 day ago', iconColor: 'bg-slate-600' }
  ];

  const syncLogs = [
    { id: 'SYNC-9981', target: 'SAP S/4HANA (BHEL)', records: '14,200', status: 'Success', timestamp: 'Today, 13:02' },
    { id: 'SYNC-9980', target: 'Oracle Cloud (NTPC)', records: '8,450', status: 'Success', timestamp: 'Today, 12:45' },
    { id: 'SYNC-9979', target: 'Infor Baan (ONGC)', records: '1,120', status: 'Partial Success', timestamp: 'Today, 11:10' },
    { id: 'SYNC-9978', target: 'Custom ERP (SAIL)', records: '0', status: 'Failed', timestamp: 'Yesterday, 18:30' }
  ];

  const handleCopy = (keyText, id) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen p-4 sm:p-6 space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Operations</span>
            <span>/</span>
            <span className="text-indigo-600">Integrations & API</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Data Connections & API Gateway</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage live ERP sync connectors, API tokens, and webhook events.</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button 
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Connectors...' : 'Sync All Systems'}</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Active ERP Connectors</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">3 / 4 Connected</h3>
            <p className="text-[10px] text-emerald-600 font-medium mt-0.5">99.8% Gateway Uptime</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Daily API Requests</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">248.5k</h3>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Peak rate: 120 req/s</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Active API Tokens</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">2 Active</h3>
            <p className="text-[10px] text-amber-600 font-medium mt-0.5">1 Key expiring soon</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Key className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Sync Latency</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">42 ms</h3>
            <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Optimal response time</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Webhook className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="border-b border-slate-200 flex gap-4 overflow-x-auto text-xs font-semibold text-slate-500">
        <button 
          onClick={() => setActiveTab('integrations')}
          className={`pb-2.5 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'integrations' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'hover:text-slate-800'}`}
        >
          ERP Systems & Connectors
        </button>
        <button 
          onClick={() => setActiveTab('keys')}
          className={`pb-2.5 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'keys' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'hover:text-slate-800'}`}
        >
          API Authentication Tokens
        </button>
        <button 
          onClick={() => setActiveTab('webhooks')}
          className={`pb-2.5 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'webhooks' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'hover:text-slate-800'}`}
        >
          Webhooks & Endpoints
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          className={`pb-2.5 transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'logs' ? 'border-b-2 border-indigo-600 text-indigo-600 font-bold' : 'hover:text-slate-800'}`}
        >
          Sync Execution Logs
        </button>
      </div>

      {/* TAB CONTENT: ERP CONNECTIONS */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {erpConnections.map((conn, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-3 h-3 rounded-full ${conn.iconColor}`} />
                    <h3 className="font-bold text-slate-800 text-sm">{conn.name}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                    conn.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' :
                    conn.status === 'Warning' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      conn.status === 'Connected' ? 'bg-emerald-500' :
                      conn.status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}></span>
                    {conn.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">CPSE Partner</span>
                    <span className="font-semibold text-slate-700">{conn.cpse}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Protocol</span>
                    <span className="font-semibold text-slate-700">{conn.type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Latency</span>
                    <span className="font-semibold text-slate-700">{conn.latency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Last Sync</span>
                    <span className="font-semibold text-slate-700">{conn.lastSync}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer">
                  <Sliders className="w-3.5 h-3.5" /> Configure Parameters
                </button>
                <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer">
                  Test Connection <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: API KEYS */}
      {activeTab === 'keys' && (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Active API Secret Keys</h3>
              <p className="text-[11px] text-slate-400">Tokens used to authenticate external CPSE data ingestion requests.</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Generate Secret Key
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase">
                  <th className="p-3 pl-4">Key Name</th>
                  <th className="p-3">Token Prefix</th>
                  <th className="p-3">Created</th>
                  <th className="p-3">Last Used</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {apiKeys.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">{item.key}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{item.created}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{item.lastUsed}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-right">
                      <button 
                        onClick={() => handleCopy(item.key, item.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Copy Key"
                      >
                        {copiedKey === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: WEBHOOKS */}
      {activeTab === 'webhooks' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Real-time Webhook Subscriptions</h3>
              <p className="text-[11px] text-slate-400">Push live material code standardization events directly to CPSE endpoints.</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
              Add Endpoint
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800">https://api.bhel.in/v1/material-events</span>
                  <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded">Active</span>
                </div>
                <p className="text-[10px] text-slate-400">Events: material.standardized, conflict.detected</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-[10px] text-slate-400">Secret: ••••••••••••</span>
                <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-2 py-1 rounded-lg bg-white">
                  Test Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Data Ingestion Execution Logs</h3>
            <span className="text-[11px] text-slate-400">Auto-refreshing every 30s</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {syncLogs.map((log) => (
              <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  {log.status === 'Success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {log.status === 'Partial Success' && <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />}
                  {log.status === 'Failed' && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                  <div>
                    <span className="font-mono text-[11px] text-slate-500 mr-2">{log.id}</span>
                    <span className="font-semibold text-slate-800">{log.target}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 ml-7 sm:ml-0">
                  <span>{log.records} records processed</span>
                  <span className="flex items-center gap-1 text-slate-400"><Clock className="w-3 h-3" /> {log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Reference Banner */}
      <div className="bg-[#0F172A] text-white p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-600/30 text-indigo-400 shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Need help integrating with your CPSE API?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Explore our OpenAPI 3.0 specification and SDK samples for Python, Node.js, and Java.</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer">
          Read OpenAPI Specs
        </button>
      </div>
    </div>
  );
};

export default ApiDataConnectionPage;