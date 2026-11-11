import React from 'react';
import { 
  User, 
  LayoutDashboard, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  ChevronRight,
  Shield,
  GraduationCap,
  SlidersHorizontal,
  Award
} from 'lucide-react';

export const Navbar = ({ 
  activeSector, 
  setActiveSector, 
  user, 
  setUser, 
  activeEngineId, 
  setActiveEngineId,
  onOpenProfileModal,
  onOpenCollegeHonors
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-burgundy-800 text-cream-100 border-b border-champagne-500/30 shadow-luxury backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => { setActiveSector('workspace'); setActiveEngineId(null); }}>
            <div className="w-11 h-11 rounded-xl gold-gradient-bg p-0.5 flex items-center justify-center shadow-gold-glow flex-shrink-0">
              <div className="w-full h-full bg-burgundy-900 rounded-[10px] flex items-center justify-center">
                <span className="font-serif font-bold text-champagne-400 text-lg tracking-tight">✦</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-extrabold text-2xl tracking-wider text-cream-100">ASPIRE</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-champagne-400 bg-burgundy-900/90 px-2 py-0.5 rounded-full border border-champagne-500/40 hidden sm:inline-block">
                  Multi-Modal EdTech
                </span>
              </div>
              <p className="text-[10px] text-cream-300/90 font-medium tracking-tight max-w-[280px] sm:max-w-md truncate">
                Automated Student Performance Identification for Risk and Engagement
              </p>
            </div>
          </div>

          {/* 4 Navigation Sectors */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-burgundy-900/60 p-1.5 rounded-2xl border border-champagne-500/20 backdrop-blur-md">
            
            {/* Sector 1: Profile Preview / Button */}
            <button
              onClick={onOpenProfileModal}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group ${
                activeSector === 'profile' 
                  ? 'bg-burgundy-800 text-champagne-300 shadow-sm border border-champagne-500/30' 
                  : 'text-cream-200 hover:text-champagne-300 hover:bg-burgundy-800/50'
              }`}
              title="Inspect User Account & Dossier"
            >
              <div className="w-6 h-6 rounded-full bg-champagne-500/20 border border-champagne-500/40 flex items-center justify-center text-champagne-400 text-[10px] font-bold">
                {user.avatarInitials}
              </div>
              <div className="text-left hidden lg:block">
                <span className="block text-[11px] font-semibold text-cream-100 leading-tight">{user.name}</span>
                <span className="block text-[9px] text-champagne-400/90 leading-tight">Sector 1 · Profile</span>
              </div>
            </button>

            <div className="h-4 w-px bg-champagne-500/20" />

            {/* Sector 2: Workspace */}
            <button
              onClick={() => { setActiveSector('workspace'); setActiveEngineId(null); }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeSector === 'workspace' && !activeEngineId
                  ? 'bg-champagne-500 text-burgundy-950 shadow-gold-glow font-bold'
                  : 'text-cream-200 hover:text-champagne-300 hover:bg-burgundy-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Workspace</span>
            </button>

            {/* Sector 3: Exploration Engines */}
            <button
              onClick={() => { setActiveSector('engines'); }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeSector === 'engines' || activeEngineId
                  ? 'bg-champagne-500 text-burgundy-950 shadow-gold-glow font-bold'
                  : 'text-cream-200 hover:text-champagne-300 hover:bg-burgundy-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-inherit" />
              <span>Exploration Engines</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-burgundy-950/20 font-bold">
                4
              </span>
            </button>

            {/* Sector 4: Platform Status */}
            <button
              onClick={() => { setActiveSector('status'); setActiveEngineId(null); }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeSector === 'status'
                  ? 'bg-champagne-500 text-burgundy-950 shadow-gold-glow font-bold'
                  : 'text-cream-200 hover:text-champagne-300 hover:bg-burgundy-800/50'
              }`}
            >
              <div className="relative">
                <Activity className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span>Platform Status</span>
            </button>
          </nav>

          {/* Role Control Switcher & Fast Actions */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* College Honors & Milestones Pop-up Trigger */}
            <button
              onClick={onOpenCollegeHonors}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-champagne-500/15 hover:bg-champagne-500/25 text-champagne-300 border border-champagne-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 group"
              title="Open Collegiate Honors & Milestone Pop-up"
            >
              <Award className="w-3.5 h-3.5 text-champagne-400 group-hover:scale-110 transition-transform animate-float" />
              <span>Campus Honors</span>
            </button>

            {/* Verified Fixed Role Badge (Switching Disabled) */}
            <div 
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-burgundy-900/90 border border-champagne-500/30 text-cream-100 shadow-sm cursor-default"
              title={`Authenticated Identity: ${user.role} (Role switching is strictly disabled)`}
            >
              {user.role === 'Admin' ? (
                <>
                  <SlidersHorizontal className="w-3.5 h-3.5 text-champagne-400" />
                  <span className="text-xs font-bold text-champagne-300">Admin Mode</span>
                </>
              ) : (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-champagne-400" />
                  <span className="text-xs font-bold text-cream-200">Student View</span>
                </>
              )}
            </div>

            {/* Account Quick Trigger */}
            <button
              onClick={onOpenProfileModal}
              className="w-10 h-10 rounded-xl bg-burgundy-900/80 hover:bg-burgundy-700 border border-champagne-500/30 flex items-center justify-center text-champagne-400 hover:text-champagne-300 transition-all duration-200 shadow-sm"
              title="View Account Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
      
      {/* Sub-sector Breadcrumb Ribbon if inside an Engine */}
      {activeEngineId && (
        <div className="bg-burgundy-900/90 border-t border-champagne-500/10 px-4 sm:px-8 py-2 text-xs flex items-center justify-between text-cream-300">
          <div className="flex items-center space-x-2">
            <span 
              onClick={() => { setActiveSector('workspace'); setActiveEngineId(null); }}
              className="hover:text-champagne-400 cursor-pointer font-medium"
            >
              Workspace
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-champagne-500/60" />
            <span 
              onClick={() => { setActiveSector('engines'); setActiveEngineId(null); }}
              className="hover:text-champagne-400 cursor-pointer font-medium"
            >
              Exploration Engines
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-champagne-500/60" />
            <span className="text-champagne-400 font-semibold uppercase tracking-wider">
              Engine {activeEngineId} Active
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-champagne-500 animate-ping" />
            <span className="text-[11px] text-champagne-300 font-serif italic">
              Active Personalized Dossier: {user.name} ({user.id})
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

