import MemberImg from "public/member-removebg-preview.png";

export type Role = "MNA" | "Woman Rep" | "Nominated" | "Governor" | "Senator";
export type Member = {
  id: number;
  name: string;
  constituency: string;
  county?: string;
  role: Role;
  imageUrl: string;
};

export const ROLE_FILTERS: { label: string; value: Role | "All" }[] = [
  { label: "All", value: "All" },
  { label: "MNA", value: "MNA" },
  { label: "Governor", value: "Governor" },
  { label: "Senator", value: "Senator" },
  { label: "Woman Rep", value: "Woman Rep" },
  { label: "Nominated", value: "Nominated" },
];

export const SORT_OPTIONS = [
  { label: "Name (A–Z)", value: "name-asc" },
  { label: "Name (Z–A)", value: "name-desc" },
  { label: "Constituency", value: "constituency" },
  { label: "County", value: "county" },
];

export const ALL_MEMBERS: Member[] = [
  {
    id: 1,
    name: "Abdi Ali",
    constituency: "Ijara",
    county: "Garissa",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 2,
    name: "Abdi Khamis Chome",
    constituency: "Voi",
    county: "Taita",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 3,
    name: "Abdi Omar Shurie",
    constituency: "Balambala",
    county: "Garissa",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 4,
    name: "Abdikadir Hussein",
    constituency: "Lagdera",
    county: "Garissa",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 5,
    name: "Abdirahman Hussein Weytan",
    constituency: "Mandera East",
    county: "Mandera",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 6,
    name: "Abdirahman Mohamed Abdi",
    constituency: "Lafey",
    county: "Mandera",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 7,
    name: "Abdul Rahim Dawood",
    constituency: "North Imenti",
    county: "Meru",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 8,
    name: "Abubakar Talib Ahmed",
    constituency: "Nationwide",
    county: "—",
    role: "Nominated",
    imageUrl: MemberImg.src,
  },
  {
    id: 9,
    name: "Abuor Paul",
    constituency: "Rongo",
    county: "Migori",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 10,
    name: "Adagala Beatrice Kahai",
    constituency: "Vihiga",
    county: "Vihiga",
    role: "Woman Rep",
    imageUrl: MemberImg.src,
  },
  {
    id: 11,
    name: "Adan Haji Yussuf",
    constituency: "Mandera West",
    county: "Mandera",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 12,
    name: "Adhe Ali Wario Guyo",
    constituency: "North Horr",
    county: "Marsabit",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 13,
    name: "Agnes Ng'aru Murgor",
    constituency: "Nairobi West",
    county: "Nairobi",
    role: "Woman Rep",
    imageUrl: MemberImg.src,
  },
  {
    id: 14,
    name: "Ahmed Kolosh",
    constituency: "Wajir East",
    county: "Wajir",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 15,
    name: "Alice Ng'ang'a",
    constituency: "Kiambu",
    county: "Kiambu",
    role: "Woman Rep",
    imageUrl: MemberImg.src,
  },
  {
    id: 16,
    name: "Amos Kimunya",
    constituency: "Kipipiri",
    county: "Nyandarua",
    role: "MNA",
    imageUrl: MemberImg.src,
  },
  {
    id: 17,
    name: "Anne Waiguru",
    constituency: "Kirinyaga",
    county: "Kirinyaga",
    role: "Governor",
    imageUrl: MemberImg.src,
  },
  {
    id: 18,
    name: "Abdulswamad Nassir",
    constituency: "Mombasa",
    county: "Mombasa",
    role: "Governor",
    imageUrl: MemberImg.src,
  },
  {
    id: 19,
    name: "Gladys Wanga",
    constituency: "Homabay",
    county: "Homabay",
    role: "Governor",
    imageUrl: MemberImg.src,
  },
  {
    id: 20,
    name: "Susan Kihika",
    constituency: "Nakuru",
    county: "Nakuru",
    role: "Governor",
    imageUrl: MemberImg.src,
  },
  {
    id: 21,
    name: "Aaron Cheruiyot",
    constituency: "Kericho",
    county: "Kericho",
    role: "Senator",
    imageUrl: MemberImg.src,
  },
  {
    id: 22,
    name: "Abshiro Halake",
    constituency: "Isiolo",
    county: "Isiolo",
    role: "Senator",
    imageUrl: MemberImg.src,
  },
  {
    id: 23,
    name: "Beatrice Ogola",
    constituency: "Homabay",
    county: "Homabay",
    role: "Senator",
    imageUrl: MemberImg.src,
  },
  {
    id: 24,
    name: "Enoch Wambua",
    constituency: "Kitui",
    county: "Kitui",
    role: "Senator",
    imageUrl: MemberImg.src,
  },
];
