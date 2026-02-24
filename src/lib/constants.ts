// ============================================
// White-label team config — swap this for other clubs
// ============================================
export const TEAM_CONFIG = {
  name: "Arsenal",
  shortName: "ARS",
  footballDataId: 57,
  colors: {
    primary: "#EF0107",
    primaryDark: "#B8000A",
    secondary: "#023474",
    secondaryDark: "#011B3D",
    accent: "#9C824A",
    white: "#FFFFFF",
  },
  crest: "/images/arsenal-crest.svg",
} as const;

// ============================================
// Host config — Leo DaSilva
// ============================================
export const HOST = {
  name: "Leo DaSilva",
  fullName: "Leo Babarinde Akinola DaSilva",
  tagline: "Entrepreneur. Arsenal Fan. Community Builder.",
  shortBio:
    "Nigerian entrepreneur, BBNaija alum, and one of the most passionate Arsenal fans in Lagos. Hosting free watch parties since 2023.",
  avatar: "/images/leo-avatar.webp",
  socials: {
    instagram: "https://instagram.com/sirleobdasilva",
    twitter: "https://x.com/SirLeoBDasilva",
    tiktok: "https://tiktok.com/@leobdasilva",
    website: "https://leobdasilva.com",
  },
} as const;

// ============================================
// Site metadata
// ============================================
export const SITE = {
  name: "Leo DaSilva Watch Party",
  shortName: "LDWP",
  tagline: "Lagos' biggest Arsenal fan community",
  description:
    "Join Leo DaSilva's free Arsenal watch parties in Lagos. RSVP to events at The Condo Event Center, get live scores, and connect with fellow Gooners.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ldwp.vercel.app",
  ogImage: "/images/og-default.png",
} as const;

// ============================================
// Default venue
// ============================================
export const DEFAULT_VENUE = {
  name: "The Condo Event Center",
  address: "1 Kofo Abayomi Street, Victoria Island, Lagos",
  capacity: 800,
  mapUrl:
    "https://maps.google.com/?q=The+Condo+Event+Center+Victoria+Island+Lagos",
  parking: "Free parking at Kofo Abayomi Street entrance",
} as const;

// ============================================
// Past editions — seed data for the gallery
// ============================================
export const PAST_EDITIONS = [
  {
    edition: 1,
    date: "2023-05-28",
    title: "Arsenal End of Season Watch Party",
    venue: "256 Etim Inyang Cres, Lagos",
  },
  {
    edition: 2,
    date: "2023-09-01",
    title: "Leo DaSilva Watch Party 2",
    venue: "Lagos",
  },
  {
    edition: 3,
    date: "2023-12-17",
    title: "Arsenal vs Brighton + Man Utd vs Liverpool",
    venue: "The Condo Event Center, VI",
  },
  {
    edition: 4,
    date: "2024-05-19",
    title: "Title Race Showdown + Road to Europe",
    venue: "The Condo Event Center, VI",
  },
  {
    edition: 5,
    date: "2024-10-27",
    title: "Title Challenge + Road to Europe",
    venue: "The Condo Event Center, VI",
    sponsor: "Budweiser",
  },
  {
    edition: 6,
    date: "2025-05-25",
    title: "End of Season Watch Party",
    venue: "The Condo Event Center, VI",
  },
] as const;

// ============================================
// Navigation links
// ============================================
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Fixtures", href: "/fixtures" },
  { label: "Community", href: "/community" },
  { label: "Articles", href: "/articles" },
] as const;
