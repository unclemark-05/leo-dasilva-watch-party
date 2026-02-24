import { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { TEAM_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Arsenal Fixtures & Live Scores",
  description: "Follow Arsenal's upcoming fixtures, live scores, and recent results.",
};

// Placeholder data — in production, fetched from football-data.org API
const UPCOMING = [
  { id: 1, home: "Arsenal", away: "Chelsea", date: "Mar 8, 2026 · 3:00 PM", competition: "Premier League", venue: "Emirates Stadium" },
  { id: 2, home: "Wolves", away: "Arsenal", date: "Mar 15, 2026 · 3:00 PM", competition: "Premier League", venue: "Molineux Stadium" },
  { id: 3, home: "Arsenal", away: "Man City", date: "Mar 22, 2026 · 5:30 PM", competition: "Premier League", venue: "Emirates Stadium" },
  { id: 4, home: "Arsenal", away: "Bayern Munich", date: "Apr 1, 2026 · 8:00 PM", competition: "Champions League", venue: "Emirates Stadium" },
  { id: 5, home: "Liverpool", away: "Arsenal", date: "Apr 5, 2026 · 4:30 PM", competition: "Premier League", venue: "Anfield" },
];

const RESULTS = [
  { id: 6, home: "Arsenal", away: "Newcastle", homeScore: 3, awayScore: 1, date: "Mar 1, 2026", competition: "Premier League" },
  { id: 7, home: "Everton", away: "Arsenal", homeScore: 0, awayScore: 2, date: "Feb 22, 2026", competition: "Premier League" },
  { id: 8, home: "Arsenal", away: "West Ham", homeScore: 4, awayScore: 0, date: "Feb 15, 2026", competition: "Premier League" },
  { id: 9, home: "Aston Villa", away: "Arsenal", homeScore: 1, awayScore: 1, date: "Feb 8, 2026", competition: "Premier League" },
  { id: 10, home: "Arsenal", away: "Bournemouth", homeScore: 2, awayScore: 1, date: "Feb 1, 2026", competition: "FA Cup" },
];

function isArsenal(name: string) {
  return name === TEAM_CONFIG.name;
}

export default function FixturesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-white font-heading">
        Fixtures &amp; Scores
      </h1>
      <p className="mt-2 text-white/40 font-sans normal-case">
        {TEAM_CONFIG.name} matches — live scores, upcoming fixtures, and recent results.
      </p>

      {/* Upcoming */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white font-heading mb-4">
          Upcoming
        </h2>
        <div className="space-y-3">
          {UPCOMING.map((match) => (
            <Card key={match.id} className="!p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="category">{match.competition}</Badge>
                  </div>
                  <p className="text-base font-semibold text-white font-sans normal-case">
                    <span className={isArsenal(match.home) ? "text-arsenal-red" : ""}>
                      {match.home}
                    </span>
                    <span className="text-white/30 mx-2">vs</span>
                    <span className={isArsenal(match.away) ? "text-arsenal-red" : ""}>
                      {match.away}
                    </span>
                  </p>
                  <p className="text-xs text-white/40 mt-1 font-sans normal-case">
                    {match.venue}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-white/60 font-sans normal-case">
                    {match.date}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white font-heading mb-4">
          Recent Results
        </h2>
        <div className="space-y-3">
          {RESULTS.map((match) => {
            const arsenalWon = isArsenal(match.home)
              ? match.homeScore > match.awayScore
              : match.awayScore > match.homeScore;
            const draw = match.homeScore === match.awayScore;

            return (
              <Card key={match.id} className="!p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="category">{match.competition}</Badge>
                      <Badge
                        variant={arsenalWon ? "live" : draw ? "completed" : "cancelled"}
                        className="!animate-none"
                      >
                        {arsenalWon ? "W" : draw ? "D" : "L"}
                      </Badge>
                    </div>
                    <p className="text-base font-semibold text-white font-sans normal-case">
                      <span className={isArsenal(match.home) ? "text-arsenal-red" : ""}>
                        {match.home}
                      </span>
                      <span className="text-white/60 mx-2 font-bold">
                        {match.homeScore} - {match.awayScore}
                      </span>
                      <span className={isArsenal(match.away) ? "text-arsenal-red" : ""}>
                        {match.away}
                      </span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-white/40 font-sans normal-case">
                      {match.date}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
