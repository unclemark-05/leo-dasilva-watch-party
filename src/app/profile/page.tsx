import { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Calendar, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile",
};

// Placeholder user
const USER = {
  username: "gooner_lagos",
  displayName: "Chidi Okonkwo",
  bio: "Arsenal till I die. Lagos Gooner since 2004.",
  favoritePlayer: "Bukayo Saka",
  rsvps: [
    { id: "1", title: "Arsenal vs Chelsea — Edition 7", date: "Mar 8, 2026", status: "going" },
    { id: "2", title: "Arsenal vs Man City — Edition 8", date: "Mar 22, 2026", status: "maybe" },
  ],
  threads: [
    { id: "1", title: "Predictions for Arsenal vs Chelsea?", replyCount: 42, timeAgo: "2h ago" },
  ],
};

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-arsenal-red to-arsenal-red-dark flex items-center justify-center text-3xl font-bold text-white font-heading">
          {USER.displayName[0]}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            {USER.displayName}
          </h1>
          <p className="text-sm text-white/40 font-sans normal-case">
            @{USER.username}
          </p>
          <p className="text-sm text-white/50 mt-1 font-sans normal-case">
            {USER.bio}
          </p>
          <p className="text-xs text-arsenal-gold mt-1 font-sans normal-case">
            Favorite player: {USER.favoritePlayer}
          </p>
        </div>
      </div>

      {/* Edit profile */}
      <Card hover={false} className="mb-8">
        <h2 className="text-lg font-bold text-white font-heading mb-4">
          Edit Profile
        </h2>
        <form className="space-y-4">
          <Input id="displayName" label="Display Name" defaultValue={USER.displayName} />
          <Input id="bio" label="Bio" defaultValue={USER.bio} />
          <Input id="favoritePlayer" label="Favorite Player" defaultValue={USER.favoritePlayer} />
          <Button size="sm">Save Changes</Button>
        </form>
      </Card>

      {/* My RSVPs */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white font-heading mb-4">
          My RSVPs
        </h2>
        <div className="space-y-3">
          {USER.rsvps.map((rsvp) => (
            <Card key={rsvp.id} className="!p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white font-sans normal-case truncate">
                  {rsvp.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/40 mt-1 font-sans normal-case">
                  <Calendar size={12} />
                  {rsvp.date}
                </div>
              </div>
              <Badge variant={rsvp.status === "going" ? "upcoming" : "completed"}>
                {rsvp.status}
              </Badge>
            </Card>
          ))}
        </div>
      </div>

      {/* My Threads */}
      <div>
        <h2 className="text-lg font-bold text-white font-heading mb-4">
          My Threads
        </h2>
        <div className="space-y-3">
          {USER.threads.map((thread) => (
            <Card key={thread.id} className="!p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white font-sans normal-case truncate">
                  {thread.title}
                </h3>
                <p className="text-xs text-white/30 mt-0.5 font-sans normal-case">
                  {thread.timeAgo}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-white/30 shrink-0">
                <MessageSquare size={14} />
                <span className="text-xs">{thread.replyCount}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
