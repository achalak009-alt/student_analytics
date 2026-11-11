import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  School,
  Award,
  KeyRound
} from 'lucide-react';

export const AuthScreen = ({ onLogin, initialUser }) => {
  const [selectedRole, setSelectedRole] = useState('Student');
  const [studentId, setStudentId] = useState('STU-8821');
  const [passcode, setPasscode] = useState('••••••••••••');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(selectedRole);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-champagne-500 selection:text-burgundy-950">
      
      {/* Decorative Collegiate Ambient Background Elements */}
      <div className="absolute top-0 right-0 -mr-28 -mt-28 w-96 h-96 rounded-full bg-champagne-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-28 -mb-28 w-96 h-96 rounded-full bg-burgundy-800/10 blur-3xl pointer-events-none" />

      {/* Floating College Background Graphics */}
      <div className="absolute top-12 left-16 text-champagne-500/20 hidden lg:block animate-float pointer-events-none">
        <GraduationCap className="w-24 h-24" />
      </div>
      <div className="absolute bottom-16 right-20 text-burgundy-900/10 hidden lg:block animate-float-reverse pointer-events-none">
        <Award className="w-28 h-28" />
      </div>

      {/* Main Luxury College Authentication Card */}
      <div className="relative w-full max-w-lg bg-cream-50 rounded-3xl border border-champagne-500/40 shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Top University Ribbon Banner */}
        <div className="bg-burgundy-900 px-8 py-7 border-b border-champagne-500/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-shimmer" />
          
          {/* Animated College Mortarboard Seal */}
          <div className="mx-auto w-16 h-16 rounded-2xl gold-gradient-bg p-0.5 flex items-center justify-center shadow-gold-glow mb-3 animate-float">
            <div className="w-full h-full bg-burgundy-950 rounded-[14px] flex items-center justify-center text-champagne-400">
              <GraduationCap className="w-8 h-8" />
            </div>
          </div>

          <h2 className="font-serif font-extrabold text-2xl text-cream-100 tracking-wide">
            ASPIRE
          </h2>
          <p className="text-xs uppercase tracking-widest text-champagne-400 font-bold mt-1">
            Institutional Single Sign-On (SSO) Portal
          </p>
          <p className="text-[11px] text-cream-300 font-light mt-1">
            Automated Student Performance Identification for Risk and Engagement
          </p>
        </div>

        {/* Login Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Role Selection Tabs */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
              Select Institutional Credential
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-cream-200/80 border border-champagne-500/20">
              <button
                type="button"
                onClick={() => { setSelectedRole('Student'); setStudentId('STU-8821'); }}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                  selectedRole === 'Student'
                    ? 'bg-burgundy-900 text-champagne-300 shadow-md border border-champagne-500/40'
                    : 'text-charcoal-600 hover:text-burgundy-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Access</span>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedRole('Admin'); setStudentId('ADM-0042'); }}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                  selectedRole === 'Admin'
                    ? 'bg-burgundy-900 text-champagne-300 shadow-md border border-champagne-500/40'
                    : 'text-charcoal-600 hover:text-burgundy-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Administrator</span>
              </button>
            </div>
          </div>

          {/* Student ID / Username */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
              {selectedRole === 'Student' ? 'Student University ID' : 'Institutional Admin ID'}
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500"
                placeholder="e.g. STU-8821"
                required
              />
            </div>
          </div>

          {/* Passcode */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
              Campus Security Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500"
                required
              />
            </div>
          </div>

          {/* Institutional Trust Notice */}
          <div className="p-3.5 rounded-xl bg-cream-200/60 border border-champagne-500/15 text-[11px] text-charcoal-600 flex items-center space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Encrypted Single Sign-On with automatic FERPA academic data governance.</span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-burgundy-950 font-serif font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow hover:scale-[1.02] active:scale-98 flex items-center justify-center space-x-2 border border-champagne-300 group"
          >
            <span>{isAuthenticating ? 'Authenticating Credentials...' : 'Sign In to ASPIRE Platform'}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          {/* One-Click Demo Fast Logins */}
          <div className="pt-2 border-t border-champagne-500/20 text-center">
            <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider block mb-2">
              Instant One-Click Campus Authentication
            </span>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => onLogin('Student')}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-semibold transition-colors"
              >
                Log In as Aiman Vance (Student)
              </button>
              <button
                type="button"
                onClick={() => onLogin('Admin')}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-semibold transition-colors"
              >
                Log In as Dean (Admin)
              </button>
            </div>
          </div>

        </form>

      </div>

    </div>
  );
};
