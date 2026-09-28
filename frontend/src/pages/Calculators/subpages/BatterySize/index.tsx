import React from 'react';
import { CalculatorPageTemplate } from '../../components/CalculatorPageTemplate';
import { calculatorsPageData } from '../../data/calculatorsData';
import CalcSection from './sections/CalcSection';

export const BatterySizeCalcPage: React.FC = () => {
  return (
    <CalculatorPageTemplate
      data={calculatorsPageData.batterySize}
      calcComponent={<CalcSection />}
    />
  );
};

export default BatterySizeCalcPage;
