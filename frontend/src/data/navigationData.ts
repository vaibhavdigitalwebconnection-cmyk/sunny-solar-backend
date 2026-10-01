export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: string;
}

export interface NavSection {
  title: string;
  href: string;
  badge?: string;
  children?: {
    featured?: {
      title: string;
      description: string;
      href: string;
      ctaText: string;
    };
    items: NavItem[];
  };
}

export const navigationData: NavSection[] = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Solar',
    href: '/solar',
    children: {
      featured: {
        title: 'Tier-1 High Efficiency Systems',
        description: 'Designed for Australian conditions with maximum 25-year performance warranty.',
        href: '/solar/systems',
        ctaText: 'Explore Systems',
      },
      items: [
        {
          title: 'Solar Systems',
          href: '/solar/systems',
          description: 'Custom 6.6kW to 15kW+ premium residential solar setups',
          icon: 'Sun',
        },
        {
          title: 'Solar Installation',
          href: '/solar/installation',
          description: 'SAA-accredited master installers, zero roof damage guarantee',
          icon: 'Wrench',
        },
        {
          title: 'Solar Upgrades',
          href: '/solar/upgrades',
          description: 'Boost existing capacity, swap inverters & replace aging panels',
          icon: 'ArrowUpCircle',
        },
      ],
    },
  },
  {
    title: 'Batteries',
    href: '/batteries',
    children: {
      featured: {
        title: 'Blackout-Proof Your Home',
        description: 'Store excess solar by day, power your evening routines, and stay protected during outages.',
        href: '/batteries/battery-backup',
        ctaText: 'Backup Solutions',
      },
      items: [
        {
          title: 'Solar Batteries',
          href: '/batteries/solar-batteries',
          description: 'Tesla Powerwall 3, Sungrow, Enphase & AlphaESS energy storage',
          icon: 'BatteryCharging',
        },
        {
          title: 'Solar + Battery Bundles',
          href: '/batteries/solar-plus-battery',
          description: 'Complete integrated packages with matched hybrid inverters',
          badge: 'Most Popular',
          icon: 'Zap',
        },
        {
          title: 'Battery Backup & EPS',
          href: '/batteries/battery-backup',
          description: 'Seamless whole-home or essential-circuit blackout protection',
          icon: 'ShieldCheck',
        },
      ],
    },
  },
  {
    title: 'Existing Solar',
    href: '/existing-solar',
    children: {
      featured: {
        title: 'Is Your Solar Underperforming?',
        description: 'Up to 38% of older solar systems have undetected inverter faults or shading losses.',
        href: '/existing-solar/health-check',
        ctaText: 'Book a Health Check',
      },
      items: [
        {
          title: 'Solar Health Check',
          href: '/existing-solar/health-check',
          description: 'Comprehensive 24-point system audit and thermal imaging',
          icon: 'Activity',
        },
        {
          title: 'How Much Have I Saved?',
          href: '/existing-solar/savings',
          description: 'Benchmark your generation against actual grid tariff savings',
          icon: 'TrendingUp',
        },
        {
          title: 'Solar Upgrade',
          href: '/existing-solar/upgrade',
          description: 'Expand panel capacity and upgrade to high-efficiency inverters',
          icon: 'PlusCircle',
        },
        {
          title: 'Add a Battery',
          href: '/existing-solar/add-battery',
          description: 'Retrofit AC-coupled battery storage to any existing solar setup',
          badge: 'High Rebate',
          icon: 'Battery',
        },
      ],
    },
  },
  {
    title: 'Calculators',
    href: '/calculators',
    children: {
      featured: {
        title: 'Interactive Solar & Battery Calculators',
        description: 'Input your energy bill and discover your estimated 10-year savings and payback period.',
        href: '/calculators/solar-savings',
        ctaText: 'Calculate Savings',
      },
      items: [
        {
          title: 'Solar Savings Calculator',
          href: '/calculators/solar-savings',
          description: 'Estimate quarterly savings based on current electricity bills',
          icon: 'DollarSign',
        },
        {
          title: 'System Size Calculator',
          href: '/calculators/system-size',
          description: 'Find the ideal kW system capacity for your household usage',
          icon: 'Layers',
        },
        {
          title: 'Payback Calculator',
          href: '/calculators/payback',
          description: 'Calculate ROI timeline taking STC government rebates into account',
          icon: 'Clock',
        },
        {
          title: 'Battery Savings Calculator',
          href: '/calculators/battery-savings',
          description: 'See how much peak-rate electricity a home battery saves',
          icon: 'BatteryCharging',
        },
        {
          title: 'Battery Size Calculator',
          href: '/calculators/battery-size',
          description: 'Match kWh capacity to your nighttime energy consumption',
          icon: 'Sliders',
        },
        {
          title: 'Quote Comparison Tool',
          href: '/calculators/quote-comparison',
          description: 'Evaluate competitor proposals side-by-side on tier quality & price',
          icon: 'Scale',
        },
        {
          title: 'Savings So Far',
          href: '/calculators/savings-so-far',
          description: 'Historical performance auditor for existing solar owners',
          icon: 'CheckCircle2',
        },
        {
          title: 'Is Solar Right for Me?',
          href: '/calculators/is-solar-right-for-me',
          description: 'Quick 60-second quiz assessing roof angle, shading and feasibility',
          badge: 'Quick Quiz',
          icon: 'HelpCircle',
        },
      ],
    },
  },

  {
    title: 'Projects',
    href: '/projects',
  },

  {
    title: 'Resources',
    href: '/resources',
    children: {
      featured: {
        title: 'Free Solar Buyer Guides',
        description: 'Download actionable checklists and comparison sheets before signing any solar contract.',
        href: '/resources',
        ctaText: 'View All Guides',
      },
      items: [
        {
          title: 'Solar Buying Checklist',
          href: '/resources/buying-checklist',
          description: '15 questions to ask any solar installer before signing',
          icon: 'CheckSquare',
        },
        {
          title: 'Complete Buyer Guide',
          href: '/resources/buyer-guide',
          description: '40-page comprehensive manual for Australian homeowners',
          badge: 'PDF',
          icon: 'Download',
        },
        {
          title: 'Battery Decision Guide',
          href: '/resources/battery-decision-guide',
          description: 'Comparing chemistries (LFP vs NMC), warranties & payback',
          icon: 'FileSpreadsheet',
        },
        {
          title: 'Free Quote Review',
          href: '/resources/quote-review',
          description: 'Have our senior engineers review an existing quote for red flags',
          badge: 'Free Audit',
          icon: 'FileCheck',
        },
        {
          title: 'Electricity Bill Review',
          href: '/resources/electricity-bill-review',
          description: 'Upload your bill to uncover peak tariff traps and sizing needs',
          icon: 'FileSearch',
        },
      ],
    },
  },
  {
    title: 'Learn',
    href: '/learn/knowledge-hub',
    children: {
      featured: {
        title: 'Solar Education Hub',
        description: 'No jargon, no pushy sales. Independent guides to help you make informed decisions.',
        href: '/learn/knowledge-hub',
        ctaText: 'Knowledge Hub',
      },
      items: [
        {
          title: 'Knowledge Hub',
          href: '/learn/knowledge-hub',
          description: 'Categorized guides on solar basics, batteries, regulations & maintenance',
          icon: 'BookOpen',
        },
        {
          title: 'Sunny Solar Blog',
          href: '/learn/blog',
          description: 'Latest energy industry news, rebate updates, and case studies',
          icon: 'FileText',
        },
      ],
    },
  },


];
