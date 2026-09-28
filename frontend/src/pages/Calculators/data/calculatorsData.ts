export interface CalculatorHeroData {
  badge: string;
  title: string;
  highlightText: string;
  description: string;
}

export interface AddBatteryFeatureItem {
  bold: string;
  text: string;
}

export interface AddBatteryMetricItem {
  label: string;
  value: string;
  subtext: string;
  variant?: 'slate' | 'emerald';
}

export interface AddBatterySectionData {
  theme: 'light' | 'dark';
  glows?: {
    topRight: string;
    bottomLeft: string;
  };
  image: {
    src: string;
    alt: string;
    topBadge?: {
      icon: 'Sun' | 'Home' | 'TrendingUp';
      text: string;
    };
    bottomTag: {
      headline: string;
      subline: string;
    };
  };
  badge: {
    icon: 'BatteryCharging' | 'DollarSign' | 'Zap' | 'Sparkles';
    text: string;
  };
  title: string;
  description: string;
  features?: AddBatteryFeatureItem[];
  metrics?: AddBatteryMetricItem[];
  footer: {
    trustText: string;
    trustIcon?: 'ShieldCheck';
    buttonText: string;
    buttonTo: string;
  };
}

export interface CalculatorPageData {
  seo: {
    title: string;
    description: string;
  };
  hero: CalculatorHeroData;
  addBattery: AddBatterySectionData;
}

