import React from 'react';
import { ShieldCheck } from 'lucide-react';

// Brand logos from assets/logo-brands
import foxLogo from '@/assets/logo-brands/fox.png';
import bydLogo from '@/assets/logo-brands/byd.png';
import alphaLogo from '@/assets/logo-brands/alpha.png';
import canadianSolarLogo from '@/assets/logo-brands/canadian-solar-australia.png';
import jinkoLogo from '@/assets/logo-brands/jinko-solar.jpg';
import solaxLogo from '@/assets/logo-brands/solax.png';
import growattLogo from '@/assets/logo-brands/growatt.jpg';
import sigenergyLogo from '@/assets/logo-brands/sigenergy.png';
import teslaLogo from '@/assets/logo-brands/tesla.png';
import dasolarLogo from '@/assets/logo-brands/dasolar.png';
import longiLogo from '@/assets/logo-brands/longi.jpg';
import suntechLogo from '@/assets/logo-brands/suntech.png';

interface BrandItem {
  name: string;
  logo: string;
}

const brands: BrandItem[] = [
  { name: 'Fox ESS', logo: foxLogo },
  { name: 'BYD', logo: bydLogo },
  { name: 'Alpha·ESS', logo: alphaLogo },
  { name: 'CanadianSolar Australia', logo: canadianSolarLogo },
  { name: 'JinkoSolar', logo: jinkoLogo },
  { name: 'SolaX Power', logo: solaxLogo },
  { name: 'Growatt', logo: growattLogo },
  { name: 'Sigenergy', logo: sigenergyLogo },
  { name: 'Tesla', logo: teslaLogo },
  { name: 'DASOLAR', logo: dasolarLogo },
  { name: 'LONGi', logo: longiLogo },
  { name: 'SUNTECH', logo: suntechLogo },
];

// Repeat brands to ensure unbroken seamless loop
const repeatedBrands = [...brands, ...brands];

export const ApprovedBrandsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 bg-white relative overflow-hidden border-t border-slate-200/70 select-none group">
      {/* Edge gradient fade masks for smooth entrance/exit (narrower on mobile so logos stay visible) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24 md:w-32 bg-linear-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24 md:w-32 bg-linear-to-l from-white via-white/80 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10 text-center">


        {/* Main Heading */}
        <h2 className="text-xl sm:text-3xl lg:text-[40px] font-serif font-extrabold text-slate-950 tracking-tight leading-[1.2]">
          We Install CEC Approved <br className="hidden sm:inline" />
          <span className="text-[#2B3CB8]">
            Panels, Inverters &amp; Batteries
          </span>
        </h2>
      </div>

      {/* Infinite Marquee Running Belt (Full Color Logos, No Boxes) */}
      <div className="relative w-full overflow-hidden py-2">
        <div className="flex w-max animate-marquee">
          {/* Track 1 */}
          <div className="flex items-center shrink-0">
            {repeatedBrands.map((brand, idx) => (
              <div
                key={`brand-t1-${idx}`}
                className="mx-4 sm:mx-8 md:mx-12 flex items-center justify-center shrink-0 hover:scale-108 transition-transform duration-300"
                title={`${brand.name} - CEC Approved`}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="h-8 sm:h-11 md:h-14 w-auto max-w-27.5 sm:max-w-45 object-contain drop-shadow-2xs select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Track 2 (Clone for seamless infinite loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {repeatedBrands.map((brand, idx) => (
              <div
                key={`brand-t2-${idx}`}
                className="mx-4 sm:mx-8 md:mx-12 flex items-center justify-center shrink-0 hover:scale-108 transition-transform duration-300"
                title={`${brand.name} - CEC Approved`}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  className="h-8 sm:h-11 md:h-14 w-auto max-w-27.5 sm:max-w-45 object-contain drop-shadow-2xs select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApprovedBrandsSection;
