import { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MessageSquare, Pin } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the discussion with Arsenal fans in Leo DaSilva's watch party community.",
};

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "match_day", label: "Match Day" },
  { key: "transfer_talk", label: "Transfer Talk" },
  { key: "general", label: "General" },
  { key: "watch_party", label: "Watch Party" },
  { key: "tactics", label: "Tactics" },
];

// Placeholder threads
const THREADS = [
  {
    id: "1",
    title: "MATCHDAY THREAD: Arsenal vs Chelsea — Predictions?",
    category: "match_day",
    author: "gooner_lagos",
    replyCount: 42,
    timeAgo: "2h ago",
    pinned: true,
  },
  {
    id: "2",
    title: "Watch Party 6 Recap — What a day!",
    category: "watch_party",
    author: "victoria_gunner",
    replyCount: 28,
    timeAgo: "1d ago",
    pinned: true,
  },
  {
    id: "3",
    title: "Do we need a new DM this summer?",
    category: "transfer_talk",
    author: "arsenalytic",
    replyCount: 67,
    timeAgo: "3d ago",
    pinned: false,
  },
  {
    id: "4",
    title: "Arteta's 3-2-5 build-up explained",
    category: "tactics",
    author: "tactical_gooner",
    replyCount: 23,
    timeAgo: "5d ago",
    pinned: false,
  },
  {
    id: "5",
    title: "Best spots to watch Arsenal in Lekki?",
    category: "general",
    author: "lekki_fan",
    replyCount: 15,
    timeAgo: "1w ago",
    pinned: false,
  },
  {
    id: "6",
    title: "Who else is coming to Edition 7?",
    category: "watch_party",
    author: "vi_gooner",
    replyCount: 31,
    timeAgo: "2d ago",
    pinned: false,
  },
];

const categoryLabels: Record<string, string> = {
  match_day: "Match Day",
  transfer_talk: "Transfers",
  general: "General",
  watch_party: "Watch Party",
  tactics: "Tactics",
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-bold text-white font-heading">
            Community
          </h1>
          <p className="mt-2 text-white/40 font-sans normal-case">
            Discuss matches, transfers, tactics, and watch parties with fellow Gooners.
          </p>
        </div>
        <Link href="/auth/login">
          <Button>New Thread</Button>
        </Link>
      </div>

      {/* Category tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer first:bg-arsenal-red/20 first:text-arsenal-red"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="mt-6 space-y-3">
        {THREADS.map((thread) => (
          <Link key={thread.id} href={`/community/${thread.id}`}>
            <Card className="flex items-center justify-between gap-4 !p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {thread.pinned && (
                    <Pin size={12} className="text-arsenal-gold" />
                  )}
                  <Badge variant="category">
                    {categoryLabels[thread.category] || thread.category}
                  </Badge>
                </div>
                <h3 className="text-sm font-semibold text-white font-sans normal-case truncate">
                  {thread.title}
                </h3>
                <p className="text-xs text-white/30 mt-0.5 font-sans normal-case">
                  by {thread.author} &middot; {thread.timeAgo}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-white/30 shrink-0">
                <MessageSquare size={14} />
                <span className="text-xs font-sans">{thread.replyCount}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
