import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import {
  FreeAssessmentHeroSection,
  FreeAssessmentFormSection,
} from './sections';

export const FreeAssessmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <ScrollProgress className="top-0 z-50 h-0.75" />
      <Helmet>
        <title>Get a Free Solar & Battery Assessment | Sunny Solar</title>
        <meta
          name="description"
          content="Request a free, obligation-free remote satellite roof assessment and itemized solar quote from Master Electrician Trent Palmer."
        />
      </Helmet>

      {/* Hero Section: 2nd on mobile (< lg), 1st on desktop (lg+) */}
      <div className="order-2 lg:order-1">
        <FreeAssessmentHeroSection />
      </div>

      {/* Assessment Form Section: 1st on mobile (< lg), 2nd on desktop (lg+) */}
      <div className="order-1 lg:order-2 pt-20 sm:pt-24 lg:pt-0">
        <FreeAssessmentFormSection />
      </div>
    </div>
  );
};

export default FreeAssessmentPage;
