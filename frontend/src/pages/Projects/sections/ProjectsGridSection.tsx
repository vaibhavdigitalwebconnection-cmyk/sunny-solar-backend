import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { projectsData, Project } from '../../../data/projectsData';
import { ProjectCard } from '../../../components/cards/ProjectCard';
import { Button } from '../../../components/ui/Button';
import { BorderBeam } from '../../../components/ui/BorderBeam';

const CATEGORIES = [
  { key: 'all', label: 'All Installs' },
  { key: 'Residential', label: 'Residential' },
  { key: 'Battery Storage', label: 'Battery Storage' },
  { key: 'Acreage', label: 'Acreage' },
  { key: 'Commercial', label: 'Commercial' },
] as const;

export const ProjectsGridSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'savings' | 'size'>('featured');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: projectsData.length,
      Residential: 0,
      'Battery Storage': 0,
      Acreage: 0,
      Commercial: 0,
    };

    projectsData.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
      if (p.battery) {
        counts['Battery Storage'] += 1;
      }
    });

    return counts;
  }, []);

  // Filter and sort logic
  const filteredProjects = useMemo(() => {
    return projectsData
      .filter((project) => {
        // Category filtering
        const matchesCategory =
          selectedCat === 'all' ||
          project.category === selectedCat ||
          (selectedCat === 'Battery Storage' && Boolean(project.battery));

        if (!matchesCategory) return false;

        // Search query filtering
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(q) ||
          project.location.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.panels.toLowerCase().includes(q) ||
          project.inverter.toLowerCase().includes(q) ||
          (project.battery && project.battery.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'savings') {
          const numA = parseInt(a.annualSavings.replace(/[^0-9]/g, ''), 10) || 0;
          const numB = parseInt(b.annualSavings.replace(/[^0-9]/g, ''), 10) || 0;
          return numB - numA;
        }
        if (sortBy === 'size') {
          const sizeA = parseFloat(a.systemSize) || 0;
          const sizeB = parseFloat(b.systemSize) || 0;
          return sizeB - sizeA;
        }
        return 0; // default featured order
      });
  }, [selectedCat, searchQuery, sortBy]);

  return (
    <>
      {/* Sticky Interactive Filter & Search Bar */}
      <section className="py-6 sticky top-29 z-20 backdrop-blur-md bg-white/90 border-y border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCat === cat.key;
                const count = categoryCounts[cat.key] || 0;

                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCat(cat.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-md shadow-slate-900/20'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Search input */}
              <div className="relative flex-1 lg:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search suburb, hardware, Tesla..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 rounded-full border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-hidden focus:border-amber-500 cursor-pointer shadow-xs"
                >
                  <option value="featured">Featured Order</option>
                  <option value="savings">Highest Savings</option>
                  <option value="size">System Size (kW)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Counter / Filter Notice */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Showing {filteredProjects.length} Case {filteredProjects.length === 1 ? 'Study' : 'Studies'}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>

            {(selectedCat !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCat('all');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Grid of Cards */}
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    key={project.slug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty state */
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200/80 p-8 max-w-xl mx-auto shadow-sm">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-slate-900">
                No matching case studies found
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                We couldn't find any installations matching your criteria. Try clearing your search term or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSelectedCat('all');
                  setSearchQuery('');
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                View All Case Studies
              </button>
            </div>
          )}

          {/* Bottom CTA Banner */}
          <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-slate-800 shadow-xl">
            <BorderBeam size={180} duration={9} colorFrom="#2B3CB8" colorTo="#6F8EE7" borderWidth={1.5} />
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                Ready for Similar Results On Your Roof?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Every home is unique. Get a custom 3D roof simulation, shading analysis, and exact quarterly ROI model designed by Master Electrician Trent Palmer.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  to="/get-started/free-assessment"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-md"
                >
                  Request Free 3D Roof Proposal
                </Button>
                <Button
                  to="/calculators/solar-savings"
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto text-white border-slate-600 hover:bg-white/10"
                >
                  Run Savings Calculator
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsGridSection;
