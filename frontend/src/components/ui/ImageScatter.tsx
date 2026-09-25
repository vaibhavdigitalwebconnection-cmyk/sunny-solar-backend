"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScatterSet {
  heading: string;
  tag?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  images: string[];
}

export interface ImageScatterProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ScatterSet[];
  cardWidth?: number;
  cardHeight?: number;
  animationDuration?: number;
  animationOverlap?: number;
  headingFadeDuration?: number;
  intervalDuration?: number;
  scroller?: string | Element | null;
  onSectionChange?: (index: number) => void;
  activeSectionIndex?: number;
}

interface ActiveCard {
  element: HTMLDivElement;
  side: "left" | "right";
  targetX: number;
  targetY: number;
  targetRotation: number;
}

export function ImageScatter({
  data,
  cardWidth,
  cardHeight,
  animationDuration = 0.75,
  animationOverlap = 0.35,
  headingFadeDuration = 0.4,
  intervalDuration = 4000,
  scroller,
  className,
  onSectionChange,
  activeSectionIndex,
  ...props
}: ImageScatterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const stateRef = useRef({
    activeCards: [] as ActiveCard[],
    currentSection: 0,
    isAnimating: false,
  });

  const transitionToSectionRef = useRef<((idx: number) => void) | null>(null);

  // Responsive card dimensions
  const getCardDimensions = useCallback(() => {
    if (typeof window === "undefined") {
      return { width: cardWidth || 240, height: cardHeight || 290 };
    }
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      return {
        width: cardWidth ? Math.min(cardWidth, 125) : 125,
        height: cardHeight ? Math.min(cardHeight, 155) : 155,
      };
    }
    if (screenWidth < 1024) {
      return {
        width: cardWidth ? Math.min(cardWidth, 180) : 180,
        height: cardHeight ? Math.min(cardHeight, 225) : 225,
      };
    }
    return {
      width: cardWidth || 230,
      height: cardHeight || 285,
    };
  }, [cardWidth, cardHeight]);

  useEffect(() => {
    if (!containerRef.current || !galleryRef.current || !headingRef.current || data.length === 0) return;

    const container = containerRef.current;
    const gallery = galleryRef.current;
    const galleryHeading = headingRef.current;
    const headingContainer = headingContainerRef.current;
    const subtitleEl = subtitleRef.current;

    function createCards(sectionIndex: number, isInitial: boolean = false): ActiveCard[] {
      const cards: ActiveCard[] = [];
      const sectionData = data[sectionIndex];

      if (!sectionData || !sectionData.images.length) return cards;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const { width: cWidth, height: cHeight } = getCardDimensions();

      // Middle zone width reserved strictly for heading & subtitle
      const middleWidth = Math.min(540, containerWidth * 0.46);

      const images = sectionData.images;
      const half = Math.ceil(images.length / 2);
      const leftImages = images.slice(0, half);
      const rightImages = images.slice(half);

      // ─── 1. Build Left Side Cards ───────────────────────────────────────
      const numLeft = leftImages.length;
      leftImages.forEach((src, idx) => {
        const card = document.createElement("div");
        card.className =
          "absolute rounded-2xl border-4 sm:border-[6px] border-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden will-change-transform bg-white select-none transition-transform hover:scale-105 hover:z-20";
        card.style.width = `${cWidth}px`;
        card.style.height = `${cHeight}px`;

        const img = document.createElement("img");
        img.src = src;
        img.alt = sectionData.heading || "Sunny Solar Project";
        img.loading = "lazy";
        img.className = "w-full h-full object-cover rounded-lg pointer-events-none select-none";
        card.appendChild(img);

        // Glass reflection sheen
        const sheen = document.createElement("div");
        sheen.className =
          "absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent pointer-events-none";
        card.appendChild(sheen);

        // Vertical distribution on left
        const verticalSpacing = (containerHeight - cHeight) / (numLeft > 1 ? numLeft - 0.1 : 1);
        const baseY = numLeft === 1
          ? (containerHeight - cHeight) / 2
          : 15 + idx * verticalSpacing * 0.88;
        const targetY = Math.max(10, Math.min(containerHeight - cHeight - 10, baseY + (Math.random() - 0.5) * 25));

        // Horizontal positioning on left (must stay strictly to the left of middle text)
        const maxLeftX = Math.max(8, (containerWidth / 2) - (middleWidth / 2) - cWidth - 12);
        const staggerOffset = idx % 2 === 1 ? maxLeftX * 0.35 : 0;
        const targetX = Math.max(8, Math.min(maxLeftX, 12 + staggerOffset + (Math.random() - 0.5) * 16));

        // Organic tilt
        const targetRotation = (idx % 2 === 0 ? -1 : 1) * (7 + Math.random() * 9);

        if (isInitial) {
          gsap.set(card, {
            left: targetX,
            top: targetY,
            rotation: targetRotation,
            opacity: 1,
          });
        } else {
          // Offscreen to the left initially
          gsap.set(card, {
            left: -cWidth - 150,
            top: targetY,
            rotation: targetRotation - 25,
            opacity: 0,
          });
        }

        gallery.appendChild(card);
        cards.push({
          element: card,
          side: "left",
          targetX,
          targetY,
          targetRotation,
        });
      });

      // ─── 2. Build Right Side Cards ──────────────────────────────────────
      const numRight = rightImages.length;
      rightImages.forEach((src, idx) => {
        const card = document.createElement("div");
        card.className =
          "absolute rounded-2xl border-4 sm:border-[6px] border-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden will-change-transform bg-white select-none transition-transform hover:scale-105 hover:z-20";
        card.style.width = `${cWidth}px`;
        card.style.height = `${cHeight}px`;

        const img = document.createElement("img");
        img.src = src;
        img.alt = sectionData.heading || "Sunny Solar Project";
        img.loading = "lazy";
        img.className = "w-full h-full object-cover rounded-lg pointer-events-none select-none";
        card.appendChild(img);

        const sheen = document.createElement("div");
        sheen.className =
          "absolute inset-0 bg-linear-to-tr from-transparent via-white/15 to-transparent pointer-events-none";
        card.appendChild(sheen);

        // Vertical distribution on right
        const verticalSpacing = (containerHeight - cHeight) / (numRight > 1 ? numRight - 0.1 : 1);
        const baseY = numRight === 1
          ? (containerHeight - cHeight) / 2
          : 25 + idx * verticalSpacing * 0.88;
        const targetY = Math.max(10, Math.min(containerHeight - cHeight - 10, baseY + (Math.random() - 0.5) * 25));

        // Horizontal positioning on right (must stay strictly to the right of middle text)
        const minRightX = (containerWidth / 2) + (middleWidth / 2) + 12;
        const maxRightX = containerWidth - cWidth - 12;
        const staggerOffset = idx % 2 === 0 ? (maxRightX - minRightX) * 0.4 : 0;
        const targetX = Math.max(minRightX, Math.min(maxRightX, minRightX + staggerOffset + (Math.random() - 0.5) * 16));

        // Organic tilt
        const targetRotation = (idx % 2 === 0 ? 1 : -1) * (7 + Math.random() * 9);

        if (isInitial) {
          gsap.set(card, {
            left: targetX,
            top: targetY,
            rotation: targetRotation,
            opacity: 1,
          });
        } else {
          // Offscreen to the right initially
          gsap.set(card, {
            left: containerWidth + 150,
            top: targetY,
            rotation: targetRotation + 25,
            opacity: 0,
          });
        }

        gallery.appendChild(card);
        cards.push({
          element: card,
          side: "right",
          targetX,
          targetY,
          targetRotation,
        });
      });

      return cards;
    }

    function animateHeading(sectionIndex: number) {
      const sectionData = data[sectionIndex];
      const targetHeading = sectionData?.heading || "";
      const targetSubtitle = sectionData?.subtitle || "";

      const tl = gsap.timeline();

      if (headingContainer) {
        tl.to(headingContainer, {
          opacity: 0,
          y: -14,
          duration: headingFadeDuration,
          ease: "power2.inOut",
        })
          .call(() => {
            if (galleryHeading) galleryHeading.textContent = targetHeading;
            if (subtitleEl && targetSubtitle) subtitleEl.textContent = targetSubtitle;
          })
          .to(headingContainer, {
            opacity: 1,
            y: 0,
            duration: headingFadeDuration,
            ease: "power2.out",
          });
      } else {
        tl.to(galleryHeading, {
          opacity: 0,
          duration: headingFadeDuration,
          ease: "power2.inOut",
        })
          .call(() => {
            galleryHeading.textContent = targetHeading;
          })
          .to(galleryHeading, {
            opacity: 1,
            duration: headingFadeDuration,
            ease: "power2.inOut",
          });
      }

      return tl;
    }

    function animateCards(
      exitingCards: ActiveCard[],
      enteringCards: ActiveCard[]
    ) {
      const tl = gsap.timeline();
      const containerWidth = container.clientWidth;
      const { width: cWidth } = getCardDimensions();

      // Exiting cards fly off to their respective sides (left cards to left, right cards to right)
      exitingCards.forEach(({ element, side, targetRotation }) => {
        const exitX = side === "left" ? -cWidth - 160 : containerWidth + 160;
        const exitRot = targetRotation + (side === "left" ? -25 : 25);

        tl.to(
          element,
          {
            left: exitX,
            rotation: exitRot,
            opacity: 0,
            duration: animationDuration,
            ease: "power2.in",
            onComplete: () => element.remove(),
          },
          0
        );
      });

      // Entering cards fly in from their respective sides
      enteringCards.forEach(({ element, side, targetX, targetY, targetRotation }) => {
        const startX = side === "left" ? -cWidth - 160 : containerWidth + 160;
        const startRot = targetRotation + (side === "left" ? -25 : 25);

        gsap.set(element, {
          left: startX,
          top: targetY,
          rotation: startRot,
          opacity: 0,
        });

        tl.to(
          element,
          {
            left: targetX,
            top: targetY,
            rotation: targetRotation,
            opacity: 1,
            duration: animationDuration,
            ease: "power2.out",
          },
          animationOverlap
        );
      });

      return tl;
    }

    function transitionToSection(targetIndex: number) {
      if (stateRef.current.isAnimating) return;
      if (targetIndex === stateRef.current.currentSection && stateRef.current.activeCards.length > 0) return;

      stateRef.current.isAnimating = true;
      const newCards = createCards(targetIndex, false);

      const cardsAnimation = new Promise<void>((resolve) => {
        const tl = animateCards(stateRef.current.activeCards, newCards);
        tl.eventCallback("onComplete", () => resolve());
      });

      const headingAnimation = new Promise<void>((resolve) => {
        const tl = animateHeading(targetIndex);
        tl.eventCallback("onComplete", () => resolve());
      });

      Promise.all([cardsAnimation, headingAnimation]).then(() => {
        stateRef.current.activeCards = newCards;
        stateRef.current.currentSection = targetIndex;
        stateRef.current.isAnimating = false;
        onSectionChange?.(targetIndex);
      });
    }

    transitionToSectionRef.current = transitionToSection;

    function reinitialize() {
      stateRef.current.activeCards.forEach(({ element }) => element.remove());
      stateRef.current.activeCards = createCards(stateRef.current.currentSection, true);
    }

    // Initialize first section
    stateRef.current.activeCards = createCards(0, true);
    if (galleryHeading) galleryHeading.textContent = data[0]?.heading || "";
    if (subtitleEl && data[0]?.subtitle) subtitleEl.textContent = data[0].subtitle;

    if (headingContainer) {
      gsap.set(headingContainer, { opacity: 1, y: 0 });
    } else {
      gsap.set(galleryHeading, { opacity: 1 });
    }

    let intervalId: ReturnType<typeof setInterval>;

    function startAutoRotation() {
      intervalId = setInterval(() => {
        if (isPausedRef.current || document.hidden) return;
        const nextIdx = (stateRef.current.currentSection + 1) % data.length;
        transitionToSection(nextIdx);
      }, intervalDuration);
    }

    startAutoRotation();

    const handleResize = () => {
      reinitialize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
      stateRef.current.activeCards.forEach(({ element }) => {
        gsap.killTweensOf(element);
        element.remove();
      });
    };
  }, [
    data,
    cardWidth,
    cardHeight,
    animationDuration,
    animationOverlap,
    headingFadeDuration,
    intervalDuration,
    getCardDimensions,
    onSectionChange,
  ]);

  // Handle external section switch (e.g. category pills)
  useEffect(() => {
    if (
      activeSectionIndex !== undefined &&
      activeSectionIndex !== stateRef.current.currentSection &&
      transitionToSectionRef.current
    ) {
      transitionToSectionRef.current(activeSectionIndex);
    }
  }, [activeSectionIndex]);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "relative w-full h-130 sm:h-150 lg:h-165 flex justify-center items-center overflow-hidden bg-transparent select-none",
        className
      )}
      {...props}
    >
      {/* Left and Right Scattered Cards Canvas */}
      <div ref={galleryRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Central Content (Pure Black Text, Reserved Middle Space) */}
      <div
        ref={headingContainerRef}
        className="w-[90%] sm:w-[72%] md:w-[50%] lg:w-[42%] max-w-xl text-center z-30 flex flex-col items-center justify-center pointer-events-none select-none px-4"
      >
        {/* Dynamic Animated Heading */}
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold leading-[1.18] tracking-tight text-black"
        />

        {/* Dynamic Animated Subtitle */}
        {data[0]?.subtitle && (
          <p
            ref={subtitleRef}
            className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-800 font-medium leading-relaxed max-w-lg mx-auto"
          />
        )}
      </div>
    </section>
  );
}

export default ImageScatter;
