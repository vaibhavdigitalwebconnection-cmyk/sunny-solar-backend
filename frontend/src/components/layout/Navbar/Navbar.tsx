import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
const logo = '/logo.png';
import {
  Menu,
  Phone,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { navigationData } from '../../../data/navigationData';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { Button } from '../../ui/Button';

export const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const activeSection = navigationData.find((s) => s.title === activeMenu);

  return (
    <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
      {/* Top Notification / Trust Bar (Semi-transparent & minimal) */}
      <div
        className={`text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 transition-colors duration-300 border-b ${isScrolled || !isHomePage
          ? 'bg-slate-950 text-white border-slate-800 backdrop-blur-md'
          : 'bg-white text-slate-900 border-slate-200/60 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <span className="flex items-center gap-1 text-[#2B3CB8] font-bold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
              <span className="hidden sm:inline">NETCC APPROVED SELLER</span>
              <span className="sm:hidden">CEC Approved</span>
            </span>
            <span
              className={`hidden md:inline-flex items-center gap-1.5 font-bold text-[11px] px-2.5 py-0.5 rounded-full transition-all ${isScrolled || !isHomePage
                ? 'text-[#D1DCF8] bg-[#0C123E] border border-[#2B3CB8]/40 shadow-xs'
                : 'text-[#2B3CB8] bg-[#F5F7FD] border border-[#D1DCF8] shadow-2xs'
                }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B3CB8] inline-block animate-pulse" />
              25-Year Performance Warranty
            </span>
            <span
              className={`hidden lg:inline-block ${isScrolled || !isHomePage ? 'text-slate-200' : 'text-slate-700'
                }`}
            >
              • Over 4,200+ Homes Powered
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/service-areas"
              className={`transition-colors hidden sm:inline ${isScrolled || !isHomePage
                ? 'text-slate-200 hover:text-[#2B3CB8]'
                : 'text-slate-700 hover:text-[#2B3CB8]'
                }`}
            >
              Gold Coast • Brisbane • Sunshine Coast
            </Link>
            <a
              href="tel:1300030479"
              className={`flex items-center gap-1.5 font-bold transition-colors ${isScrolled || !isHomePage
                ? 'text-white hover:text-[#2B3CB8]'
                : 'text-slate-900 hover:text-[#2B3CB8]'
                }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#2B3CB8] shrink-0" />
              <span>1300 030 479</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Transparent / Glass Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl text-black shadow-lg py-1.5'
          : isHomePage
            ? 'bg-white py-2 sm:py-1 text-black'
            : 'bg-white/95 backdrop-blur-md py-2 sm:py-1 text-black'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="Sunny Solar"
                className="h-10 sm:h-14 lg:h-18 w-auto object-contain transition-all duration-200"
              />
            </div>
          </Link>

          {/* Desktop Nav Links (Clean, bold, uppercase with Logo colors) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navigationData.map((section) => {
              const hasChildren = Boolean(section.children?.items?.length);
              const isActive =
                location.pathname === section.href ||
                (section.children?.items.some((item) => location.pathname === item.href) ?? false);
              const isMenuOpen = activeMenu === section.title;

              return (
                <div
                  key={section.title}
                  className="relative py-1 group"
                  onMouseEnter={() => hasChildren && setActiveMenu(section.title)}
                >
                  <Link
                    to={section.href}
                    onClick={() => !hasChildren && setActiveMenu(null)}
                    className={`px-2 py-1 rounded-lg text-base font-semibold tracking-wide flex items-center gap-1.5 transition-all duration-150 ${isActive
                      ? isScrolled
                        ? 'text-[#2B3CB8] bg-[#2B3CB8]/10 font-bold'
                        : 'text-[#2B3CB8] bg-[#2B3CB8]/10 font-bold'
                      : isMenuOpen
                        ? 'text-[#2B3CB8] bg-[#F5F7FD] font-semibold'
                        : isScrolled
                          ? 'text-[#0C123E] hover:text-[#2B3CB8] hover:bg-[#F5F7FD]'
                          : 'text-[#0C123E] hover:text-[#2B3CB8] hover:bg-[#F5F7FD]'
                      }`}
                  >
                    <span>{section.title}</span>
                    {hasChildren && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isMenuOpen
                          ? 'rotate-180 text-[#2B3CB8]'
                          : isActive
                            ? isScrolled
                              ? 'text-[#2B3CB8]'
                              : 'text-[#2B3CB8]'
                            : isScrolled
                              ? 'text-[#0C123E]/70 group-hover:text-[#2B3CB8]'
                              : 'text-[#0C123E]/80 group-hover:text-[#2B3CB8]'
                          }`}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                className="rounded-full text-xs uppercase tracking-wider font-extrabold shadow-lg shadow-[#2B3CB8]/25 bg-linear-to-r from-[#2B3CB8] via-[#2433A1] to-[#1D2984] hover:from-[#1D2984] hover:to-[#2B3CB8] text-white border-0"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Free Assessment
              </Button>
            </div>



            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 min-w-11 min-h-11 flex items-center justify-center rounded-xl transition-all lg:hidden cursor-pointer text-slate-800 hover:bg-slate-100 hover:text-[#2B3CB8] active:scale-95 border border-slate-200/80 shadow-2xs"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        {activeSection && activeSection.children && (
          <MegaMenu
            section={activeSection}
            isOpen={Boolean(activeMenu)}
            onClose={() => setActiveMenu(null)}
          />
        )}
      </nav>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
