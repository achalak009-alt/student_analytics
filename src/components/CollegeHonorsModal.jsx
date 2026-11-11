import React from 'react';
import { 
  X, 
  GraduationCap, 
  Award, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  Scroll, 
  Sparkles,
  School,
  Trophy
} from 'lucide-react';

export const CollegeHonorsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-burgundy-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Pop-up Dialog Card */}
      <div 
        className="relative w-full max-w-xl bg-cream-50 rounded-3xl border border-champagne-500/40 shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Animated Golden Burst Header */}
        <div className="bg-burgundy-900 px-8 py-8 border-b border-champagne-500/30 text-center relative overflow-hidden">
          
          {/* Subtle Shimmer & Confetti Star Graphics */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-shimmer" />
          
          <div className="absolute top-4 left-6 text-champagne-400/40 animate-float">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute top-6 right-8 text-champagne-400/40 animate-float-reverse">
            <Star className="w-4 h-4" />
          </div>
          <div className="absolute bottom-4 left-10 text-champagne-400/30 animate-pulse">
            <Award className="w-6 h-6" />
          </div>

          {/* Animated Mortarboard Graduation Cap Graphic */}
          <div className="relative mx-auto w-20 h-20 rounded-3xl gold-gradient-bg p-1 flex items-center justify-center shadow-gold-glow mb-4 animate-float">
            <div className="w-full h-full bg-burgundy-950 rounded-[22px] flex items-center justify-center text-champagne-400">
              <GraduationCap className="w-10 h-10 transform -rotate-6" />
            </div>
            {/* Golden Star Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-burgundy-900 flex items-center justify-center text-burgundy-950 shadow-sm animate-pulse-glow">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          <h3 className="font-serif font-extrabold text-2xl text-cream-100 tracking-wide">
            Collegiate Academic Honors
          </h3>
          <p className="text-xs uppercase tracking-widest text-champagne-400 font-bold mt-1">
            ASPIRE Institutional Excellence Citation
          </p>
          <p className="text-xs text-cream-200/90 font-light mt-1">
            Conferred to <strong className="text-champagne-300 font-semibold">{user.name}</strong> · ID: {user.id}
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-champagne-300 flex items-center justify-center border border-champagne-500/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with Pop-up Graphics */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Honors Summary Banner */}
          <div className="bg-cream-100 p-5 rounded-2xl border border-champagne-500/30 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-champagne-100 border border-champagne-500/40 flex items-center justify-center text-burgundy-900 flex-shrink-0 animate-celebrate">
              <Trophy className="w-6 h-6 text-champagne-700" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-500 block">
                Current Standing
              </span>
              <span className="font-serif font-bold text-lg text-burgundy-900 block">
                {user.standing} · GPA {user.gpa}
              </span>
              <span className="text-xs text-emerald-800 font-semibold flex items-center space-x-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified in Top 4% of 2026 Academic Cohort</span>
              </span>
            </div>
          </div>

          {/* Academic Semester Milestones Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-charcoal-700 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-champagne-600" />
                <span>Semester 5 Curricular Progression</span>
              </span>
              <span className="font-mono font-bold text-burgundy-900">72% Completed</span>
            </div>

            <div className="h-3 w-full bg-cream-200 rounded-full overflow-hidden p-0.5 border border-champagne-500/20">
              <div 
                className="h-full rounded-full gold-gradient-bg transition-all duration-700 shadow-sm"
                style={{ width: '72%' }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-[11px] text-charcoal-600">
              <div className="p-2 rounded-xl bg-cream-100 border border-champagne-500/10">
                <span className="block font-bold text-burgundy-900 font-mono">91.5%</span>
                <span className="text-[9px] uppercase text-charcoal-500">Attendance</span>
              </div>
              <div className="p-2 rounded-xl bg-cream-100 border border-champagne-500/10">
                <span className="block font-bold text-burgundy-900 font-mono">96.0%</span>
                <span className="text-[9px] uppercase text-charcoal-500">Submissions</span>
              </div>
              <div className="p-2 rounded-xl bg-cream-100 border border-champagne-500/10">
                <span className="block font-bold text-emerald-800 font-mono">Low Risk</span>
                <span className="text-[9px] uppercase text-charcoal-500">Attrition Flag</span>
              </div>
            </div>
          </div>

          {/* Institutional Endorsement Citation */}
          <div className="p-4 rounded-2xl bg-cream-200/50 border-l-4 border-champagne-500 text-xs text-charcoal-700 space-y-1">
            <span className="font-bold text-burgundy-900 block font-serif">
              Dean's Council Endorsement:
            </span>
            <p className="italic leading-relaxed font-light">
              "Demonstrates exemplary discursive mastery and sustained self-regulated learning across all core multi-modal data science modules."
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-cream-100 px-6 sm:px-8 py-4 border-t border-champagne-500/20 flex items-center justify-between">
          <span className="text-[11px] text-charcoal-500 font-serif italic">
            ASPIRE Academic Registry · Verified
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-burgundy-950 text-xs font-bold transition-all shadow-sm border border-champagne-400 hover:scale-105 active:scale-95"
          >
            Acknowledge Honors
          </button>
        </div>

      </div>

    </div>
  );
};
