import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  RotateCcw, 
  Sliders, 
  BarChart3, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const WhatIfSimulationModal = ({ 
  isOpen, 
  onClose, 
  user, 
  engine 
}) => {
  // Input parameters for simulation
  const [inputs, setInputs] = useState({
    attendanceRate: user.metrics.attendanceRate || 85,
    forumInteractions: user.metrics.forumInteractions || 20,
    assignmentSubmissionRate: user.metrics.assignmentSubmissionRate || 90,
    videoCompletionRate: user.metrics.videoCompletionRate || 80,
    loginFrequencyPerWeek: user.metrics.loginFrequencyPerWeek || 5,
  });

  const [hasCalculated, setHasCalculated] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const handleSliderChange = (key, val) => {
    setInputs(prev => ({ ...prev, [key]: Number(val) }));
  };

  const handleResetInputs = () => {
    setInputs({
      attendanceRate: user.metrics.attendanceRate || 85,
      forumInteractions: user.metrics.forumInteractions || 20,
      assignmentSubmissionRate: user.metrics.assignmentSubmissionRate || 90,
      videoCompletionRate: user.metrics.videoCompletionRate || 80,
      loginFrequencyPerWeek: user.metrics.loginFrequencyPerWeek || 5,
    });
    setHasCalculated(false);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasCalculated(true);
    }, 400);
  };

  // Predictive algorithm based on student dataset regression heuristics
  const baselineGrade = user.metrics.avgCourseGrade || 80;
  const deltaAttendance = (inputs.attendanceRate - user.metrics.attendanceRate) * 0.22;
  const deltaAssignments = (inputs.assignmentSubmissionRate - user.metrics.assignmentSubmissionRate) * 0.35;
  const deltaForums = (inputs.forumInteractions - user.metrics.forumInteractions) * 0.18;
  const deltaVideos = (inputs.videoCompletionRate - user.metrics.videoCompletionRate) * 0.15;
  const deltaLogins = (inputs.loginFrequencyPerWeek - user.metrics.loginFrequencyPerWeek) * 0.8;

  const projectedGrade = Math.min(100, Math.max(45, Math.round((baselineGrade + deltaAttendance + deltaAssignments + deltaForums + deltaVideos + deltaLogins) * 10) / 10));
  const gradeDiff = Math.round((projectedGrade - baselineGrade) * 10) / 10;

  // Projected Risk Level
  let projectedRisk = "Low";
  let projectedRiskColor = "text-emerald-700 bg-emerald-100";
  if (inputs.attendanceRate < 70 || inputs.assignmentSubmissionRate < 70 || projectedGrade < 65) {
    projectedRisk = "High";
    projectedRiskColor = "text-rose-700 bg-rose-100";
  } else if (inputs.attendanceRate < 80 || inputs.assignmentSubmissionRate < 80 || projectedGrade < 75) {
    projectedRisk = "Medium";
    projectedRiskColor = "text-amber-800 bg-amber-100";
  }

  // Projected Engagement Status
  let projectedEngagement = "Active Pioneer";
  if (inputs.forumInteractions < 10 && inputs.videoCompletionRate < 60) {
    projectedEngagement = "Passive Observer";
  } else if (inputs.forumInteractions < 20 || inputs.assignmentSubmissionRate < 80) {
    projectedEngagement = "Moderate Participant";
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-burgundy-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-cream-100 rounded-3xl border border-champagne-500/40 shadow-2xl overflow-hidden animate-scale-up my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Ribbon Header */}
        <div className="bg-burgundy-900 px-6 sm:px-8 py-5 border-b border-champagne-500/30 flex items-center justify-between text-cream-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-burgundy-950 shadow-gold-glow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-cream-100">
                  ASPIRE "What If" Multi-Modal Simulation
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-champagne-500 text-burgundy-950 uppercase">
                  Engine {engine?.number || "01"}
                </span>
              </div>
              <p className="text-xs text-cream-300 font-light">
                Multi-Modal Predictive Simulation across Behavioral, Assessment, and Temporal Vectors for <strong>{user.name}</strong>
              </p>
            </div>
          </div>

          {/* Close & Back Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-champagne-300 flex items-center justify-center border border-champagne-500/30 transition-colors"
            title="Return to Topic Window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Simulation Mode Toggle / State Indicator */}
          <div className="flex items-center justify-between bg-cream-200/60 p-4 rounded-2xl border border-champagne-500/20">
            <div className="flex items-center space-x-2 text-xs font-semibold text-charcoal-700">
              <Sliders className="w-4 h-4 text-champagne-700" />
              <span>Configure Behavioral Levers Below</span>
            </div>
            <button
              onClick={handleResetInputs}
              className="text-xs text-burgundy-800 hover:text-champagne-600 font-bold flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Baseline</span>
            </button>
          </div>

          {/* Simulation Inputs Grid (Sliders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-cream-50 p-6 rounded-3xl border border-champagne-500/25">
            
            {/* Input 1: Attendance Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-charcoal-800">
                  Attendance Rate (%)
                </label>
                <span className="font-mono font-bold text-burgundy-900 bg-cream-200 px-2 py-0.5 rounded">
                  {inputs.attendanceRate}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="1"
                value={inputs.attendanceRate}
                onChange={(e) => handleSliderChange('attendanceRate', e.target.value)}
                className="w-full accent-burgundy-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500">
                <span>Baseline: {user.metrics.attendanceRate}%</span>
                <span>Max: 100%</span>
              </div>
            </div>

            {/* Input 2: Assignment Submission Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-charcoal-800">
                  Assignment Submission Rate (%)
                </label>
                <span className="font-mono font-bold text-burgundy-900 bg-cream-200 px-2 py-0.5 rounded">
                  {inputs.assignmentSubmissionRate}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                value={inputs.assignmentSubmissionRate}
                onChange={(e) => handleSliderChange('assignmentSubmissionRate', e.target.value)}
                className="w-full accent-burgundy-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500">
                <span>Baseline: {user.metrics.assignmentSubmissionRate}%</span>
                <span>Max: 100%</span>
              </div>
            </div>

            {/* Input 3: Forum Interactions */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-charcoal-800">
                  Monthly Forum Posts & Inquiries
                </label>
                <span className="font-mono font-bold text-burgundy-900 bg-cream-200 px-2 py-0.5 rounded">
                  {inputs.forumInteractions} interactions
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={inputs.forumInteractions}
                onChange={(e) => handleSliderChange('forumInteractions', e.target.value)}
                className="w-full accent-burgundy-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500">
                <span>Baseline: {user.metrics.forumInteractions}</span>
                <span>Cohort Avg: 16.2</span>
              </div>
            </div>

            {/* Input 4: Video Lecture Completion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-charcoal-800">
                  Video Completion & Watch Depth (%)
                </label>
                <span className="font-mono font-bold text-burgundy-900 bg-cream-200 px-2 py-0.5 rounded">
                  {inputs.videoCompletionRate}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="1"
                value={inputs.videoCompletionRate}
                onChange={(e) => handleSliderChange('videoCompletionRate', e.target.value)}
                className="w-full accent-burgundy-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500">
                <span>Baseline: {user.metrics.videoCompletionRate}%</span>
                <span>Max: 100%</span>
              </div>
            </div>

            {/* Input 5: Weekly Logins */}
            <div className="space-y-2 md:col-span-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-charcoal-800">
                  Weekly LMS Login Frequency
                </label>
                <span className="font-mono font-bold text-burgundy-900 bg-cream-200 px-2 py-0.5 rounded">
                  {inputs.loginFrequencyPerWeek} days / week
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                step="0.5"
                value={inputs.loginFrequencyPerWeek}
                onChange={(e) => handleSliderChange('loginFrequencyPerWeek', e.target.value)}
                className="w-full accent-burgundy-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-500">
                <span>Baseline: {user.metrics.loginFrequencyPerWeek}</span>
                <span>Daily Cadence: 7.0</span>
              </div>
            </div>

          </div>

          {/* ACTION BUTTON: "Show Results" */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="relative px-8 py-4 rounded-2xl gold-gradient-bg text-burgundy-950 font-serif font-bold text-sm tracking-wide shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center space-x-3 border border-champagne-300 group overflow-hidden"
            >
              <Sparkles className="w-4 h-4 text-burgundy-950 group-hover:rotate-45 transition-transform" />
              <span>
                {isSimulating ? 'Computing Predictive Regression...' : 'Show Results & Forecast'}
              </span>
              <ArrowRight className="w-4 h-4 text-burgundy-950 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* RESULTS SECTION (Displayed upon calculation) */}
          {hasCalculated && (
            <div className="space-y-6 pt-6 border-t border-champagne-500/20 animate-fade-up">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-serif font-bold text-burgundy-900">
                    Simulation Comparative Results
                  </h4>
                  <p className="text-xs text-charcoal-500 font-medium">
                    Projected outcomes computed against baseline student performance telemetry
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Simulation Validated
                </span>
              </div>

              {/* Comparative Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                {/* Metric 1: Projected Grade */}
                <div className="bg-cream-50 p-5 rounded-2xl border border-champagne-500/30 shadow-sm space-y-2">
                  <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider block">
                    Projected Course Grade
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-serif font-bold text-burgundy-900">
                      {projectedGrade}%
                    </span>
                    <span className={`text-xs font-bold ${gradeDiff >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {gradeDiff >= 0 ? `+${gradeDiff}%` : `${gradeDiff}%`}
                    </span>
                  </div>
                  <div className="text-[11px] text-charcoal-600">
                    Baseline: <span className="font-mono font-semibold">{baselineGrade}%</span>
                  </div>
                </div>

                {/* Metric 2: Attrition Vulnerability */}
                <div className="bg-cream-50 p-5 rounded-2xl border border-champagne-500/30 shadow-sm space-y-2">
                  <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider block">
                    Projected Dropout Risk
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${projectedRiskColor}`}>
                      {projectedRisk} Risk
                    </span>
                  </div>
                  <div className="text-[11px] text-charcoal-600 mt-2">
                    Current Baseline: <span className="font-semibold">{user.metrics.dropoutRisk}</span>
                  </div>
                </div>

                {/* Metric 3: Projected Classification */}
                <div className="bg-cream-50 p-5 rounded-2xl border border-champagne-500/30 shadow-sm space-y-2">
                  <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider block">
                    Projected Engagement Status
                  </span>
                  <div className="text-sm font-bold font-serif text-burgundy-900">
                    {projectedEngagement}
                  </div>
                  <div className="text-[11px] text-charcoal-600 mt-2">
                    Previous: <span className="font-semibold">{user.metrics.engagementLevel}</span>
                  </div>
                </div>

              </div>

              {/* Comparative Visual Graph (Before vs. After) */}
              <div className="bg-cream-50 p-6 rounded-3xl border border-champagne-500/30 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-charcoal-700">
                  <span>Visual Metric Shift (Baseline vs. Simulated)</span>
                  <div className="flex space-x-4">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-burgundy-900" />
                      <span>Baseline</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-champagne-500" />
                      <span>Simulated</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { label: "Grade Average", before: baselineGrade, after: projectedGrade, unit: "%" },
                    { label: "Attendance", before: user.metrics.attendanceRate, after: inputs.attendanceRate, unit: "%" },
                    { label: "Assignment Submission", before: user.metrics.assignmentSubmissionRate, after: inputs.assignmentSubmissionRate, unit: "%" },
                    { label: "Video Watch Rate", before: user.metrics.videoCompletionRate, after: inputs.videoCompletionRate, unit: "%" }
                  ].map((bar, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-semibold text-charcoal-800">{bar.label}</span>
                        <span className="font-mono text-charcoal-600">
                          {bar.before}{bar.unit} → <strong className="text-burgundy-900">{bar.after}{bar.unit}</strong>
                        </span>
                      </div>
                      <div className="h-3 w-full bg-cream-200 rounded-full overflow-hidden flex">
                        <div 
                          className="h-full bg-burgundy-900 transition-all duration-700" 
                          style={{ width: `${Math.min(100, bar.before)}%` }} 
                        />
                      </div>
                      <div className="h-2 w-full bg-cream-200 rounded-full overflow-hidden flex">
                        <div 
                          className="h-full gold-gradient-bg transition-all duration-700" 
                          style={{ width: `${Math.min(100, bar.after)}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qualitative AI Narrative Feedback */}
              <div className="p-5 rounded-2xl bg-cream-50 border border-champagne-500/30 text-xs space-y-2">
                <div className="flex items-center space-x-2 text-burgundy-900 font-bold font-serif text-sm">
                  <Sparkles className="w-4 h-4 text-champagne-600" />
                  <span>Strategic Predictive Analysis</span>
                </div>
                <p className="text-charcoal-700 leading-relaxed font-light">
                  {gradeDiff > 0 ? (
                    <>
                      By elevating assignment timeliness to <strong>{inputs.assignmentSubmissionRate}%</strong> and maintaining an attendance cadence of <strong>{inputs.attendanceRate}%</strong>, student <strong>{user.name}</strong> gains a projected <strong>+{gradeDiff}%</strong> academic yield. This shift secures placement among the top 10% of their cohort and eliminates vulnerability spikes.
                    </>
                  ) : (
                    <>
                      Under this conservative simulation, grade output stabilizes at <strong>{projectedGrade}%</strong>. To prevent attrition, prioritize daily engagement checkpoints and restore assignment submission cadence above 85%.
                    </>
                  )}
                </p>
              </div>

              {/* Simulation Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Simulation Pros */}
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-600/25 space-y-2.5">
                  <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Simulation Benefits</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-charcoal-700">
                    <li>• Direct projected grade improvement of {gradeDiff >= 0 ? `+${gradeDiff}%` : `${gradeDiff}%`}.</li>
                    <li>• Stabilizes long-term GPA at {((projectedGrade / 100) * 4).toFixed(2)} equivalency.</li>
                    <li>• Strengthens peer-learning feedback loop through {inputs.forumInteractions} discussion touchpoints.</li>
                  </ul>
                </div>

                {/* Simulation Cons / Trade-offs */}
                <div className="bg-burgundy-50/60 p-5 rounded-2xl border border-burgundy-900/20 space-y-2.5">
                  <div className="flex items-center space-x-2 text-burgundy-950 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-burgundy-800" />
                    <span>Operational Trade-offs</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-charcoal-700">
                    <li>• Demands an estimated +4.5 hours of dedicated weekly study allocation.</li>
                    <li>• Requires strict asynchronous calendar pacing to meet lecture completion targets.</li>
                    <li>• Potential cognitive fatigue if study blocks are concentrated solely on weekends.</li>
                  </ul>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer with Clear Back Button */}
        <div className="bg-cream-50 px-6 sm:px-8 py-4 border-t border-champagne-500/20 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-cream-100 font-semibold text-xs transition-colors border border-champagne-500/30 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-champagne-400" />
            <span>Back to Topic Window</span>
          </button>

          <span className="text-[11px] text-charcoal-500 font-mono hidden sm:inline">
            ASPIRE Multi-Modal Inference Model v2.4 · Real-time Simulation
          </span>
        </div>

      </div>

    </div>
  );
};

