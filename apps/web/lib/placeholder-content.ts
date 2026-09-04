export interface NavContent {
  brand: string;
  links: { label: string; href: string }[];
}

export const defaultNav: NavContent = {
  brand: "Nafiz Anam",
  links: [
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "How I Work", href: "/how-i-work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

export interface HeroContent {
  tags: string[];
  headlineLine1: string;
  headlineLine2Serif: string;
  headlineLine2Sans: string;
  index: string;
  name: string;
  pitch: string;
  ctaLabel: string;
  photoUrl: string | null;
  socials?: { label: string; href: string }[];
}

export const defaultHero: HeroContent = {
  tags: ["Technology Strategy", "Software Architecture", "Product Engineering"],
  headlineLine1: "Technology &",
  headlineLine2Serif: "Product",
  headlineLine2Sans: "Partner",
  index: "/01",
  name: "Nafiz Anam",
  pitch:
    "Bad software rarely starts with bad code. It starts with a decision nobody senior enough was in the room to make. I'm the person founders and growing businesses bring in before that happens, or to fix it after it already has.",
  ctaLabel: "Book a Free Call",
  photoUrl: "/Nafiz-Anam.jpg",
};

export interface PlaceholderProject {
  slug: string;
  title: string;
  summary: string;
  coverImageUrl: string | null;
  colSpan: number;
}

export const placeholderProjects: PlaceholderProject[] = [
  { slug: "project-one", title: "Project One", summary: "A short description of this project goes here.", coverImageUrl: null, colSpan: 3 },
  { slug: "project-two", title: "Project Two", summary: "A short description of this project goes here.", coverImageUrl: null, colSpan: 2 },
  { slug: "project-three", title: "Project Three", summary: "A short description of this project goes here.", coverImageUrl: null, colSpan: 2 },
  { slug: "project-four", title: "Project Four", summary: "A short description of this project goes here.", coverImageUrl: null, colSpan: 3 },
  { slug: "project-five", title: "Project Five", summary: "A short description of this project goes here.", coverImageUrl: null, colSpan: 3 },
  { slug: "project-six", title: "Project Six", summary: "A short description of this project goes here.", coverImageUrl: null, colSpan: 2 },
];

export interface PlaceholderStat {
  label: string;
  value: string;
}

export const placeholderStats: PlaceholderStat[] = [
  { value: "7+",   label: "Years Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "5",    label: "Countries Served" },
];

export const placeholderLogos: string[] = ["KANIN", "LOVEUM", "GOVEN", "RITE", "ZOU"];

export interface PlaceholderTestimonial {
  quote: string;
  name: string;
  role: string;
  photoUrl: string | null;
}

export const placeholderTestimonials: PlaceholderTestimonial[] = [
  {
    quote:
      "Attention to detail is exceptional. Crafted an interface that's both visually stunning and incredibly intuitive.",
    name: "Jane Doe",
    role: "Product Lead, Example Co.",
    photoUrl: null,
  },
  {
    quote: "Delivered beyond expectations — design and engineering merged seamlessly.",
    name: "John Smith",
    role: "Founder, Another Co.",
    photoUrl: null,
  },
  {
    quote:
      "A true partner in every sense — proactive, sharp, and relentless about getting the details right.",
    name: "Amara Chen",
    role: "Head of Product, Northwind",
    photoUrl: null,
  },
  {
    quote: "Turned a vague brief into a polished product in weeks. Communication was flawless throughout.",
    name: "Marcus Lee",
    role: "CEO, Fieldstone",
    photoUrl: null,
  },
];

export interface FooterContent {
  brand: string;
  email: string;
  whatsapp: string;
  location: string;
  locationUrl: string;
  socials: { label: string; href: string }[];
  pages: { label: string; href: string }[];
  photoUrl: string | null;
}

export const defaultFooter: FooterContent = {
  brand: "Nafiz Anam",
  email: "hi@nafizanam.com",
  whatsapp: "+880 1819-758093",
  location: "Khulna, Bangladesh",
  locationUrl: "https://maps.app.goo.gl/DXT66bC2RxYV9Mw77",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/anamnafiz" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kazinafizanam/" },
    { label: "GitHub", href: "https://github.com/Nafiz-Anam" },
  ],
  pages: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "How I Work", href: "/how-i-work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  photoUrl: "/Nafiz-Anam.jpg",
};
