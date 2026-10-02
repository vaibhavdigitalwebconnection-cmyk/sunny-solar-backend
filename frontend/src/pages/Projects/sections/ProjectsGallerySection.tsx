import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Sparkles, MoveHorizontal, ZoomIn } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { FlexCarousel, FlexCarouselItem } from '../../../components/ui/FlexCarousel';

const galleryItems: FlexCarouselItem[] = [
  {
    src: '/images/projects/project-rooftop-array.webp',
    alt: '13.2kW Tier-1 High-Efficiency Rooftop Array in Gold Coast',
    title: '13.2kW Residential Solar Array',
    subtitle: 'Gold Coast, QLD • Premium All-Black Panels'
  },
  {
    src: '/images/projects/home-solar-brisbane.webp',
    alt: 'Brisbane Luxury Home Solar with Sungrow Hybrid Inverter',
    title: 'Brisbane Contemporary Homestead',
    subtitle: '10.5kW Solar + Smart Metering'
  },
  {
    src: '/images/projects/tesla-solar-roof.webp',
    alt: 'Tesla Powerwall 3 and Integrated Black Monocrystalline Setup',
    title: 'Tesla Powerwall 3 & Integrated Roof',
    subtitle: '27kWh Dual Storage • 100% Off-Grid Capable'
  },
  {
    src: '/images/projects/queensland-coastal-solar-home.webp',
    alt: 'Coastal Marine-Grade Clamped Solar Installation',
    title: 'Coastal Marine Clamped Installation',
    subtitle: 'Sunshine Coast • C4 Cyclone Clamping'
  },
  {
    src: '/images/projects/bifacial-rows.webp',
    alt: 'Commercial Bifacial Ground and Roof System',
    title: 'Commercial Multi-Tier Array',
    subtitle: '30kW Bifacial High-Yield Engineering'
  },
  {
    src: '/images/projects/sunny-solar-residential-dusk.webp',
    alt: 'Hinterland Twilight Hybrid Solar and Battery Architecture',
    title: 'Hinterland Twilight Microgrid',
    subtitle: 'Mount Tamborine • 15kW + Modular Batteries'
  },
  {
    src: '/images/projects/clarity-the-right-system.webp',
    alt: 'Concealed Heavy-Gauge Conduit Architecture',
    title: 'Clean Architecture Cable Routing',
    subtitle: 'Zero Exposed Flexible PVC • Master Electrician Standard'
  },
  {
    src: '/images/projects/clarity-existing-solar-battery.webp',
    alt: 'Sungrow & BYD Modular Lithium Battery Vault',
    title: 'High-Capacity Lithium Battery Vault',
    subtitle: 'Indoor Wall Mount • Sub-20ms Blackout Backup'
  },
  {
    src: '/images/projects/homestead-overview.webp',
    alt: 'Acreage Estate Dual Inverter Solar System',
    title: 'Acreage Estate Solar Expansion',
    subtitle: 'Beaudesert • 20kW Microgrid System'
  },
  {
    src: '/images/projects/dji-aerial-solar.webp',
    alt: 'Thermal Drone Imaging and Rooftop Optimization Audit',
    title: 'Drone Thermal & Azimuth Audit',
    subtitle: 'Sub-Degree Solar Optimization'
  },
  {
    src: '/images/projects/3phase-gateway.webp',
    alt: '3-Phase Smart Backup Gateway Switchboard',
    title: '3-Phase Smart Backup Gateway',
    subtitle: 'Whole-Home Automatic Power Transfer'
  },
  {
    src: '/images/projects/ground-mount-array.webp',
    alt: 'Heavy Duty Ground-Mounted Solar Array',
    title: 'Rural Ground-Mount Array',
    subtitle: 'Galvanised Steel Pile Foundation'
  }
];

export const ProjectsGallerySection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-linear-to-b from-white via-slate-50 to-[#2B3CB8]/5 overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-[#2B3CB8]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
      

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-950 tracking-tight"
          >
            Real Rooftops In{' '}
            <span className="bg-linear-to-r from-[#2B3CB8] via-[#4658D9] to-[#6F8EE7] bg-clip-text text-transparent">
              Liquid Motion
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            Experience our Master Electrician solar and battery builds through an interactive liquid lens.
            Drag horizontally, scroll, or click any card to zoom into full resolution.
          </motion.p>

        </div>

       
      </div>
       {/* Liquid FlexCarousel Animation Container */}
        <div className="relative w-full  overflow-hidden ">
         

          {/* Carousel exact specified dimensions and props */}
          <div style={{ width: '100%', height: '560px', position: 'relative' }}>
            <FlexCarousel
              items={galleryItems}
              preset="liquid"
              intro="rise"
              cardHeight={0.5}
              gap={12}
              squeeze={0.2}
              focusOnClick
              captions
              fit="natural"
              radius={0}
              lensWidth={0.74}
              lensHeight={1.18}
              tilt={62}
              roundness={1}
              bend={0.34}
              reach={0.38}
              curl="twist"
              dispersion={0.45}
              liquid={0}
              followCursor={false}
              autoplay={false}
              interval={4}
              captureWheel
              className="text-white"
            />
          </div>
        </div>

        {/* Call On Bottom / Action Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[#D1DCF8] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
          >
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-950">
                Want a system built to this exact standard on your roof?
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                Speak directly with Master Electricians or book your complimentary 3D roof satellite assessment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href="tel:1300030479"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-white bg-[#2B3CB8] hover:bg-[#2433A1] shadow-md shadow-[#2B3CB8]/25 transition-all duration-200 active:scale-[0.98] min-h-11"
              >
                <Phone className="w-4 h-4" />
                <span>Call 1300 030 479</span>
              </a>
              <Button
                to="/get-started/free-assessment"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-[#2B3CB8] border-[#D1DCF8] hover:bg-[#F5F7FD]"
              >
                Get Free 3D Proposal
              </Button>
            </div>
          </motion.div>
        </div>
    </section>
  );
};

export default ProjectsGallerySection;
