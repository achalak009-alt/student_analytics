import React from 'react';
import { 
  X, 
  User, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const ProfileModal = ({ 
  isOpen, 
  onClose, 
  user, 
  setUser 
}) => {
  if (!isOpen) return null;

  const toggleRole = () => {
    const newRole = user.role === 'Student' ? 'Admin' : 'Student';
    setUser(prev => ({ ...prev, role: newRole }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-burgundy-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-cream-100 rounded-3xl border border-champagne-500/40 shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Ribbon */}
        <div className="bg-burgundy-900 px-6 sm:px-8 py-5 border-b border-champagne-500/30 flex items-center justify-between text-cream-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-burgundy-950 shadow-gold-glow">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-cream-100">
                User Account Profile & Dossier
              </h3>
              <p className="text-xs text-cream-300 font-light">
                Sector 1 · Institutional Identity & Role Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-champagne-300 flex items-center justify-center border border-champagne-500/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Identity Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 bg-cream-50 p-6 rounded-2xl border border-champagne-500/30">
            <div className="w-16 h-16 rounded-2xl bg-burgundy-900 text-champagne-300 font-serif font-bold text-xl flex items-center justify-center shadow-luxury flex-shrink-0 border-2 border-champagne-400">
              {user.avatarInitials}
            </div>
            
            <div className="space-y-1 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-xl font-serif font-bold text-burgundy-900">
                  {user.name}
                </h4>
                
                {/* Active Role Badge with Interactive Switch */}
                <button
                  onClick={toggleRole}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all bg-burgundy-100 text-burgundy-900 hover:bg-champagne-200 border border-champagne-500/30"
                  title="Click to toggle between Student (View-Only) and Admin (Editable)"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-champagne-700" />
                  <span>Role: {user.role} (Switch)</span>
                </button>
              </div>

              <p className="text-xs text-charcoal-600 font-medium">{user.degree}</p>
              
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-charcoal-500">
                <span className="bg-cream-200 px-2 py-0.5 rounded font-mono">ID: {user.id}</span>
                <span className="bg-cream-200 px-2 py-0.5 rounded">{user.cohort}</span>
                <span className="bg-champagne-100 text-champagne-800 font-semibold px-2 py-0.5 rounded">{user.standing}</span>
              </div>
            </div>
          </div>

          {/* Academic Courses Enrolled */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-charcoal-600 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-champagne-600" />
              <span>Current Enrolled Curricula ({user.currentSemester})</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user.activeCourses.map((course, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-cream-50 border border-champagne-500/20 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono font-bold text-burgundy-900 block">{course.code}</span>
                    <span className="text-charcoal-600 text-[11px] block">{course.title}</span>
                  </div>
                  <span className="font-mono font-bold text-burgundy-900 bg-cream-200 px-2 py-1 rounded">
                    {course.grade}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Access & Security Dossier */}
          <div className="p-4 rounded-2xl bg-cream-200/50 border border-champagne-500/15 text-xs text-charcoal-700 space-y-2">
            <div className="flex items-center space-x-2 text-burgundy-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Authorization & Session Integrity</span>
            </div>
            <p className="leading-relaxed font-light">
              Authenticated via institutional Single Sign-On (SSO). Permissions currently set to <strong>{user.role} View</strong>. In Admin View, direct record updates in Exploration Engines will dynamically recalculate institutional benchmarks.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-cream-50 px-6 sm:px-8 py-4 border-t border-champagne-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-burgundy-900 hover:bg-burgundy-800 text-cream-100 text-xs font-bold transition-colors"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};

