import { NextResponse } from "next/server";

const API_BASE = "https://api.football-data.org/v4";
const ARSENAL_TEAM_ID = 57;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "upcoming";

  let endpoint = "";

  switch (type) {
    case "live":
      endpoint = `/teams/${ARSENAL_TEAM_ID}/matches?status=LIVE`;
      break;
    case "upcoming":
      endpoint = `/teams/${ARSENAL_TEAM_ID}/matches?status=SCHEDULED&limit=10`;
      break;
    case "results":
      endpoint = `/teams/${ARSENAL_TEAM_ID}/matches?status=FINISHED&limit=5`;
      break;
    default:
      endpoint = `/teams/${ARSENAL_TEAM_ID}/matches?status=SCHEDULED&limit=10`;
  }

  const apiKey = process.env.FOOTBALL_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Football API key not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { "X-Auth-Token": apiKey },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch scores" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
