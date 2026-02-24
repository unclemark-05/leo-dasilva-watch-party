"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { X, Calendar, Users, MapPin, ArrowLeft, Trophy, Newspaper, MessageSquare, Ticket, User } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { HOST, SITE, DEFAULT_VENUE, PAST_EDITIONS } from "@/lib/constants";
import type { HotspotName } from "@/components/3d/StadiumModel";

const StadiumScene = dynamic(() => import("@/components/3d/StadiumScene"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-[#050510] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-arsenal-red border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-white/40 text-sm font-sans">Loading stadium...</p>
      </div>
    </div>
  ),
});

// Content panels for each hotspot
function BallPanel() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-arsenal-red" size={20} />
        <h3 className="text-lg font-bold text-white font-heading">Next Match</h3>
      </div>
      <div className="text-center py-4">
        <Badge variant="category" className="mb-3">Premier League</Badge>
        <h2 className="text-3xl font-bold text-white font-heading">Arsenal vs Chelsea</h2>
        <p className="mt-2 text-white/50 font-sans normal-case">Emirates Stadium</p>
        <p className="mt-1 text-arsenal-gold font-semibold text-lg font-sans normal-case">
          March 8, 2026 · 4:00 PM WAT
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[
            { value: "12", label: "Days" },
            { value: "06", label: "Hours" },
            { value: "34", label: "Mins" },
            { value: "12", label: "Secs" },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 rounded-lg p-2">
              <div className="text-2xl font-bold text-white font-heading">{item.value}</div>
              <div className="text-xs text-white/40">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <Link href="/events" className="block mt-4">
        <Button className="w-full">Find Watch Party for This Match</Button>
      </Link>
    </div>
  );
}

function BenchPanel() {
  const players = [
    { name: "Bukayo Saka", pos: "RW", number: 7 },
    { name: "Martin Odegaard", pos: "CAM", number: 8 },
    { name: "Declan Rice", pos: "CM", number: 41 },
    { name: "William Saliba", pos: "CB", number: 2 },
    { name: "Gabriel Jesus", pos: "ST", number: 9 },
    { name: "Kai Havertz", pos: "CF", number: 29 },
    { name: "Gabriel Martinelli", pos: "LW", number: 11 },
    { name: "David Raya", pos: "GK", number: 22 },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-arsenal-red" size={20} />
        <h3 className="text-lg font-bold text-white font-heading">Squad</h3>
      </div>
      <div className="space-y-2 max-h-[40vh] overflow-y-auto">
        {players.map((p) => (
          <div key={p.number} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-arsenal-red flex items-center justify-center text-xs font-bold text-white">
              {p.number}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white font-sans normal-case">{p.name}</p>
              <p className="text-xs text-white/40">{p.pos}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/fixtures" className="block mt-4">
        <Button variant="outline" size="sm" className="w-full">View Full Fixtures</Button>
      </Link>
    </div>
  );
}

function ScoreboardPanel() {
  const results = [
    { home: "Arsenal", away: "Newcastle", score: "3-1", result: "W" },
    { home: "Everton", away: "Arsenal", score: "0-2", result: "W" },
    { home: "Arsenal", away: "West Ham", score: "4-0", result: "W" },
    { home: "Aston Villa", away: "Arsenal", score: "1-1", result: "D" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-arsenal-red" size={20} />
        <h3 className="text-lg font-bold text-white font-heading">Live Scores & Results</h3>
      </div>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div className="flex-1">
              <p className="text-sm font-semibold text-white font-sans normal-case">
                {r.home} <span className="text-white/60 mx-1">{r.score}</span> {r.away}
              </p>
            </div>
            <Badge variant={r.result === "W" ? "live" : "completed"} className="!animate-none">
              {r.result}
            </Badge>
          </div>
        ))}
      </div>
      <Link href="/fixtures" className="block mt-4">
        <Button variant="outline" size="sm" className="w-full">All Fixtures & Scores</Button>
      </Link>
    </div>
  );
}

function StandsPanel() {
  const threads = [
    { title: "Predictions for Arsenal vs Chelsea?", replies: 42, author: "gooner_lagos" },
    { title: "Watch Party 6 was incredible!", replies: 28, author: "victoria_gunner" },
    { title: "Do we need a new DM this summer?", replies: 67, author: "arsenalytic" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="text-arsenal-red" size={20} />
        <h3 className="text-lg font-bold text-white font-heading">Community Talk</h3>
      </div>
      <div className="space-y-2">
        {threads.map((t, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <p className="text-sm font-semibold text-white font-sans normal-case">{t.title}</p>
            <p className="text-xs text-white/40 mt-1">by {t.author} · {t.replies} replies</p>
          </div>
        ))}
      </div>
      <Link href="/community" className="block mt-4">
        <Button variant="outline" size="sm" className="w-full">Join the Discussion</Button>
      </Link>
    </div>
  );
}

function VipPanel() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Ticket className="text-arsenal-red" size={20} />
        <h3 className="text-lg font-bold text-white font-heading">Watch Parties</h3>
      </div>
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-arsenal-red/10 border border-arsenal-red/20">
          <Badge variant="edition" className="mb-2">Edition 7</Badge>
          <p className="text-sm font-bold text-white font-sans normal-case">Arsenal vs Chelsea</p>
          <p className="text-xs text-white/50 mt-1 font-sans normal-case">
            <MapPin size={12} className="inline mr-1" />{DEFAULT_VENUE.name}
          </p>
          <p className="text-xs text-arsenal-gold mt-1">Mar 8, 2026 · Free Entry</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <Badge variant="edition" className="mb-2">Edition 8</Badge>
          <p className="text-sm font-bold text-white font-sans normal-case">Arsenal vs Man City</p>
          <p className="text-xs text-white/50 mt-1">Mar 22, 2026 · {DEFAULT_VENUE.name}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-white/30 font-sans normal-case">{PAST_EDITIONS.length} editions since 2023</p>
      <Link href="/events" className="block mt-3">
        <Button className="w-full">RSVP Now — Free</Button>
      </Link>
    </div>
  );
}

