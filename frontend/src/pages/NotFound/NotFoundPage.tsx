import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';
import { m } from 'framer-motion';
import { Particles } from '../../components/ui/Particles';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-[75vh] flex items-center justify-center bg-white px-4 py-20 overflow-hidden">
      <Particles
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={35}
        color="#2B3CB8"
        size={0.6}
        staticity={40}
      />
      <Helmet>
        <title>404 - Page Not Found | Sunny Solar</title>
        <meta
          name="description"
          content="The page you are looking for does not exist or has been moved."
        />
      </Helmet>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center space-y-4"
      >
        {/* 404 in Big Font */}
        <h1 className="text-8xl sm:text-9xl font-black text-[#2B3CB8] tracking-tight leading-none">
          404
        </h1>

        {/* Page Not Found in bottom */}
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Page Not Found
        </p>

        {/* Go to Home Page */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#2B3CB8] hover:from-[#1D2984] hover:to-[#2B3CB8] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home Page</span>
          </Link>
        </div>
      </m.div>
    </div>
  );
};

export default NotFoundPage;
