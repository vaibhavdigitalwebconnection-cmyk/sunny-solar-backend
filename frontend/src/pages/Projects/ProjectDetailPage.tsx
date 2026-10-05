import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { m, AnimatePresence } from 'framer-motion';
import { projectsData, Project } from '../../data/projectsData';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { Button } from '../../components/ui/Button';
import {
  MapPin,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Star,
  Layers,
  Wrench,
  BatteryCharging,
  TrendingUp,
  Award,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Sparkles,
  Quote,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  // Active gallery image index
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  // Fullscreen lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Reset active image when slug changes
  useEffect(() => {
    setActiveImageIndex(0);
    setLightboxOpen(false);
    window.scrollTo(0, 0);
  }, [slug]);

  // Gallery array fallback to imageUrl if gallery is empty
  const gallery = project?.gallery && project.gallery.length > 0
    ? project.gallery
    : project ? [{ url: project.imageUrl, caption: project.title, tag: 'Main View' }] : [];

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Lightbox keyboard controls
  const handlePrevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev <= 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  const handleNextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev >= gallery.length - 1 ? 0 : prev + 1));
  }, [gallery.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, handlePrevImage, handleNextImage]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // Related projects (exclude current project)
  const relatedProjects = projectsData
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white pb-20 pt-24 sm:pt-28">
      <Helmet>
        <title>{`${project.title} (${project.systemSize}) in ${project.location} | Sunny Solar`}</title>
        <meta
          name="description"
          content={`Explore the ${project.systemSize} solar installation in ${project.location}. Featuring ${project.panels} panels and high-efficiency inverters installed by Master Electricians.`}
        />
      </Helmet>
      {/* Breadcrumbs Navigation */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            customItems={[
              { label: 'Case Studies', href: '/projects' },
              { label: project.title },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* ============================================================ */}
        {/* 1. PROJECT HEADER & TITLE BANNER                             */}
        {/* ============================================================ */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white shadow-sm">
                {project.category}
              </span>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{project.location}</span>
              </span>

              {project.battery && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
                  <BatteryCharging className="w-3.5 h-3.5 text-amber-500" />
                  <span>Battery Storage</span>
                </span>
              )}
            </div>

            <span className="bg-amber-500 text-slate-950 font-extrabold text-sm px-4 py-1.5 rounded-full shadow-md">
              {project.systemSize} Capacity
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight leading-[1.12]">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-4xl">
            {project.description}
          </p>

          {/* Key Executive Metrics Ribbon */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-2.5 sm:p-3 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Annual Dollar Savings
              </span>
              <span className="text-lg sm:text-2xl font-extrabold text-amber-900 flex items-center gap-1.5 mt-1">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                {project.annualSavings}
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Carbon Offset
              </span>
              <span className="text-lg sm:text-2xl font-extrabold text-emerald-900 flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                {project.co2Offset}
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Payback
              </span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-950 flex items-center gap-1.5 mt-1">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0" />
                {project.paybackPeriod || '3.5 Years'}
              </span>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Self-Consumption
              </span>
              <span className="text-lg sm:text-2xl font-extrabold text-slate-950 flex items-center gap-1.5 mt-1">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0" />
                {project.selfConsumption || '94%'}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. INTERACTIVE MULTI-IMAGE GALLERY                           */}
        {/* ============================================================ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-950">
              Installation Gallery & Site Photos
            </h2>
            <span className="text-xs font-mono font-semibold text-slate-500">
              Photo {activeImageIndex + 1} of {gallery.length}
            </span>
          </div>

          {/* Main Large Showcase Image Viewer */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-950 aspect-video sm:aspect-21/9 lg:aspect-2/1 group border border-slate-200/80">
            <AnimatePresence mode="wait">
              <m.img
                key={gallery[activeImageIndex].url}
                src={gallery[activeImageIndex].url}
                alt={gallery[activeImageIndex].caption}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-transparent to-slate-950/20 pointer-events-none" />

            {/* Top Zoom & Tag */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                {gallery[activeImageIndex].tag}
              </span>

              <button
                onClick={() => setLightboxOpen(true)}
                className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
                title="Expand Fullscreen"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="hidden sm:inline">Fullscreen Zoom</span>
              </button>
            </div>

            {/* Previous Image Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Image Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Caption Bar */}
            <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 z-10 pointer-events-none">
              <p className="text-sm sm:text-base font-medium text-white max-w-3xl drop-shadow-md">
                {gallery[activeImageIndex].caption}
              </p>
            </div>
          </div>

          {/* Interactive Thumbnails Selector Strip */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
            {gallery.map((img, idx) => {
              const isSelected = activeImageIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-2xl overflow-hidden h-20 sm:h-24 transition-all duration-200 cursor-pointer border text-left group ${isSelected
                      ? 'ring-3 ring-amber-500 border-transparent shadow-md scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                    }`}
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-white uppercase tracking-wider truncate drop-shadow-md">
                    {img.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. CHALLENGE & CUSTOM SOLUTION BREAKDOWN                     */}
        {/* ============================================================ */}
        {project.challengeSolution && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-rose-600">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span>The Client Challenge</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-950 mb-3">
                Architectural & Energy Constraints
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {project.challengeSolution.challenge}
              </p>
            </div>

            <div className="p-7 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-amber-700">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Our Engineering Solution</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-950 mb-3">
                Master Electrician Precision
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {project.challengeSolution.solution}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. CUSTOMER QUOTE & VERIFIED TESTIMONIAL BOX                 */}
        {/* ============================================================ */}
        <div className="bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-6 right-6 opacity-10">
            <Quote className="w-32 h-32 text-amber-400" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl font-serif font-medium leading-relaxed italic text-slate-100 max-w-3xl">
              "{project.customerQuote.quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-base shadow-sm">
                  {project.customerQuote.author.charAt(0)}
                </div>
                <div>
                  <span className="font-extrabold text-white text-base block">
                    {project.customerQuote.author}
                  </span>
                  <span className="text-xs text-slate-400">
                    {project.customerQuote.suburb}, Nationwide
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-400 border border-emerald-400/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified Solar Homeowner
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. TECHNICAL HIGHLIGHTS & DETAILED SPECS GRID                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Engineering Highlights */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <Wrench className="w-5 h-5 text-amber-500" />
              <span>Engineering Highlights</span>
            </h3>

            <div className="space-y-4">
              {project.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Technical Specs Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Hardware & Technical Specifications</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              {Object.entries(project.specs).map(([key, val], idx) => (
                <div key={idx} className="py-3 flex justify-between gap-4">
                  <span className="text-slate-500 font-medium">{key}:</span>
                  <span className="font-bold text-slate-900 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. RELATED CASE STUDIES CAROUSEL                             */}
        {/* ============================================================ */}
        <div className="pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950">
              More Nationwide Case Studies
            </h2>

            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 hover:text-amber-700"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <ProjectCard key={rel.slug} project={rel} />
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 7. BOTTOM CONSULTATION CALL TO ACTION                        */}
        {/* ============================================================ */}
        <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Custom Rooftop Design
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
              Want a High-Performance Solar System Like This?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Get an honest assessment, 3D shading simulation, and fixed quote directly from our in-house Master Electricians.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to="/get-started/free-assessment"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Book Free Consultation
              </Button>

              <Button
                href="tel:1300030479"
                variant="outline"
                size="lg"
                icon={<Phone className="w-4 h-4" />}
                iconPosition="left"
                className="border-white/30 text-white hover:border-amber-400 hover:text-amber-400"
              >
                Call 1300 030 479
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 8. FULLSCREEN HIGH-RESOLUTION LIGHTBOX MODAL                 */}
      {/* ============================================================ */}
      <AnimatePresence>
        {lightboxOpen && gallery[activeImageIndex] && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-950/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxOpen(false)}
            data-lenis-prevent
          >
            {/* Top Close Button & Index Counter */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-semibold">
                Photo {activeImageIndex + 1} / {gallery.length}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
                className="pointer-events-auto p-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-colors duration-200 cursor-pointer shadow-lg"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prev Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Inner Container */}
            <m.div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden max-h-[72vh] shadow-2xl border border-white/15 bg-slate-900">
                <img
                  key={gallery[activeImageIndex].url}
                  src={gallery[activeImageIndex].url}
                  alt={gallery[activeImageIndex].caption}
                  className="max-h-[70vh] w-auto object-contain rounded-2xl"
                />
              </div>

              {/* Caption Underlay */}
              <div className="mt-4 max-w-2xl w-full text-center px-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 mb-2 shadow-sm">
                  {gallery[activeImageIndex].tag}
                </span>

                <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                  {gallery[activeImageIndex].caption}
                </p>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetailPage;
