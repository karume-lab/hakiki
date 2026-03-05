"use client";

import { Button } from "@repo/ui/web/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PoliticianCardSkeleton from "@/features/politician-listing/components/politician-card-skeleton";
import PoliticianCard from "@/features/politician-listing/components/politician-listing-card";
import { usePoliticians } from "@/features/politician-listing/hooks/usePoliticians";

const VISIBLE_COUNT = 12;

export const PoliticianSection = () => {
  const { politicians, isLoading } = usePoliticians();

  const visible = politicians.slice(0, VISIBLE_COUNT);
  const remaining = politicians.length - VISIBLE_COUNT;

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-8 border-b border-border pb-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
            13th Parliament
          </p>
          <h2 className="text-3xl font-bold text-foreground">National Assembly Politicians</h2>
        </div>
        <span className="text-sm text-muted-foreground">{politicians.length} records</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              <PoliticianCardSkeleton key={`skeleton-${i}`} />
            ))
          : visible.map((politician) => <PoliticianCard key={politician.id} {...politician} />)}

        {/* See More — spans full row */}
        {remaining > 0 && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <Link href="/politicians" className="w-full">
              <Button
                variant="ghost"
                className="w-full rounded-none h-14 gap-3 border border-border border-t-0 text-sm font-medium tracking-wide group/btn"
              >
                <span>
                  View all politicians
                  <span className="text-muted-foreground font-normal ml-1">
                    (+{remaining} more)
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
