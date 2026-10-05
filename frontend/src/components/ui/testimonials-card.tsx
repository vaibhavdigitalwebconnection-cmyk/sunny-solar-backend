"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface TestimonialItem {
    /** Unique identifier for the card */
    id: string | number;
    /** Title displayed for the card */
    title: string;
    /** Description text for the card */
    description: string;
    /** Image URL/path for the card */
    image: string;
    /** Optional badge or step label (e.g. Slide 01 — The Right System) */
    badge?: string;
    /** Optional progression subtitle (e.g. 01 — What do I need?) */
    subtitle?: string;
    /** Optional highlight text (e.g. Solar • Battery • Energy Use) */
    highlight?: string;
}

interface TestimonialsCardProps {
    /** Array of testimonial items to display */
    items: TestimonialItem[];
    /** Additional CSS classes for the container */
    className?: string;
    /** Width of the card stack (default: 400) */
    width?: number;
    /** Whether to show navigation arrows (default: true) */
    showNavigation?: boolean;
    /** Whether to show the counter (default: true) */
    showCounter?: boolean;
    /** Whether to enable auto-play (default: false) */
    autoPlay?: boolean;
    /** Auto-play interval in ms (default: 3000) */
    autoPlayInterval?: number;
    /** Optional controlled active index */
    activeIndex?: number;
    /** Optional callback when active index changes */
    onIndexChange?: (index: number) => void;
}

export function TestimonialsCard({
    items,
    className,
    width = 400,
    showNavigation = true,
    showCounter = true,
    autoPlay = false,
    autoPlayInterval = 3000,
    activeIndex: externalActiveIndex,
    onIndexChange,
}: TestimonialsCardProps) {
    const [internalActiveIndex, setInternalActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const isControlled = externalActiveIndex !== undefined;
    const activeIndex = isControlled ? externalActiveIndex : internalActiveIndex;

    const updateIndex = (newIndex: number, newDir: number) => {
        setDirection(newDir);
        if (!isControlled) {
            setInternalActiveIndex(newIndex);
        }
        onIndexChange?.(newIndex);
    };

    // Auto-play effect
    React.useEffect(() => {
        if (!autoPlay || items.length <= 1) return;

        const interval = setInterval(() => {
            const nextIdx = (activeIndex + 1) % items.length;
            updateIndex(nextIdx, 1);
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, items.length, activeIndex, isControlled]);

    const handleNext = () => {
        const nextIdx = (activeIndex + 1) % items.length;
        updateIndex(nextIdx, 1);
    };

    const handlePrev = () => {
        const prevIdx = (activeIndex - 1 + items.length) % items.length;
        updateIndex(prevIdx, -1);
    };

    // Pre-calculate rotations for visual variety
    const rotations = useMemo(() => [4, -2, -9, 7], []);

    // Touch swipe handling for mobile devices
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX === null) return;
        const diffX = e.changedTouches[0].clientX - touchStartX;
        if (diffX > 45) {
            handlePrev();
        } else if (diffX < -45) {
            handleNext();
        }
        setTouchStartX(null);
    };

    if (!items || items.length === 0) {
        return null;
    }

    const activeItem = items[activeIndex] || items[0];

    return (
        <div
            className={cn("flex items-center justify-center w-full overflow-hidden md:overflow-visible py-2", className)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="relative grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_auto_auto] gap-x-8 gap-y-6 w-full"
                style={{ perspective: "1400px", maxWidth: `${width * 2.5}px` }}
            >
                {/* 1. Image Card Stack (On mobile: top row-start-1, centered) */}
                <div
                    className="row-start-1 md:row-start-1 col-start-1 md:row-span-3 relative w-full aspect-square mx-auto max-w-70 xs:max-w-[320px] sm:max-w-90 md:max-w-none"
                    style={{ maxWidth: `${width}px` }}
                >
                    <AnimatePresence custom={direction}>
                        {items.map((item, index) => {
                            const isActive = index === activeIndex;
                            const offset = index - activeIndex;

                            return (
                                <motion.div
                                    key={item.id}
                                    className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-200 border border-slate-200 shadow-xl rounded-2xl  "
                                    initial={{
                                        x: offset * 12,
                                        y: Math.abs(offset) * 4,
                                        z: -120 * Math.abs(offset),
                                        scale: 0.88 - Math.abs(offset) * 0.04,
                                        rotateZ: rotations[index % 4],
                                        opacity: isActive ? 1 : 0.5,
                                        zIndex: 10 - Math.abs(offset),
                                    }}
                                    animate={
                                        isActive
                                            ? {
                                                x: [offset * 12, direction === 1 ? -120 : 120, 0],
                                                y: [Math.abs(offset) * 4, 0, 0],
                                                z: [-180, 100, 200],
                                                scale: [0.88, 1.03, 1],
                                                rotateZ: [rotations[index % 4], -4, 0],
                                                opacity: 1,
                                                zIndex: 100,
                                            }
                                            : {
                                                x: offset * 12,
                                                y: Math.abs(offset) * 4,
                                                z: -120 * Math.abs(offset),
                                                rotateZ: rotations[index % 4],
                                                scale: 0.88 - Math.abs(offset) * 0.04,
                                                opacity: 0.55,
                                                zIndex: 10 - Math.abs(offset),
                                            }
                                    }
                                    exit={{
                                        x: direction === 1 ? -160 : 160,
                                        z: -200,
                                        scale: 0.75,
                                        rotateZ: direction === 1 ? -8 : 8,
                                        opacity: 0,
                                    }}
                                    transition={{
                                        duration: 0.65,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover pointer-events-none"
                                        draggable={false}
                                        loading="lazy"
                                        decoding="async"
                                        width={width}
                                        height={Math.round(width * 0.7)}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* 2. Text Area (On mobile: row-start-2 underneath image) */}
                <div className="row-start-2 col-start-1 md:col-start-2 md:row-start-1 flex flex-col justify-center min-h-36 sm:min-h-48 px-1 md:pl-4 text-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3 }}
                        >
                            {(activeItem.badge || activeItem.subtitle) && (
                                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                                    {activeItem.badge && (
                                        <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B3CB8] bg-[#E8EDFB] border border-[#D1DCF8]">
                                            <span>{activeItem.badge}</span>
                                        </div>
                                    )}
                                    {activeItem.subtitle && (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-[#1D2984] bg-[#F5F7FD] border border-[#D1DCF8]">
                                            {activeItem.subtitle}
                                        </span>
                                    )}
                                </div>
                            )}

                            <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#0C123E] font-serif mb-2 sm:mb-3 leading-snug">
                                {activeItem.title}
                            </h3>

                            <p className="text-xs sm:text-base text-slate-600 leading-relaxed text-justify sm:text-left">
                                {activeItem.description}
                            </p>

                            {activeItem.highlight && (
                                <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E8EDFB] border border-[#D1DCF8] text-xs sm:text-sm font-bold text-[#2B3CB8]">
                                    <span className="w-2 h-2 rounded-full bg-[#2B3CB8] shrink-0" />
                                    <span>{activeItem.highlight}</span>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

               
            </div>
        </div>
    );
}

export default TestimonialsCard;
