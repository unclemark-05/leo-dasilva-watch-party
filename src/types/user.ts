export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  favorite_player: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}
