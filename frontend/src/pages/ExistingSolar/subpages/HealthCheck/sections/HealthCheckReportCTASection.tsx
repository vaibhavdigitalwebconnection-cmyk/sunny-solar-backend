'use client';

import React from 'react';
import { FileText, Camera, ShieldCheck, TrendingUp, Sparkles, ArrowRight, ShieldAlert, Award } from 'lucide-react';
import { FlipCard, FlipCardItem } from '@/components/animate-ui/components/community/flip-card';
import { Link } from 'react-router-dom';

export const HealthCheckReportCTASection: React.FC = () => {
  const deliverables: FlipCardItem[] = [
    {
      id: 1,
      category: 'Thermal Imaging',
      title: 'Infrared Thermal Photography',
      image: '/images/projects/pv-solar-thermal.webp',
      imageAlt: 'Thermal infrared scan of solar panel array showing hotspot analysis',
      icon: <Camera className="w-4 h-4 text-amber-400" />,
      iconBg: 'bg-amber-500/20',
      desc: 'High-resolution thermal imaging captures diode hotspots, micro-fractured cells, and loose high-resistance DC connections before they cause catastrophic fire hazards.',
      highlights: [
        'Bypass diode hotspot identification',
        'High-resistance DC joint detection',
        'Certified thermographic image evidence',
      ],
      badge: 'Included in $189 audit',
      accentColor: '#F59E0B',
    },
    {
      id: 2,
      category: 'Statutory Safety',
      title: 'Form 16 Safety Certificate',
      image: '/images/projects/project-switchboard.webp',
      imageAlt: 'Master electrician inspecting switchboard and verifying electrical safety compliance',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      iconBg: 'bg-emerald-500/20',
      desc: 'Official Certificate of Electrical Safety proving full AS/NZS 5033 compliance — essential for home insurance claims, post-storm audits, and warranty validity.',
      highlights: [
        'AS/NZS 5033 & 3000 compliance certificate',
        'Signed by accredited Master Electrician',
        'Accepted by all major Australian insurers',
      ],
      badge: 'Included in $189 audit',
      accentColor: '#10B981',
    },
    {
      id: 3,
      category: 'Generation Output',
      title: 'Actual vs Rated Yield Audit',
      image: '/images/projects/project-rooftop-array.webp',
      imageAlt: 'Rooftop solar panel string voltage and current testing',
      icon: <TrendingUp className="w-4 h-4 text-sky-400" />,
      iconBg: 'bg-sky-500/20',
      desc: 'Precise DC string power measurements benchmarked against original factory nameplate wattage to verify your true degradation, shading loss, and daily output.',
      highlights: [
        'String-level Voc & Isc testing',
        'Benchmark against original STC ratings',
        'Degradation rate & inverter clipping analysis',
      ],
      badge: 'Included in $189 audit',
      accentColor: '#38BDF8',
    },
    {
      id: 4,
      category: 'Itemized Pricing',
      title: 'Fixed-Price Rectification Quote',
      image: '/images/projects/precision-torquing.webp',
      imageAlt: 'Technician precisely servicing solar equipment with calibrated tools',
      icon: <FileText className="w-4 h-4 text-purple-400" />,
      iconBg: 'bg-purple-500/20',
      desc: 'If recalled isolators, cabling degradation, or inverter faults are uncovered, receive a clear itemized quote with zero pressure or sales obligations.',
      highlights: [
        'Itemized component & labor breakdown',
        'Recalled DC isolator replacement options',
        '100% no-pressure advisory guarantee',
      ],
      badge: 'Included in $189 audit',
      accentColor: '#A855F7',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
       
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-950 tracking-tight leading-tight">
          What You Receive With Your Health Check
        </h2>
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Within 24 hours of inspection, our Master Electrician delivers an itemized digital dossier documenting the physical integrity, statutory electrical safety, and true generation yield of your system.
        </p>

      </div>

      {/* 4 Deliverables Flip Cards in 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10 sm:mb-14">
        {deliverables.map((item) => (
          <FlipCard
            key={item.id}
            item={item}
            heightClass="h-[290px] sm:h-[310px]"
            className="w-full"
          />
        ))}
      </div>


    </section>
  );
};

// Demo export matching the requested Animate UI sample
const demoData = {
  name: 'Animate UI',
  username: 'animate_ui',
  image:
    'https://pbs.twimg.com/profile_images/1950218390741618688/72447Y7e_400x400.jpg',
  bio: 'A fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, and Motion.',
  stats: { following: 200, followers: 2900, posts: 120 },
  socialLinks: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
};

export const FlipCardDemo: React.FC = () => {
  return <FlipCard data={demoData} />;
};

export default HealthCheckReportCTASection;
