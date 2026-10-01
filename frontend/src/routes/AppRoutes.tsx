import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Lazy-loaded Pages for Route Code-Splitting & Optimized Chunking
const HomePage = lazy(() => import('../pages/Home'));
const SolarLandingPage = lazy(() => import('../pages/Solar/SolarLandingPage'));
const SolarSystemsPage = lazy(() => import('../pages/Solar/subpages/SolarSystems'));
const SolarInstallationPage = lazy(() => import('../pages/Solar/subpages/SolarInstallation'));
const SolarUpgradesPage = lazy(() => import('../pages/Solar/subpages/SolarUpgrades'));

const BatteriesLandingPage = lazy(() => import('../pages/Batteries/BatteriesLandingPage'));
const SolarBatteriesPage = lazy(() => import('../pages/Batteries/subpages/SolarBatteries'));
const SolarPlusBatteryPage = lazy(() => import('../pages/Batteries/subpages/SolarPlusBattery'));
const BatteryBackupPage = lazy(() => import('../pages/Batteries/subpages/BatteryBackup'));

const ExistingSolarLandingPage = lazy(() => import('../pages/ExistingSolar'));
const HealthCheckPage = lazy(() => import('../pages/ExistingSolar/subpages/HealthCheck'));
const SavingsPage = lazy(() => import('../pages/ExistingSolar/subpages/Savings'));
const UpgradePage = lazy(() => import('../pages/ExistingSolar/subpages/Upgrade'));
const AddBatteryPage = lazy(() => import('../pages/ExistingSolar/subpages/AddBattery'));

const CalculatorsLandingPage = lazy(() => import('../pages/Calculators'));
const SolarSavingsCalcPage = lazy(() => import('../pages/Calculators/subpages/SolarSavings'));
const SystemSizeCalcPage = lazy(() => import('../pages/Calculators/subpages/SystemSize'));
const PaybackCalcPage = lazy(() => import('../pages/Calculators/subpages/Payback'));
const BatterySavingsCalcPage = lazy(() => import('../pages/Calculators/subpages/BatterySavings'));
const BatterySizeCalcPage = lazy(() => import('../pages/Calculators/subpages/BatterySize'));
const QuoteComparisonCalcPage = lazy(() => import('../pages/Calculators/subpages/QuoteComparison'));
const SavingsSoFarCalcPage = lazy(() => import('../pages/Calculators/subpages/SavingsSoFar'));
const IsSolarRightCalcPage = lazy(() => import('../pages/Calculators/subpages/IsSolarRight'));

const KnowledgeHubPage = lazy(() => import('../pages/Learn/KnowledgeHub'));
const KnowledgeDetailPage = lazy(() => import('../pages/Learn/KnowledgeHub/KnowledgeDetailPage'));
const BlogPage = lazy(() => import('../pages/Learn/Blog'));
const BlogDetailPage = lazy(() => import('../pages/Learn/Blog/BlogDetailPage'));

