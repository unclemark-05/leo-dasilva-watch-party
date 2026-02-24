export type ArticleCategory = "preview" | "recap" | "opinion" | "news";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  author_id: string | null;
  category: ArticleCategory;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}