function TunnelPanel() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <User className="text-arsenal-red" size={20} />
        <h3 className="text-lg font-bold text-white font-heading">Your Host</h3>
      </div>
      <div className="text-center py-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-arsenal-red to-[#CC0006] flex items-center justify-center text-3xl font-bold text-white font-heading mx-auto">
          LD
        </div>
        <h2 className="mt-3 text-xl font-bold text-white font-heading">{HOST.name}</h2>
        <p className="text-sm text-arsenal-gold font-sans normal-case">{HOST.tagline}</p>
        <p className="mt-3 text-sm text-white/60 leading-relaxed font-sans normal-case">{HOST.shortBio}</p>
      </div>
      <div className="flex justify-center gap-3 mt-4">
        <a href={HOST.socials.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/5 text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
        <a href={HOST.socials.twitter} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/5 text-sm text-white/60 hover:text-white transition-colors">X</a>
      </div>
    </div>
  );
}

function CannonPanel() {
  const articles = [
    { title: "Arsenal vs Chelsea: Everything You Need to Know", category: "Preview", date: "Mar 6" },
    { title: "Arsenal 3-1 Newcastle: Saka Runs the Show", category: "Recap", date: "Mar 2" },
    { title: "Why This Arsenal Feels Different", category: "Opinion", date: "Feb 28" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="text-arsenal-red" size={20} />
        <h3 className="text-lg font-bold text-white font-heading">Articles & News</h3>
      </div>
      <div className="space-y-2">
        {articles.map((a, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <Badge variant="category" className="mb-1">{a.category}</Badge>
            <p className="text-sm font-semibold text-white font-sans normal-case">{a.title}</p>
            <p className="text-xs text-white/30 mt-1">{a.date}</p>
          </div>
        ))}
      </div>
      <Link href="/articles" className="block mt-4">
        <Button variant="outline" size="sm" className="w-full">Read All Articles</Button>
      </Link>
    </div>
  );
}

const PANELS: Record<HotspotName, { label: string; component: React.FC }> = {
  ball: { label: "Kickoff", component: BallPanel },
  bench: { label: "Squad", component: BenchPanel },
  scoreboard: { label: "Scores", component: ScoreboardPanel },
  stands: { label: "Community", component: StandsPanel },
  vip: { label: "Events", component: VipPanel },
  tunnel: { label: "About Leo", component: TunnelPanel },
  cannon: { label: "Articles", component: CannonPanel },
};

// Hotspot labels shown on the 2D overlay
const HOTSPOT_LABELS: { name: HotspotName; label: string; icon: React.ReactNode }[] = [
  { name: "ball", label: "Kickoff", icon: <Calendar size={14} /> },
  { name: "bench", label: "Squad", icon: <Users size={14} /> },
  { name: "scoreboard", label: "Scores", icon: <Trophy size={14} /> },
  { name: "stands", label: "Community", icon: <MessageSquare size={14} /> },
  { name: "vip", label: "Events", icon: <Ticket size={14} /> },
  { name: "tunnel", label: "About Leo", icon: <User size={14} /> },
  { name: "cannon", label: "News", icon: <Newspaper size={14} /> },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotName | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHotspotClick = useCallback((name: HotspotName) => {
    setActiveHotspot((prev) => (prev === name ? null : name));
  }, []);

  const handleClose = useCallback(() => {
    setActiveHotspot(null);
  }, []);

  const ActivePanel = activeHotspot ? PANELS[activeHotspot].component : null;

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* 3D Stadium — the entire experience */}
      <div className="absolute inset-0">
        {mounted ? (
          <StadiumScene
            activeHotspot={activeHotspot}
            onHotspotClick={handleHotspotClick}
          />
        ) : (
          <div className="h-screen w-full bg-[#050510]" />
        )}
      </div>

      {/* Top bar — brand + nav hint */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-arsenal-red font-heading drop-shadow-lg">
            {SITE.shortName}
          </h1>
          <p className="text-xs text-white/40 font-sans normal-case">
            {activeHotspot ? "Click anywhere to return" : "Click parts of the stadium to explore"}
          </p>
        </div>
        {activeHotspot && (
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white/70 hover:text-white text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Stadium
          </button>
        )}
      </div>

      {/* Bottom navigation pills — quick access to hotspots */}
      {!activeHotspot && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 flex-wrap justify-center max-w-[90vw]">
          {HOTSPOT_LABELS.map((h) => (
            <button
              key={h.name}
              onClick={() => handleHotspotClick(h.name)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:border-arsenal-red/40 hover:bg-arsenal-red/10 text-xs font-medium transition-all cursor-pointer"
            >
              {h.icon}
              {h.label}
            </button>
          ))}
        </div>
      )}

      {/* Content panel overlay — slides in from right */}
      {activeHotspot && ActivePanel && (
        <div className="absolute top-0 right-0 h-full w-full sm:w-[400px] z-20 bg-bg-dark/90 backdrop-blur-xl border-l border-white/5 overflow-y-auto">
          <div className="p-6 pt-20">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <ActivePanel />
          </div>
        </div>
      )}

      {/* Welcome overlay — only on initial load, no hotspot active */}
      {!activeHotspot && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-arsenal-gold drop-shadow-lg">
            Hosted by {HOST.name}
          </p>
          <h2 className="mt-2 text-5xl sm:text-7xl font-bold tracking-tight text-white font-heading drop-shadow-[0_2px_20px_rgba(239,1,7,0.4)]">
            {SITE.shortName}
          </h2>
          <p className="mt-2 text-base text-white/50 font-sans normal-case drop-shadow-lg">
            {SITE.tagline}
          </p>
        </div>
      )}
    </section>
  );
}
