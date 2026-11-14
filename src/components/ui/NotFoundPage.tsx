import React from 'react';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
          <Compass className="w-9 h-9 animate-spin-slow" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
          404 - Page Not Found
        </h1>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          The destination or module you are looking for does not exist or may have been relocated.
        </p>

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
        </div>
      </div>
    </div>
  );
};

