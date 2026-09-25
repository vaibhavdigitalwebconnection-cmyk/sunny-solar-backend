import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../../../components/layout/Breadcrumbs';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { api } from '../../../services/api';
import LatticeLoadingBlock from '../../../components/ui/LatticeLoadingBlock';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  Check,
  ShieldCheck,
  BookOpen,
  Phone,
  Calculator,
  Lightbulb,
  FileText,
  UserCheck,
  Sun,
  BatteryCharging,
  Coins,
  Wrench,
  Cpu,
  ChevronDown,
  HelpCircle,
  BarChart3,
  Award,
  Zap,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* CATEGORY CONFIGURATION                                                     */
/* -------------------------------------------------------------------------- */
const categoryConfig: Record<
  string,
  {
    badgeVariant: 'amber' | 'emerald' | 'navy' | 'slate';
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    proTip: string;
    standardRef: string;
  }
> = {
  'Solar Basics': {
    badgeVariant: 'amber',
    icon: Sun,
    accentColor: 'amber',
    proTip:
      'Under AS/NZS 5033 and Clean Energy Council guidelines, you can oversize panel capacity by up to 133% of your inverter AC rating (e.g. 8.8kW of panels on a 6.6kW inverter). This ensures full harvest earlier in the morning and sustains yield through cloudy Queensland weather.',
    standardRef: 'AS/NZS 5033:2021 Installation Standard',
  },
  Batteries: {
    badgeVariant: 'emerald',
    icon: BatteryCharging,
    accentColor: 'emerald',
    proTip:
      'When sizing a battery for blackout protection, prioritize continuous locked-rotor surge kW over total kWh capacity. High continuous inverter surge is what prevents blackouts from tripping when your ducted air conditioning or pool pump compressor kicks in.',
    standardRef: 'AS/NZS 4777.2 & AS/NZS 5139 Battery Safety Standard',
  },
  'Buying Solar': {
    badgeVariant: 'navy',
    icon: Coins,
    accentColor: 'blue',
    proTip:
      'With feed-in tariffs at 4c-7c/kWh, your real financial engine is avoided retail cost. Every kWh you consume directly during the day saves you 34c-38c/kWh in purchased grid electricity. System sizing and timer scheduling should reflect daytime consumption first.',
    standardRef: 'Clean Energy Regulator STC Guidelines',
  },
  'Existing Solar': {
    badgeVariant: 'amber',
    icon: Wrench,
    accentColor: 'amber',
    proTip:
      'Rooftop DC isolator switches installed before 2018 have experienced high failure rates across Australia due to UV embrittlement and water ingress. Have a licensed CEC electrician inspect your isolators and carry out thermal imaging during any system health check.',
    standardRef: 'AS/NZS 5033 Fire Safety Standards',
  },
  Technical: {
    badgeVariant: 'slate',
    icon: Cpu,
    accentColor: 'slate',
    proTip:
      'In hot Australian summers where roof temperatures exceed 65°C, N-Type TOPCon panels (-0.26%/°C) lose significantly less power than older P-Type PERC panels (-0.38%/°C). Over a full year, this yields 8-12% higher real-world energy harvest in sunny Queensland.',
    standardRef: 'IEC 61215 & IEC 61730 Photovoltaic Testing Standards',
  },
};

const defaultCategoryConfig = {
  badgeVariant: 'amber' as const,
  icon: BookOpen,
  accentColor: 'amber',
  proTip:
    'Ensure all solar equipment is listed on the Clean Energy Council Approved Products register to qualify for federal STC rebates and local DNSP grid connection approval.',
  standardRef: 'Clean Energy Council Approved Hardware Standards',
};

