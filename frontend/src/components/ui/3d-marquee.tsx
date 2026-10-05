import React from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface ThreeDMarqueeProps {
  images: string[];
  className?: string;
  scaleClassName?: string;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className,
  scaleClassName,
}) => {
  // Ensure we have at least 4 items
  const safeImages = images.length > 0 ? images : ['/images/projects/aerial-view-solar.webp'];

  // Split the images array into 4 equal columns
  const chunkSize = Math.max(1, Math.ceil(safeImages.length / 4));
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    const chunk = safeImages.slice(start, start + chunkSize);
    return chunk.length > 0 ? chunk : safeImages.slice(0, 4);
  });

  return (
    <div
      className={cn(
        'mx-auto block h-full w-full overflow-hidden relative select-none',
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div
          className={cn(
            'size-[1700px] shrink-0 scale-50 sm:scale-75 lg:scale-95 origin-center',
            scaleClassName
          )}
        >
          <div
            style={{
              transform: 'rotateX(55deg) rotateY(0deg) rotateZ(-45deg)',
              transformStyle: 'preserve-3d',
            }}
            className="relative top-72 right-[42%] grid size-full origin-top-left grid-cols-4 gap-2"
          >
            {chunks.map((subarray, colIndex) => {
              // Duplicate the subarray so it loops continuously and seamlessly without gaps
              const extendedSubarray = [...subarray, ...subarray];
              const isEven = colIndex % 2 === 0;

              return (
                <m.div
                  key={colIndex + '-marquee-col'}
                  animate={{
                    y: isEven ? ['0%', '-50%'] : ['-50%', '0%'],
                  }}
                  transition={{
                    duration: isEven ? 26 : 32,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                  className="flex flex-col items-start gap-6 will-change-transform"
                >
                  <GridLineVertical className="-left-3" offset="60px" />
                  {extendedSubarray.map((image, imageIndex) => (
                    <div
                      className="relative shrink-0"
                      key={`${colIndex}-${imageIndex}-${image}`}
                    >
                      <GridLineHorizontal className="-top-3" offset="20px" />
                      <m.img
                        whileHover={{
                          y: -6,
                          scale: 1.05,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeInOut',
                        }}
                        src={image}
                        alt="Solar installation project"
                        onError={(e) => {
                          // Fallback to verified local solar image if any path fails
                          (e.target as HTMLImageElement).src =
                            '/images/projects/aerial-view-solar.webp';
                        }}
                        className="aspect-970/700 w-85 rounded-xl object-cover ring-1 ring-blue-500/15 shadow-xl shadow-blue-950/15 hover:shadow-2xl hover:ring-blue-500/40 transition-shadow bg-slate-900"
                        width={970}
                        height={700}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          '--background': '#ffffff',
          '--color': 'rgba(43, 60, 184, 0.18)',
          '--height': '1px',
          '--width': '5px',
          '--fade-stop': '90%',
          '--offset': offset || '200px',
          '--color-dark': 'rgba(255, 255, 255, 0.2)',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'absolute left-[calc(var(--offset)/2*-1)] h-(--height) w-[calc(100%+var(--offset))]',
        'bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]',
        'bg-size-[var(--width)_var(--height)]',
        '[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]',
        'mask-exclude',
        'z-30 pointer-events-none',
        'dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
        className
      )}
    />
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          '--background': '#ffffff',
          '--color': 'rgba(43, 60, 184, 0.18)',
          '--height': '5px',
          '--width': '1px',
          '--fade-stop': '90%',
          '--offset': offset || '150px',
          '--color-dark': 'rgba(255, 255, 255, 0.2)',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={cn(
        'absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-(--width)',
        'bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]',
        'bg-size-[var(--width)_var(--height)]',
        '[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)]',
        'mask-exclude',
        'z-30 pointer-events-none',
        'dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]',
        className
      )}
    />
  );
};

export default ThreeDMarquee;
