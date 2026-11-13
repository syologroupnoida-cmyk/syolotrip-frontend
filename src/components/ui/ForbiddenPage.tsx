import React from 'react';
import { ShieldAlert, ArrowLeft, Home, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const ForbiddenPage: React.FC<{
  title?: string;
  message?: string;
  requiredRole?: string;
}> = ({
  title = 'Access Denied',
  message = 'You do not have the required permissions or role to view this module.',
  requiredRole,
}) => {
  const { user, role, logout } = useAuth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
          <ShieldAlert className="w-9 h-9" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          {title}
        </h1>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {message}
        </p>

        {user ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left text-xs text-slate-600 space-y-1">
            <div>
              <span className="font-semibold text-slate-700">Signed in as:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Current Role:</span>{' '}
              <span className="inline-block px-2 py-0.5 rounded font-mono bg-amber-100 text-amber-800 font-medium">
                {role || 'None'}
              </span>
            </div>
            {requiredRole && (
              <div>
                <span className="font-semibold text-slate-700">Required Role:</span>{' '}
                <span className="inline-block px-2 py-0.5 rounded font-mono bg-blue-100 text-blue-800 font-medium">
                  {requiredRole}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left text-xs text-blue-800">
            You are currently browsing as a guest. Please sign in with an authorized account.
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>

          <a
            href="/"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </a>

          {user && (
            <button
              onClick={logout}
              className="w-full text-xs text-slate-500 hover:text-red-600 transition pt-2"
            >
              Sign out from {user.email}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