export interface RichArticleData {
  blueprintTitle: string;
  blueprintBadge: string;
  quickStats: { label: string; value: string }[];
  matrixHeaders: string[];
  matrixRows: { feature: string; col1: string; col2: string; col3?: string }[];
  deepDiveSections?: {
    title: string;
    paragraphs: string[];
    highlightBox?: {
      title: string;
      text: string;
    };
  }[];
  faqs?: { question: string; answer: string }[];
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */
export const KnowledgeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [article, setArticle] = useState<any>(null);
  const [allGuides, setAllGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchGuide = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const [res, listRes] = await Promise.all([
          api.getKnowledgeBySlug(slug),
          api.getKnowledge()
        ]);
        if (isMounted) {
          if (res?.data) {
            setArticle(res.data);
          } else {
            setArticle(null);
          }
          if (listRes?.data) {
            setAllGuides(listRes.data);
          }
        }
      } catch (err) {
        if (isMounted) {
          setArticle(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGuide();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Dynamic SEO Injection
  useEffect(() => {
    if (!article) return;
    const originalTitle = document.title;
    document.title = article.metaTitle || `${article.title} | Sunny Solar Knowledge Hub`;

    const updateMetaTag = (nameAttr: string, nameValue: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${nameValue}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    updateMetaTag('name', 'description', article.metaDescription || article.excerpt);
    if (article.keywords) updateMetaTag('name', 'keywords', article.keywords);

    if (article.canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', article.canonicalUrl);
    }

    return () => {
      document.title = originalTitle;
    };
  }, [article]);

  if (!loading && !article) {
    return <Navigate to="/learn/knowledge-hub" replace />;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24">
        <LatticeLoadingBlock label="Loading guide" />
      </div>
    );
  }

  const articleIndex = allGuides.findIndex((a) => a.slug === slug);
  const prevArticle = articleIndex > 0 ? allGuides[articleIndex - 1] : null;
  const nextArticle =
    articleIndex !== -1 && articleIndex < allGuides.length - 1
      ? allGuides[articleIndex + 1]
      : null;

  const relatedArticles = allGuides
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const config = categoryConfig[article.category] || defaultCategoryConfig;
  const CategoryIcon = config.icon;

  // Retrieve rich technical data directly from database article
  const richData: RichArticleData = {
    blueprintTitle:
      article.blueprintTitle || '2025 Technical Decision Matrix',
    blueprintBadge:
      article.blueprintBadge || 'Engineering Sizing Guide',
    quickStats:
      article.quickStats && article.quickStats.length > 0
        ? article.quickStats
        : [],
    matrixHeaders:
      article.matrixHeaders && article.matrixHeaders.length > 0
        ? article.matrixHeaders
        : [],
    matrixRows:
      article.matrixRows && article.matrixRows.length > 0
        ? article.matrixRows
        : [],
    deepDiveSections: article.deepDiveSections || [],
    faqs:
      article.faqs && article.faqs.length > 0
        ? article.faqs
        : []
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 sm:pt-28 pb-24">
      <Helmet>
        <title>{article.metaTitle || `${article.title} | Sunny Solar Knowledge Hub`}</title>
        <meta
          name="description"
          content={article.metaDescription || article.excerpt}
        />
        {article.keywords && <meta name="keywords" content={article.keywords} />}
        {article.canonicalUrl && <link rel="canonical" href={article.canonicalUrl} />}
      </Helmet>
      {/* -------------------------------------------------------------------- */}
      {/* 1. TOP BREADCRUMBS & NAVIGATION BAR                                  */}
      {/* -------------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <Breadcrumbs
              customItems={[
                { label: 'Knowledge Hub', href: '/learn/knowledge-hub' },
                { label: article.category, href: '/learn/knowledge-hub' },
                { label: article.title },
              ]}
              className="py-0 px-0 max-w-none m-0 flex-1 min-w-0"
            />
          </div>

          <Link
            to="/learn/knowledge-hub"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-xs font-bold text-slate-600 hover:text-amber-700 transition-all shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Knowledge Hub</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* 2. MAIN 2-COLUMN ARTICLE LAYOUT (max-w-6xl)                          */}
      {/* -------------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================================================================ */}
          {/* MAIN ARTICLE COLUMN (8 cols)                                     */}
          {/* ================================================================ */}
          <article className="lg:col-span-8 space-y-6">
            {/* Primary Container Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
              {/* Category, Date, Read Time, Share Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={config.badgeVariant}>
                    <span className="flex items-center gap-1">
                      <CategoryIcon className="w-3.5 h-3.5" />
                      {article.category}
                    </span>
                  </Badge>

                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.publishDate}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:text-amber-600 hover:border-amber-300 transition-all cursor-pointer shadow-2xs"
                  title="Share this guide"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied Link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Guide</span>
                    </>
                  )}
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>

              {/* Excerpt / Lead */}
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {article.excerpt}
              </p>

              {/* Hero Image */}
              <div className="mt-6 -mx-6 sm:-mx-10 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-56 sm:h-72 md:h-80 object-cover"
                  loading="eager"
                />
              </div>

              {/* Author & Verification Row */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {article.author
                      ?.split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{article.author}</span>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-xs text-slate-500">{article.authorRole}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CEC Master Electrician Reviewed</span>
                </div>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* SECTION: KEY TAKEAWAYS                                         */}
              {/* -------------------------------------------------------------- */}
              <div
                id="key-takeaways"
                className="mt-8 bg-amber-500/10 border-2 border-amber-400/40 rounded-2xl p-6 sm:p-7"
              >
                <h2 className="font-extrabold text-base sm:text-lg text-amber-950 mb-3.5 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  <span>Key Takeaways at a Glance</span>
                </h2>
                <ul className="space-y-3">
                  {article.keyTakeaways?.map((takeaway: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 leading-relaxed font-medium"
                    >
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* SECTION: TECHNICAL KNOWLEDGE BLUEPRINT / SPEC MATRIX           */}
              {/* -------------------------------------------------------------- */}
              {richData && (richData.quickStats.length > 0 || richData.matrixRows.length > 0) && (
                <div
                  id="technical-blueprint"
                  className="mt-8 rounded-2xl border border-slate-200/90 bg-slate-900 text-white overflow-hidden shadow-sm"
                >
                  {/* Blueprint Top Header Bar */}
                  <div className="p-5 sm:p-6 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                          {richData.blueprintBadge}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-white">
                          {richData.blueprintTitle}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{config.standardRef}</span>
                    </div>
                  </div>

                  {/* Quick Metric Chips Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800">
                    {richData.quickStats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-900 p-4 text-center">
                        <div className="text-[11px] text-slate-400 font-medium mb-1">
                          {stat.label}
                        </div>
                        <div className="text-base sm:text-lg font-extrabold text-amber-400">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comparison / Diagnostic Matrix Table */}
                  <div className="p-5 sm:p-6 overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-135">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                          {richData.matrixHeaders.map((header, hIdx) => (
                            <th key={hIdx} className="pb-3 px-3 first:pl-0">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {richData.matrixRows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-3 first:pl-0 font-semibold text-slate-200">
                              {row.feature}
                            </td>
                            <td className="py-3 px-3 text-slate-300">{row.col1}</td>
                            <td className="py-3 px-3 text-slate-300">{row.col2}</td>
                            {row.col3 && (
                              <td className="py-3 px-3 text-slate-300">{row.col3}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* SECTION: DEEP DIVE ARTICLES CONTENT                            */}
              {/* -------------------------------------------------------------- */}
              <div id="deep-dive" className="mt-10 space-y-8">
                {richData.deepDiveSections && richData.deepDiveSections.length > 0 ? (
                  richData.deepDiveSections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {sec.title}
                      </h2>
                      {sec.paragraphs.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-slate-700 text-sm sm:text-base leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}

                      {sec.highlightBox && (
                        <div className="my-5 p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950">
                          <h4 className="font-bold text-xs sm:text-sm text-amber-900 flex items-center gap-1.5 mb-1.5">
                            <Zap className="w-4 h-4 text-amber-600" />
                            <span>{sec.highlightBox.title}</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                            {sec.highlightBox.text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="space-y-5 text-slate-700 text-base leading-relaxed">
                    {typeof article.content === 'string' ? (
                      <div
                        className="rich-blog-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    ) : Array.isArray(article.content) ? (
                      article.content.map((paragraph: string, idx: number) => (
                        <p key={idx} className={idx === 0 ? 'text-slate-900 font-medium' : ''}>
                          {paragraph}
                        </p>
                      ))
                    ) : null}
                  </div>
                )}
              </div>

              {/* -------------------------------------------------------------- */}
              {/* SECTION: MASTER ELECTRICIAN TRADE COMPLIANCE                   */}
              {/* -------------------------------------------------------------- */}
              <div
                id="trade-standards"
                className="mt-10 rounded-2xl bg-slate-900 text-white p-6 sm:p-7 shadow-md"
              >
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Master Electrician Trade Advisory</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  What Homeowners Must Verify on Their Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {config.proTip}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified by Trent Palmer (CEC Master Electrician #84920)
                  </span>
                  <span className="text-amber-400 font-semibold">{config.standardRef}</span>
                </div>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* SECTION: FREQUENTLY ASKED QUESTIONS ACCORDION                  */}
              {/* -------------------------------------------------------------- */}
              {richData && richData.faqs && richData.faqs.length > 0 && (
                <div id="faq-summary" className="mt-10 pt-8 border-t border-slate-100">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <span>Frequently Asked Questions</span>
                  </h3>

                  <div className="space-y-3">
                    {richData.faqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="rounded-xl border border-slate-200 overflow-hidden bg-white transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(fIdx)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${openFaqIndex === fIdx ? 'rotate-180 text-amber-600' : ''
                              }`}
                          />
                        </button>
                        {openFaqIndex === fIdx && (
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------- */}
              {/* SECTION: PREVIOUS & NEXT GUIDES NAVIGATION                     */}
              {/* -------------------------------------------------------------- */}
              <div className="mt-10 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <Link
                    to={`/learn/knowledge-hub/${prevArticle.slug}`}
                    className="group p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-left block"
                  >
                    <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      <span>Previous Guide</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {prevArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArticle ? (
                  <Link
                    to={`/learn/knowledge-hub/${nextArticle.slug}`}
                    className="group p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-right block"
                  >
                    <div className="flex items-center justify-end gap-1 text-xs text-slate-400 mb-1">
                      <span>Next Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {nextArticle.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>

            {/* Bottom Primary Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Button
                to="/learn/knowledge-hub"
                variant="outline"
                size="md"
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
              >
                Back to All Guides
              </Button>

              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Get Free Roof Assessment
              </Button>
            </div>
          </article>

          {/* ================================================================ */}
          {/* STICKY SIDEBAR COLUMN (4 cols)                                   */}
          {/* ================================================================ */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Table of Contents Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>On This Page</span>
              </h3>
              <nav className="space-y-1 text-xs">
                <a
                  href="#key-takeaways"
                  className="block p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50/60 transition-colors font-medium"
                >
                  ⚡ Key Takeaways at a Glance
                </a>
                {richData && (richData.quickStats.length > 0 || richData.matrixRows.length > 0) && (
                  <a
                    href="#technical-blueprint"
                    className="block p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50/60 transition-colors font-medium"
                  >
                    📊 Technical Knowledge Blueprint
                  </a>
                )}
                <a
                  href="#deep-dive"
                  className="block p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50/60 transition-colors font-medium"
                >
                  📖 In-Depth Analysis
                </a>
                <a
                  href="#trade-standards"
                  className="block p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50/60 transition-colors font-medium"
                >
                  🛡️ Master Electrician Standards
                </a>
                {richData && richData.faqs && richData.faqs.length > 0 && (
                  <a
                    href="#faq-summary"
                    className="block p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50/60 transition-colors font-medium"
                  >
                    ❓ Frequently Asked Questions
                  </a>
                )}
              </nav>
            </div>

            {/* Free Assessment & Sizing Calculator CTA Box */}
            <div className="bg-linear-to-br from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-md">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 text-white uppercase tracking-wider mb-2.5">
                Free Assessment
              </span>
              <h3 className="font-extrabold text-lg leading-snug">
                Need Help Applying This To Your Roof?
              </h3>
              <p className="mt-2 text-xs text-amber-50 leading-relaxed">
                Get an independent 3D solar layout and battery sizing calculation custom-engineered for your Queensland home.
              </p>

              <div className="mt-5 space-y-2.5">
                <Button
                  to="/get-started/free-assessment"
                  variant="secondary"
                  size="sm"
                  className="w-full justify-center bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs py-2.5"
                >
                  Request Roof Assessment
                </Button>

                <Button
                  to="/calculators/system-size"
                  variant="outline"
                  size="sm"
                  className="w-full justify-center border-white/40 text-white hover:bg-white/10 text-xs py-2"
                  icon={<Calculator className="w-3.5 h-3.5" />}
                  iconPosition="left"
                >
                  Calculate System Size
                </Button>
              </div>

              <a
                href="tel:1300030479"
                className="mt-4 pt-3 border-t border-white/20 flex items-center justify-center gap-2 text-xs text-amber-100 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 1300 030 479</span>
              </a>
            </div>

            {/* Related Knowledge Guides */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
              <h3 className="font-bold text-sm text-slate-900 mb-3.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Related Guides</span>
              </h3>

              <div className="space-y-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/learn/knowledge-hub/${rel.slug}`}
                    className="group block p-3 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/70 hover:border-amber-300 transition-all"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md">
                        {rel.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{rel.readTime}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* Official Certification & Standards Badge */}
            <div className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Clean Energy Council Accredited
                  </div>
                  <div className="text-[11px] text-slate-500">
                    AS/NZS 5033:2021 & AS/NZS 4777.2 Certified
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDetailPage;
