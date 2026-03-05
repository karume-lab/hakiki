import { Button } from "@repo/ui/web/components/ui/button";
import { Users } from "lucide-react";
import { type FC, useEffect, useRef } from "react";

const LOADING_SKELETON_KEYS = Array.from({ length: 12 }, (_, i) => `skeleton-${i}`);
const NEXT_PAGE_SKELETON_KEYS = Array.from({ length: 4 }, (_, i) => `next-${i}`);

import PoliticianCardSkeleton from "@/features/politician-listing/components/politician-card-skeleton";
import PoliticianCard from "@/features/politician-listing/components/politician-listing-card";

interface PoliticianListingItem {
  id: string;
  fullName: string;
  position: string;
  image?: string | null;
  constituency?: {
    name: string;
    county: string;
  } | null;
}

interface PoliticianListingLayoutProps {
  politicians: PoliticianListingItem[];
  onClearFilters?: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

const PoliticianListingLayout: FC<PoliticianListingLayoutProps> = ({
  politicians,
  onClearFilters,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage?.();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
          {LOADING_SKELETON_KEYS.map((key) => (
            <PoliticianCardSkeleton key={key} />
          ))}
        </div>
      ) : politicians.length === 0 && !isFetchingNextPage ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <Users className="w-10 h-10 text-muted-foreground/40" />
          <p className="text-lg font-semibold text-foreground">No politicians found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          <Button variant="outline" className="rounded-none mt-2" onClick={onClearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
            {politicians.map((politician) => (
              <PoliticianCard key={politician.id} {...politician} />
            ))}
            {isFetchingNextPage &&
              NEXT_PAGE_SKELETON_KEYS.map((key) => <PoliticianCardSkeleton key={key} />)}
          </div>

          <div ref={sentinelRef} className="mt-12 flex justify-center py-8 min-h-[50px]" />
        </>
      )}
    </div>
  );
};

export default PoliticianListingLayout;
