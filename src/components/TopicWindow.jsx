import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  BarChart2, 
  Save, 
  Edit3, 
  Eye, 
  Info,
  Sliders,
  TrendingUp,
  Share2,
  Download
} from 'lucide-react';

export const TopicWindow = ({ 
  engine, 
  user, 
  onBack, 
  onOpenWhatIf, 
  onUpdateUserMetrics 
}) => {
  // Admin Edit State
  const [editableMetrics, setEditableMetrics] = useState({ ...user.metrics });
  const [saveStatus, setSaveStatus] = useState(null);

  const handleFieldChange = (key, value) => {
    setEditableMetrics(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveAdminData = (e) => {
    e.preventDefault();
    onUpdateUserMetrics(editableMetrics);
    setSaveStatus("Dataset successfully updated!");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-up pb-16">
      
      {/* Top Action Header with Navigation & Prominent What-If Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-cream-50 p-6 sm:p-8 rounded-3xl border border-champagne-500/30 shadow-luxury">
        
        {/* Left: Back Button & Title */}
        <div className="space-y-2">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-burgundy-800 hover:text-champagne-600 transition-colors group mb-1"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Return to Engines</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold text-champagne-700 bg-champagne-100 px-2.5 py-1 rounded-md border border-champagne-500/30">
              Engine {engine.number}
            </span>
            <span className="text-xs font-bold text-burgundy-900 bg-burgundy-100 px-3 py-1 rounded-full">
              {engine.category}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              user.role === 'Admin' 
                ? 'bg-champagne-500/20 text-champagne-700 border border-champagne-500/40' 
                : 'bg-cream-200 text-charcoal-700'
            }`}>
              {user.role === 'Admin' ? '● Admin: Editable Dataset' : '○ Student: View-Only'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy-900">
            {engine.title}
          </h1>
          <p className="text-xs text-charcoal-500 font-medium">
            {engine.subtitle}
          </p>
        </div>

        {/* Right: PROMINENT "WHAT IF" BUTTON (Champagne / Warm Gold #D4AF37) */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={onOpenWhatIf}
            className="relative group overflow-hidden px-6 py-3.5 rounded-2xl gold-gradient-bg text-burgundy-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-2.5 border border-champagne-300"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Sparkles className="w-4 h-4 text-burgundy-950 animate-spin-slow" />
            <span className="font-serif font-extrabold tracking-wide text-sm">
              ✦ "What If" Simulation
            </span>
          </button>
        </div>

      </div>

      {/* Main Grid: Analytical Visualizations + Role-Controlled Data Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Personalized Performance Graphs & Benchmarking */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Comparative Benchmark Bar Chart */}
          <div className="bg-cream-50 p-6 sm:p-8 rounded-3xl border border-champagne-500/30 shadow-luxury space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-champagne-500/15 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-burgundy-900 flex items-center space-x-2">
                  <BarChart2 className="w-5 h-5 text-champagne-600" />
                  <span>Personal Metric vs. Cohort Benchmark</span>
                </h3>
                <p className="text-xs text-charcoal-500">
                  Targeted indicators comparing <strong>{user.name}</strong> against the 500-student cohort median
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center space-x-4 text-xs font-medium">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-burgundy-800" />
                  <span className="text-charcoal-700">{user.name}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-champagne-400" />
                  <span className="text-charcoal-700">Cohort Median</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive Comparative Bar Visualization */}
            <div className="space-y-6 pt-2">
              {engine.chartData.map((item, idx) => {
                const maxVal = Math.max(item.personal, item.cohort) * 1.25 || 100;
                const personalPct = Math.min(100, Math.round((item.personal / maxVal) * 100));
                const cohortPct = Math.min(100, Math.round((item.cohort / maxVal) * 100));

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-charcoal-800">{item.label}</span>
                      <div className="space-x-3 font-mono text-[11px]">
                        <span className="text-burgundy-900 font-bold">{item.personal} (You)</span>
                        <span className="text-charcoal-500">|</span>
                        <span className="text-champagne-700 font-medium">{item.cohort} (Avg)</span>
                      </div>
                    </div>

                    {/* Comparative Dual Bars */}
                    <div className="space-y-1">
                      {/* Personal Bar */}
                      <div className="h-3.5 w-full bg-cream-200 rounded-full overflow-hidden p-0.5">
                        <div 
                          className="h-full rounded-full burgundy-gradient-bg transition-all duration-700 ease-out flex items-center justify-end pr-2"
                          style={{ width: `${personalPct}%` }}
                        />
                      </div>
                      {/* Cohort Bar */}
                      <div className="h-2 w-full bg-cream-200 rounded-full overflow-hidden p-0.5">
                        <div 
                          className="h-full rounded-full gold-gradient-bg opacity-70 transition-all duration-700 ease-out"
                          style={{ width: `${cohortPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Qualitative Synthesis Footnote */}
            <div className="p-4 rounded-2xl bg-cream-100 border border-champagne-500/20 text-xs text-charcoal-700 flex items-start space-x-3">
              <Info className="w-4 h-4 text-champagne-600 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">
                <strong>Diagnostic Evaluation:</strong> {engine.keyFinding}
              </p>
            </div>
          </div>

          {/* Pros & Cons Panel (Strengths vs Vulnerabilities) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Pros / Strengths Card */}
            <div className="bg-cream-50 p-6 rounded-3xl border border-emerald-600/25 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-emerald-800 pb-2 border-b border-emerald-600/15">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <h4 className="font-serif font-bold text-base text-emerald-950">
                  Pros & Academic Strengths
                </h4>
              </div>

              <ul className="space-y-3">
                {engine.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-charcoal-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons / Areas for Optimization Card */}
            <div className="bg-cream-50 p-6 rounded-3xl border border-burgundy-800/25 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-burgundy-900 pb-2 border-b border-burgundy-800/15">
                <AlertCircle className="w-5 h-5 text-burgundy-700" />
                <h4 className="font-serif font-bold text-base text-burgundy-950">
                  Cons & Strategic Vulnerabilities
                </h4>
              </div>

              <ul className="space-y-3">
                {engine.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-charcoal-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-burgundy-700 mt-1.5 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Right 1 Column: Role-Based Control Panel (Student View vs. Admin Editable View) */}
        <div className="space-y-6">
          
          <div className="bg-cream-50 p-6 sm:p-7 rounded-3xl border border-champagne-500/30 shadow-luxury space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-champagne-500/20">
              <div>
                <h4 className="font-serif font-bold text-lg text-burgundy-900">
                  {user.role === 'Admin' ? 'Admin Dataset Controls' : 'Student Record Dossier'}
                </h4>
                <p className="text-[11px] text-charcoal-500">
                  {user.role === 'Admin' ? 'Direct in-memory dataset editing enabled' : 'Official institutional transcript read-only'}
                </p>
              </div>

              <div className="w-8 h-8 rounded-xl bg-champagne-100 flex items-center justify-center text-burgundy-900">
                {user.role === 'Admin' ? <Edit3 className="w-4 h-4 text-burgundy-800" /> : <Eye className="w-4 h-4 text-champagne-700" />}
              </div>
            </div>

            {/* Active Student Pill */}
            <div className="p-3.5 rounded-2xl bg-cream-100 border border-champagne-500/20 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-burgundy-900 text-champagne-300 font-serif font-bold text-xs flex items-center justify-center shadow-sm">
                {user.avatarInitials}
              </div>
              <div className="text-xs">
                <span className="font-bold text-burgundy-900 block">{user.name}</span>
                <span className="text-[10px] text-charcoal-500 block">ID: {user.id} · {user.standing}</span>
              </div>
            </div>

            {/* Role Conditional Body */}
            {user.role === 'Student' ? (
              
              /* STUDENT VIEW: Strictly View-Only */
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-cream-200/60 border border-champagne-500/10 space-y-2">
                  <div className="flex justify-between items-center text-charcoal-500 text-[10px] uppercase font-bold tracking-wider">
                    <span>Access Mode</span>
                    <span className="text-emerald-700">Verified Read-Only</span>
                  </div>
                  <p className="text-charcoal-700 leading-relaxed font-light">
                    As a <strong>Student</strong>, your institutional record is locked to preserve academic auditing integrity. You can review your metrics and run personalized forecasting via the <strong>"What If"</strong> engine.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between p-3 rounded-xl bg-cream-100 border border-champagne-500/10">
                    <span className="text-charcoal-600">Current Grade Average:</span>
                    <strong className="text-burgundy-900 font-mono">{user.metrics.avgCourseGrade}%</strong>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-cream-100 border border-champagne-500/10">
                    <span className="text-charcoal-600">Attendance Cadence:</span>
                    <strong className="text-burgundy-900 font-mono">{user.metrics.attendanceRate}%</strong>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-cream-100 border border-champagne-500/10">
                    <span className="text-charcoal-600">Active Engagement Proxy:</span>
                    <strong className="text-champagne-700 font-mono">{user.metrics.engagementLevel}</strong>
                  </div>
                  <div className="flex justify-between p-3 rounded-xl bg-cream-100 border border-champagne-500/10">
                    <span className="text-charcoal-600">Dropout Risk Diagnostic:</span>
                    <strong className="text-emerald-700 font-mono">{user.metrics.dropoutRisk}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenWhatIf}
                    className="w-full py-3 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-champagne-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 border border-champagne-500/30"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Launch "What If" Model</span>
                  </button>
                </div>
              </div>

            ) : (

              /* ADMIN VIEW: Editable Dataset Fields */
              <form onSubmit={handleSaveAdminData} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-champagne-50 border border-champagne-500/30 text-champagne-800 text-[11px] font-medium flex items-center space-x-2">
                  <Edit3 className="w-4 h-4 text-champagne-700 flex-shrink-0" />
                  <span>Administrative Override Active. Edits persist for current session analysis.</span>
                </div>

                {/* Dynamic Admin Fields for this Engine */}
                {engine.adminFields.map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        value={editableMetrics[field.key] || 'Low'}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-800 focus:outline-none focus:border-champagne-500 font-medium"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        step={field.step || 1}
                        min={field.min}
                        max={field.max}
                        value={editableMetrics[field.key] !== undefined ? editableMetrics[field.key] : ''}
                        onChange={(e) => handleFieldChange(field.key, parseFloat(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-800 focus:outline-none focus:border-champagne-500 font-mono font-bold"
                      />
                    )}
                  </div>
                ))}

                {saveStatus && (
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-semibold text-center text-xs animate-fade-in">
                    {saveStatus}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-champagne-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm border border-champagne-500/30"
                  >
                    <Save className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Save Dataset Overrides</span>
                  </button>
                </div>
              </form>

            )}

          </div>

          {/* Quick Engine Switcher */}
          <div className="bg-cream-50 p-5 rounded-3xl border border-champagne-500/25 space-y-3">
            <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider block">
              Exploration Engines Navigation
            </span>
            <div className="text-xs text-charcoal-600 font-light leading-relaxed">
              Use the top-right <strong>"What If" Simulation</strong> button anytime to test how behavioral shifts affect grades and risk trajectories.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
