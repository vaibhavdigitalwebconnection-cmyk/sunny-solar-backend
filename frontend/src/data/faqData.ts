export interface FAQItem {
  id: string;
  category: 'Solar' | 'Batteries' | 'Existing Solar' | 'Buying' | 'Technical';
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'faq-solar-1',
    category: 'Solar',
    question: 'How long does a residential solar installation take?',
    answer: 'Most standard residential installations (6.6kW to 13.2kW) are completed within a single day. Our team arrives at 7:00 AM, secures roof access and safety harnesses, completes structural mounting, panel fixing, electrical string wiring, inverter commission, and conducts safety tests by mid-afternoon.'
  },
  {
    id: 'faq-solar-2',
    category: 'Solar',
    question: 'What warranties come with a Sunny Solar system?',
    answer: 'We believe in whole-system accountability. You receive a 25-year panel product and performance warranty, a 10-to-15 year inverter warranty, and our signature Sunny Solar 10-year comprehensive workmanship and roof leak guarantee. If any component underperforms, we manage the replacement directly.'
  },
  {
    id: 'faq-solar-3',
    category: 'Solar',
    question: 'What happens to solar output on cloudy or rainy days?',
    answer: 'Solar panels generate energy using both direct and diffuse daylight. On heavily overcast or rainy days, panels typically produce 15% to 30% of their peak clear-sky capacity. That is why we size modern arrays slightly larger (e.g., 8.8kW or 10kW) to ensure adequate baseline coverage even during gloomy weather.'
  },
  {
    id: 'faq-battery-1',
    category: 'Batteries',
    question: 'Will a home battery keep my power on during a grid blackout?',
    answer: 'Yes! Both our Tesla Powerwall 3 and Sungrow Emergency Power Supply (EPS) systems automatically isolate your home from the disabled grid within 20 to 100 milliseconds. Your lights, refrigeration, water pumps, and Wi-Fi will continue running seamlessly.'
  },
  {
    id: 'faq-battery-2',
    category: 'Batteries',
    question: 'Can I add a battery to my existing solar setup without replacing my inverter?',
    answer: 'Yes, through AC-coupling. An AC-coupled battery (such as Tesla Powerwall 3 or Sungrow AC-coupled solutions) connects directly into your main switchboard, meaning you can retain your existing rooftop panels and inverter while unlocking full storage capabilities.'
  },
  {
    id: 'faq-battery-3',
    category: 'Batteries',
    question: 'How many years do modern solar batteries last?',
    answer: 'Our Tier-1 Lithium Iron Phosphate (LiFePO4) and advanced chemistries are warrantied for 10 years or 6,000 to 10,000 charge cycles, with expected operational lifespans reaching 15 to 18 years while retaining 70%+ capacity.'
  },
  {
    id: 'faq-existing-1',
    category: 'Existing Solar',
    question: 'Why should I get a Solar Health Check if my system seems to work?',
    answer: 'Solar systems generate silently, and inverter degradation or blown string fuses often remain undetected until quarterly electricity bills spike. Our 24-point Health Check uses thermal imaging to identify hot-spots, water damage in rooftop isolators, panel micro-cracks, and ensures your system complies with current safety standards.'
  },
  {
    id: 'faq-existing-2',
    category: 'Existing Solar',
    question: 'Can I upgrade my old 3kW or 5kW solar system to a larger one?',
    answer: 'Yes. Depending on your roof layout and distribution network limits (e.g., Energex or Ausgrid), we can either add a second string on an available roof facet or replace older low-efficiency 250W panels with modern 475W N-type panels to more than double your production in the same footprint.'
  },
  {
    id: 'faq-buying-1',
    category: 'Buying',
    question: 'How do the Australian Federal STC solar rebates work?',
    answer: 'Small-scale Technology Certificates (STCs) provide an immediate point-of-sale discount on your system based on estimated clean energy generation over the next deeming period. For a typical 10kW system, STCs reduce your upfront cost by approximately $2,800 to $3,600. Sunny Solar claims these certificates directly on your behalf, so you only pay the net discounted price.'
  },
  {
    id: 'faq-buying-2',
    category: 'Buying',
    question: 'Do you offer 0% interest financing options?',
    answer: 'Yes. We partner with regulated green energy finance providers (such as Plenti and Brighte) offering flexible payment plans with terms from 24 to 84 months. In many cases, your monthly loan repayment is lower than the amount you save on your electricity bill.'
  },
  {
    id: 'faq-technical-1',
    category: 'Technical',
    question: 'What is the difference between string inverters, micro-inverters, and DC optimizers?',
    answer: 'A traditional string inverter connects all panels in a series circuit like Christmas lights — if one panel is shaded, the whole string output drops. Micro-inverters and DC optimizers isolate each panel individually, making them ideal for roofs with complex shapes, chimneys, or tree shading.'
  },
  {
    id: 'faq-technical-2',
    category: 'Technical',
    question: 'What is export limiting and why does my energy network require it?',
    answer: 'Electricity distributors set limits (typically 5kW per phase in many urban regions) on how much excess energy a single residence can send back into the neighborhood grid at peak noon hours. Our smart inverters dynamically throttle feed-in while continuing to power your internal appliances at 100% capacity.'
  }
];
