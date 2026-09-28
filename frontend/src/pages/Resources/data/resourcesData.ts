export interface ResourceHeroData {
  badge: string;
  title: string;
  highlightText: string;
  description: string;
}

export interface ResourceBatteryFeatureItem {
  bold: string;
  text: string;
}

export interface ResourceBatteryData {
  image: {
    src: string;
    alt: string;
    bottomTag: {
      headline: string;
      subline: string;
      progressPercent: string;
    };
  };
  badge: {
    icon: 'BatteryCharging' | 'SunDim' | 'AlertTriangle' | 'ShieldAlert';
    text: string;
  };
  title: string;
  description: string;
  features: ResourceBatteryFeatureItem[];
  footer: {
    trustText: string;
    buttonText: string;
    buttonTo: string;
  };
}

export interface ResourceCTAData {
  badgeText: string;
  title: string;
  description: string;
  primaryButton: {
    text: string;
    to: string;
    icon: 'FileCheck' | 'FileSearch' | 'CheckSquare';
  };
  secondaryButton: {
    text: string;
    to: string;
    icon: 'ArrowRight' | 'FileCheck' | 'FileSearch';
  };
}

export interface ResourcePageData {
  seo: {
    title: string;
    description: string;
  };
  hero: ResourceHeroData;
  battery: ResourceBatteryData;
  cta: ResourceCTAData;
}

