import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import {
  FreeAssessmentHeroSection,
  FreeAssessmentFormSection,
} from './sections';

export const FreeAssessmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <ScrollProgress className="top-0 z-50 h-0.75" />
      <Helmet>
        <title>Get a Free Solar & Battery Assessment | Sunny Solar</title>
        <meta
          name="description"
          content="Request a free, obligation-free remote satellite roof assessment and itemized solar quote from Master Electrician Trent Palmer."
        />
      </Helmet>
      {/* 1. Hero / Header Section */}
      <FreeAssessmentHeroSection />

      {/* 2. Main Contact Channels + Interactive Assessment Form */}
      <FreeAssessmentFormSection />


    </div>
  );
};

export default FreeAssessmentPage;
