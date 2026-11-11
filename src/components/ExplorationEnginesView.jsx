import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquareText, 
  Flame, 
  ShieldAlert, 
  Compass, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ENGINES_DATA } from '../data/mockData';

export const ExplorationEnginesView = ({ onSelectEngine, user }) => {
  const getIcon = (id) => {
    switch (id) {
      case 'forum': return <MessageSquareText className="w-6 h-6 text-champagne-600" />;
      case 'engagement': return <Flame className="w-6 h-6 text-burgundy-700" />;
      case 'risk': return <ShieldAlert className="w-6 h-6 text-rose-700" />;
      case 'mooc': return <Compass className="w-6 h-6 text-amber-700" />;
      default: return <Sparkles className="w-6 h-6 text-champagne-500" />;
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* Sector Header */}
      <div className="bg-cream-50 p-8 sm:p-10 rounded-3xl border border-champagne-500/30 shadow-luxury relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-champagne-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-burgundy-900 text-champagne-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>Sector 3 · ASPIRE Multi-Modal Exploration Engines</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy-900 leading-tight">
            Multi-Modal Analytical Engines
          </h1>
          
          <p className="text-sm text-charcoal-700 font-normal leading-relaxed max-w-2xl">
            Four specialized diagnostic modalities calibrated under the <strong>ASPIRE Multi-Modal Learning Approach</strong>. Each module ingests distinct behavioral and academic signals to detect subtle early markers of disengagement and academic vulnerability.
          </p>

          <div className="pt-2 flex items-center space-x-4 text-xs text-charcoal-600 font-medium">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-champagne-500" />
              <span>Active Target: <strong>{user.name}</strong></span>
            </span>
            <span className="text-champagne-500/40">|</span>
            <span>Role: <strong className="text-burgundy-800">{user.role}</strong> ({user.role === 'Admin' ? 'Editable Dataset Fields' : 'View-Only'})</span>
          </div>
        </div>
      </div>

      {/* The 4 Engines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ENGINES_DATA.map((eng) => (
          <div
            key={eng.id}
            onClick={() => onSelectEngine(eng.id)}
            className="group cursor-pointer bg-cream-50 rounded-3xl p-8 border border-champagne-500/30 hover:border-champagne-500 hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5 relative overflow-hidden"
          >
            {/* Subtle Metallic Corner Ribbon */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-champagne-500/10 to-transparent pointer-events-none rounded-tr-3xl" />

            <div className="space-y-6">
              
              {/* Top Meta Line */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cream-200 border border-champagne-500/30 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {getIcon(eng.id)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-champagne-700 bg-champagne-100/80 px-2.5 py-1 rounded-lg border border-champagne-500/30">
                    Engine {eng.number}
                  </span>
                  <span className="text-[11px] font-bold text-burgundy-800 bg-burgundy-100 px-3 py-1 rounded-full">
                    {eng.category}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-burgundy-900 group-hover:text-champagne-700 transition-colors">
                  {eng.title}
                </h3>
                <p className="text-xs font-medium text-champagne-700 uppercase tracking-wider mt-1">
                  {eng.subtitle}
                </p>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light mt-3">
                  {eng.description}
                </p>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-cream-100 border border-champagne-500/20">
                <div>
                  <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block">Personal Metric</span>
                  <span className="text-base font-bold font-serif text-burgundy-900">{eng.userMetric}</span>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-500 uppercase tracking-wider block">Cohort Benchmark</span>
                  <span className="text-base font-bold font-serif text-charcoal-700">{eng.cohortBenchmark}</span>
                </div>
              </div>

              {/* Core Finding Teaser */}
              <div className="text-xs text-charcoal-600 bg-cream-200/50 p-3.5 rounded-xl border-l-2 border-champagne-500 italic">
                "{eng.keyFinding}"
              </div>

            </div>

            {/* Launch CTA */}
            <div className="mt-8 pt-5 border-t border-champagne-500/20 flex items-center justify-between">
              <span className="text-xs font-bold text-burgundy-900 group-hover:text-champagne-700 transition-colors flex items-center space-x-1.5">
                <span>Enter Dedicated Topic Window</span>
              </span>
              <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center text-burgundy-950 shadow-sm group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

