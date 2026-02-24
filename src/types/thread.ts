export type ThreadCategory =
  | "match_day"
  | "transfer_talk"
  | "general"
  | "watch_party"
  | "tactics";

export interface Thread {
  id: string;
  title: string;
  body: string;
  category: ThreadCategory;
  author_id: string | null;
  is_pinned: boolean;
  reply_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

export interface Reply {
  id: string;
  thread_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
  updated_at: string;
  author?: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}
