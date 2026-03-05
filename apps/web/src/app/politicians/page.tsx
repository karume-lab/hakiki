"use client";

import { Button } from "@repo/ui/web/components/ui/button";
import { Input } from "@repo/ui/web/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/web/components/ui/select";
import { cn } from "@repo/ui/web/lib/utils";
import { Search, SlidersHorizontal, Users, X } from "lucide-react";
import { Suspense } from "react";
import PoliticianListingLayout from "@/features/politician-listing/components/politician-listing-layout";
import { SORT_OPTIONS } from "@/features/politician-listing/data";
import { usePoliticians } from "@/features/politician-listing/hooks/usePoliticians";

const PoliticiansContent = () => {
  const {
    politicians,
    search,
    onSearchChange,
    onSearchClear,
    activeRole,
    onRoleChange,
    county,
    onCountyChange,
    sort,
    onSortChange,
    onClearFilters,
    filterOptions,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = usePoliticians();

  const roles = filterOptions?.roles || [];
  const counties = filterOptions?.counties || [];

  return (
    <div className="">
      {/* ── Page header ── */}
      <div className="sticky top-0 z-30 bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
            13th Parliament &#183; Kenya
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-1">Politicians Directory</h1>
          <p className="text-sm text-muted-foreground">
            Browse, search and filter elected and nominated representatives.
          </p>
        </div>
        <div className="border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                type="text"
                placeholder="Search by name, county, constituency…"
                className="pl-9 pr-9 rounded-none h-10 text-sm focus-visible:ring-0 bg-background"
              />
              {search && (
                <Button
                  variant={"ghost"}
                  onClick={onSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            {/* County Filter */}
            <div className="flex items-center gap-2 text-sm shrink-0">
              <Select value={county} onValueChange={onCountyChange}>
                <SelectTrigger className="py-5 w-40 rounded-none border-border bg-background text-foreground text-sm focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="County" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-border">
                  <SelectItem value="All" className="rounded-none text-sm cursor-pointer">
                    All Counties
                  </SelectItem>
                  {counties.sort().map((c: string) => (
                    <SelectItem key={c} value={c} className="rounded-none text-sm cursor-pointer">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-sm shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <Select value={sort || "name-asc"} onValueChange={onSortChange}>
                <SelectTrigger className="py-5 w-32 rounded-none border-border bg-background text-foreground text-sm focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Sort by…" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-border">
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem
                      key={o.value}
                      value={o.value}
                      className="rounded-none text-sm cursor-pointer"
                    >
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Result count */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0 sm:ml-auto">
              <Users className="w-4 h-4" />
              <span>
                {politicians.length} record{politicians.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Role filter pills */}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex gap-1 flex-wrap">
            <Button
              size="sm"
              onClick={() => onRoleChange("All")}
              className={cn(
                "px-3 rounded-none py-1 text-xs font-medium uppercase tracking-wide border transition-colors duration-150",
                activeRole === "All"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:bg-secondary hover:text-secondary-foreground",
              )}
            >
              All Roles
            </Button>
            {roles.sort().map((role: string) => {
              const isActive = activeRole === role;
              return (
                <Button
                  key={role}
                  size="sm"
                  onClick={() => onRoleChange(role)}
                  className={cn(
                    "px-3 rounded-none py-1 text-xs font-medium uppercase tracking-wide border transition-colors duration-150",
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:bg-secondary hover:text-secondary-foreground",
                  )}
                >
                  {role}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <PoliticianListingLayout
        politicians={politicians}
        onClearFilters={onClearFilters}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default function Politicians() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading politicians...</div>}>
      <PoliticiansContent />
    </Suspense>
  );
}
