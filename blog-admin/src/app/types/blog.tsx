export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTime: string;
  views: number;
  status: "draft" | "published";
}