import React from 'react';
import { CalculatorPageTemplate } from '../../components/CalculatorPageTemplate';
import { calculatorsPageData } from '../../data/calculatorsData';
import CalcSection from './sections/CalcSection';

export const SavingsSoFarCalcPage: React.FC = () => {
  return (
    <CalculatorPageTemplate
      data={calculatorsPageData.savingsSoFar}
      calcComponent={<CalcSection />}
    />
  );
};

export default SavingsSoFarCalcPage;
