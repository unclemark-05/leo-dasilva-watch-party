import { TEAM_CONFIG } from "./constants";
import type { FixturesResponse } from "@/types/fixture";

const API_BASE = "https://api.football-data.org/v4";
const TEAM_ID = TEAM_CONFIG.footballDataId;

async function fetchFromApi(endpoint: string): Promise<FixturesResponse> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Football API error: ${res.status}`);
  }

  return res.json();
}

export async function getLiveMatches() {
  return fetchFromApi(`/teams/${TEAM_ID}/matches?status=LIVE`);
}

export async function getUpcomingFixtures(limit = 10) {
  return fetchFromApi(
    `/teams/${TEAM_ID}/matches?status=SCHEDULED&limit=${limit}`
  );
}

export async function getRecentResults(limit = 5) {
  return fetchFromApi(
    `/teams/${TEAM_ID}/matches?status=FINISHED&limit=${limit}`
  );
}
