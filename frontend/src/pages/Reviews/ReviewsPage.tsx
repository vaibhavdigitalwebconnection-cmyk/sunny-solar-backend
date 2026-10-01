import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components/layout/PageHeader';
import { reviewsData } from '../../data/reviewsData';
import type { Review } from '../../data/reviewsData';
import { ReviewCard } from '../../components/cards/ReviewCard';
import { Star, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { NumberTicker } from '../../components/ui/NumberTicker';
import { BlurFade } from '../../components/ui/BlurFade';
import { BorderBeam } from '../../components/ui/BorderBeam';

const serviceFilters = [
  'All Reviews',
  'Solar Installation',
  'Solar + Battery',
  'Battery Retrofit',
  'Solar Upgrade',
  'Health Check',
] as const;

export const ReviewsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Reviews');
  const [minRating, setMinRating] = useState<number>(0);

  const filtered = reviewsData.filter((r) => {
    const matchesService =
      selectedFilter === 'All Reviews' || r.serviceType === selectedFilter;
    const matchesRating = r.rating >= minRating;
    return matchesService && matchesRating;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ScrollProgress />
      <Helmet>
        <title>Verified Customer Reviews & Testimonials | Sunny Solar</title>
        <meta
          name="description"
          content="Read verified 4.98-star reviews and customer stories from homeowners across South East Nationwide."
        />
      </Helmet>
      <PageHeader
        badge="Customer Testimonials"
        title="4.98-Star Customer"
        highlightText="Reviews & Stories"
        description="Read unedited, verified feedback from homeowners across South East Nationwide. Filter by installation service or rating."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Button
              to="/get-started/free-assessment"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Get Free Solar Assessment
            </Button>
            <a
              href="https://maps.google.com/?q=10A+Burralong+Dr,+Wondunna+QLD+4655,+Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold shadow-xs transition-colors"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Review on Google</span>
            </a>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        {/* Aggregate Stats Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-6 lg:p-8 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div>
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400" />
              ))}
            </div>
            <div className="text-3xl font-extrabold text-slate-900">
              <NumberTicker value={4.98} decimalPlaces={2} /> / 5.0
            </div>
            <p className="text-xs text-slate-500 mt-1">Average Google & SolarQuotes Rating</p>
          </div>

          <div className="pt-4 sm:pt-0">
            <div className="text-3xl font-extrabold text-slate-900">
              <NumberTicker value={380} />+
            </div>
            <div className="text-sm font-bold text-slate-800 mt-1">Verified Customer Reviews</div>
            <p className="text-xs text-slate-500">Zero sponsored or incentivized submissions</p>
          </div>

          <div className="pt-4 sm:pt-0">
            <div className="text-3xl font-extrabold text-emerald-600">
              <NumberTicker value={99.2} decimalPlaces={1} />%
            </div>
            <div className="text-sm font-bold text-slate-800 mt-1">Would Recommend to Family</div>
            <p className="text-xs text-slate-500">Based on our 2024 customer satisfaction survey</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {serviceFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-2.5 lg:py-1.5 min-h-11 lg:min-h-0 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${selectedFilter === filter
                    ? 'bg-amber-500 text-white shadow'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>Filter Rating:</span>
            <button
              onClick={() => setMinRating(0)}
              className={`px-3 py-2 lg:px-2.5 lg:py-1 min-h-11 lg:min-h-0 rounded-lg border ${minRating === 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'
                }`}
            >
              All
            </button>
            <button
              onClick={() => setMinRating(5)}
              className={`px-3 py-2 lg:px-2.5 lg:py-1 min-h-11 lg:min-h-0 rounded-lg border flex items-center gap-1 ${minRating === 5 ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-200'
                }`}
            >
              5 Star Only ★
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review, idx) => (
            <BlurFade key={review.id} delay={0.04 * (idx % 6)} duration={0.35}>
              <ReviewCard review={review} />
            </BlurFade>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-sm space-y-4">
          <BorderBeam size={180} duration={10} colorFrom="#2B3CB8" colorTo="#6F8EE7" borderWidth={1.5} />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Join 4,500+ Happy Nationwide Solar &amp; Battery Owners
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Experience our in-house master craftsmanship, zero sales pressure, and industry-leading 25-year performance warranties.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to="/get-started/free-assessment"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              className="shadow-md"
            >
              Get Your Free Solar Assessment
            </Button>
            <Button
              to="/projects"
              variant="outline"
              size="md"
            >
              Browse Completed Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
