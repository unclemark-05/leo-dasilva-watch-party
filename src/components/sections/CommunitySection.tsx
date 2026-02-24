import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { MessageSquare } from "lucide-react";

// Placeholder — in production from Supabase
const SAMPLE_THREADS = [
  {
    id: "1",
    title: "Predictions for Arsenal vs Chelsea?",
    category: "match_day",
    author: "gooner_lagos",
    replyCount: 42,
    timeAgo: "2h ago",
  },
  {
    id: "2",
    title: "Watch Party 6 was amazing! Photos thread",
    category: "watch_party",
    author: "victoria_gunner",
    replyCount: 28,
    timeAgo: "1d ago",
  },
  {
    id: "3",
    title: "Do we need a DM or is Partey enough?",
    category: "transfer_talk",
    author: "arsenalytic",
    replyCount: 67,
    timeAgo: "3d ago",
  },
];

const categoryLabels: Record<string, string> = {
  match_day: "Match Day",
  transfer_talk: "Transfers",
  general: "General",
  watch_party: "Watch Party",
  tactics: "Tactics",
};

export default function CommunitySection() {
  return (
    <section className="py-20 px-4 bg-bg-surface">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white font-heading">
              Community Talk
            </h2>
            <p className="mt-1 text-white/40 text-sm font-sans normal-case">
              Join the conversation with fellow Gooners
            </p>
          </div>
          <Link
            href="/community"
            className="hidden sm:block text-sm text-arsenal-red hover:text-arsenal-red-dark transition-colors font-sans normal-case"
          >
            Join discussion &rarr;
          </Link>
        </div>

        <div className="space-y-3">
          {SAMPLE_THREADS.map((thread) => (
            <Link key={thread.id} href={`/community/${thread.id}`}>
              <Card className="flex items-center justify-between gap-4 !p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="category">
                      {categoryLabels[thread.category] || thread.category}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-white truncate font-sans normal-case">
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

        <Link
          href="/community"
          className="sm:hidden block mt-6 text-center text-sm text-arsenal-red hover:text-arsenal-red-dark transition-colors font-sans normal-case"
        >
          Join discussion &rarr;
        </Link>
      </div>
    </section>
  );
}