export const calculatorsPageData: Record<string, CalculatorPageData> = {
  batterySavings: {
    seo: {
      title: 'Battery Savings & Peak Tariff Calculator | Sunny Solar',
      description:
        'Estimate additional savings by storing daytime solar energy and avoiding peak grid tariff rates in South East Queensland.'
    },
    hero: {
      badge: 'Storage ROI',
      title: 'Home Battery',
      highlightText: 'Savings Calculator',
      description:
        'Calculate how much money you save by capturing cheap daytime solar and discharging it during expensive 4pm-9pm evening peak tariff hours.'
    },
    addBattery: {
      theme: 'light',
      glows: {
        topRight: 'bg-emerald-400/5',
        bottomLeft: 'bg-amber-400/5'
      },
      image: {
        src: '/images/solutions/battery-bundle.webp',
        alt: 'Battery storage recharging from solar panels',
        bottomTag: {
          headline: 'Standalone Battery vs Solar+Battery',
          subline: 'Recharging from grid off-peak costs 22¢. Recharging from solar costs $0.00.'
        }
      },
      badge: {
        icon: 'BatteryCharging',
        text: 'The Synergy Equation'
      },
      title: 'Why a Battery Without Solar Only Delivers Half the Savings',
      description:
        'Some households ask about installing a battery alone. While a standalone battery can buy off-peak night grid power and discharge during the peak, the profit margin is only ~14¢/kWh. When you combine solar + battery, the battery fills with 100% free rooftop energy, earning the full 38¢–44¢ peak tariff spread!',
      features: [
        {
          bold: 'No Grid Fuel Costs:',
          text: '13.5 kWh Tesla or Sungrow battery recharges entirely from noon solar.'
        },
        {
          bold: 'Storm Blackout Islanding:',
          text: 'Even in a multi-day grid blackout, solar panels refill your battery every morning.'
        },
        {
          bold: 'Single Smart App:',
          text: 'Monitor rooftop solar generation, battery percentage, and home draw in real-time.'
        }
      ],
      footer: {
        trustText: 'CEC Approved Battery Installers',
        trustIcon: 'ShieldCheck',
        buttonText: 'View Solar + Battery Packages',
        buttonTo: '/batteries/solar-plus-battery'
      }
    }
  },

  batterySize: {
    seo: {
      title: 'Home Battery Sizing Calculator | Sunny Solar',
      description:
        'Calculate the ideal battery storage capacity (kWh) for your home based on evening appliance usage, solar array output, and backup needs.'
    },
    hero: {
      badge: 'Capacity Matcher',
      title: 'Home Battery Sizing',
      highlightText: 'Calculator',
      description:
        "Don't buy an undersized battery that dies at 8 PM, or overpay for capacity you won't use. Sized specifically to your evening appliances."
    },
    addBattery: {
      theme: 'light',
      glows: {
        topRight: 'bg-amber-400/5',
        bottomLeft: 'bg-emerald-400/5'
      },
      image: {
        src: '/images/solutions/solar-kit.jpg',
        alt: 'Solar and battery matched sizing hardware',
        topBadge: {
          icon: 'Sun',
          text: 'Rooftop Solar & Storage Balance'
        },
        bottomTag: {
          headline: 'Golden Sizing Ratio',
          subline: 'Never buy more battery capacity than your solar panels can recharge in winter.'
        }
      },
      badge: {
        icon: 'BatteryCharging',
        text: 'Solar & Battery Capacity Co-Optimization'
      },
      title: 'Add Battery with Solar: Why Panel Output Limits Battery Capacity',
      description:
        "A 13.5 kWh Tesla Powerwall 3 or 9.6 kWh Sungrow battery needs surplus generation after your home's daytime appliances are fed. If you only have 5 kW of solar, your home will consume the power during the day and your battery will remain half empty every afternoon. Our engineers match the kilowatt generation to the kilowatt-hour storage.",
      features: [
        {
          bold: '5 kW – 6.6 kW Solar:',
          text: 'Pair with 5 kWh – 9.6 kWh battery (ideal for low-to-medium evening draw).'
        },
        {
          bold: '8.8 kW – 10.0 kW Solar:',
          text: 'Perfect pairing for 13.5 kWh Tesla Powerwall 3 (powers full evening A/C).'
        },
        {
          bold: '13.2 kW+ Solar:',
          text: 'Sized for modular 19.2 kWh+ arrays or dual Tesla units with whole-home backup.'
        }
      ],
      footer: {
        trustText: 'Right-sized without overpaying',
        trustIcon: 'ShieldCheck',
        buttonText: 'Check Your Roof Size',
        buttonTo: '/calculators/system-size'
      }
    }
  },

  isSolarRight: {
    seo: {
      title: 'Is Solar Right for Your Property? | Sunny Solar',
      description:
        'Take our 60-second quiz to determine if solar is right for your roof, electricity tariff, and energy goals.'
    },
    hero: {
      badge: '60-Second Quiz',
      title: 'Is Solar Right for',
      highlightText: 'Your Property?',
      description:
        'Not every roof is suited to solar. Answer 4 quick questions to see if your roof orientation, shading, and electricity tariff make solar a sound investment.'
    },
    addBattery: {
      theme: 'light',
      glows: {
        topRight: 'bg-amber-400/5',
        bottomLeft: 'bg-emerald-400/5'
      },
      image: {
        src: '/images/about/solar-installation-aerial.webp',
        alt: 'Rooftop solar and battery feasibility installation',
        topBadge: {
          icon: 'Home',
          text: 'Property Readiness'
        },
        bottomTag: {
          headline: 'Battery Readiness Check',
          subline: 'Even roofs with minor shading make sense when paired with a home battery.'
        }
      },
      badge: {
        icon: 'BatteryCharging',
        text: 'Solar + Battery Readiness'
      },
      title: 'Add Battery with Solar: 3 Property Checks That Guarantee Success',
      description:
        'Wondering if your home can handle both solar and battery storage? Virtually all residential homes across Queensland are viable candidates. Here are the 3 technical aspects our team validates during your free site assessment:',
      features: [
        {
          bold: 'Switchboard Room & Safety Switches:',
          text: 'We check if your main switchboard has room for an RCD circuit breaker and smart meter CT clamp.'
        },
        {
          bold: 'Battery Wall Space:',
          text: 'High-efficiency IP67 batteries (like Tesla Powerwall 3 or Sungrow) mount indoors in the garage or outside sheltered on brick/concrete.'
        },
        {
          bold: 'Multi-Facet Roof Orientations:',
          text: 'Facing panels West captures intense afternoon sun — right when your battery finishes topping off for the evening.'
        }
      ],
      footer: {
        trustText: '100% Free On-Site or Aerial Inspection',
        trustIcon: 'ShieldCheck',
        buttonText: 'Read Battery Decision Guide',
        buttonTo: '/resources/battery-decision-guide'
      }
    }
  },

  payback: {
    seo: {
      title: 'Solar & Battery Payback Calculator | Sunny Solar',
      description:
        'Calculate how quickly your solar panels and battery storage system will pay for itself with energy savings.'
    },
    hero: {
      badge: 'ROI Analysis',
      title: 'Solar Investment',
      highlightText: 'Payback Calculator',
      description:
        'See how fast a modern residential solar installation pays for itself in avoided utility bills and government rebates.'
    },
    addBattery: {
      theme: 'dark',
      glows: {
        topRight: 'bg-emerald-500/10',
        bottomLeft: 'bg-amber-500/10'
      },
      image: {
        src: '/images/solutions/net-metering.jpg',
        alt: 'Solar plus battery financial net metering payback',
        topBadge: {
          icon: 'TrendingUp',
          text: 'Arbitrage ROI Multiplier'
        },
        bottomTag: {
          headline: 'Energy Tariff Spread',
          subline: 'Store 5¢ daytime export and consume it during 38¢ evening peak hours.'
        }
      },
      badge: {
        icon: 'DollarSign',
        text: 'Solar + Battery Economics'
      },
      title: 'Add Battery with Solar: The 33¢ Spread That Accelerates Payback',
      description:
        'Feed-in tariffs in South East Queensland have fallen to ~5¢–7¢/kWh, while peak retail tariffs sit at 38¢–44¢/kWh. That means exporting 1 kWh of solar only earns you 5¢, but buying it back at 7 PM costs 38¢. Adding a battery captures that 33¢ spread every single day, keeping hundreds of dollars each quarter inside your family budget.',
      metrics: [
        {
          label: 'Grid Export Return',
          value: 'Only 5¢ – 6¢ / kWh',
          subtext: 'Low value without storage',
          variant: 'slate'
        },
        {
          label: 'Battery Self-Use Value',
          value: '38¢ – 44¢ / kWh',
          subtext: 'Full retail offset value',
          variant: 'emerald'
        }
      ],
      footer: {
        trustText: '10-Year Comprehensive Warranty',
        trustIcon: 'ShieldCheck',
        buttonText: 'Model Battery Cashflow',
        buttonTo: '/calculators/battery-savings'
      }
    }
  },

  quoteComparison: {
    seo: {
      title: 'Compare Solar Quotes | Sunny Solar',
      description:
        'Compare your solar quotes side-by-side to understand differences in panel quality, inverter efficiency, warranties, and pricing.'
    },
    hero: {
      badge: 'Quote Auditor',
      title: 'Compare Solar &',
      highlightText: 'Battery Quotes',
      description:
        'Put competitor quotes head-to-head. Our independent scoring engine identifies budget shortcuts, missing warranties, and hidden installation fees.'
    },
    addBattery: {
      theme: 'light',
      glows: {
        topRight: 'bg-emerald-400/5',
        bottomLeft: 'bg-amber-400/5'
      },
      image: {
        src: '/images/solutions/battery-storage.jpg',
        alt: 'Solar plus battery quote comparison equipment',
        bottomTag: {
          headline: 'Transparent Battery Quoting',
          subline: 'Compare actual usable kWh, inverter surge power, and warranty fine print.'
        }
      },
      badge: {
        icon: 'BatteryCharging',
        text: 'Battery Storage Due Diligence'
      },
      title: 'Comparing Battery Quotes? 3 Red Flags to Avoid',
      description:
        'Comparing battery quotes is fundamentally different from solar panels. Two quotes with "10 kWh storage" can deliver wildly different real-world performance. Here is what to verify before signing:',
      features: [
        {
          bold: 'Is Backup Power Included?',
          text: 'Many quotes supply "grid-tied only" batteries that shut down during grid blackouts unless a backup gateway is installed.'
        },
        {
          bold: 'AC-Coupled vs Hybrid Lock-In:',
          text: 'An AC-coupled battery works with any inverter brand. A DC hybrid forces you to replace your solar inverter completely.'
        },
        {
          bold: 'Master Electrician vs Subcontractors:',
          text: 'Battery storage operates at high DC voltages and requires CEC battery-accredited full-time installers.'
        }
      ],
      footer: {
        trustText: '100% Free & Confidential Review',
        trustIcon: 'ShieldCheck',
        buttonText: 'Upload Quote for Free Audit',
        buttonTo: '/resources/quote-review'
      }
    }
  },

  savingsSoFar: {
    seo: {
      title: 'How Much Have You Saved With Solar? | Sunny Solar',
      description:
        'Calculate your estimated lifetime savings from your existing solar installation and see how adding storage maximizes return.'
    },
    hero: {
      badge: 'Historical Audit',
      title: 'How Much Have You Saved',
      highlightText: 'With Solar So Far?',
      description:
        'Audit your existing solar system generation against historical utility tariffs to verify your lifetime return on investment.'
    },
    addBattery: {
      theme: 'light',
      glows: {
        topRight: 'bg-emerald-400/5',
        bottomLeft: 'bg-amber-400/5'
      },
      image: {
        src: '/images/about/gallery/electrician-wiring-switchboard.webp',
        alt: 'Electrician retrofitting battery storage onto existing solar system',
        bottomTag: {
          headline: 'Stop Bleeding 5¢ Solar',
          subline: 'Your solar system paid for itself. Now add storage to eliminate remaining peak bills.'
        }
      },
      badge: {
        icon: 'Zap',
        text: 'The Next Evolution of Your Rooftop Asset'
      },
      title: 'Already Saved with Solar? Add a Battery to Triple Daily Value',
      description:
        'When you first installed solar, feed-in tariffs were 20¢–44¢/kWh. Today, power retailers only credit you 5¢ for export while charging 38¢+ at night. By adding an AC-coupled battery, you stop giving away your daytime generation and store it for your evening dinners, air-con, and TV.',
      features: [
        {
          bold: 'Zero Inverter Replacement:',
          text: 'AC-coupled batteries wire right into your switchboard beside your existing inverter.'
        },
        {
          bold: 'Recharge from Legacy Panels:',
          text: 'Whether panels are 3 or 10 years old, they will reliably charge a modern battery.'
        },
        {
          bold: 'Instant Blackout Defense:',
          text: 'Older solar systems shut down in blackouts. Adding a battery gateway keeps your lights on.'
        }
      ],
      footer: {
        trustText: 'Compatible with all existing systems',
        trustIcon: 'ShieldCheck',
        buttonText: 'Explore Battery Retrofits',
        buttonTo: '/existing-solar/add-battery'
      }
    }
  },

  solarSavings: {
    seo: {
      title: 'Solar Savings Calculator | Sunny Solar',
      description:
        'Calculate your estimated electricity bill savings with residential solar power in South East Queensland.'
    },
    hero: {
      badge: 'Interactive Calculator',
      title: 'Calculate Your',
      highlightText: 'Solar Savings',
      description:
        'See your potential quarterly power bill reductions, feed-in tariff income, and 10-year savings return with a quality Gold Coast solar installation.'
    },
    addBattery: {
      theme: 'dark',
      glows: {
        topRight: 'bg-amber-500/10',
        bottomLeft: 'bg-emerald-500/10'
      },
      image: {
        src: '/images/solutions/battery-storage.jpg',
        alt: 'Solar plus battery storage solution',
        bottomTag: {
          headline: 'The Nighttime Problem Solved',
          subline: 'Daytime solar offsets day use. Batteries eliminate evening peak tariff bills.'
        }
      },
      badge: {
        icon: 'BatteryCharging',
        text: 'Double Your Savings With Storage'
      },
      title: 'Add Battery with Solar: Save Day & Night',
      description:
        "While solar panels drastically reduce your daytime bill, up to 60% of an average family's energy consumption happens after 5 PM when the sun has set. By adding a home battery, you bank that daytime surplus and eliminate expensive 38¢/kWh evening peak grid power completely.",
      metrics: [
        {
          label: 'Solar Only',
          value: 'Covers 40% - 60% of total bill.',
          subtext: 'Nighttime grid consumption billed at full peak rates.',
          variant: 'slate'
        },
        {
          label: 'Solar + Battery',
          value: 'Covers up to 94% of total bill.',
          subtext: 'Zero evening peak dependency and automated blackout protection.',
          variant: 'emerald'
        }
      ],
      footer: {
        trustText: 'Eligible for $1,000+ Battery Rebates',
        trustIcon: 'ShieldCheck',
        buttonText: 'Simulate Battery ROI',
        buttonTo: '/calculators/battery-savings'
      }
    }
  },

  systemSize: {
    seo: {
      title: 'Solar System Size Calculator | Sunny Solar',
      description:
        'Find the ideal solar panel capacity (kW) for your home based on daily power usage, roof space, and future appliances.'
    },
    hero: {
      badge: 'Sizing Engine',
      title: 'Solar System Size',
      highlightText: 'Recommender',
      description:
        "Calculate the exact solar panel capacity required to power your family's appliances and prevent under-sizing regret."
    },
    addBattery: {
      theme: 'light',
      glows: {
        topRight: 'bg-amber-400/5',
        bottomLeft: 'bg-emerald-400/5'
      },
      image: {
        src: '/images/solutions/battery-hero.webp',
        alt: 'Battery storage with solar system sizing',
        bottomTag: {
          headline: 'Recharge Rule of Thumb',
          subline: '1 kWh battery requires ~0.7 kW solar capacity to reliably refill in winter.'
        }
      },
      badge: {
        icon: 'Sparkles',
        text: 'Future-Proof System Engineering'
      },
      title: 'Adding a Battery? Why You Need 8.8 kW to 10 kW+ on the Roof',
      description:
        "If you install a basic 6.6 kW system and run air conditioning, your daytime solar will be consumed immediately. When you add a 10 kWh or 13.5 kWh battery, there won't be enough surplus sunlight left to fill the battery before sunset. Oversizing your solar array to 8.8 kW or 10 kW ensures full daily battery charging even on overcast days.",
      features: [
        {
          bold: '6.6 kW Solar:',
          text: 'Perfect for daytime savings, but limits future battery capacity.'
        },
        {
          bold: '8.8 kW - 10 kW Solar:',
          text: 'The golden sweet spot for pairing a 9.6 kWh to 13.5 kWh home battery.'
        },
        {
          bold: '13.2 kW+ Solar:',
          text: 'Ideal for double-storey homes, pools, EV charging + dual batteries.'
        }
      ],
      footer: {
        trustText: 'Have an existing battery in mind?',
        buttonText: 'Match Battery to Your Roof',
        buttonTo: '/calculators/battery-size'
      }
    }
  }
};