const ProjectsPage = lazy(() => import('../pages/Projects/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('../pages/Projects/ProjectDetailPage'));

const ReviewsPage = lazy(() => import('../pages/Reviews/ReviewsPage'));

const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const TrentBioPage = lazy(() => import('../pages/About/TrentBioPage'));

const ServiceAreasPage = lazy(() => import('../pages/ServiceAreas/ServiceAreasPage'));
const LocationDetailPage = lazy(() => import('../pages/ServiceAreas/LocationDetailPage'));

const ResourcesLandingPage = lazy(() => import('../pages/Resources'));
const BuyingChecklistPage = lazy(() => import('../pages/Resources/subpages/BuyingChecklist'));
const BuyerGuidePage = lazy(() => import('../pages/Resources/subpages/BuyerGuide'));
const BatteryDecisionGuidePage = lazy(() => import('../pages/Resources/subpages/BatteryDecisionGuide'));
const QuoteReviewPage = lazy(() => import('../pages/Resources/subpages/QuoteReview'));
const ElectricityBillReviewPage = lazy(() => import('../pages/Resources/subpages/ElectricityBillReview'));

const FAQPage = lazy(() => import('../pages/FAQ/FAQPage'));
const FreeAssessmentPage = lazy(() => import('../pages/GetStarted/FreeAssessmentPage'));

const PrivacyPolicyPage = lazy(() => import('../pages/Legal/PrivacyPolicyPage'));
const TermsConditionsPage = lazy(() => import('../pages/Legal/TermsConditionsPage'));
const TermsOfTradePage = lazy(() => import('../pages/Legal/TermsOfTradePage'));

const AdminPage = lazy(() => import('../pages/Admin/AdminPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

import LatticeLoadingBlock from '../components/ui/LatticeLoadingBlock';

// Sleek Lattice fallback loader while dynamic chunk is loading
const RouteFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center py-24">
    <LatticeLoadingBlock label="Loading page" containerClassName="flex flex-col items-center justify-center" />
  </div>
);

// Route preloader helper to warm lazy bundles on hover
export const preloadRoute = (path: string) => {
  const cleanPath = path.split('?')[0].split('#')[0];
  switch (cleanPath) {
    case '/solar':
      import('../pages/Solar/SolarLandingPage');
      break;
    case '/solar/systems':
      import('../pages/Solar/subpages/SolarSystems');
      break;
    case '/solar/installation':
      import('../pages/Solar/subpages/SolarInstallation');
      break;
    case '/solar/upgrades':
      import('../pages/Solar/subpages/SolarUpgrades');
      break;
    case '/batteries':
      import('../pages/Batteries/BatteriesLandingPage');
      break;
    case '/batteries/solar-batteries':
      import('../pages/Batteries/subpages/SolarBatteries');
      break;
    case '/batteries/solar-plus-battery':
      import('../pages/Batteries/subpages/SolarPlusBattery');
      break;
    case '/batteries/battery-backup':
      import('../pages/Batteries/subpages/BatteryBackup');
      break;
    case '/existing-solar':
      import('../pages/ExistingSolar');
      break;
    case '/existing-solar/health-check':
      import('../pages/ExistingSolar/subpages/HealthCheck');
      break;
    case '/existing-solar/savings':
      import('../pages/ExistingSolar/subpages/Savings');
      break;
    case '/existing-solar/upgrade':
      import('../pages/ExistingSolar/subpages/Upgrade');
      break;
    case '/existing-solar/add-battery':
      import('../pages/ExistingSolar/subpages/AddBattery');
      break;
    case '/calculators':
      import('../pages/Calculators');
      break;
    case '/calculators/solar-savings':
      import('../pages/Calculators/subpages/SolarSavings');
      break;
    case '/calculators/system-size':
      import('../pages/Calculators/subpages/SystemSize');
      break;
    case '/calculators/payback':
      import('../pages/Calculators/subpages/Payback');
      break;
    case '/calculators/battery-savings':
      import('../pages/Calculators/subpages/BatterySavings');
      break;
    case '/calculators/battery-size':
      import('../pages/Calculators/subpages/BatterySize');
      break;
    case '/calculators/quote-comparison':
      import('../pages/Calculators/subpages/QuoteComparison');
      break;
    case '/calculators/savings-so-far':
      import('../pages/Calculators/subpages/SavingsSoFar');
      break;
    case '/calculators/is-solar-right-for-me':
      import('../pages/Calculators/subpages/IsSolarRight');
      break;
    case '/learn/knowledge-hub':
    case '/learn/knowledge':
    case '/knowledge-hub':
    case '/knowledge':
      import('../pages/Learn/KnowledgeHub');
      break;
    case '/learn/blog':
    case '/blog':
      import('../pages/Learn/Blog');
      break;
    case '/projects':
      import('../pages/Projects/ProjectsPage');
      break;
    case '/reviews':
      import('../pages/Reviews/ReviewsPage');
      break;
    case '/about':
      import('../pages/About/AboutPage');
      break;
    case '/about/trent':
      import('../pages/About/TrentBioPage');
      break;
    case '/service-areas':
      import('../pages/ServiceAreas/ServiceAreasPage');
      break;
    case '/resources':
      import('../pages/Resources');
      break;
    case '/resources/buying-checklist':
      import('../pages/Resources/subpages/BuyingChecklist');
      break;
    case '/resources/buyer-guide':
      import('../pages/Resources/subpages/BuyerGuide');
      break;
    case '/resources/battery-decision-guide':
      import('../pages/Resources/subpages/BatteryDecisionGuide');
      break;
    case '/resources/quote-review':
      import('../pages/Resources/subpages/QuoteReview');
      break;
    case '/resources/electricity-bill-review':
      import('../pages/Resources/subpages/ElectricityBillReview');
      break;
    case '/faq':
      import('../pages/FAQ/FAQPage');
      break;
    case '/get-started':
    case '/get-started/free-assessment':
    case '/contact':
      import('../pages/GetStarted/FreeAssessmentPage');
      break;
    default:
      break;
  }
};

export const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes location={location} key={location.pathname}>
            {/* 1. Home */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Solar */}
            <Route path="/solar" element={<SolarLandingPage />} />
            <Route path="/solar/systems" element={<SolarSystemsPage />} />
            <Route path="/solar/installation" element={<SolarInstallationPage />} />
            <Route path="/solar/upgrades" element={<SolarUpgradesPage />} />

            {/* 3. Batteries */}
            <Route path="/batteries" element={<BatteriesLandingPage />} />
            <Route path="/batteries/solar-batteries" element={<SolarBatteriesPage />} />
            <Route path="/batteries/solar-plus-battery" element={<SolarPlusBatteryPage />} />
            <Route path="/batteries/battery-backup" element={<BatteryBackupPage />} />

            {/* 4. Existing Solar */}
            <Route path="/existing-solar" element={<ExistingSolarLandingPage />} />
            <Route path="/existing-solar/health-check" element={<HealthCheckPage />} />
            <Route path="/existing-solar/savings" element={<SavingsPage />} />
            <Route path="/existing-solar/upgrade" element={<UpgradePage />} />
            <Route path="/existing-solar/add-battery" element={<AddBatteryPage />} />

            {/* 5. Calculators */}
            <Route path="/calculators" element={<CalculatorsLandingPage />} />
            <Route path="/calculators/solar-savings" element={<SolarSavingsCalcPage />} />
            <Route path="/calculators/system-size" element={<SystemSizeCalcPage />} />
            <Route path="/calculators/payback" element={<PaybackCalcPage />} />
            <Route path="/calculators/battery-savings" element={<BatterySavingsCalcPage />} />
            <Route path="/calculators/battery-size" element={<BatterySizeCalcPage />} />
            <Route path="/calculators/quote-comparison" element={<QuoteComparisonCalcPage />} />
            <Route path="/calculators/savings-so-far" element={<SavingsSoFarCalcPage />} />
            <Route path="/calculators/is-solar-right-for-me" element={<IsSolarRightCalcPage />} />

            {/* 6. Learn */}
            <Route path="/learn" element={<Navigate to="/learn/knowledge-hub" replace />} />
            <Route path="/learn/knowledge-hub" element={<KnowledgeHubPage />} />
            <Route path="/learn/knowledge-hub/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/learn/knowledge" element={<Navigate to="/learn/knowledge-hub" replace />} />
            <Route path="/learn/knowledge/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/knowledge-hub" element={<Navigate to="/learn/knowledge-hub" replace />} />
            <Route path="/knowledge-hub/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/knowledge" element={<Navigate to="/learn/knowledge-hub" replace />} />
            <Route path="/knowledge/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/Knowledge/:slug" element={<KnowledgeDetailPage />} />
            <Route path="/learn/blog" element={<BlogPage />} />
            <Route path="/learn/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/blog" element={<Navigate to="/learn/blog" replace />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />

            {/* 7. Projects */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />

            {/* 8. Reviews */}
            <Route path="/reviews" element={<ReviewsPage />} />

            {/* 9. About */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/trent" element={<TrentBioPage />} />

            {/* 10. Service Areas */}
            <Route path="/service-areas" element={<ServiceAreasPage />} />
            <Route path="/service-areas/:location" element={<LocationDetailPage />} />

            {/* 11. Resources */}
            <Route path="/resources" element={<ResourcesLandingPage />} />
            <Route path="/resources/buying-checklist" element={<BuyingChecklistPage />} />
            <Route path="/resources/buyer-guide" element={<BuyerGuidePage />} />
            <Route path="/resources/battery-decision-guide" element={<BatteryDecisionGuidePage />} />
            <Route path="/resources/quote-review" element={<QuoteReviewPage />} />
            <Route path="/resources/electricity-bill-review" element={<ElectricityBillReviewPage />} />

            {/* 12. FAQ */}
            <Route path="/faq" element={<FAQPage />} />

            {/* 13. Get Started & Contact */}
            <Route path="/get-started" element={<Navigate to="/get-started/free-assessment" replace />} />
            <Route path="/get-started/free-assessment" element={<FreeAssessmentPage />} />
            <Route path="/contact" element={<FreeAssessmentPage />} />
            <Route path="/thank-you" element={<Navigate to="/" replace />} />

            {/* 14. Legal & Sitemap */}
            <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/legal/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/legal/terms-of-trade" element={<TermsOfTradePage />} />
         
            {/* 15. Admin Portal */}
            <Route path="/admin" element={<AdminPage />} />

            {/* 404 Catch All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </Suspense>
    );
  };

export default AppRoutes;
