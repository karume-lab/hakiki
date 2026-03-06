import {
  INCOME_EXPENDITURE,
  MOCK_POLITICIAN,
  SPENDING_BREAKDOWN,
} from "@/features/politician-detail/data";

export function usePolitician(_slug: string) {
  const politician = MOCK_POLITICIAN;
  const termHistory = politician.termHistory ? JSON.parse(politician.termHistory) : [];
  const socials = politician.socials ? JSON.parse(politician.socials) : {};

  return {
    politician,
    termHistory,
    socials,
    incomeExpenditure: INCOME_EXPENDITURE,
    spendingBreakdown: SPENDING_BREAKDOWN,
    isLoading: false,
  };
}
