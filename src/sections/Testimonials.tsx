"use client"

import React, { useRef, useEffect, useMemo, memo } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';

// Explicitly import Lottie animations
import a1 from "@/sections/l1.json";
import a2 from "@/sections/l4.json";
import a3 from "@/sections/l3.json";

// Service item interface
interface ServiceItem {
  readonly title: string;
  readonly description: string;
  readonly animation: {
    readonly src: string;
  };
}

// Typed service items array
const SERVICE_ITEMS: readonly ServiceItem[] = [
  {
    title: 'Querying',
    description: 'Efficiently extract and analyze data with our advanced querying capabilities.',
    animation: { src: JSON.stringify(a1) }
  },
  {
    title: 'Automation',
    description: 'Streamline your workflows with intelligent, customizable automation solutions.',
    animation: { src: JSON.stringify(a2) }
  },
  {
    title: 'Support',
    description: 'Receive dedicated, expert assistance tailored to your unique business needs.',
    animation: { src: JSON.stringify(a3) }
  }
] as const;

// Memoized and type-safe ServiceCard component
const ServiceCard = memo<ServiceItem>(({ title, description, animation }) => {
  // Use a more generic ref type
  const animationRef = useRef<any>(null);

  // Controlled animation effect with proper cleanup
  useEffect(() => {
    const currentRef = animationRef.current;
    
    // Safer animation initialization with optional chaining
    if (currentRef) {
      try {
        currentRef.setSpeed(0.5);
        currentRef.play();
      } catch (error) {
        console.error('Animation initialization error:', error);
      }
    }

    // Explicit cleanup to prevent memory leaks
    return () => {
      if (currentRef) {
        try {
          currentRef.stop();
        } catch (error) {
          console.error('Animation cleanup error:', error);
        }
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-4 max-w-xs">
      <div className="h-12 md:h-14 w-12 md:w-14" aria-hidden="true">
        <DotLottiePlayer
          ref={animationRef}
          src={animation.src}
          autoplay={true}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <span className="text-3xl font-bold">{title}</span>
      <p className="text-white/60 text-lg">{description}</p>
    </div>
  );
});

// Explicit display name for better debugging
ServiceCard.displayName = 'ServiceCard';

// Main Testimonials component
export const Testimonials: React.FC = () => {
  // Memoized service cards to optimize performance
  const memoizedServiceCards = useMemo(() => 
    SERVICE_ITEMS.map((item, index) => (
      <ServiceCard
        key={`service-${item.title}-${index}`}
        {...item}
      />
    )), 
    []  // Empty dependency array since SERVICE_ITEMS is frozen
  );

  return (
    <section className="container mx-auto px-4" aria-labelledby="services-title">
      <div className="mt-32 relative">
        <h2 
          id="services-title" 
          className="text-lg tracking-tight font-sans text-center"
        >
          Our services
        </h2>
        <h3 className="text-4xl md:text-6xl mx-auto text-center max-w-4xl tracking-tighter font-sans mt-4">
          Our simple 3-step process to{' '}
          <span className="italic font-sans text-transparent bg-clip-text bg-[radial-gradient(circle_at_top_right,#eb5d0f,orange)]">
            skyrocket
          </span>{' '}
          your progress
        </h3>
        <p className="text-md md:text-lg mx-auto text-center max-w-3xl mt-10 text-white/40">
          Leverage our comprehensive approach to transform your business efficiency and drive meaningful progress.
        </p>
      </div>

      <div 
        className="flex justify-center flex-col md:flex-row lg:flex-row items-center md:items-start mt-28 md:gap-3 gap-24 mb-40"
        role="list"
      >
        {memoizedServiceCards}
      </div>
    </section>
  );
};

export default Testimonials;