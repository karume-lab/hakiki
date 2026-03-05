import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import type { Role, SortOption } from "../data";
import { ALL_MEMBERS } from "../data";


export const useMembers = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  const [activeRole, setActiveRole] = useQueryState(
    "role",
    parseAsString.withDefault("All").withOptions({ clearOnDefault: true }),
  );

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("name-asc").withOptions({ clearOnDefault: true }),
  );

  const members = useMemo(() => {
    let result = [...ALL_MEMBERS];

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.county?.toLowerCase().includes(q) ||
          m.constituency?.toLowerCase().includes(q),
      );
    }

    // Filter by role
    if (activeRole !== "All") {
      result = result.filter((m) => m.role === activeRole);
    }

    // Sort
    switch (sort as SortOption) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "county-asc":
        result.sort((a, b) => (a.county ?? "").localeCompare(b.county ?? ""));
        break;
    }

    return result;
  }, [search, activeRole, sort]);

  const onSearchChange = (value: string) => setSearch(value);
  const onSearchClear = () => setSearch(null);
  const onRoleChange = (value: Role | "All") => setActiveRole(value);
  const onSortChange = (value: SortOption) => setSort(value);
  const onClearFilters = () => {
    setSearch(null);
    setActiveRole(null);
    setSort(null);
  };

  return {
    // state
    search,
    activeRole,
    sort,
    // derived
    members,
    // handlers
    onSearchChange,
    onSearchClear,
    onRoleChange,
    onSortChange,
    onClearFilters,
  };
};
