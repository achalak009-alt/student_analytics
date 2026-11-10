import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Server, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  RefreshCw, 
  Zap,
  HardDrive
} from 'lucide-react';
import { PLATFORM_STATUS_DATA } from '../data/mockData';

export const PlatformStatusView = () => {
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState("Just now");

  const triggerPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      setLastPingTime(new Date().toLocaleTimeString());
    }, 500);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* Header Banner */}
      <div className="bg-cream-50 p-8 sm:p-10 rounded-3xl border border-champagne-500/30 shadow-luxury relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-burgundy-900 text-champagne-300 text-xs font-semibold tracking-wider uppercase">
            <Activity className="w-3.5 h-3.5 text-champagne-400 animate-pulse" />
            <span>Sector 4 · Telemetry & System Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy-900 leading-tight">
            Platform Infrastructure & Health
          </h1>

          <p className="text-sm text-charcoal-700 font-normal leading-relaxed max-w-2xl">
            Real-time telemetry monitoring the data pipelines, Flask API endpoints, in-memory cache layers, and CSV dataset consistency.
          </p>

          <div className="pt-2 flex items-center space-x-4">
            <button
              onClick={triggerPing}
              disabled={isPinging}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-champagne-500 hover:bg-champagne-400 text-burgundy-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Executing Ping...' : 'Execute Live Ping'}</span>
            </button>
            <span className="text-xs text-charcoal-500 font-mono">
              Last probe: {lastPingTime}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1: System Uptime */}
        <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm">
          <div className="flex items-center justify-between text-burgundy-800 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">System Uptime</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-emerald-900">
            {PLATFORM_STATUS_DATA.uptime}
          </div>
          <p className="text-xs text-charcoal-600 mt-1">Status: Operational</p>
        </div>

        {/* Metric 2: API Latency */}
        <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm">
          <div className="flex items-center justify-between text-burgundy-800 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Average Latency</span>
            <div className="w-8 h-8 rounded-lg bg-champagne-100 flex items-center justify-center text-burgundy-900">
              <Zap className="w-4 h-4 text-champagne-700" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-burgundy-900">
            {PLATFORM_STATUS_DATA.apiLatency}
          </div>
          <p className="text-xs text-charcoal-600 mt-1">SSL Encrypted Stream</p>
        </div>

        {/* Metric 3: Records Loaded */}
        <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm">
          <div className="flex items-center justify-between text-burgundy-800 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Dataset Records</span>
            <div className="w-8 h-8 rounded-lg bg-burgundy-100 flex items-center justify-center text-burgundy-900">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-burgundy-900">
            {PLATFORM_STATUS_DATA.totalRecordsLoaded}
          </div>
          <p className="text-xs text-charcoal-600 mt-1">student_data.csv Synced</p>
        </div>

        {/* Metric 4: Memory Usage */}
        <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm">
          <div className="flex items-center justify-between text-burgundy-800 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Allocated Memory</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-900">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-burgundy-900">
            {PLATFORM_STATUS_DATA.memoryUsage}
          </div>
          <p className="text-xs text-charcoal-600 mt-1">Buffer Pool: Nominal</p>
        </div>

      </div>

      {/* Micro-Services Status Table */}
      <div className="bg-cream-50 rounded-3xl border border-champagne-500/30 p-8 shadow-luxury space-y-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-burgundy-900">
            Active Core Services Telemetry
          </h3>
          <p className="text-xs text-charcoal-500">
            Detailed availability benchmarks for internal inference and analytics nodes
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-champagne-500/20 text-[11px] uppercase tracking-wider text-charcoal-500">
                <th className="py-3 px-4 font-bold">Service Component</th>
                <th className="py-3 px-4 font-bold">Current State</th>
                <th className="py-3 px-4 font-bold">Roundtrip Latency</th>
                <th className="py-3 px-4 font-bold">Uptime SLA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne-500/10 text-xs">
              {PLATFORM_STATUS_DATA.services.map((svc, idx) => (
                <tr key={idx} className="hover:bg-cream-100/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-charcoal-800 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{svc.name}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {svc.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-charcoal-600">{svc.latency}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-burgundy-900">{svc.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
