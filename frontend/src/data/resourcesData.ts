export interface ResourceGuide {
  customLink?: string;
  slug: string;
  title: string;
  subtitle: string;
  format: 'PDF Guide' | 'Checklist' | 'Interactive Review' | 'Free Audit';
  pagesCount?: string;
  description: string;
  whatInside: string[];
  ctaText: string;
  badge?: string;
}

export const resourcesData: Record<string, ResourceGuide> = {
  'buying-checklist': {
    slug: 'buying-checklist',
    title: 'The Ultimate Solar Buying Checklist (2025 Edition)',
    subtitle: '15 Critical Questions Every Homeowner Must Ask Before Signing Any Solar Contract',
    format: 'Checklist',
    pagesCount: '6 Pages (Printable PDF)',
    badge: 'Essential',
    description: 'Avoid aggressive telemarketers, sub-contracted cut-rate crews, and cheap orphaned hardware. This printable checklist gives you an unfair advantage when vetting solar quotes.',
    whatInside: [
      'The 5 red flags in solar sales contracts that void your workmanship guarantees',
      'How to verify genuine Clean Energy Council (CEC) installer accreditation',
      'Questions to ask about switchboard upgrades and hidden roof-pitch fees',
      'Warranty comparison checklist: Product vs Performance vs Labor'
    ],
    ctaText: 'Download Free Checklist'
  },
  'buyer-guide': {
    slug: 'buyer-guide',
    title: 'The Australian Homeowner’s Complete Solar & Battery Guide',
    subtitle: 'A Jargon-Free Roadmap from Initial Assessment to 25 Years of Energy Independence',
    format: 'PDF Guide',
    pagesCount: '38 Pages (Comprehensive E-Book)',
    badge: 'Most Popular',
    description: 'Everything you need to know about string vs micro inverters, N-Type TOPCon panels, Federal STC subsidies, export tariffs, and smart home energy management.',
    whatInside: [
      'Comprehensive tier breakdown of the top 10 panel and inverter manufacturers',
      'Step-by-step breakdown of how STC federal rebates are calculated and claimed',
      'Roof orientation guide: East vs West vs North tradeoffs',
      'Real household case studies with verified before-and-after electricity bills'
    ],
    ctaText: 'Download Complete Guide'
  },
  'battery-decision-guide': {
    slug: 'battery-decision-guide',
    title: 'The 2025 Home Battery Decision & Comparison Guide',
    subtitle: 'Is a Home Battery Worth It For You? Chemistry, Payback & Blackout Realities',
    format: 'PDF Guide',
    pagesCount: '24 Pages (Technical Report)',
    badge: 'Updated for 2025',
    description: 'An independent technical breakdown comparing Tesla Powerwall 3, Sungrow, Enphase, and AlphaESS on capacity, cycle life, warranty terms, and real-world economics.',
    whatInside: [
      'LFP (Lithium Iron Phosphate) vs NMC chemistry pros and cons',
      'AC-coupled vs DC-coupled storage architectures explained',
      'Whole-home backup vs essential-circuit backup wiring requirements',
      'Financial ROI analysis under various retail time-of-use tariffs'
    ],
    ctaText: 'Download Battery Guide'
  },
  'quote-review': {
    slug: 'quote-review',
    title: 'Free Independent Solar Quote Review',
    subtitle: 'Have a Senior Solar Engineer Audit Your Existing Quote Before You Commit',
    format: 'Free Audit',
    pagesCount: 'Personalized 1-Page Report',
    badge: 'Zero Obligation',
    description: 'Already received a quote from another solar provider? Send it to our master electricians. We will inspect the hardware choices, string design, and line-item pricing to verify if it is fair value.',
    whatInside: [
      'Verification of Tier-1 panel and CEC approved inverter listings',
      'Price-per-watt benchmark against current Australian market averages',
      'Identification of unstated switchboard or double-storey surcharge clauses',
      'Honest assessment of estimated generation figures'
    ],
    ctaText: 'Request Free Quote Review'
  },
  'electricity-bill-review': {
    slug: 'electricity-bill-review',
    title: 'Free Electricity Bill & Tariff Analysis',
    subtitle: 'Uncover Peak Tariff Traps and Discover Your Custom Sizing Potential',
    format: 'Interactive Review',
    pagesCount: 'Personalized Analysis',
    badge: 'Quick Assessment',
    description: 'Upload your latest electricity bill. Our system analyzes your peak, off-peak, and shoulder usage patterns to calculate the exact solar array and battery capacity needed to eliminate 85%+ of your grid charges.',
    whatInside: [
      'Detailed breakdown of your daily kWh consumption baseline',
      'Identification of expensive time-of-use tariff penalties',
      'Tailored recommendation for solar kW array and kWh battery capacity',
      'Estimated 1-year and 10-year dollar savings projections'
    ],
    ctaText: 'Submit Bill for Free Review'
  }
};
