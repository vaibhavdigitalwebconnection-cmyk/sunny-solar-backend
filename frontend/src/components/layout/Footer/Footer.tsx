import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin} from 'lucide-react';
const logo = "/logo.webp";
import meaLogo from "../../../assets/mea-logo.webp";
import hiaLogo from "../../../assets/hia-logo.webp";
import necaLogo from "../../../assets/neca-logo.webp";
import netccLogo from "../../../assets/ASS.webp";

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61594504538865',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sunny_solar_au/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  
];

export const Footer: React.FC = () => {
  return (
    <footer>
      {/* Brand accent bar */}
      <div className="h-1 w-full bg-[#2B3CB8]" />

      {/* Main Footer */}
      <div className="bg-white border-t border-slate-200 relative overflow-hidden">
        {/* Ambient solar blue backdrop aura */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2B3CB8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

            {/* Brand */}
            <div>
              <Link to="/" className="inline-flex items-center">
                <img src={logo} alt="Sunny Solar" className="w-40 sm:w-52 max-w-full" width="208" height="80" loading="lazy" decoding="async" />
              </Link>
              
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#18181b] font-serif mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li><Link to="/about" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">About Us</Link></li>
                <li><Link to="/solar" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Solar Solutions</Link></li>
                <li><Link to="/batteries" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Battery Storage</Link></li>
                <li><Link to="/ev-charger" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block font-medium text-[#2B3CB8]">Smart EV Chargers</Link></li>
                <li><Link to="/existing-solar" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Existing Solar Solutions</Link></li>
                <li><Link to="/reviews" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Customer Reviews</Link></li>
                <li><Link to="/faq" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Contact Us</Link></li>
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#18181b] font-serif mb-3 sm:mb-4">Our Services</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li><Link to="/ev-charger" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block font-medium text-[#2B3CB8]">Smart EV Charger Installation</Link></li>
                <li><Link to="/solar/systems" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Residential Solar Systems</Link></li>
                <li><Link to="/solar/installation" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Professional Solar Installation</Link></li>
                <li><Link to="/batteries/solar-batteries" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Tesla &amp; Sungrow Batteries</Link></li>
                <li><Link to="/batteries/solar-plus-battery" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Solar + Battery Packages</Link></li>
                <li><Link to="/batteries/battery-backup" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Blackout Protection &amp; EPS</Link></li>
                <li><Link to="/existing-solar/health-check" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">24-Point Solar Health Check</Link></li>
                <li><Link to="/existing-solar/add-battery" className="hover:text-[#2B3CB8] transition-colors py-0.5 inline-block">Add Battery to Existing Solar</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#18181b] font-serif mb-3 sm:mb-4">Contact Us</h4>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <a
                  href="https://maps.google.com/?q=10A+Burralong+Dr,+Wondunna+QLD+4655,+Australia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-[#2B3CB8] transition-colors group"
                  title="View Sunny Solar location on Google Maps"
                >
                  <MapPin className="w-4 h-4 text-[#2B3CB8] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>10A Burralong Dr, Wondunna QLD 4655, Australia</span>
                </a>
                <a href="tel:1300030479" className="flex items-center gap-2.5 hover:text-[#2B3CB8] transition-colors">
                  <Phone className="w-4 h-4 text-[#2B3CB8] shrink-0" />
                  1300 030 479
                </a>
                <a href="mailto:info@sunnysolar.com.au" className="flex items-center gap-2.5 hover:text-[#2B3CB8] transition-colors">
                  <Mail className="w-4 h-4 text-[#2B3CB8] shrink-0" />
                  info@sunnysolar.com.au
                </a>

          

                {/* Social Icons */}
                <div className="flex items-center gap-2.5 pt-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Sunny Solar on ${social.label}`}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#2B3CB8] hover:border-[#2B3CB8] hover:text-white active:scale-95 transition-all duration-200 shadow-2xs"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Accreditation & Licence Strip */}
      <div className="bg-[#0C123E] border-t border-[#2B3CB8]/20 relative overflow-hidden">
        {/* Subtle deep solar blue ambient glow */}
        <div className="absolute inset-0 bg-radial from-[#2B3CB8]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">

            {/* Certification Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
              <a
                href="https://www.masterelectricians.com.au"
                target="_blank"
                rel="noopener noreferrer"
                title="Master Electricians Australia"
                className="transition-opacity hover:opacity-85"
              >
                <img
                  src={meaLogo}
                  alt="Master Electricians Australia"
                  className="h-8 sm:h-10 object-contain rounded-md"
                  width="120"
                  height="40"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href="https://hia.com.au"
                target="_blank"
                rel="noopener noreferrer"
                title="Housing Industry Association"
                className="transition-opacity hover:opacity-85"
              >
                <img
                  src={hiaLogo}
                  alt="HIA Member"
                  className="h-7 sm:h-9 object-contain"
                  width="100"
                  height="36"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
                href="https://neca.asn.au"
                target="_blank"
                rel="noopener noreferrer"
                title="National Electrical and Communications Association"
                className="transition-opacity hover:opacity-85"
              >
                <img
                  src={necaLogo}
                  alt="NECA - National Electrical and Communications Association"
                  className="h-7 sm:h-9 object-contain rounded-md"
                  width="100"
                  height="36"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a
              
                target="_blank"
                rel="noopener noreferrer"
                title="New Energy Tech Consumer Code - Approved Seller"
                className="transition-opacity hover:opacity-85"
              >
                <img
                  src={netccLogo}
                  alt="New Energy Tech Consumer Code - Approved Seller"
                  className="h-9 sm:h-11 object-contain"
                  width="120"
                  height="44"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>

            {/* Licence Numbers */}
            <div className="text-center lg:text-right">
              <span className="text-[11px] sm:text-sm text-white/80 tracking-wide">
                ©{new Date().getFullYear()} <span className="font-bold text-white">SUNNY SOLAR PTY LTD</span> • ABN 81 675 563 274
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#070A24] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-28 sm:pb-24 lg:pb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/90 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Sunny Solar Energy Pty Ltd. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-100">
            <Link to="/legal/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal/terms-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link to="/legal/terms-of-trade" className="hover:text-white transition-colors">Terms of Trade</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            <span className="text-white ">Digital Partner <a href="https://digitalwebconnection.com" target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-sm hover:text-white transition-colors">Digital Web Connection</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