export const resourcesPageData: Record<string, ResourcePageData> = {
  buyerGuide: {
    seo: {
      title: "Complete Solar Buyer's Guide (Free Download) | Sunny Solar",
      description:
        'Download our comprehensive 38-page residential solar guide covering system sizing, panel technologies, and inverter choices.'
    },
    hero: {
      badge: 'Free Consumer Guide',
      title: 'Australian Solar',
      highlightText: "Buyer's Guide",
      description:
        'A completely independent, fluff-free guide to sizing your system, dodging high-pressure sales cowboys, and picking Tier-1 equipment.'
    },
    battery: {
      image: {
        src: '/images/solutions/net-metering.jpg',
        alt: 'Solar and battery smart energy management',
        bottomTag: {
          headline: 'Self-Consumption Rate',
          subline: '90%+ Solar Independence',
          progressPercent: 'w-[92%]'
        }
      },
      badge: {
        icon: 'BatteryCharging',
        text: 'Guide Chapter 6 Preview'
      },
      title: 'Add Battery with Solar: Unlocking True 24-Hour Solar Independence',
      description:
        'As explained in Chapter 6 of our comprehensive guide, solar-only homes export up to 60% of their generation to the grid for pennies. Adding a battery stops this leakage, storing clean solar energy for evening cooking, air conditioning, and EV charging.',
      features: [
        {
          bold: 'The Self-Consumption Jump:',
          text: 'Boost your on-site solar utilization from an average of 35% with solar alone up to 92% with smart home storage.'
        },
        {
          bold: 'Seamless Blackout Protection:',
          text: 'Automatically disconnects from the grid during neighborhood outages in 20 milliseconds, keeping essentials active.'
        },
        {
          bold: 'Single App Management:',
          text: 'Monitor roof generation, battery reserve, household consumption, and grid status in one unified dashboard.'
        }
      ],
      footer: {
        trustText: 'Tier-1 CEC Approved Lithium Storage',
        buttonText: 'Read Battery Decision Guide',
        buttonTo: '/resources/battery-decision-guide'
      }
    },
    cta: {
      badgeText: 'Ready for Tailored Numbers?',
      title: "Calculate Your Home's Specific Solar & Battery Payback",
      description:
        'Ready to see how the numbers apply to your specific roof and electricity bill? Use our interactive system sizing tool or request an independent quote audit.',
      primaryButton: {
        text: 'Analyze My Power Bill',
        to: '/resources/electricity-bill-review',
        icon: 'FileCheck'
      },
      secondaryButton: {
        text: 'Get Solar Buying Checklist',
        to: '/resources/buying-checklist',
        icon: 'ArrowRight'
      }
    }
  },

  batteryDecisionGuide: {
    seo: {
      title: 'Residential Solar Battery Decision Guide | Sunny Solar',
      description:
        'Learn how to evaluate whether home battery storage makes financial sense for your property, family, and solar array.'
    },
    hero: {
      badge: 'Storage Strategy',
      title: 'Home Battery',
      highlightText: 'Decision Guide',
      description:
        'Everything you need to know about battery sizing, payback periods, blackout backup, and whether your home is ready.'
    },
    battery: {
      image: {
        src: '/images/solutions/battery-storm.webp',
        alt: 'Home battery installation with solar array',
        bottomTag: {
          headline: 'Capacity Matching',
          subline: '10–13.5 kWh Optimal Sweet Spot',
          progressPercent: 'w-[96%]'
        }
      },
      badge: {
        icon: 'SunDim',
        text: 'Solar + Battery Sizing Rule'
      },
      title: 'Add Battery with Solar: The Golden Ratio for Maximum ROI',
      description:
        'A common trap is installing a 13.5 kWh battery on an undersized 5 kW solar array. During winter or cloudy stretches, the array lacks enough daytime surplus to recharge the battery fully. Here is the engineering ratio that guarantees full charge 340+ days a year:',
      features: [
        {
          bold: 'The 1:1.5 Solar-to-Storage Rule:',
          text: 'Pair every 10 kWh of battery capacity with at least 6.6 kW to 8 kW of rooftop solar panels to guarantee surplus charging power.'
        },
        {
          bold: 'Continuous vs Peak Inverter Output:',
          text: "Check continuous output kW (e.g. 5 kW vs 11.5 kW) so high-surge appliances like ducted AC don't trip to the grid."
        },
        {
          bold: 'Retrofit Compatibility:',
          text: 'If you already have solar, AC-coupled battery technology lets you add storage without modifying your existing solar inverter or panel warranties.'
        }
      ],
      footer: {
        trustText: 'CEC Accredited Storage Designers',
        buttonText: 'Audit My Battery Quote',
        buttonTo: '/resources/quote-review'
      }
    },
    cta: {
      badgeText: 'Need Unbiased Engineering Advice?',
      title: 'Get a Customized Battery Feasibility Assessment',
      description:
        'Not sure whether your switchboard, roof orientation, or nighttime power draw justifies a battery? Upload your power bill or request an independent quote audit.',
      primaryButton: {
        text: 'Analyze My Power Bill',
        to: '/resources/electricity-bill-review',
        icon: 'FileSearch'
      },
      secondaryButton: {
        text: 'Have Us Review a Battery Quote',
        to: '/resources/quote-review',
        icon: 'FileCheck'
      }
    }
  },

  buyingChecklist: {
    seo: {
      title: 'Solar & Battery Buying Checklist | Sunny Solar',
      description:
        'A 22-point vetting checklist to audit solar proposals, avoid installation shortcuts, and protect your home investment.'
    },
    hero: {
      badge: 'Consumer Protection',
      title: 'Solar Installation',
      highlightText: 'Buying Checklist',
      description:
        '22 essential checks to make before, during, and after your solar installation to ensure peak safety and performance.'
    },
    battery: {
      image: {
        src: '/images/solutions/battery-storage.jpg',
        alt: 'High quality battery storage equipment installation',
        bottomTag: {
          headline: 'Storage Safety Standard',
          subline: 'AS/NZS 5139 Compliance Check',
          progressPercent: 'w-[98%]'
        }
      },
      badge: {
        icon: 'ShieldAlert',
        text: 'Battery Installation Due Diligence'
      },
      title: 'Add Battery with Solar: 4 Mandatory Vetting Checks',
      description:
        'Installing battery storage involves high DC energy density and strict Australian electrical standards (AS/NZS 5139). Never sign a battery quote until you verify these four safety and installation requirements:',
      features: [
        {
          bold: 'CEC Battery Accreditation:',
          text: 'Ensure the installer holds specific Clean Energy Council Grid-Connected Storage accreditation, not just standard solar.'
        },
        {
          bold: 'Dedicated Fire Hazard Clearance:',
          text: 'Australian standards require 600mm clearance from non-combustible walls, habitable rooms, and hot water units.'
        },
        {
          bold: 'Integrated Isolator & Enclosure Rating:',
          text: 'Outdoor batteries must be IP65/IP67 weather-rated with UV-stabilized isolators and high-current DC circuit protection.'
        },
        {
          bold: 'Full In-House Workmanship Warranty:',
          text: 'Avoid subcontractors who blame the equipment manufacturer when issues occur. Demand a 10-year direct installer warranty.'
        }
      ],
      footer: {
        trustText: 'Master Electrician Guaranteed Compliance',
        buttonText: 'Download Printable Checklist',
        buttonTo: '/resources/buyer-guide'
      }
    },
    cta: {
      badgeText: 'Spot a Red Flag in Your Quote?',
      title: 'Let Our Master Electricians Audit Your Proposal',
      description:
        "Found something suspicious in a competitor's quotation? Send it through for a confidential, no-obligation technical review. We'll verify component authenticity, warranty viability, and correct installation scope.",
      primaryButton: {
        text: 'Audit My Competitor Quote',
        to: '/resources/quote-review',
        icon: 'FileCheck'
      },
      secondaryButton: {
        text: 'Review My Power Bill',
        to: '/resources/electricity-bill-review',
        icon: 'FileSearch'
      }
    }
  },

  electricityBillReview: {
    seo: {
      title: 'Free Electricity Bill Review & Solar Audit | Sunny Solar',
      description:
        'Upload your quarterly electricity bill. Our Master Electricians calculate your exact daytime solar coverage and payback timeline.'
    },
    hero: {
      badge: 'Free Tariff Audit',
      title: 'Electricity Bill',
      highlightText: 'Review & Audit',
      description:
        'Upload your latest electricity bill. Our Master Electricians calculate your exact daytime solar coverage and payback timeline.'
    },
    battery: {
      image: {
        src: '/images/solutions/solar-kit.jpg',
        alt: 'Electricity bill reduction with solar and battery pairing',
        bottomTag: {
          headline: 'Peak Tariff Spread',
          subline: 'Avoid 38¢ - 44¢ Night Rates',
          progressPercent: 'w-[95%]'
        }
      },
      badge: {
        icon: 'BatteryCharging',
        text: 'Tariff Arbitrage Analysis'
      },
      title: 'Add Battery with Solar: Flattening Your Peak Evening Tariff',
      description:
        'Look closely at your electricity bill: you will notice your highest rate per kWh occurs between 4 PM and 9 PM (peak tariff). Because solar stops producing when the sun sets, a solar-only system cannot eliminate these peak rates. Here is how adding storage changes your bill equation:',
      features: [
        {
          bold: 'Eliminate Evening 38¢+ Power:',
          text: 'Your battery automatically discharges from 4 PM onwards, covering dinner, air conditioning, and laundry with $0.00 daytime solar.'
        },
        {
          bold: 'Stop Inefficient Grid Exports:',
          text: 'Instead of exporting solar for a meager 5¢ feed-in credit, store every kWh to save 38¢ of retail grid power.'
        },
        {
          bold: 'Controlled Off-Peak Charging:',
          text: 'During rainy winter stretches, smart batteries can top up from the grid at 2 AM off-peak (18¢) to discharge during afternoon peak (38¢).'
        }
      ],
      footer: {
        trustText: 'Verified Against South East QLD Tariffs',
        buttonText: 'Compare Battery Quotes',
        buttonTo: '/resources/quote-review'
      }
    },
    cta: {
      badgeText: 'Need Immediate Calculations?',
      title: "Self-Calculate Your Solar & Battery Savings in 60 Seconds",
      description:
        'Prefer to run the numbers yourself before uploading a bill? Use our interactive suite of calculators to estimate system size, savings, and payback period.',
      primaryButton: {
        text: 'Open Solar Savings Calculator',
        to: '/calculators/solar-savings',
        icon: 'FileSearch'
      },
      secondaryButton: {
        text: 'Calculate Battery Savings',
        to: '/calculators/battery-savings',
        icon: 'FileCheck'
      }
    }
  },

  quoteReview: {
    seo: {
      title: 'Free Solar Quote Review & Comparison Audit | Sunny Solar',
      description:
        "Upload a competitor quote. We'll identify missing equipment warranties, undersized cabling, and whether you're paying too much."
    },
    hero: {
      badge: 'Quote Audit',
      title: 'Compare Your',
      highlightText: 'Solar Quotes',
      description:
        "Upload a competitor quote. We'll identify missing equipment warranties, undersized cabling, and whether you're paying too much."
    },
    battery: {
      image: {
        src: '/images/solutions/engineers.jpg',
        alt: 'Solar engineers checking battery and electrical switchboard',
        bottomTag: {
          headline: 'Battery Line-Item Audit',
          subline: 'Backup Gateway Verified',
          progressPercent: 'w-[94%]'
        }
      },
      badge: {
        icon: 'AlertTriangle',
        text: 'Quote Audit Red Flags'
      },
      title: 'Add Battery with Solar: 3 Hidden Traps In Storage Quotes',
      description:
        'When quotes bundle a battery with rooftop solar, unscrupulous sales operators often mask huge markups or omit vital electrical components that trigger expensive variations on installation day. Here is what we check:',
      features: [
        {
          bold: 'The Missing Backup Gateway:',
          text: 'Many "cheap" quotes only include the battery unit without the automatic transfer switch ($1,500–$2,200 extra), leaving you without power during outages.'
        },
        {
          bold: 'Unstated Switchboard Upgrades:',
          text: 'If your switchboard lacks safety RCD switches or space for smart meters, shady salespeople bill you $800+ upon arrival on install morning.'
        },
        {
          bold: 'Gross vs Usable Capacity Bait-and-Switch:',
          text: 'Advertised 10 kWh batteries often only provide 8 kWh usable storage. We check true 100% Depth of Discharge (DoD) ratings.'
        }
      ],
      footer: {
        trustText: 'Zero Sales Obligation',
        buttonText: 'Read Battery Comparison Guide',
        buttonTo: '/resources/battery-decision-guide'
      }
    },
    cta: {
      badgeText: 'Before You Sign Anything',
      title: 'Arm Yourself with the Vetting Checklist',
      description:
        'Want to grill the salesperson yourself? Download our free 15-question buying checklist or submit your electricity bill to check whether the proposed system size actually matches your household consumption.',
      primaryButton: {
        text: 'Get Free Buying Checklist',
        to: '/resources/buying-checklist',
        icon: 'CheckSquare'
      },
      secondaryButton: {
        text: 'Check My Electricity Bill',
        to: '/resources/electricity-bill-review',
        icon: 'FileSearch'
      }
    }
  }
};
