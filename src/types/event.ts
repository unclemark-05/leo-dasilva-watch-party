export type EventType = "in_person" | "online" | "hybrid";
export type EventStatus = "upcoming" | "live" | "completed" | "cancelled";

export interface WatchPartyEvent {
  id: string;
  title: string;
  description: string | null;
  edition_number: number | null;
  match_fixture: string;
  match_date: string;
  event_type: EventType;
  location_name: string;
  location_address: string;
  online_link: string | null;
  max_capacity: number | null;
  image_url: string | null;
  created_by: string | null;
  is_featured: boolean;
  status: EventStatus;
  created_at: string;
  updated_at: string;
  rsvp_count?: number;
}
