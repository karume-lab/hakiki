import { ALL_MEMBERS } from "../data";

export const useMembers = () => {
  return {
    search: "",
    members: ALL_MEMBERS,
    onSearchChange: () => {},
    onSearchClear: () => {},
    activeRole: "All",
    onRoleChange: () => {},
    sort: undefined,
    onSortChange: () => {},
    onClearFilters: () => {},
  };
};
