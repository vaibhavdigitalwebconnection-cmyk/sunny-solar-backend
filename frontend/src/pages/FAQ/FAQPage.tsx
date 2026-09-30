import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components/layout/PageHeader';
import { faqData } from '../../data/faqData';
import { Accordion } from '../../components/ui/Accordion';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { BorderBeam } from '../../components/ui/BorderBeam';
import { BlurFade } from '../../components/ui/BlurFade';

const categories = ['All', 'Solar', 'Batteries', 'Existing Solar', 'Buying', 'Technical'] as const;

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredItems =
    activeCategory === 'All'
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ScrollProgress />
      <Helmet>
        <title>Solar & Battery Frequently Asked Questions | Sunny Solar</title>
        <meta
          name="description"
          content="Answers to common questions about solar panel efficiency, STC government rebates, feed-in tariffs, and battery storage life."
        />
      </Helmet>
      <PageHeader
        badge="Help & Knowledge"
        title="Frequently Asked"
        highlightText="Questions"
        description="Clear, honest answers about solar technology, home batteries, federal STC rebates, and our master installation warranties."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Component */}
        <BlurFade delay={0.1} duration={0.4}>
          <Accordion items={filteredItems} allowMultiple defaultOpenId={filteredItems[0]?.id} />
        </BlurFade>

        {/* Still have questions banner */}
        <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 text-center space-y-4 shadow-sm">
          <BorderBeam size={160} duration={9} colorFrom="#2B3CB8" colorTo="#6F8EE7" borderWidth={1.5} />
          <h3 className="text-xl font-extrabold text-slate-900">
            Have a question not answered here?
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Speak directly with one of our Master Electricians. No call centers, no sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
            <a
              href="tel:1300030479"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-sm text-slate-800 hover:bg-slate-50 transition-colors w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              Call 1300 030 479
            </a>
            <Button to="/get-started/free-assessment" variant="primary" size="md" className="w-full sm:w-auto justify-center">
              Ask Via Online Assessment
            </Button>
            <Button to="/contact" variant="outline" size="md" className="w-full sm:w-auto justify-center">
              Send Direct Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
