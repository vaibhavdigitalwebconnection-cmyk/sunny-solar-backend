import React from 'react';
import { CalculatorPageTemplate } from '../../components/CalculatorPageTemplate';
import { calculatorsPageData } from '../../data/calculatorsData';
import CalcSection from './sections/CalcSection';

export const QuoteComparisonCalcPage: React.FC = () => {
  return (
    <CalculatorPageTemplate
      data={calculatorsPageData.quoteComparison}
      calcComponent={<CalcSection />}
    />
  );
};

export default QuoteComparisonCalcPage;
