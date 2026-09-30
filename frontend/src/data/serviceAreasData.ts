export interface ServiceArea {
  slug: string;
  name: string;
  region: string;
  headline: string;
  description: string;
  solarHoursPerDay: number;
  averageAnnualSolarSavings: string;
  rebateInfo: string;
  suburbsServed: string[];
  keyHighlights: string[];
  installerCount: string;
  reviewRating: number;
}

export const serviceAreasData: ServiceArea[] = [
  {
    slug: 'gold-coast',
    name: 'Gold Coast',
    region: 'South East Queensland',
    headline: 'Premium Residential Solar & Battery Installations Across the Gold Coast',
    description: 'With over 300 days of sunshine annually, the Gold Coast is Australia’s premier climate for solar power. From coastal beachfront residences needing anti-corrosion marine-grade mounting to lush hinterland acreages in Tamborine and Currumbin, Sunny Solar is the local SAA-accredited installer trusted by over 2,400 coastal families.',
    solarHoursPerDay: 5.4,
    averageAnnualSolarSavings: '$2,850 - $4,200',
    rebateInfo: 'Eligible for Federal STC rebates + QLD Battery Booster bonus incentives.',
    suburbsServed: [
      'Surfers Paradise', 'Broadbeach Waters', 'Robina', 'Burleigh Heads', 'Palm Beach',
      'Currumbin', 'Helensvale', 'Coomera', 'Southport', 'Varsity Lakes', 'Mermaid Waters'
    ],
    keyHighlights: [
      'Cyclone-rated, marine-anodized Clenergy roof racks to withstand coastal salt air',
      'Gold Coast local warehouse ensuring rapid same-week parts availability',
      'Over 2,400+ installations completed from Coolangatta to Coomera'
    ],
    installerCount: '12 Full-Time Master Electricians',
    reviewRating: 4.98
  },
  {
    slug: 'brisbane',
    name: 'Brisbane & Greater Suburbs',
    region: 'South East Queensland',
    headline: 'High-Efficiency Solar Systems Engineered for Brisbane Homes',
    description: 'From classic Queenslanders in Paddington and Camp Hill to contemporary builds in New Farm and Chermside, our Brisbane engineering crew designs solar systems that respect architectural heritage while maximizing energy harvest.',
    solarHoursPerDay: 5.2,
    averageAnnualSolarSavings: '$2,400 - $3,800',
    rebateInfo: 'Federal STC point-of-sale discounts applied up to $3,200.',
    suburbsServed: [
      'Brisbane CBD', 'Paddington', 'New Farm', 'Camp Hill', 'Chermside',
      'Indooroopilly', 'Carindale', 'Ascot', 'Bulimba', 'Ashgrove', 'Coorparoo'
    ],
    keyHighlights: [
      'Specialized mounting brackets for tin, terracotta tile, and steep pitch roofs',
      'Rapid Energex grid connection processing within 5 business days',
      'Panel-level shading mitigation for lush Brisbane tree canopies'
    ],
    installerCount: '14 SAA Accredited Installers',
    reviewRating: 4.96
  },
  {
    slug: 'sunshine-coast',
    name: 'Sunshine Coast',
    region: 'Queensland',
    headline: 'Sustainable Solar & Smart Battery Storage for Sunshine Coast Living',
    description: 'From coastal homes in Noosa and Caloundra to hinterland retreats in Maleny and Montville, Sunny Solar delivers robust solar and battery systems engineered to withstand humid subtropical conditions.',
    solarHoursPerDay: 5.3,
    averageAnnualSolarSavings: '$2,600 - $4,000',
    rebateInfo: 'Federal STCs + QLD State Clean Energy schemes available.',
    suburbsServed: [
      'Noosa Heads', 'Maroochydore', 'Caloundra', 'Buderim', 'Coolum Beach',
      'Mooloolaba', 'Peregian Beach', 'Maleny', 'Nambour', 'Kawana Waters'
    ],
    keyHighlights: [
      'Salt-resistant dual glass panels engineered for coastal exposure',
      'Severe weather and blackout backup storage specialists',
      'Dedicated local Sunshine Coast response van'
    ],
    installerCount: '8 Master Electricians',
    reviewRating: 4.97
  },
  {
    slug: 'ipswich-western-suburbs',
    name: 'Ipswich & Western Corridor',
    region: 'South East Queensland',
    headline: 'Beat Scorching Summer Energy Bills in Ipswich & Western Suburbs',
    description: 'Inland temperatures in Ipswich and Springfield often soar 4-6 degrees hotter than the coast, driving ducted air conditioning bills into four figures. Our high-yield solar arrays offset heavy cooling loads when the sun is at its strongest.',
    solarHoursPerDay: 5.5,
    averageAnnualSolarSavings: '$2,700 - $4,300',
    rebateInfo: 'Maximize STCs on large unobstructed roof spaces.',
    suburbsServed: [
      'Ipswich Central', 'Springfield Lakes', 'Brookwater', 'Ripley', 'Brassall',
      'Redbank Plains', 'Bellbird Park', 'Flinders View', 'Raceview', 'Karalee'
    ],
    keyHighlights: [
      'Optimized for high-ambient temperature performance using N-Type TOPCon cells',
      'High capacity 10kW to 13.2kW systems ideal for spacious residential roofs',
      'Zero upfront payment plans available for families'
    ],
    installerCount: '10 Certified Electricians',
    reviewRating: 4.95
  },
  {
    slug: 'northern-nsw',
    name: 'Northern NSW & Tweed Coast',
    region: 'Northern Rivers NSW',
    headline: 'Eco-Forward Solar & Battery Installations in Northern NSW & Tweed',
    description: 'Serving Tweed Heads, Kingscliff, Byron Bay, and Murwillumbah. We help homeowners achieve clean energy independence with top-tier aesthetic panels and blackout-resilient battery systems.',
    solarHoursPerDay: 5.1,
    averageAnnualSolarSavings: '$2,500 - $3,900',
    rebateInfo: 'NSW Energy Savings Scheme (ESS) + Federal STC rebates available.',
    suburbsServed: [
      'Tweed Heads', 'Kingscliff', 'Casuarina', 'Cabarita Beach', 'Pottsville',
      'Murwillumbah', 'Byron Bay', 'Ocean Shores', 'Mullumbimby', 'Banora Point'
    ],
    keyHighlights: [
      'Essential Power Supply (EPS) systems designed for storm-prone regions',
      'Dual-glass all-black panels complementing architectural eco designs',
      'Fully compliant with Essential Energy NSW network rules'
    ],
    installerCount: '6 SAA Accredited Technicians',
    reviewRating: 4.99
  }
];
