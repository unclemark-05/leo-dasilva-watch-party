export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
}

export interface Score {
  home: number | null;
  away: number | null;
}

export interface Fixture {
  id: number;
  competition: {
    name: string;
    emblem: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  utcDate: string;
  status: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "CANCELLED";
  matchday: number;
  score: {
    fullTime: Score;
    halfTime: Score;
  };
  minute?: number;
}

export interface FixturesResponse {
  matches: Fixture[];
  resultSet: {
    count: number;
  };
}
