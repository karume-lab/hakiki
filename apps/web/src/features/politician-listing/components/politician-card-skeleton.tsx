import { Skeleton } from "@repo/ui/web/components/ui/skeleton";
import type { FC } from "react";

const PoliticianCardSkeleton: FC = () => {
  return (
    <div className="flex items-center gap-4 p-4 border border-transparent">
      <Skeleton className="w-16 h-20 shrink-0" />
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default PoliticianCardSkeleton;
