export type ContentBlock =
  | { type: "p"; html: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string; attribution?: string }
  | { type: "callout"; variant: "info" | "tip" | "warning"; title: string; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "pullquote"; text: string }
  | { type: "image"; src: string | null; alt: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "divider" };

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
}

export interface ArticleData {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string | null;
  };
  coverImage: string | null;
  blocks: ContentBlock[];
  takeaways: string[];
  relatedArticles: RelatedArticle[];
}
