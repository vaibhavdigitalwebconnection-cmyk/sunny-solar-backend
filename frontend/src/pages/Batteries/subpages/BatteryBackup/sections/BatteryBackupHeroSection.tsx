import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../../../../../components/layout/PageHeader';
import { Button } from '../../../../../components/ui/Button';

export const BatteryBackupHeroSection: React.FC = () => {
  return (
    <PageHeader
      badge="Storm Resilience & EPS"
      badgeVariant="navy"
      title="Whole-Home Backup &"
      highlightText="Emergency Power Supply (EPS)"
      description="Nationwide storms and transmission collapses are becoming more severe. Protect your family's refrigeration, lights, Wi-Fi, air-con, and medical equipment with sub-100ms automated grid isolation."
      actions={
        <>
          <Button
            to="/get-started/free-assessment"
            variant="accent-green"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Get Free Backup Assessment
          </Button>
          <Button
            href="#simulator"
            variant="outline"
            size="md"
          >
            Test Outage Simulator
          </Button>
        </>
      }
    />
  );
};

export default BatteryBackupHeroSection;
