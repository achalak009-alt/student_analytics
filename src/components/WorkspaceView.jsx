import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  AlertTriangle, 
  GraduationCap, 
  Sparkles, 
  ArrowUpRight, 
  Filter, 
  Layers, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  BarChart3,
  Compass
} from 'lucide-react';
import { GLOBAL_WORKSPACE_DATA, ENGINES_DATA } from '../data/mockData';

export const WorkspaceView = ({ onSelectEngine, user }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCategories = selectedCategory === "All"
    ? GLOBAL_WORKSPACE_DATA.courseCategories
    : GLOBAL_WORKSPACE_DATA.courseCategories.filter(c => c.name === selectedCategory);

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* Corporate Luxury EdTech Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-burgundy-900 border border-champagne-500/30 p-8 sm:p-12 text-cream-100 shadow-luxury">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-champagne-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 rounded-full bg-burgundy-700/40 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-champagne-500/15 border border-champagne-500/40 text-champagne-300 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
            <span>Enterprise EdTech Architecture · Multi-Modal Learning Approach</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-wider text-cream-100">
                ASPIRE
              </h1>
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-champagne-400 bg-burgundy-950/80 px-3 py-1 rounded-full border border-champagne-500/40">
                v2.4 Production Core
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-champagne-300 via-champagne-400 to-amber-200 leading-snug">
              Automated Student Performance Identification for Risk and Engagement
            </h2>
          </div>

          <p className="text-cream-200 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
            A corporate educational technology intelligence platform pioneering a <strong>Multi-Modal Learning Approach</strong>. ASPIRE synthesizes continuous temporal LMS access logs, asynchronous video absorption, formative grading trajectories, and discursive peer interaction metrics into unified, actionable predictive retention models for institutional leaders and learners.
          </p>

          {/* Multi-Modal Ingestion Pipeline Chips (Corporate EdTech Design) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-burgundy-950/70 border border-champagne-500/20 p-2.5 rounded-xl text-left">
              <span className="text-[10px] uppercase font-bold text-champagne-400/90 block">Modality I · Discourse</span>
              <span className="text-xs font-semibold text-cream-100">Forum Interaction & Peer Dialogue</span>
            </div>
            <div className="bg-burgundy-950/70 border border-champagne-500/20 p-2.5 rounded-xl text-left">
              <span className="text-[10px] uppercase font-bold text-champagne-400/90 block">Modality II · Behavioral</span>
              <span className="text-xs font-semibold text-cream-100">Video Watch & Submission Depth</span>
            </div>
            <div className="bg-burgundy-950/70 border border-champagne-500/20 p-2.5 rounded-xl text-left">
              <span className="text-[10px] uppercase font-bold text-champagne-400/90 block">Modality III · Predictive</span>
              <span className="text-xs font-semibold text-cream-100">Multi-Tier Dropout Risk Vector</span>
            </div>
            <div className="bg-burgundy-950/70 border border-champagne-500/20 p-2.5 rounded-xl text-left">
              <span className="text-[10px] uppercase font-bold text-champagne-400/90 block">Modality IV · Temporal</span>
              <span className="text-xs font-semibold text-cream-100">Autonomous MOOC Pacing & Logins</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onSelectEngine('forum')}
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl gold-gradient-bg text-burgundy-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow hover:scale-105 active:scale-95 border border-champagne-300"
            >
              <Sparkles className="w-4 h-4 text-burgundy-950" />
              <span>Launch Multi-Modal Engines</span>
            </button>

            <div className="text-xs text-cream-300 font-mono flex items-center space-x-2 bg-burgundy-950/80 px-4 py-3 rounded-xl border border-champagne-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dataset Synchronized: 500 Active Cohort Records (student_data.csv)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Macro Analytics Metrics Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-burgundy-900">
              Global Cohort Metrics
            </h2>
            <p className="text-xs text-charcoal-500 font-medium mt-0.5">
              Synthesized benchmarks representing 500 enrolled candidates
            </p>
          </div>
          
          <div className="text-xs text-burgundy-800 font-semibold bg-champagne-100/70 border border-champagne-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-burgundy-800" />
            <span>Institutional Baseline</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Enrolled */}
          <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm hover:shadow-luxury transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-burgundy-800 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Total Enrollment</span>
              <div className="w-9 h-9 rounded-xl bg-burgundy-100 flex items-center justify-center text-burgundy-800">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-burgundy-900">
              {GLOBAL_WORKSPACE_DATA.totalStudents}
            </div>
            <div className="mt-2 flex items-center text-xs text-charcoal-700 font-medium">
              <span className="text-emerald-700 font-bold mr-1">100%</span>
              <span>complete cohort validated</span>
            </div>
          </div>

          {/* Card 2: Active Engagement */}
          <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm hover:shadow-luxury transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-burgundy-800 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Active Engagement</span>
              <div className="w-9 h-9 rounded-xl bg-champagne-100 flex items-center justify-center text-burgundy-900">
                <Flame className="w-4 h-4 text-champagne-700" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-burgundy-900">
              {GLOBAL_WORKSPACE_DATA.activeEngagementPct}%
            </div>
            <div className="mt-2 flex items-center text-xs text-charcoal-700 font-medium">
              <span className="text-burgundy-800 font-bold mr-1">{GLOBAL_WORKSPACE_DATA.activeEngagementCount}</span>
              <span>learners classified as Active</span>
            </div>
          </div>

          {/* Card 3: Global At-Risk */}
          <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm hover:shadow-luxury transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-burgundy-800 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Attrition Risk (High)</span>
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-rose-900">
              {GLOBAL_WORKSPACE_DATA.dropoutRiskSummary.highPct}%
            </div>
            <div className="mt-2 flex items-center text-xs text-charcoal-700 font-medium">
              <span className="text-rose-700 font-bold mr-1">{GLOBAL_WORKSPACE_DATA.dropoutRiskSummary.high} students</span>
              <span>requiring targeted intervention</span>
            </div>
          </div>

          {/* Card 4: Global Avg Grade */}
          <div className="bg-cream-50 p-6 rounded-2xl border border-champagne-500/30 shadow-sm hover:shadow-luxury transition-all duration-200 hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-burgundy-800 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500">Mean Academic Grade</span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-burgundy-900">
              {GLOBAL_WORKSPACE_DATA.globalAverages.grade}%
            </div>
            <div className="mt-2 flex items-center text-xs text-charcoal-700 font-medium">
              <span className="text-emerald-700 font-bold mr-1">{GLOBAL_WORKSPACE_DATA.globalAverages.attendance}%</span>
              <span>average attendance cadence</span>
            </div>
          </div>

        </div>
      </section>

      {/* Global Discipline Breakdown */}
      <section className="bg-cream-50 rounded-3xl border border-champagne-500/25 p-8 shadow-luxury space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-burgundy-900">
              Academic Disciplines & Departmental Distribution
            </h3>
            <p className="text-xs text-charcoal-500">
              Comparative student retention, grade performance, and cohort density across major faculties
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs text-charcoal-500 font-medium mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Filter:
            </span>
            {["All", "AI & Machine Learning", "Design & UX Strategy", "Advanced Engineering", "Business Analytics"].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-burgundy-800 text-champagne-300 font-bold shadow-sm'
                    : 'bg-cream-200 text-charcoal-700 hover:bg-cream-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((item, idx) => (
            <div
              key={idx}
              className="bg-cream-100 rounded-2xl p-5 border border-champagne-500/20 hover:border-champagne-500/50 hover:shadow-luxury transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-serif font-bold text-burgundy-900 group-hover:text-champagne-600 transition-colors">
                  {item.name}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.riskIndex === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.riskIndex} Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 text-xs border-y border-champagne-500/10 my-3">
                <div>
                  <span className="text-charcoal-500 block text-[10px] uppercase">Enrolled Students</span>
                  <span className="text-base font-bold text-burgundy-900 font-serif">{item.students}</span>
                </div>
                <div>
                  <span className="text-charcoal-500 block text-[10px] uppercase">Average Grade</span>
                  <span className="text-base font-bold text-burgundy-900 font-serif">{item.avgGrade}%</span>
                </div>
              </div>

              {/* Attendance Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-charcoal-700">
                  <span>Attendance Rate</span>
                  <span className="font-semibold text-burgundy-900">{item.attendance}%</span>
                </div>
                <div className="h-2 w-full bg-cream-300 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full gold-gradient-bg transition-all duration-500"
                    style={{ width: `${item.attendance}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exploration Engines Showcase Selector */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-champagne-700 font-bold">
              Specialized Modules · Sector 3 Preview
            </div>
            <h3 className="text-2xl font-serif font-bold text-burgundy-900">
              The Four Exploration Engines
            </h3>
            <p className="text-xs text-charcoal-500 font-medium">
              Click any specialized engine to inspect personalized graphs, pros/cons, and launch "What If" simulations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINES_DATA.map((eng) => (
            <div
              key={eng.id}
              onClick={() => onSelectEngine(eng.id)}
              className="group cursor-pointer bg-cream-50 rounded-2xl p-6 border border-champagne-500/30 hover:border-champagne-500 hover:bg-cream-100 hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-champagne-700 bg-champagne-100 px-2 py-0.5 rounded-md border border-champagne-500/30">
                    Engine {eng.number}
                  </span>
                  <span className="text-[10px] font-bold text-burgundy-800 bg-burgundy-100 px-2 py-0.5 rounded-full">
                    {eng.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-serif font-bold text-burgundy-900 group-hover:text-champagne-700 transition-colors leading-snug">
                    {eng.title}
                  </h4>
                  <p className="text-xs text-charcoal-500 font-light mt-1 line-clamp-2 leading-relaxed">
                    {eng.tagline}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-cream-200/70 border border-champagne-500/10 space-y-1">
                  <div className="text-[10px] text-charcoal-500 uppercase tracking-wider">Active User Metric</div>
                  <div className="text-sm font-bold text-burgundy-900 font-serif flex items-center justify-between">
                    <span>{eng.userMetric}</span>
                    <span className="text-[10px] text-champagne-700 font-sans font-medium">{eng.statusBadge}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-champagne-500/15 flex items-center justify-between text-xs font-semibold text-burgundy-800 group-hover:text-champagne-600 transition-colors mt-4">
                <span>Open Dedicated Window</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

