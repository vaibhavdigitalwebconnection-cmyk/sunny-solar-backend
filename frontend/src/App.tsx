import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { SmoothScroll } from './components/common/SmoothScroll.tsx';
import { Navbar } from './components/layout/Navbar/Navbar';
import { Footer } from './components/layout/Footer/Footer';
import { MobileStickyActionBar } from './components/layout/MobileStickyActionBar';
import { WebsiteStartupLoader } from './components/layout/WebsiteStartupLoader';
import { AppRoutes } from './routes/AppRoutes';
import { LazyMotionProvider } from './components/common/LazyMotionProvider';
import { api } from './services/api';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Automatic 14-minute health ping to keep Render server awake (deferred so it never blocks initial render)
  useEffect(() => {
    const pingHealth = () => {
      api.getHealth().catch(() => { });
    };

    const initialTimer = setTimeout(pingHealth, 6000);
    const intervalId = setInterval(pingHealth, 14 * 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, []);

  // Completely separate layout for Admin Portal: no public header, footer, or sticky bar
  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#2B3CB8] selection:text-white">
          <AppRoutes />
        </div>
      </>
    );
  }

  // Standard public website layout
  return (
    <>
      <ScrollToTop />
      <WebsiteStartupLoader />
      <div className="flex flex-col min-h-screen selection:bg-[#2B3CB8] selection:text-white relative">
        <Navbar />
        <main className="grow min-h-screen">
          <AppRoutes />
        </main>
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 550px' }}>
          <Footer />
        </div>
        <MobileStickyActionBar />
      </div>
    </>
  );
}

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LazyMotionProvider>
          <SmoothScroll>
            <AppLayout />
          </SmoothScroll>
        </LazyMotionProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
