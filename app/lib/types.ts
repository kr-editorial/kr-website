export type Author = {
  slug: string;
  name: string;
  aliases: string[];
  roles: string[];
  location?: string;
  born?: {
    date?: string;
    year?: number;
    place?: string;
  };
  family?: {
    spouse?: string;
    children?: string[];
    marriedYears?: number;
  };
  works?: string[];
  bio: string[];
};

export type BookFormat = "livro" | "ebook";

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  authorBio?: string;
  cover: string;
  format: BookFormat;
  categories: string[];
  badge?: "lançamento" | "novo";
  excerpt: string;
  description: string;
  isbn?: string;
  pages?: number;
  year?: number;
  featured?: boolean;
  relatedSlugs?: string[];
};

export type Service = {
  slug: string;
  title: string;
  pill: string;
  description: string;
  items: string[];
  icon: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Founder = {
  name: string;
  role?: string;
};

export type AboutContent = {
  intro: string;
  rodrigo: string[];
  karine: string[];
  union: string;
  fruit: string;
  together: string;
  mission: string;
  belief: string;
  commitment: string;
  tagline: string;
};

export type SiteContent = {
  name: string;
  tagline: string;
  url: string;
  founders: Founder[];
  about: AboutContent;
  mission: string;
  heroHeadline: string;
  heroCta: string;
  valueProps: string[];
  audiences: string[];
  processSteps: ProcessStep[];
  contact: {
    email: string;
    phone: string;
    city: string;
    instagram?: string;
    whatsapp?: string;
  };
};
