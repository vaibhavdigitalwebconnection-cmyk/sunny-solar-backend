import React from 'react';
import { PageHeader } from '../../../../components/layout/PageHeader';
import { BookOpen, ShieldCheck, Award, Zap } from 'lucide-react';

export const KnowledgeHubHeroSection: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Solar Education & Guides"
        title="Sunny Solar"
        highlightText="Knowledge Hub"
        description="Independent, jargon-free guides written by SAA Master Electricians to help you understand solar physics, battery chemistry, inverter sizing, and Queensland rebate policies."
      />


    </div>
  );
};

export default KnowledgeHubHeroSection;
