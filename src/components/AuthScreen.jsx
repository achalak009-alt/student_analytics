import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  ArrowLeft,
  School,
  Award,
  KeyRound,
  Mail,
  User,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Hash
} from 'lucide-react';

const STORAGE_KEY = 'aspire_registered_users';

const DEFAULT_USERS = [
  {
    enrollmentNo: 'STU-8821',
    email: 'aiman.vance@analytics.edu',
    name: 'Aiman Vance',
    collegeName: 'ASPIRE Institute of Advanced Technology',
    branch: 'B.Tech',
    course: 'Computer Science & AI',
    password: 'password123',
    role: 'Student'
  },
  {
    enrollmentNo: 'ADM-0042',
    email: 'dean.academic@aspire.edu',
    name: 'Dr. Evelyn Sterling',
    collegeName: 'ASPIRE Global University',
    branch: 'Administration',
    course: 'Institutional Governance',
    password: 'adminpassword',
    role: 'Admin'
  }
];

export const AuthScreen = ({ onLogin, initialUser }) => {
  // Navigation mode: 'login' | 'register-step-1' | 'register-step-2' | 'forgot-verify' | 'forgot-reset'
  const [mode, setMode] = useState('login');
  
  // Notification / Alert Message
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: '' }

  // ----------------------------------------------------
  // Persistent Accounts Store
  // ----------------------------------------------------
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.error(e);
    }
  }, [accounts]);

  // ----------------------------------------------------
  // Login Form State
  // ----------------------------------------------------
  const [loginIdentifier, setLoginIdentifier] = useState('STU-8821');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginRole, setLoginRole] = useState('Student');

  // ----------------------------------------------------
  // Create Account State
  // Step 1: Academic Dossier
  // Step 2: Security Credentials
  // ----------------------------------------------------
  const [regData, setRegData] = useState({
    name: '',
    collegeName: '',
    enrollmentNo: '',
    branch: 'B.Tech',
    course: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // ----------------------------------------------------
  // Forgot Password State
  // ----------------------------------------------------
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotCollege, setForgotCollege] = useState('');
  const [verifiedAccount, setVerifiedAccount] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // Clear feedback when mode changes
  const switchMode = (newMode) => {
    setFeedback(null);
    setMode(newMode);
  };

  // ----------------------------------------------------
  // 1. Handlers for Create Account
  // ----------------------------------------------------
  const handleRegisterStep1Submit = (e) => {
    e.preventDefault();
    if (!regData.name.trim() || !regData.collegeName.trim() || !regData.enrollmentNo.trim() || !regData.course.trim()) {
      setFeedback({ type: 'error', text: 'Please complete all academic dossier fields.' });
      return;
    }

    // Check if enrollment number is already registered
    const exists = accounts.find(a => 
      a.enrollmentNo.toLowerCase() === regData.enrollmentNo.trim().toLowerCase()
    );
    if (exists) {
      setFeedback({ type: 'error', text: `Enrollment number "${regData.enrollmentNo}" is already registered. Please sign in or use another enrollment number.` });
      return;
    }

    setFeedback(null);
    setMode('register-step-2');
  };

  const handleRegisterStep2Submit = (e) => {
    e.preventDefault();
    if (!regData.email.trim() || !regData.password) {
      setFeedback({ type: 'error', text: 'Please provide both your email ID and a secure password.' });
      return;
    }

    if (regData.password.length < 6) {
      setFeedback({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (regData.password !== regData.confirmPassword) {
      setFeedback({ type: 'error', text: 'Passwords do not match. Please re-enter carefully.' });
      return;
    }

    // Check if email is already taken
    const emailExists = accounts.find(a => 
      a.email.toLowerCase() === regData.email.trim().toLowerCase()
    );
    if (emailExists) {
      setFeedback({ type: 'error', text: `Email "${regData.email}" is already associated with an account.` });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newAccount = {
        name: regData.name.trim(),
        collegeName: regData.collegeName.trim(),
        enrollmentNo: regData.enrollmentNo.trim(),
        branch: regData.branch,
        course: regData.course.trim(),
        email: regData.email.trim(),
        password: regData.password,
        role: 'Student'
      };

      setAccounts(prev => [...prev, newAccount]);
      setIsLoading(false);

      // Pre-populate login fields for convenience
      setLoginIdentifier(newAccount.enrollmentNo);
      setLoginPassword(newAccount.password);
      setLoginRole('Student');

      setFeedback({
        type: 'success',
        text: `Account for ${newAccount.name} created successfully! Please sign in with your credentials.`
      });

      // Reset registration form
      setRegData({
        name: '',
        collegeName: '',
        enrollmentNo: '',
        branch: 'B.Tech',
        course: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      setMode('login');
    }, 600);
  };

  // ----------------------------------------------------
  // 2. Handlers for Forgot Password
  // ----------------------------------------------------
  const handleForgotVerifySubmit = (e) => {
    e.preventDefault();
    if (!forgotIdentifier.trim() || !forgotCollege.trim()) {
      setFeedback({ type: 'error', text: 'Please fill in both fields to verify your identity.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const match = accounts.find(a => 
        (a.enrollmentNo.toLowerCase() === forgotIdentifier.trim().toLowerCase() ||
         a.email.toLowerCase() === forgotIdentifier.trim().toLowerCase()) &&
        a.collegeName.toLowerCase().includes(forgotCollege.trim().toLowerCase())
      );

      if (match) {
        setVerifiedAccount(match);
        setFeedback({
          type: 'success',
          text: `Verified student: ${match.name} (${match.enrollmentNo}). Please set your new password.`
        });
        setMode('forgot-reset');
      } else {
        setFeedback({
          type: 'error',
          text: 'No matching student record found with these details. Verify your Enrollment No / Email and College Name.'
        });
      }
    }, 500);
  };

  const handleForgotResetSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setFeedback({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setFeedback({ type: 'error', text: 'New passwords do not match. Please verify.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setAccounts(prev => prev.map(a => {
        if (a.enrollmentNo === verifiedAccount.enrollmentNo) {
          return { ...a, password: newPassword };
        }
        return a;
      }));

      setIsLoading(false);
      setLoginIdentifier(verifiedAccount.enrollmentNo);
      setLoginPassword(newPassword);

      setFeedback({
        type: 'success',
        text: `Password updated successfully for ${verifiedAccount.name}! Please sign in now.`
      });

      setVerifiedAccount(null);
      setNewPassword('');
      setConfirmNewPassword('');
      setForgotIdentifier('');
      setForgotCollege('');

      setMode('login');
    }, 600);
  };

  // ----------------------------------------------------
  // 3. Handlers for Login
  // ----------------------------------------------------
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const found = accounts.find(a => 
        (a.enrollmentNo.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
         a.email.toLowerCase() === loginIdentifier.trim().toLowerCase())
      );

      if (!found) {
        setFeedback({
          type: 'error',
          text: 'Account not found. Please verify your Enrollment ID or Email, or click "Create Account".'
        });
        return;
      }

      if (found.password !== loginPassword) {
        setFeedback({
          type: 'error',
          text: 'Incorrect password. Please try again or use "Forgot Password".'
        });
        return;
      }

      // Successful login
      onLogin({
        ...initialUser,
        id: found.enrollmentNo,
        name: found.name,
        email: found.email,
        degree: `${found.branch} in ${found.course}`,
        role: loginRole || found.role || 'Student',
        standing: found.role === 'Admin' ? 'Administrative Faculty' : 'Registered Scholar',
        cohort: `${found.collegeName} · Class of 2026`,
        avatarInitials: found.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-champagne-500 selection:text-burgundy-950">
      
      {/* Decorative Ambient Background Elements */}
      <div className="absolute top-0 right-0 -mr-28 -mt-28 w-96 h-96 rounded-full bg-champagne-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-28 -mb-28 w-96 h-96 rounded-full bg-burgundy-800/10 blur-3xl pointer-events-none" />

      {/* Floating College Background Graphics */}
      <div className="absolute top-12 left-16 text-champagne-500/20 hidden lg:block animate-float pointer-events-none">
        <GraduationCap className="w-24 h-24" />
      </div>
      <div className="absolute bottom-16 right-20 text-burgundy-900/10 hidden lg:block animate-float-reverse pointer-events-none">
        <Award className="w-28 h-28" />
      </div>

      {/* Main Container Card */}
      <div className="relative w-full max-w-xl bg-cream-50 rounded-3xl border border-champagne-500/40 shadow-2xl overflow-hidden animate-scale-up my-6">
        
        {/* Top University Ribbon Banner */}
        <div className="bg-burgundy-900 px-8 py-6 border-b border-champagne-500/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-shimmer" />
          
          <div className="mx-auto w-14 h-14 rounded-2xl gold-gradient-bg p-0.5 flex items-center justify-center shadow-gold-glow mb-2.5 animate-float">
            <div className="w-full h-full bg-burgundy-950 rounded-[12px] flex items-center justify-center text-champagne-400">
              <GraduationCap className="w-7 h-7" />
            </div>
          </div>

          <h2 className="font-serif font-extrabold text-2xl text-cream-100 tracking-wide">
            ASPIRE
          </h2>
          <p className="text-xs uppercase tracking-widest text-champagne-400 font-bold mt-0.5">
            Automated Student Performance Identification for Risk & Engagement
          </p>
          <p className="text-[11px] text-cream-300 font-light mt-1">
            Institutional Single Sign-On (SSO) & Multi-Modal Academic Registry
          </p>
        </div>

        {/* Global Feedback Banner */}
        {feedback && (
          <div className={`p-4 mx-6 mt-6 rounded-2xl text-xs font-semibold flex items-start space-x-2.5 animate-fade-in ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-500/30' 
              : 'bg-rose-50 text-rose-900 border border-rose-500/30'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{feedback.text}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 1: LOGIN SCREEN */}
        {/* ========================================================================= */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-8 space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-champagne-500/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-burgundy-900">
                  Campus Identity Sign-In
                </h3>
                <p className="text-xs text-charcoal-500">
                  Access your multi-modal academic intelligence dashboard
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-champagne-700 bg-champagne-100 px-2.5 py-1 rounded-md border border-champagne-500/30">
                Verified Portal
              </span>
            </div>

            {/* Role Switcher */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Select Sign-In Persona
              </label>
              <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-cream-200/80 border border-champagne-500/20">
                <button
                  type="button"
                  onClick={() => { setLoginRole('Student'); setLoginIdentifier('STU-8821'); }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                    loginRole === 'Student'
                      ? 'bg-burgundy-900 text-champagne-300 shadow-md border border-champagne-500/40'
                      : 'text-charcoal-600 hover:text-burgundy-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student Access</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setLoginRole('Admin'); setLoginIdentifier('ADM-0042'); }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
                    loginRole === 'Admin'
                      ? 'bg-burgundy-900 text-champagne-300 shadow-md border border-champagne-500/40'
                      : 'text-charcoal-600 hover:text-burgundy-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Administrator</span>
                </button>
              </div>
            </div>

            {/* Enrollment ID or Email */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Enrollment Number or Institutional Email
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500"
                  placeholder="e.g. STU-8821 or student@analytics.edu"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                  Account Password
                </label>
                <button
                  type="button"
                  onClick={() => switchMode('forgot-verify')}
                  className="text-[11px] font-bold text-champagne-700 hover:text-champagne-800 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-burgundy-950 font-serif font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow hover:scale-[1.02] active:scale-98 flex items-center justify-center space-x-2 border border-champagne-300 group"
              >
                <span>{isLoading ? 'Verifying Institutional Session...' : 'Sign In to ASPIRE Dashboard'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs text-charcoal-600 pt-1">
                <span>New student or faculty member?</span>
                <button
                  type="button"
                  onClick={() => switchMode('register-step-1')}
                  className="font-bold text-burgundy-900 hover:text-champagne-700 underline decoration-champagne-500 font-serif"
                >
                  Create Account ✦
                </button>
              </div>
            </div>

            {/* One-Click Quick Campus Logins */}
            <div className="pt-3 border-t border-champagne-500/15 text-center">
              <span className="text-[10px] uppercase font-bold text-charcoal-500 tracking-wider block mb-2">
                Instant Demo Campus Credentials
              </span>
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('STU-8821');
                    setLoginPassword('password123');
                    setLoginRole('Student');
                  }}
                  className="text-[11px] px-3 py-1.5 rounded-lg bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-semibold transition-colors"
                >
                  Aiman Vance (Student)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('ADM-0042');
                    setLoginPassword('adminpassword');
                    setLoginRole('Admin');
                  }}
                  className="text-[11px] px-3 py-1.5 rounded-lg bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-semibold transition-colors"
                >
                  Dean Sterling (Admin)
                </button>
              </div>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: CREATE ACCOUNT (STEP 1: ACADEMIC DOSSIER) */}
        {/* ========================================================================= */}
        {mode === 'register-step-1' && (
          <form onSubmit={handleRegisterStep1Submit} className="p-8 space-y-4 animate-fade-in">
            
            {/* Header & Step Indicator */}
            <div className="flex items-center justify-between border-b border-champagne-500/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-burgundy-900">
                  Create Student Account
                </h3>
                <p className="text-xs text-charcoal-500">
                  Step 1 of 2: Academic Profile & Institutional Affiliation
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-burgundy-900 bg-champagne-200 px-3 py-1 rounded-full">
                <span>Step 1</span>
                <span>/</span>
                <span>2</span>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={regData.name}
                  onChange={(e) => setRegData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="e.g. Aiman Vance or Shaik Aiman"
                  required
                />
              </div>
            </div>

            {/* College Name */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                College / University Name
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={regData.collegeName}
                  onChange={(e) => setRegData(prev => ({ ...prev, collegeName: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="e.g. National Institute of Technology, Oxford, etc."
                  required
                />
              </div>
            </div>

            {/* Enrollment Number */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Enrollment / Student Roll Number
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={regData.enrollmentNo}
                  onChange={(e) => setRegData(prev => ({ ...prev, enrollmentNo: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-bold focus:outline-none focus:border-champagne-500"
                  placeholder="e.g. 2026-CS-0412 or STU-8821"
                  required
                />
              </div>
            </div>

            {/* Branch and Course Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Branch */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                  Academic Branch
                </label>
                <select
                  value={regData.branch}
                  onChange={(e) => setRegData(prev => ({ ...prev, branch: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 text-xs font-semibold focus:outline-none focus:border-champagne-500"
                >
                  <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                  <option value="BBA">BBA (Business Administration)</option>
                  <option value="Law">Law (BA / BBA LL.B)</option>
                  <option value="B.Sc">B.Sc (Bachelor of Science)</option>
                  <option value="M.Tech">M.Tech / Post-Graduate</option>
                  <option value="Other">Other Faculty</option>
                </select>
              </div>

              {/* Course / Specialization */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                  Course / Major
                </label>
                <input
                  type="text"
                  value={regData.course}
                  onChange={(e) => setRegData(prev => ({ ...prev, course: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="e.g. Computer Science, AI, Corporate Law"
                  required
                />
              </div>

            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-between space-x-3">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal-700 text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-burgundy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center space-x-1.5"
              >
                <span>Proceed to Credentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: CREATE ACCOUNT (STEP 2: EMAIL & PASSWORD) */}
        {/* ========================================================================= */}
        {mode === 'register-step-2' && (
          <form onSubmit={handleRegisterStep2Submit} className="p-8 space-y-5 animate-fade-in">
            
            {/* Header & Step Indicator */}
            <div className="flex items-center justify-between border-b border-champagne-500/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-burgundy-900">
                  Set Security Credentials
                </h3>
                <p className="text-xs text-charcoal-500">
                  Step 2 of 2: Create password for <strong>{regData.name}</strong> ({regData.enrollmentNo})
                </p>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-champagne-950 bg-champagne-400 px-3 py-1 rounded-full">
                <span>Step 2</span>
                <span>/</span>
                <span>2</span>
              </div>
            </div>

            {/* Email ID */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={regData.email}
                  onChange={(e) => setRegData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="e.g. student@university.edu"
                  required
                />
              </div>
            </div>

            {/* Set Password */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Set Account Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={regData.password}
                  onChange={(e) => setRegData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="At least 6 characters"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={regData.confirmPassword}
                  onChange={(e) => setRegData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            {/* Registration Summary Note */}
            <div className="p-3.5 rounded-xl bg-cream-200/60 border border-champagne-500/20 text-xs text-charcoal-700 space-y-1">
              <div className="font-semibold text-burgundy-900 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Academic Record Summary</span>
              </div>
              <p className="text-[11px] text-charcoal-600">
                Registering: <strong>{regData.name}</strong> · {regData.branch} ({regData.course}) at <strong>{regData.collegeName}</strong>
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between space-x-3">
              <button
                type="button"
                onClick={() => switchMode('register-step-1')}
                className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal-700 text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Academic Info</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-burgundy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-gold-glow hover:scale-105 active:scale-95 flex items-center space-x-1.5"
              >
                <span>{isLoading ? 'Creating Account...' : 'Complete & Return to Login'}</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 4: FORGOT PASSWORD (STEP 1: VERIFY IDENTITY) */}
        {/* ========================================================================= */}
        {mode === 'forgot-verify' && (
          <form onSubmit={handleForgotVerifySubmit} className="p-8 space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-champagne-500/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-burgundy-900">
                  Password Recovery
                </h3>
                <p className="text-xs text-charcoal-500">
                  Step 1: Verify your registered academic record
                </p>
              </div>
              <HelpCircle className="w-5 h-5 text-champagne-700" />
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed font-light">
              Enter the <strong>Enrollment Number</strong> (or registered email) and the <strong>College Name</strong> you entered during registration.
            </p>

            {/* Identifier */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Registered Enrollment No. or Email ID
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="e.g. STU-8821 or student@analytics.edu"
                  required
                />
              </div>
            </div>

            {/* College Name */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Registered College / University Name
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={forgotCollege}
                  onChange={(e) => setForgotCollege(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="e.g. ASPIRE Institute or NIT"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between space-x-3">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal-700 text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-burgundy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center space-x-1.5"
              >
                <span>{isLoading ? 'Verifying...' : 'Verify Academic Record'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 5: FORGOT PASSWORD (STEP 2: SET NEW PASSWORD) */}
        {/* ========================================================================= */}
        {mode === 'forgot-reset' && (
          <form onSubmit={handleForgotResetSubmit} className="p-8 space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-champagne-500/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-burgundy-900">
                  Set New Password
                </h3>
                <p className="text-xs text-charcoal-500">
                  Verified Identity: <strong>{verifiedAccount?.name}</strong> ({verifiedAccount?.enrollmentNo})
                </p>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="At least 6 characters"
                  required
                />
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-charcoal-700 uppercase tracking-wide">
                Confirm New Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-champagne-700 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-100 border border-champagne-500/30 text-charcoal-900 font-mono text-xs font-semibold focus:outline-none focus:border-champagne-500"
                  placeholder="Re-enter new password"
                  required
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between space-x-3">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-charcoal-700 text-xs font-semibold transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-burgundy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-gold-glow hover:scale-105 active:scale-95 flex items-center space-x-1.5"
              >
                <span>{isLoading ? 'Updating...' : 'Save & Return to Login'}</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
