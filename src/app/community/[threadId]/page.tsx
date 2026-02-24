import { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thread Discussion",
};

// Placeholder
const THREAD = {
  id: "1",
  title: "MATCHDAY THREAD: Arsenal vs Chelsea — Predictions?",
  body: "Big game coming up this weekend at the Emirates. Chelsea have been in decent form but we've been unbeatable at home.\n\nWhat's your predicted score? I'm going 3-1 Arsenal. Saka brace and Havertz to score against his old club.\n\nCOYG!",
  category: "match_day",
  author: "gooner_lagos",
  authorAvatar: null,
  createdAt: "2 hours ago",
};

const REPLIES = [
  { id: "r1", author: "vi_gooner", body: "2-0 Arsenal. Clean sheet incoming. Saliba masterclass.", createdAt: "1h ago" },
  { id: "r2", author: "tactical_gooner", body: "I think 2-1. They'll nick one but we control the game. Odegaard MOTM.", createdAt: "45m ago" },
  { id: "r3", author: "lekki_fan", body: "4-0. We're cooking this season and Chelsea are frauds. No mercy at the Emirates!", createdAt: "30m ago" },
  { id: "r4", author: "victoria_gunner", body: "Anyone going to the watch party for this? Edition 7 at The Condo!", createdAt: "15m ago" },
];

export default function ThreadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-white/30 font-sans normal-case">
        <Link href="/community" className="hover:text-white transition-colors">
          Community
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/50 truncate">Thread</span>
      </div>

      {/* Thread */}
      <Card hover={false}>
        <Badge variant="category" className="mb-3">Match Day</Badge>
        <h1 className="text-2xl font-bold text-white font-heading">
          {THREAD.title}
        </h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-white/40 font-sans normal-case">
          <div className="h-6 w-6 rounded-full bg-arsenal-red/30 flex items-center justify-center text-xs text-white font-bold">
            {THREAD.author[0].toUpperCase()}
          </div>
          <span>{THREAD.author}</span>
          <span>&middot;</span>
          <span>{THREAD.createdAt}</span>
        </div>
        <div className="mt-4 text-white/70 leading-relaxed whitespace-pre-line font-sans normal-case">
          {THREAD.body}
        </div>
      </Card>

      {/* Replies */}
      <div className="mt-6">
        <h2 className="text-lg font-bold text-white font-heading mb-4">
          {REPLIES.length} Replies
        </h2>
        <div className="space-y-3">
          {REPLIES.map((reply) => (
            <Card key={reply.id} hover={false} className="!p-4">
              <div className="flex items-center gap-2 text-sm text-white/40 font-sans normal-case mb-2">
                <div className="h-6 w-6 rounded-full bg-arsenal-navy/50 flex items-center justify-center text-xs text-white font-bold">
                  {reply.author[0].toUpperCase()}
                </div>
                <span className="font-medium text-white/60">{reply.author}</span>
                <span>&middot;</span>
                <span>{reply.createdAt}</span>
              </div>
              <p className="text-sm text-white/70 font-sans normal-case">
                {reply.body}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Reply form */}
      <Card hover={false} className="mt-6">
        <h3 className="text-sm font-semibold text-white font-sans normal-case mb-3">
          Add your reply
        </h3>
        <textarea
          placeholder="What do you think? COYG!"
          className="w-full h-24 rounded-lg border border-white/10 bg-bg-dark px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-arsenal-red/50 resize-none font-sans"
        />
        <div className="mt-3 flex justify-end">
          <Button size="sm">Post Reply</Button>
        </div>
        <p className="mt-2 text-xs text-white/30 font-sans normal-case">
          Sign in to reply
        </p>
      </Card>
    </div>
  );
}
