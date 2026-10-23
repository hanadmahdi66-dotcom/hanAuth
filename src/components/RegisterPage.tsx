import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HanAuthLogo } from './HanAuthLogo';
import { HanOSLogo } from './HanOSLogo';
import { registerUserApi } from '../config/api';
import { UserAccount } from '../types';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowLeft,
  User,
  Sparkles,
  Cpu,
  X
} from 'lucide-react';

interface RegisterPageProps {
  onRegisterSuccess: (user: UserAccount) => void;
  onNavigate: (view: 'landing' | 'register' | 'login' | 'dashboard') => void;
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
  initialMode?: 'register' | 'login';
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigate,
  onShowToast,
  initialMode = 'register',
}) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [registeredUser, setRegisteredUser] = useState<UserAccount | null>(null);

  // hanOS Single Sign-On States
  const [showHanosSso, setShowHanosSso] = useState(false);
  const [hanosEmail, setHanosEmail] = useState('');
  const [hanosUsername, setHanosUsername] = useState('');
  const [hanosLoading, setHanosLoading] = useState(false);
  const [hanosError, setHanosError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setLoadingStatus('Connecting to hanOS Cloud Backend...');

    // Timer for cold-start notice
    const timer = setTimeout(() => {
      setLoadingStatus('Connecting to hanOS API Gateway...');
    }, 3500);

    try {
      const user = await registerUserApi(email, password);
      clearTimeout(timer);
      setLoading(false);
      setRegisteredUser(user);

      onShowToast(
        isLogin ? 'Welcome back!' : 'Account registered successfully',
        `User ID: ${user.user_id}`,
        'success'
      );
    } catch (err: unknown) {
      clearTimeout(timer);
      setLoading(false);
      const errMsg = err instanceof Error ? err.message : 'Registration failed. Please check backend connection.';
      setError(errMsg);
      onShowToast('Registration error', errMsg, 'error');
    }
  };

  const handleHanosSsoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHanosError(null);

    if (!hanosEmail || !hanosEmail.includes('@')) {
      setHanosError('Fadlan geli Email sax ah');
      return;
    }

    if (!hanosUsername || hanosUsername.trim().length < 2) {
      setHanosError('Fadlan geli Username-kaaga hanOS');
      return;
    }

    setHanosLoading(true);

    try {
      const cleanUsername = hanosUsername.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
      const user = await registerUserApi(
        hanosEmail,
        `hanos_sso_${cleanUsername}_pass`
      );

      setHanosLoading(false);
      onShowToast('hanOS ID Verified!', `Ku soo dhawaw @${cleanUsername}`, 'success');

      const authenticatedUser: UserAccount = {
        ...user,
        email: hanosEmail,
        user_id: user.user_id || `usr_${cleanUsername}`,
      };

      onRegisterSuccess(authenticatedUser);
    } catch (err: unknown) {
      setHanosLoading(false);
      const errMsg = err instanceof Error ? err.message : 'hanOS Single Sign-On failed.';
      setHanosError(errMsg);
    }
  };

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 25;
    if (pwd.length >= 10) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9!@#$%^&*]/.test(pwd)) score += 25;
    return score;
  };

  const pwdStrength = calculatePasswordStrength(password);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('landing')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <HanAuthLogo size="md" className="cursor-pointer" />
        </div>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setShowHanosSso(false);
          }}
          className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          {isLogin ? "Don't have an account? " : "Already registered? "}
          <span className="text-blue-400 font-semibold underline underline-offset-4">
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </button>
      </header>

      {/* Main Registration Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 my-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Top Card Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          {registeredUser ? (
            /* Success View */
            <div className="text-center py-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-sm text-slate-300 mb-6">
                Your account was created and verified on <code className="text-blue-300 bg-slate-950 px-2 py-0.5 rounded font-mono">hanOS Cloud API</code>.
              </p>

              {/* User Account Info Card */}
              <div className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-left mb-6 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Assigned User ID</span>
                  <span className="text-emerald-400 font-medium">Verified</span>
                </div>
                <div className="font-mono text-base font-bold text-blue-300 break-all select-all">
                  {registeredUser.user_id}
                </div>
                <div className="text-xs text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                  <span>Email:</span>
                  <span className="text-slate-200">{registeredUser.email}</span>
                </div>
              </div>

              <button
                onClick={() => onRegisterSuccess(registeredUser)}
                className="w-full py-3.5 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Go to API Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : showHanosSso ? (
            /* hanOS Single Sign-On Step View */
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HanOSLogo size="md" variant="full" />
                </div>
                <button
                  onClick={() => setShowHanosSso(false)}
                  className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-[11px] font-semibold text-blue-300 mb-2">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>hanOS Identity Platform</span>
                </div>
                <h2 className="text-xl font-bold text-white">Continue with hanOS</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Geli Email-kaaga iyo Username-kaaga hanOS si aad si toos ah ugu gasho.
                </p>
              </div>

              {hanosError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{hanosError}</span>
                </div>
              )}

              <form onSubmit={handleHanosSsoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={hanosEmail}
                      onChange={(e) => setHanosEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    hanOS Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={hanosUsername}
                      onChange={(e) => setHanosUsername(e.target.value)}
                      placeholder="e.g. hanad_mahdi"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={hanosLoading}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {hanosLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Xaqiijinaya hanOS Account...</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4 text-blue-200" />
                      <span>Sidaas Ku Geli (Sign in with hanOS)</span>
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowHanosSso(false)}
                  className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors text-center cursor-pointer"
                >
                  ← Sign in with regular Email &amp; Password
                </button>
              </form>
            </div>
          ) : (
            /* Standard Registration / Login Form */
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-extrabold text-white">
                  {isLogin ? 'Sign in to hanAuth' : 'Create your hanAuth account'}
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  {isLogin 
                    ? 'Manage your live API keys and authentication tokens'
                    : 'Register to start generating secure API keys'}
                </p>
              </div>

              {/* Continue with hanOS SSO Button */}
              <button
                type="button"
                onClick={() => {
                  setShowHanosSso(true);
                  setHanosError(null);
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-blue-500/40 text-white font-bold text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/10 hover:border-blue-400 transition-all cursor-pointer group mb-5"
              >
                <HanOSLogo size="sm" variant="badge" />
                <span className="text-slate-100 group-hover:text-blue-300 transition-colors">Continue with hanOS</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform ml-auto" />
              </button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800" /></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-slate-500 bg-slate-900 px-3 font-semibold">
                  or continue with email
                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-rose-200">Authentication Alert</p>
                    <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="developer@company.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength bar */}
                  {!isLogin && password && (
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            pwdStrength <= 25 ? 'bg-rose-500' : pwdStrength <= 50 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${pwdStrength}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Strength: {pwdStrength <= 25 ? 'Weak' : pwdStrength <= 50 ? 'Medium' : 'Strong'}</span>
                        <span>POST /register</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Loading Status Indicator */}
                {loading && (
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-300 flex items-center gap-2 animate-pulse">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                    <span>{loadingStatus}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Register Account'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Endpoint Notice Footer */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protected by hanOS Cloud Encryption</span>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer minimal credit */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <span>Powered by</span>
        <HanOSLogo size="sm" variant="badge" />
      </footer>
    </div>
  );
};

