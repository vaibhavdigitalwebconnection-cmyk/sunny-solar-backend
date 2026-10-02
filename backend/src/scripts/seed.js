import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Blog from '../models/Blog.js';
import { connectDB } from '../config/db.js';

const initialArticles = [
  {
    slug: 'what-size-solar-system-do-i-need',
    title: 'What Size Solar System Do You Actually Need in 2025?',
    excerpt: 'Forget the outdated 5kW rule. With electric vehicles, ducted heat pumps, and dropping panel costs, here is how to calculate your true sweet spot.',
    category: 'Solar Basics',
    readTime: '6 min read',
    publishDate: 'Jan 14, 2025',
    author: 'Trent Palmer',
    authorRole: 'Founder & Master Electrician',
    imageUrl: '/images/blog/solar-system-size.webp',
    keyTakeaways: [
      '6.6kW is now the entry-level baseline for single-phase Australian residences.',
      'Upsizing to 8.8kW to 10kW costs only 15-20% more but generates up to 40% more harvest on cloudy days.',
      'If you plan to add a battery or EV within 3 years, maximize your roof footprint immediately.'
    ],
    content: [
      'Five years ago, a 5kW solar system was considered standard for an Australian 3-bedroom home. Today, that recommendation is thoroughly obsolete.',
      'Between high-efficiency ducted air conditioning, induction cooktops, swimming pool pumps, and the rapid arrival of home electric vehicle chargers, modern households consume between 22 and 35 kWh per day.',
      'Because STC government rebates heavily subsidize the first 100kW of panel capacity, the incremental cost of adding an extra 3kW of panels during initial installation is exceptionally low — typically under $1,200 to $1,800. Sizing up covers your winter dip and ensures your future battery will have enough daytime surplus to charge fully.'
    ],
    isPublished: true
  },
  {
    slug: 'tesla-powerwall-3-vs-sungrow-sbr',
    title: 'Tesla Powerwall 3 vs Sungrow SBR: Which Battery Wins in 2025?',
    excerpt: 'A comprehensive technical comparison of integrated inverters, LFP vs NMC chemistry, round-trip efficiency, and blackout emergency power supply.',
    category: 'Batteries',
    readTime: '8 min read',
    publishDate: 'Feb 02, 2025',
    author: 'Trent Palmer',
    authorRole: 'Founder & Master Electrician',
    imageUrl: '/images/blog/battery-comparison.webp',
    keyTakeaways: [
      'Tesla Powerwall 3 includes its own 11.5kW inverter; Sungrow pairs with a separate hybrid inverter.',
      'Sungrow offers modular capacity from 9.6kWh to 25.6kWh; Powerwall is fixed at 13.5kWh per unit.',
      'Powerwall 3 features unmatched continuous surge power, capable of starting large ducted A/C units in a blackout.'
    ],
    content: [
      'The home battery market has shifted dramatically from luxury novelty to essential energy resilience. Two models dominate Australian quote requests: the newly released Tesla Powerwall 3 and the proven Sungrow SBR modular battery system.',
      'While Tesla Powerwall 3 integrates solar DC-coupled string inputs directly into its chassis, Sungrow offers modular high-voltage stackable units with cobalt-free Lithium Iron Phosphate (LiFePO4) chemistry.',
      'If whole-home backup and single-app convenience are your highest priorities, Tesla Powerwall 3 is hard to beat. If modular expansion or three-phase symmetry at an accessible entry price is paramount, Sungrow represents extraordinary value.'
    ],
    isPublished: true
  },
  {
    slug: 'solar-rebates-and-feed-in-tariffs-explained',
    title: 'Australian Solar Rebates & Feed-in Tariffs: The Unfiltered Truth',
    excerpt: 'How STCs reduce your upfront invoice, why feed-in tariffs have dropped to 5c/kWh, and how smart self-consumption flips the economics back in your favor.',
    category: 'Buying Solar',
    readTime: '5 min read',
    publishDate: 'Feb 18, 2025',
    author: 'Elena Vance',
    authorRole: 'Technical Energy Analyst',
    imageUrl: '/images/blog/solar-rebates.webp',
    keyTakeaways: [
      'STCs are an upfront point-of-sale discount, already deducted by certified installers on your quote.',
      'Exporting power to the grid for pennies is no longer the main driver of solar ROI.',
      'Self-consuming your solar energy saves you 30c to 38c/kWh vs buying from retail energy providers.'
    ],
    content: [
      'A common misconception among homeowners is that you buy solar to make money selling power back to energy retailers. While that was true during the 44-cent feed-in tariff boom of 2011, today feed-in tariffs sit around 4c to 7c per kWh.',
      'The real financial engine of solar today is "avoided retail cost." When you run your washing machine, heat pump, or pool pump using free sunlight, you avoid paying 34 cents per unit from the grid. That yields an effective tax-free return on investment of 20% to 28% annually.'
    ],
    isPublished: true
  },
  {
    slug: 'signs-your-existing-solar-system-is-failing',
    title: '5 Warning Signs Your Existing Solar System Is Costing You Money',
    excerpt: 'Inverter error codes, burnt isolator switches, micro-cracked panels, and dirty glass: how to tell when your rooftop system needs a health check.',
    category: 'Existing Solar',
    readTime: '7 min read',
    publishDate: 'Feb 26, 2025',
    author: 'Trent Palmer',
    authorRole: 'Founder & Master Electrician',
    imageUrl: '/images/blog/solar-maintenance.webp',
    keyTakeaways: [
      'Inverter status lights (red or flashing amber) indicate isolation or earth faults.',
      'A gradual 30% drop in quarterly generation usually indicates panel degradation or heavy lichen buildup.',
      'Rooftop DC isolators installed before 2018 have high recall rates and require prompt safety inspection.'
    ],
    content: [
      'Australia is home to over 3.5 million rooftop solar installations, but industry audits show that nearly one in three systems over six years old are suffering from unaddressed technical faults.',
      'Because solar systems operate silently on your roof, catastrophic inverter shutdowns often go unnoticed for months until an unexpectedly enormous quarterly power bill arrives in the mail.',
      'A professional 24-point health check with thermal imaging detects hotspot cell micro-cracks, moisture ingress, and loose crimps before they trigger inverter lockouts or electrical hazards.'
    ],
    isPublished: true
  },
  {
    slug: 'n-type-topcon-vs-perc-solar-panels',
    title: 'N-Type TOPCon vs PERC Solar Cells: Why Panel Technology Matters',
    excerpt: 'Explore the technical physics behind modern N-Type panels, lower temperature degradation coefficients, and why they outperform in Australian summer heat.',
    category: 'Technical',
    readTime: '9 min read',
    publishDate: 'Mar 01, 2025',
    author: 'Elena Vance',
    authorRole: 'Technical Energy Analyst',
    imageUrl: '/images/blog/solar-panel-tech.webp',
    keyTakeaways: [
      'N-type silicon cells exhibit zero Light-Induced Degradation (LID).',
      'Better temperature coefficients ensure panels lose less power when roof temperatures hit 65°C in midsummer.',
      'Dual-glass encapsulation protects internal silver busbars against salt mist in coastal regions.'
    ],
    content: [
      'For the last decade, P-type PERC panels ruled the residential market. However, recent manufacturing breakthroughs have made N-Type TOPCon (Tunnel Oxide Passivated Contact) and ABC (All-Back-Contact) technology the new gold standard.',
      'In Australia’s intense climate, roof temperatures frequently exceed 65°C on 35°C ambient summer afternoons. While older panels lose up to 0.40% of rated output for every degree above 25°C, high-grade N-type cells lose as little as 0.26%. This difference equates to an additional 800-1,200 kWh of harvest over the course of a hot year.'
    ],
    isPublished: true
  }
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seeding...');

    // 1. Seed Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sunnysolar.com.au';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

    const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      await Admin.create({
        name: 'Master Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`✅ Admin account created: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin account already exists: ${adminEmail}`);
    }

    // 2. Seed Blog Articles
    for (const article of initialArticles) {
      const exists = await Blog.findOne({ slug: article.slug });
      if (!exists) {
        await Blog.create(article);
        console.log(`✅ Seeded blog: "${article.title}"`);
      } else {
        console.log(`ℹ️ Blog already exists: "${article.title}"`);
      }
    }

    console.log('🎉 Seeding completed successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
