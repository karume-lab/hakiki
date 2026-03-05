import { Suspense } from "react";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import FeaturesSection from "@/features/landing-page/features-section";
import Footer from "@/features/landing-page/footer";
import HeroSection from "@/features/landing-page/hero-section";
import ModulesSection from "@/features/landing-page/modules-section";
import { PoliticianSection } from "@/features/landing-page/politician-section";
import ProblemSection from "@/features/landing-page/problem-section";
import PoliticianCardSkeleton from "@/features/politician-listing/components/politician-card-skeleton";

const PoliticianSectionFallback = () => (
  <section className="w-full max-w-7xl mx-auto px-6 py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
      {Array.from({ length: 8 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        <PoliticianCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      {/* Kenyan flag stripe at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-[3px]">
        <div className="flex-1" style={{ backgroundColor: "#006600" }} />
        <div className="flex-1" style={{ backgroundColor: "#BB0000" }} />
      </div>
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
        <ThemeSwitch />
      </div>

      <main className="flex-1 w-full mx-auto">
        <HeroSection />
        <Suspense fallback={<PoliticianSectionFallback />}>
          <PoliticianSection />
        </Suspense>
        <ProblemSection />
        <ModulesSection />
        <FeaturesSection />
        <Footer />
      </main>
    </div>
  );
}
