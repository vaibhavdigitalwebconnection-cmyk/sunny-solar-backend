'use client';

import * as React from 'react';
import { motion, easeOut } from 'framer-motion';
import { CheckCircle2, RotateCw, ExternalLink } from 'lucide-react';

export interface FlipCardData {
  name: string;
  username: string;
  image: string;
  bio: string;
  stats: {
    following: number;
    followers: number;
    posts?: number;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface FlipCardItem {
  id?: string | number;
  title: string;
  category?: string;
  image: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  desc: string;
  highlights?: string[];
  badge?: string;
  accentColor?: string;
}

export interface FlipCardProps {
  data?: FlipCardData;
  item?: FlipCardItem;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
  className?: string;
  heightClass?: string;
}

export function FlipCard({
  data,
  item,
  frontContent,
  backContent,
  className = '',
  heightClass = 'h-[380px] sm:h-[400px]',
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsFlipped(false);
    }
  };

  const cardVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  // If standard demo data was passed without item or custom nodes
  if (data && !item && !frontContent && !backContent) {
    return (
      <div
        className={`relative w-64 sm:w-72 ${heightClass} cursor-pointer mx-auto select-none ${className}`}
        style={{ perspective: 1200 }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* FRONT: 3D Full-Card Image Profile */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-slate-200/90 overflow-hidden shadow-xl hover:shadow-2xl shadow-black transition-all duration-300"
          animate={isFlipped ? 'back' : 'front'}
          variants={cardVariants}
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          {/* Full Card Image Background */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
            />
            {/* Gradient Overlays for High Contrast and 3D depth */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/40 to-black/25" />
            <div className="pointer-events-none absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
          </div>

          {/* 3D Floating Content over Full-Card Image */}
          <div
            className="relative z-10 w-full h-full p-5 flex flex-col justify-end items-center text-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h2
              className="text-lg sm:text-xl font-bold text-white drop-shadow-md"
              style={{ transform: 'translateZ(35px)' }}
            >
              {data.name}
            </h2>
            <p
              className="text-xs text-blue-200 font-medium mt-0.5 drop-shadow-xs"
              style={{ transform: 'translateZ(25px)' }}
            >
              @{data.username}
            </p>
            <div
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white shadow-lg"
              style={{ transform: 'translateZ(20px)' }}
            >
              <RotateCw className="w-3 h-3 animate-spin-reverse" />
              <span>Hover or tap to reveal</span>
            </div>
          </div>
        </motion.div>

        {/* BACK: Bio + Details */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-blue-600/30 p-6 flex flex-col justify-between items-center text-center bg-linear-to-b from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl"
          initial={{ rotateY: 180 }}
          animate={isFlipped ? 'front' : 'back'}
          variants={cardVariants}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            rotateY: 180,
          }}
        >
          <div style={{ transform: 'translateZ(25px)' }} className="w-full">
            <h3 className="text-base font-bold text-white mb-2">{data.name}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{data.bio}</p>
          </div>

          <div
            className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-between w-full"
            style={{ transform: 'translateZ(30px)' }}
          >
            <div>
              <p className="text-sm font-bold text-amber-400">
                {data.stats.following}
              </p>
              <p className="text-[10px] text-slate-300 uppercase">Following</p>
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {data.stats.followers}
              </p>
              <p className="text-[10px] text-slate-300 uppercase">Followers</p>
            </div>
            {data.stats.posts && (
              <div>
                <p className="text-sm font-bold text-blue-300">
                  {data.stats.posts}
                </p>
                <p className="text-[10px] text-slate-300 uppercase">Posts</p>
              </div>
            )}
          </div>

          <div
            className="text-[11px] text-slate-400 flex items-center gap-1.5"
            style={{ transform: 'translateZ(15px)' }}
          >
            <RotateCw className="w-3 h-3" />
            <span>Click to flip back</span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Solar Audit Item Mode or Custom Nodes
  const currentItem = item;

  return (
    <div
      className={`group relative w-full ${heightClass} cursor-pointer select-none ${className}`}
      style={{ perspective: 1200 }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ================= FRONT: 3D Full-Card Image ================= */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
        animate={isFlipped ? 'back' : 'front'}
        variants={cardVariants}
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        {frontContent ? (
          frontContent
        ) : currentItem ? (
          <>
            {/* FULL CARD IMAGE BACKGROUND */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentItem.image}
                alt={currentItem.imageAlt || currentItem.title}
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              {/* Dual-tone Dark Vignette & Gradient Overlays for High Contrast */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/40 to-slate-900/30" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0C123E]/50 via-transparent to-transparent" />
              {/* 3D Glass Specular Sheen */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent" />
            </div>

            {/* 3D FLOATING OVERLAY CONTENT */}
            <div
              className="relative z-10 w-full h-full p-5 flex flex-col justify-between"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Top Tag & Category Badge */}
              <div
                className="w-full flex items-center justify-between"
                style={{ transform: 'translateZ(30px)' }}
              >
                {currentItem.category ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-900/70 backdrop-blur-md text-white border border-white/20 shadow-md">
                    {currentItem.category}
                  </span>
                ) : (
                  <span />
                )}
                {currentItem.icon && (
                  <div
                    className="w-8 h-8 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-md text-white"
                  >
                    {currentItem.icon}
                  </div>
                )}
              </div>

              {/* Center 3D Floating Indicator / Icon Pill */}
              <div
                className="my-auto flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transform: 'translateZ(45px)' }}
              >
                <div className="px-3.5 py-1.5 rounded-full bg-[#2B3CB8]/85 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-white/30 flex items-center gap-2">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Flip to inspect report</span>
                </div>
              </div>

              {/* Bottom Title & Flip Prompt */}
              <div
                className="w-full pt-2"
                style={{ transform: 'translateZ(35px)' }}
              >
                <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1.5 leading-snug drop-shadow-md">
                  {currentItem.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 group-hover:text-white transition-colors">
                  <RotateCw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
                  <span>Hover or tap for details</span>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </motion.div>

      {/* ================= BACK: Rich Deliverable Content ================= */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-blue-500/30 bg-linear-to-b from-slate-950 via-[#0C123E] to-slate-950 p-5 flex flex-col justify-between text-left text-white shadow-xl overflow-hidden"
        initial={{ rotateY: 180 }}
        animate={isFlipped ? 'front' : 'back'}
        variants={cardVariants}
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          rotateY: 180,
        }}
      >
        {backContent ? (
          backContent
        ) : currentItem ? (
          <>
            {/* Back Header: Icon + Category */}
            <div
              className="flex items-center justify-between gap-2 border-b border-white/10 pb-3"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg ${
                    currentItem.iconBg || 'bg-blue-500/20'
                  } flex items-center justify-center shrink-0 border border-white/10`}
                >
                  {currentItem.icon}
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-blue-300">
                    {currentItem.category || 'Audit Deliverable'}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-white leading-tight">
                    {currentItem.title}
                  </h4>
                </div>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                title="Flip card"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Back Body: Detailed Description & Checklist */}
            <div
              className="my-auto py-2.5 space-y-3"
              style={{ transform: 'translateZ(20px)' }}
            >
              <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                {currentItem.desc}
              </p>

              {currentItem.highlights && currentItem.highlights.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {currentItem.highlights.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-1.5 text-[10px] sm:text-[11px] text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Back Footer: Badge & Status */}
            <div
              className="pt-3 border-t border-white/10 flex items-center justify-between"
              style={{ transform: 'translateZ(25px)' }}
            >
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{currentItem.badge || 'Included in $189 audit'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                Verified Report
              </span>
            </div>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}

export default FlipCard;
