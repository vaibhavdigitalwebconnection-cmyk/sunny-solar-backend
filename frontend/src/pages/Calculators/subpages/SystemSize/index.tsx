import React from 'react';
import { CalculatorPageTemplate } from '../../components/CalculatorPageTemplate';
import { calculatorsPageData } from '../../data/calculatorsData';
import CalcSection from './sections/CalcSection';

export const SystemSizeCalcPage: React.FC = () => {
  return (
    <CalculatorPageTemplate
      data={calculatorsPageData.systemSize}
      calcComponent={<CalcSection />}
    />
  );
};

export default SystemSizeCalcPage;
