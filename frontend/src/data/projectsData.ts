export interface ProjectGalleryImage {
  url: string;
  caption: string;
  tag: string;
}

export interface Project {
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Battery Storage' | 'Acreage';
  location: string;
  systemSize: string;
  panels: string;
  inverter: string;
  battery?: string;
  annualSavings: string;
  co2Offset: string;
  paybackPeriod: string;
  selfConsumption: string;
  imageUrl: string;
  gallery: ProjectGalleryImage[];
  description: string;
  challengeSolution?: {
    challenge: string;
    solution: string;
  };
  customerQuote: {
    quote: string;
    author: string;
    suburb: string;
  };
  highlights: string[];
  specs: { [key: string]: string };
}

export const projectsData: Project[] = [
  {
    slug: 'coastal-contemporary-mermaid-beach',
    title: 'Coastal High-Yield 14.25kW System with Tesla Powerwall 3',
    category: 'Residential',
    location: 'Mermaid Beach, QLD',
    systemSize: '14.25 kW',
    panels: '30x REC Alpha Pure-R 475W Black Panels',
    inverter: 'Integrated Tesla Solar Inverter',
    battery: 'Tesla Powerwall 3 (13.5 kWh with Whole-Home Backup)',
    annualSavings: '$3,850 / yr',
    co2Offset: '14.2 tonnes / yr',
    paybackPeriod: '3.6 Years',
    selfConsumption: '94%',
    imageUrl: '/images/projects/aerial-view-solar.webp',
    gallery: [
      {
        url: '/images/projects/project-rooftop-array.webp',
        caption: 'All-black 30-panel rooftop array installed on custom dark COLORBOND® roof in Mermaid Beach',
        tag: 'Rooftop Array',
      },
      {
        url: '/images/projects/clarity-existing-solar-battery.webp',
        caption: 'Concealed conduit routing and laser-aligned smart modular battery wall installation',
        tag: 'Battery Storage',
      },
      {
        url: '/images/projects/project-switchboard.webp',
        caption: 'Main switchboard upgraded with lightning surge arresters & sub-100ms backup gateway',
        tag: 'Switchboard & Inverter',
      },
      {
        url: '/images/projects/project-cyclone-clamping.webp',
        caption: 'Clenergy cyclone-rated mounting brackets torqued to coastal engineering specification',
        tag: 'Cyclone Clamping',
      },
      {
        url: '/images/projects/project-aerial-perspective.webp',
        caption: 'Aerial perspective showing east and west solar panel orientations for morning and afternoon sun',
        tag: 'Aerial Perspective',
      },
    ],
    description:
      'A striking modern coastal residence with heavy air conditioning loads and an electric vehicle. We engineered a multi-oriented roof array taking advantage of both east morning light and late western afternoon sun to maintain consistent charging for their Powerwall 3.',
    challengeSolution: {
      challenge:
        'Coastal salt mist environment, split multi-pitched rooflines, and high peak evening power usage from ducted climate control and EV charging.',
      solution:
        'Selected REC Alpha Pure-R heterojunction modules with marine-grade anodized framing, paired with a Tesla Powerwall 3 configured for whole-home backup during severe storm outages.',
    },
    customerQuote: {
      quote:
        'Trent and the Sunny Solar installation crew were exceptional. We have cut our quarterly power bill from $1,280 down to an $85 credit in summer. The Powerwall app gives us total peace of mind.',
      author: 'Marcus & Elena V.',
      suburb: 'Mermaid Beach',
    },
    highlights: [
      'Zero grid dependence during 88% of sunny days',
      'Seamless automated backup switchover under 100ms',
      'All-black aesthetic matching custom dark COLORBOND® roof',
      'Export control optimization for local Energex distribution limits',
      'Integrated Level 2 EV smart solar diversion charging',
    ],
    specs: {
      'System Capacity': '14.25 kW DC',
      'Solar Modules': '30x REC Alpha Pure-R 475W All-Black HJT',
      'Battery Storage': 'Tesla Powerwall 3 (13.5 kWh Usable LFP)',
      'Continuous Inverter Rating': '11.5 kW Backup Capability',
      'Mounting Hardware': 'Clenergy Black anodized cyclone-rated rails',
      'Monitoring': 'Tesla App + Sunny Solar Real-Time Telemetry',
      'Workmanship Warranty': '10-Year In-House Master Electrician Guarantee',
      'Hardware Warranty': '25-Year REC Triple Guarantee (Product, Performance, Labor)',
    },
  },
  {
    slug: 'broadbeach-waters-luxury-solar-battery',
    title: 'Waterfront Canal Villa 16.63kW Solar & Dual Tesla Powerwalls',
    category: 'Battery Storage',
    location: 'Broadbeach Waters, QLD',
    systemSize: '16.63 kW',
    panels: '35x REC Alpha Pure-RX 475W All-Black',
    inverter: 'Enphase IQ8+ Microinverters',
    battery: '2x Tesla Powerwall 3 (27.0 kWh Whole-Home 3-Phase Backup)',
    annualSavings: '$4,650 / yr',
    co2Offset: '17.4 tonnes / yr',
    paybackPeriod: '4.1 Years',
    selfConsumption: '98%',
    imageUrl: '/images/projects/tesla-solar-roof.webp',
    gallery: [
      {
        url: '/images/projects/tesla-solar-roof.webp',
        caption: 'Luxury canal estate installation engineered for maximum solar harvesting across 3 roof aspects',
        tag: 'Waterfront Villa',
      },
      {
        url: '/images/projects/dji-aerial-solar.webp',
        caption: 'All-black premium solar panels flush-mounted to preserve contemporary architectural street appeal',
        tag: 'All-Black Roof',
      },
      {
        url: '/images/projects/clarity-existing-solar-battery.webp',
        caption: 'Dual high-efficiency smart battery units mounted side-by-side with whole-home backup',
        tag: 'Dual Batteries',
      },
      {
        url: '/images/projects/3phase-gateway.webp',
        caption: '3-phase automatic backup gateway wiring with dedicated circuit shedding controls',
        tag: '3-Phase Gateway',
      },
      {
        url: '/images/projects/solar-cell-detail.webp',
        caption: 'High-yield heterojunction solar cell detail engineered for tropical efficiency',
        tag: 'Cell Detail',
      },
    ],
    description:
      'A luxury west-facing waterfront home with multi-zone ducted air conditioning, electric boat pontoon charger, and swimming pool heat pump. Installed with Enphase micro-inverter architecture to prevent shading losses from multi-level rooflines and dual Powerwalls for complete whole-house blackout autonomy.',
    challengeSolution: {
      challenge:
        'Complex architectural multi-pitch slate roof with variable tree shading and high 3-phase consumption from pool pumps and boat chargers.',
      solution:
        'Decoupled system architecture with individual Enphase microinverters so shaded panels never drag down sunny strings, paired with 27kWh of Powerwall storage for whole-estate resilience.',
    },
    customerQuote: {
      quote:
        'We have zero electricity bills even with the air conditioning running non-stop in January. The black-on-black panel finish looks like an architectural feature on our slate roof.',
      author: 'Greg & Fiona B.',
      suburb: 'Broadbeach Waters',
    },
    highlights: [
      '100% whole-property blackout immunity across all 3 phases',
      'Individual panel-level microinverter monitoring via Enphase Enlighten',
      'All-black concealed hardware matching waterfront design',
      'EV and boat pontoon charging powered purely by excess solar',
      'Virtually disconnected from the grid during 9 months of the year',
    ],
    specs: {
      'System Capacity': '16.63 kW DC',
      'Solar Modules': '35x REC Alpha Pure-RX 475W All-Black',
      'Battery Storage': '2x Tesla Powerwall 3 (27.0 kWh Usable)',
      'Inverter Architecture': '35x Enphase IQ8+ Microinverters',
      'Mounting Hardware': 'Direct-tile stainless steel non-penetrative clamps',
      'Monitoring': 'Tesla + Enphase Enlighten Dual Monitoring',
      'Workmanship Warranty': '10-Year In-House Master Electrician Guarantee',
    },
  },
  {
    slug: 'brisbane-family-home-paddington',
    title: 'Character Cottage 9.5kW Solar & Sungrow SBR Battery',
    category: 'Residential',
    location: 'Paddington, australia QLD',
    systemSize: '9.5 kW',
    panels: '20x AIKO Neostar 2S+ 475W All-Black N-Type',
    inverter: 'Sungrow SH6.0RS Hybrid Inverter',
    battery: 'Sungrow SBR096 (9.6 kWh High-Voltage Battery)',
    annualSavings: '$2,640 / yr',
    co2Offset: '9.8 tonnes / yr',
    paybackPeriod: '3.8 Years',
    selfConsumption: '89%',
    imageUrl: '/images/projects/pv-solar-thermal.webp',
    gallery: [
      {
        url: '/images/projects/pv-solar-thermal.webp',
        caption: 'Master Electrician installing high-efficiency panels on heritage tin roof in Paddington',
        tag: 'Heritage Installation',
      },
      {
        url: '/images/projects/panel-engineering.webp',
        caption: 'Close-up of AIKO N-Type partial-shading resilient solar panels with black anodized clamps',
        tag: 'Panel Engineering',
      },
      {
        url: '/images/projects/sunny-boy-inverter.webp',
        caption: 'Compact Sungrow hybrid inverter & modular high-voltage battery tucked under Nationwideer sub-floor',
        tag: 'Hybrid Battery',
      },
      {
        url: '/images/projects/precision-torquing.webp',
        caption: 'Final alignment and edge clamp torquing preserving historic corrugated tin waterproofing',
        tag: 'Precision Torquing',
      },
    ],
    description:
      'A heritage tin-and-timber home with roof pitching and shading constraints. Micro-inverter architecture was paired with premium N-Type panels to maximize production even during partial morning shade from neighboring jacaranda trees.',
    challengeSolution: {
      challenge:

        'Steep 34-degree corrugated iron roof with heritage building covenants and mature jacaranda trees casting intermittent shade.',
      solution:
        'Utilized ultra-high efficiency AIKO partial-shading resistant cells and specialized sub-floor battery mounting to keep hardware invisible from street level.',
    },
    customerQuote: {
      quote:
        'Other companies told us our roof was too steep or split. Sunny Solar took the time to 3D model our trees and found the perfect panel arrangement. The results speak for themselves!',
      author: 'Sarah K.',
      suburb: 'Paddington',
    },
    highlights: [
      'Preserved architectural integrity of 1920s Nationwideer',
      'Panel-level monitoring via individual optimizers',
      'Sungrow hybrid battery powers fridge and lights during storms',
      'Payback timeframe estimated at just 3.8 years',
      'Zero visible wiring on heritage timber exterior',
    ],
    specs: {
      'System Capacity': '9.5 kW DC',
      'Solar Modules': '20x AIKO Neostar 2S+ 475W N-Type ABC',
      'Battery Storage': 'Sungrow SBR096 (9.6 kWh Modular LFP)',
      'Inverter Rating': '6.0 kW Single-Phase Hybrid EPS',
      'Mounting Hardware': 'Custom tin clamp system with hidden cabling',
      'Warranty': '25-Year Manufacturer Warranty + 10-Year Workmanship',
    },
  },
  {
    slug: 'tamborine-mountain-acreage-solar',
    title: 'Acreage Off-Grid Ready 21.38kW Ground & Roof Hybrid',
    category: 'Acreage',
    location: 'Tamborine Mountain, QLD',
    systemSize: '21.38 kW',
    panels: '45x Jinko Tiger Neo 475W Dual-Glass Bifacial',
    inverter: '2x Fronius Symo GEN24 Plus',
    battery: 'BYD Battery-Box Premium HVM 22.1 kWh',
    annualSavings: '$5,900 / yr',
    co2Offset: '21.5 tonnes / yr',
    paybackPeriod: '3.4 Years',
    selfConsumption: '96%',
    imageUrl: '/images/projects/homestead-overview.webp',
    gallery: [
      {
        url: '/images/projects/ground-mount-array.webp',
        caption: 'Engineered ground-mount array positioned on hinterland slope for optimum winter sun harvest',
        tag: 'Ground Mount Array',
      },
      {
        url: '/images/projects/ground-framework.webp',
        caption: 'Heavy-duty steel footing and ground mount framework built to withstand high mountain wind speeds',
        tag: 'Ground Framework',
      },
      {
        url: '/images/projects/bifacial-rows.webp',
        caption: 'Bifacial dual-glass ground rows designed for maximum morning and late afternoon harvesting',
        tag: 'Bifacial Rows',
      },
      {
        url: '/images/projects/homestead-overview.webp',
        caption: 'Overview of the Tamborine Mountain acreage property powered by 100% self-generated clean solar',
        tag: 'Homestead Overview',
      },
    ],
    description:
      'A hinterland acreage with high energy demands including bore water pumps, workshop machinery, and pool heating. We designed an off-grid resilient dual-inverter system capable of self-sustaining the entire property.',
    challengeSolution: {
      challenge:
        'Frequent mountain storm blackouts, 3-phase borehole pumps requiring high starting currents, and heavy timber shading on main house roof.',
      solution:
        'Built a split array combining clear roof space with a precision-angled ground mount array and 22.1kWh of BYD high-voltage storage with automatic 3-phase blackout islanding.',
    },
    customerQuote: {
      quote:
        'When storms knock out the mountain power lines, our neighbors lose power for days. We do not even notice the lights flicker. Incredible workmanship and professional service from start to finish.',
      author: 'David & Gillian M.',
      suburb: 'Tamborine Mountain',
    },
    highlights: [
      'Full multi-phase backup capability for 3-phase machinery',
      'Ground-mount array angled specifically for peak winter generation',
      'Integrated generator auto-start backup switch',
      '96% self-consumption rate year-round',
      'Full remote monitoring via Fronius Solar.web',
    ],
    specs: {
      'System Capacity': '21.38 kW DC (Split Roof & Ground)',
      'Solar Modules': '45x Jinko Tiger Neo 475W Bifacial Dual-Glass',
      'Battery Storage': '22.1 kWh BYD Battery-Box Premium HVM',
      'Inverters': '2x Fronius Symo GEN24 10.0 Plus',
      'Backup Mode': 'Full 3-Phase Automatic Changeover',
      'Monitoring': 'Fronius Solar.web Pro Dashboard',
    },
  },
  {
    slug: 'coomera-industrial-warehouse-solar',
    title: 'Coomera Logistics Hub 71.25kW High-Yield Commercial Solar',
    category: 'Commercial',
    location: 'Coomera, Gold Coast, QLD',
    systemSize: '71.25 kW',
    panels: '150x Jinko Tiger Neo 475W TOPCon Commercial',
    inverter: 'Fronius Tauro 50kW Commercial String Inverter',
    annualSavings: '$18,200 / yr',
    co2Offset: '71.8 tonnes / yr',
    paybackPeriod: '2.4 Years',
    selfConsumption: '92%',
    imageUrl: '/images/projects/aerial-view-solar.webp',
    gallery: [
      {
        url: '/images/projects/aerial-view-solar.webp',
        caption: 'Expansive commercial warehouse rooftop array engineered for direct daytime refrigeration offsetting',
        tag: 'Commercial Rooftop',
      },
      {
        url: '/images/projects/photovoltaik-nk.webp',
        caption: 'Commercial string arrays with non-penetrative Klip-Lok clamps preserving roof warranty',
        tag: 'Klip-Lok Clamps',
      },
      {
        url: '/images/projects/pavagada-solar-park.webp',
        caption: 'Heavy-duty Fronius Tauro 50kW commercial string inverter with double-fan active cooling system',
        tag: '50kW Inverter',
      },
      {
        url: '/images/projects/broken-hill-solar.webp',
        caption: 'Certified network protection unit (NPU) with secondary injection relay testing for Energex compliance',
        tag: 'Relay Testing',
      },
    ],
    description:
      'A high-clearance distribution and cold-storage warehouse with continuous 3-phase commercial refrigeration loads. Designed for high midday generation alignment to slash commercial peak demand tariffs and accelerate capital payback.',
    challengeSolution: {
      challenge:
        'High commercial electricity kVA demand charges, strict Energex major connection engineering requirements, and zero tolerance for facility downtime.',
      solution:
        'Installed over a planned weekend without disrupting cold-storage operations, paired with precision export limiter relays and secondary injection testing approved on first inspection.',
    },
    customerQuote: {
      quote:
        'Trent and his team managed the Energex major network connection approval effortlessly. The commercial tax write-off and power bill reduction made this a no-brainer decision for our business.',
      author: 'Darren S.',
      suburb: 'Coomera',
    },
    highlights: [
      'Direct daytime load offsetting saves over $1,500 monthly',
      'Energex Grid Connection & Protection relay certified',
      'Structural Klip-Lok clamp system preserving roof waterproof warranty',
      'Under 2.5-year commercial payback period',
      'Accelerated capital depreciation eligible',
    ],
    specs: {
      'System Capacity': '71.25 kW Commercial',
      'Solar Modules': '150x Jinko Tiger Neo 475W TOPCon Commercial',
      'Inverter': 'Fronius Tauro ECO 50kW String Inverter',
      'Protection': 'Secondary Injection Tested & Network Protection Unit',
      'Monitoring': 'Commercial Energy Portal with consumption CTs',
    },
  },
  {
    slug: 'commercial-medical-centre-robina',
    title: 'Robina Health Hub 42.75kW Commercial Rooftop Solar',
    category: 'Commercial',
    location: 'Robina, Gold Coast, QLD',
    systemSize: '42.75 kW',
    panels: '90x Trina Vertex S+ 475W Dual-Glass',
    inverter: 'Fronius Eco 27.0 & Symo 12.5',
    annualSavings: '$11,400 / yr',
    co2Offset: '43.2 tonnes / yr',
    paybackPeriod: '2.8 Years',
    selfConsumption: '90%',
    imageUrl: '/images/projects/photovoltaik-nk.webp',
    gallery: [
      {
        url: '/images/projects/photovoltaik-nk.webp',
        caption: 'Commercial rooftop system powering daylight medical clinic and diagnostic machinery',
        tag: 'Clinic Rooftop',
      },
      {
        url: '/images/projects/dji-aerial-solar.webp',
        caption: 'Full roof perspective showing 90 dual-glass panels angled for maximum all-day solar exposure',
        tag: 'Dual-Glass Panels',
      },
      {
        url: '/images/projects/sunny-boy-inverter.webp',
        caption: 'Dual European Fronius inverters mounted in secure switchroom with vibration dampers',
        tag: 'Dual Inverters',
      },
      {
        url: '/images/projects/project-switchboard.webp',
        caption: 'Sub-board isolation and surge suppression shielding delicate medical diagnostic scanners',
        tag: 'Surge Suppression',
      },
    ],
    description:
      'A daytime-operating medical clinic with continuous climate control, sterilization equipment, and diagnostic tools. Engineered to offset 74% of daytime operational electricity usage with zero business interruption.',
    challengeSolution: {
      challenge:
        'Sensitive medical machinery requiring clean harmonic-free power, daytime patient appointments, and strict acoustic limits on inverter hum.',
      solution:
        'Designed with European Fronius inverters placed in acoustically isolated service alcoves, coupled with active harmonic filtering and weekend-only roof installation.',
    },
    customerQuote: {
      quote:
        'Our ROI is running ahead of forecast. Sunny Solar handled all energex grid approvals and structural certifications seamlessly without causing downtime for our patients.',
      author: 'Dr. Andrew L.',
      suburb: 'Robina',
    },
    highlights: [
      'Direct daytime consumption offsets high commercial peak tariffs',
      'Zero downtime weekend installation rollout',
      'Instant STC rebate and accelerated capital depreciation applied',
      'Expected payback in 2.8 years',
      'Clean power harmonic filtering for medical diagnostic scanners',
    ],
    specs: {
      'System Capacity': '42.75 kW Commercial',
      'Solar Modules': '90x Trina Vertex S+ 475W Dual-Glass',
      'Inverter': 'Dual European Fronius Inverters (Eco 27.0 + Symo 12.5)',
      'Protection': 'Network Protection Unit & Secondary Injection Tested',
      'Monitoring': 'Commercial Energy Portal with consumption sensors',
    },
  },
];
