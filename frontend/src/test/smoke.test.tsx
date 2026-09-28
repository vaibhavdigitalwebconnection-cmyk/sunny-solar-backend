import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CalculatorPageTemplate } from '../pages/Calculators/components/CalculatorPageTemplate';
import { calculatorsPageData } from '../pages/Calculators/data/calculatorsData';
import { HomePage } from '../pages/Home';

describe('Frontend Smoke Tests', () => {
  it('renders CalculatorPageTemplate with provided data and calcComponent', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <CalculatorPageTemplate
            data={calculatorsPageData.solarSavings}
            calcComponent={<div data-testid="test-calc-component">Active Calculator Core</div>}
          />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Solar Savings')).toBeInTheDocument();
    expect(screen.getByTestId('test-calc-component')).toBeInTheDocument();
    expect(screen.getByText('Add Battery with Solar: Save Day & Night')).toBeInTheDocument();
  });

  it('renders HomePage smoke test', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(container).toBeDefined();
    expect(document.body).toBeInTheDocument();
  });
});
