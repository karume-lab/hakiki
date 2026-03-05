"use client";

import { orpc } from "@repo/api/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

export const usePoliticians = () => {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [activeRole, setActiveRole] = useQueryState("role", parseAsString.withDefault("All"));
  const [county, setCounty] = useQueryState("county", parseAsString.withDefault("All"));
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault("name-asc"));

  // Fetch filter options dynamically
  const { data: filterOptions } = useQuery(orpc.politician.getFilters.queryOptions());

  // Main infinite query for politicians
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery(
      orpc.politician.list.infiniteOptions({
        input: (cursor: string | null | undefined) => ({
          search: search || undefined,
          role: activeRole !== "All" ? activeRole : undefined,
          county: county !== "All" ? county : undefined,
          // sort: sort, // if implemented in API
          cursor,
          limit: 20,
        }),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: null,
      }),
    );

  const politicians = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const onSearchChange = (value: string) => setSearch(value);
  const onSearchClear = () => setSearch(null);
  const onRoleChange = (value: string) => setActiveRole(value);
  const onCountyChange = (value: string | null) => setCounty(value);
  const onSortChange = (value: string | null) => setSort(value);

  const onClearFilters = () => {
    setSearch(null);
    setActiveRole(null);
    setCounty(null);
    setSort(null);
  };

  return {
    // state
    search,
    activeRole,
    county,
    sort,
    filterOptions,
    // data
    politicians,
    isLoading,
    isError,
    // infinite scroll
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    // handlers
    onSearchChange,
    onSearchClear,
    onRoleChange,
    onCountyChange,
    onSortChange,
    onClearFilters,
    refetch,
  };
};
