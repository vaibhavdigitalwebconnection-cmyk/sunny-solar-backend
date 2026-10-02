import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, AlertCircle } from 'lucide-react';
const logo = '/logo.webp';

interface AdminLoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loginLoading: boolean;
  loginError: string | null;
  handleLogin: (e: React.FormEvent) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  loginLoading,
  loginError,
  handleLogin
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      <Helmet>
        <title>Admin Login | Sunny Solar Management Portal</title>
        <meta
          name="description"
          content="Sign in to Sunny Solar administrative and editorial management portal."
        />
      </Helmet>
      {/* Subtle decorative background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-linear-to-b from-amber-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-3">
            <img
              src={logo}
              alt="Sunny Solar Logo"
              className="h-16 w-auto object-contain drop-shadow-xs"
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Sunny Solar Admin
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to access your content management panel
          </p>
        </div>

        {/* Error Alert */}
        {loginError && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sunnysolar.com.au"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-3 focus:ring-amber-500/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-3 focus:ring-amber-500/10 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full mt-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 transition-colors"
          >
            {loginLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Quick Link */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-3">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
          >
            <span>Back to Sunny Solar website</span>
          </a>
        </div>
      </div>
    </div>
  );
};
