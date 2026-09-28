import React from 'react';
import { CalculatorPageTemplate } from '../../components/CalculatorPageTemplate';
import { calculatorsPageData } from '../../data/calculatorsData';
import CalcSection from './sections/CalcSection';

export const BatterySavingsCalcPage: React.FC = () => {
  return (
    <CalculatorPageTemplate
      data={calculatorsPageData.batterySavings}
      calcComponent={<CalcSection />}
    />
  );
};

export default BatterySavingsCalcPage;
