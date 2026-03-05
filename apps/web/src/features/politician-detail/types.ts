export type Party = {
  id: string;
  name: string;
  abbreviation?: string | null;
  logoUrl?: string | null;
};

export type Constituency = {
  id: string;
  name: string;
  county: string;
};

export type TermHistory = {
  parliament: string;
  from: string;
  to: string | null;
};

export type Socials = {
  twitter?: string;
  facebook?: string;
};

export type Politician = {
  id: string;
  fullName: string;
  slug: string;
  position: string;
  gender?: string | null;
  email?: string | null;
  phone?: string | null;
  image?: string | null;
  bio?: string | null;
  socials?: string | null;
  termHistory?: string | null;
  party?: Party | null;
  constituency?: Constituency | null;
};

export type IncomeExpenditureEntry = {
  period: string;
  income: number;
  expenditure: number;
};

export type SpendingBreakdownEntry = {
  name: string;
  value: number;
  color: string;
};
