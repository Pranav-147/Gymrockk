"use client";

import React, { useRef, useCallback } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import dynamic from "next/dynamic";

// Safely import Next.js Image with fallback
const Logo = dynamic(() => import("next/image"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-10 w-10 rounded"></div>,
  suspense: true,
});

// Tabs configuration with type safety
const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "User-friendly dashboard",
    isNew: false,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One-click optimization",
    isNew: false,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart keyword generator",
    isNew: false,
  },
] as const;

interface FeatureTabProps {
  icon: string;
  title: string;
  isNew?: boolean;
}

const FeatureTab: React.FC<FeatureTabProps> = React.memo(({ icon, title, isNew = false }) => {
  // Use `useRef` with the DOM instance type or use `any` if no typings are provided
  const animationRef = useRef<React.ElementRef<typeof DotLottiePlayer>>(null);

  const handleAnimationLoad = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.setSpeed(1);
      animationRef.current.play();
    }
  }, []);

  const handleAnimationError = useCallback((error: Error) => {
    console.error("Lottie animation error:", error);
  }, []);

  return (
    <div
      className="border border-white/20 flex p-2.5 rounded-lg gap-2.5 items-center flex-1"
      aria-label={`Feature: ${title}`}
    >
      <div
        className="border border-white/20 rounded-xl h-12 w-12 inline-flex justify-center items-center"
        aria-hidden="true"
      >
        <DotLottiePlayer
          ref={animationRef}
          src={icon}
          autoplay
          loop
          className="h-5 w-5"
          onLoad={handleAnimationLoad}
        />
      </div>
      <div>{title}</div>
      {isNew && (
        <div
          className="bg-orange-500 text-xs font-semibold px-2 py-1 rounded-full"
          role="status"
        >
          New
        </div>
      )}
    </div>
  );
});

// Add display name for better debugging
FeatureTab.displayName = "FeatureTab";

export const Features: React.FC = () => {
  return (
    <section className="py-20 md:py-24" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <h2
          id="features-heading"
          className="text-4xl md:text-6xl font-medium text-center tracking-tighter"
        >
          Get a{" "}
          <span className="bg-gradient-to-tr from-orange-600 via-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent">
            detailed
          </span>{" "}
          analysis
        </h2>
        <p
          className="text-white/70 text-md md:text-lg lg:text-lg tracking-tight text-center mt-5"
          aria-describedby="features-heading"
        >
          Get your detailed analysis of your whole day by using our summarization AI
        </p>
        <div className="mt-10 flex flex-col lg:flex-row gap-3" role="list">
          {tabs.map((tab, index) => (
            <FeatureTab
              key={`feature-${index}`}
              icon={tab.icon}
              title={tab.title}
              isNew={tab.isNew}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
