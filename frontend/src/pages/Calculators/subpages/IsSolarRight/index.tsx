import React from 'react';
import { CalculatorPageTemplate } from '../../components/CalculatorPageTemplate';
import { calculatorsPageData } from '../../data/calculatorsData';
import CalcSection from './sections/CalcSection';

export const IsSolarRightCalcPage: React.FC = () => {
  return (
    <CalculatorPageTemplate
      data={calculatorsPageData.isSolarRight}
      calcComponent={<CalcSection />}
    />
  );
};

export default IsSolarRightCalcPage;
