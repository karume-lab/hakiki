import MemberImg from "public/member.jpg";
import type {
  IncomeExpenditureEntry,
  Politician,
  SpendingBreakdownEntry,
} from "@/features/politician-detail/types";

export const MOCK_POLITICIAN: Politician = {
  id: "1",
  fullName: "Samson Ndindi Nyoro",
  slug: "samson-ndindi-nyoro",
  position: "MNA",
  gender: "Male",
  email: "ndindi.nyoro@parliament.go.ke",
  phone: "+254 700 000 000",
  image: MemberImg.src,
  bio: "Hon. Ndindi Nyoro is the Member of National Assembly for Kiharu Constituency. He serves on the Finance and National Planning Committee and is known for his vocal contributions on economic policy and public debt management.",
  socials: JSON.stringify({ twitter: "NdindiNyoro", facebook: "NdindiNyoro" }),
  termHistory: JSON.stringify([
    { parliament: "12th Parliament", from: "2017-09-12", to: "2022-08-08" },
    { parliament: "13th Parliament", from: "2022-09-08", to: null },
  ]),
  party: {
    id: "1",
    name: "United Democratic Alliance",
    abbreviation: "UDA",
    logoUrl: null,
  },
  constituency: { id: "1", name: "Kiharu", county: "Murang'a" },
};

export const INCOME_EXPENDITURE: IncomeExpenditureEntry[] = [
  { period: "Q1 2022", income: 4200000, expenditure: 3800000 },
  { period: "Q2 2022", income: 6100000, expenditure: 7200000 },
  { period: "Q3 2022", income: 9800000, expenditure: 8900000 },
  { period: "Q4 2022", income: 3100000, expenditure: 2700000 },
];

export const SPENDING_BREAKDOWN: SpendingBreakdownEntry[] = [
  { name: "Media & Ads", value: 38, color: "#006600" },
  { name: "Public Rallies", value: 27, color: "#BB0000" },
  { name: "Logistics", value: 18, color: "#4a4a4a" },
  { name: "Staff", value: 11, color: "#888888" },
  { name: "Other", value: 6, color: "#bbbbbb" },
];
