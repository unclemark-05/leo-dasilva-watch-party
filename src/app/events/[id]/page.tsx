import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { Calendar, MapPin, Users, Clock, Share2, Car } from "lucide-react";
import { HOST, DEFAULT_VENUE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Arsenal vs Chelsea — Watch Party Edition 7",
};

// Placeholder — in production, fetched by ID from Supabase
const EVENT = {
  id: "1",
  title: "Arsenal vs Chelsea",
  edition: 7,
  description:
    "Join us for the ultimate matchday experience! Watch Arsenal take on Chelsea live at The Condo with fellow Gooners. Free entry, free refreshments, and big screens.",
  match_date: "2026-03-08T15:00:00Z",
  event_type: "in_person" as const,
  location_name: DEFAULT_VENUE.name,
  location_address: DEFAULT_VENUE.address,
  max_capacity: DEFAULT_VENUE.capacity,
  status: "upcoming" as const,
  rsvp_going: 234,
  rsvp_maybe: 45,
};

export default function EventDetailPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-white/30 font-sans normal-case">
        <Link href="/events" className="hover:text-white transition-colors">
          Events
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/50">{EVENT.title}</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="edition">Edition {EVENT.edition}</Badge>
        <Badge variant="upcoming">Upcoming</Badge>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading">
        {EVENT.title}
      </h1>

      {/* Host */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-arsenal-red to-arsenal-red-dark flex items-center justify-center text-sm font-bold text-white font-heading">
          LD
        </div>
        <div>
          <p className="text-sm font-semibold text-white font-sans normal-case">
            {HOST.name}
          </p>
          <p className="text-xs text-white/40 font-sans normal-case">
            Your Host
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="md:col-span-2 space-y-6">
          <Card hover={false}>
            <h2 className="text-lg font-bold text-white font-heading mb-3">
              About This Event
            </h2>
            <p className="text-white/60 leading-relaxed font-sans normal-case">
              {EVENT.description}
            </p>
          </Card>

          <Card hover={false}>
            <h2 className="text-lg font-bold text-white font-heading mb-3">
              What to Expect
            </h2>
            <ul className="space-y-2 text-sm text-white/60 font-sans normal-case">
              <li className="flex items-center gap-2">
                <span className="text-green-400">&#10003;</span> Free entry — just RSVP
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">&#10003;</span> Free refreshments (water, beer, soft drinks)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">&#10003;</span> Big screen viewing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">&#10003;</span> {DEFAULT_VENUE.capacity}+ capacity venue
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">&#10003;</span> Community vibes with fellow Gooners
              </li>
            </ul>
          </Card>

          <Card hover={false}>
            <h2 className="text-lg font-bold text-white font-heading mb-3">
              Venue Details
            </h2>
            <div className="space-y-2 text-sm text-white/60 font-sans normal-case">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-arsenal-red shrink-0" />
                {EVENT.location_name}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-white/30 shrink-0" />
                {EVENT.location_address}
              </div>
              <div className="flex items-center gap-2">
                <Car size={16} className="text-white/30 shrink-0" />
                {DEFAULT_VENUE.parking}
              </div>
              <a
                href={DEFAULT_VENUE.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-arsenal-red hover:text-arsenal-red-dark transition-colors"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </Card>
        </div>

        {/* Sidebar — RSVP + details */}
        <div className="space-y-4">
          <Card hover={false} className="sticky top-24">
            <div className="space-y-3 text-sm text-white/60 font-sans normal-case">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-arsenal-red shrink-0" />
                March 8, 2026 · 4:00 PM WAT
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-white/30 shrink-0" />
                4 hours (2:00 PM – 6:00 PM)
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-white/30 shrink-0" />
                {EVENT.rsvp_going} going · {EVENT.rsvp_maybe} maybe
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full">Going</Button>
              <Button variant="outline" className="w-full">
                Maybe
              </Button>
              <Button variant="ghost" className="w-full text-white/40">
                Can&apos;t Make It
              </Button>
            </div>

            <p className="mt-4 text-xs text-white/30 text-center font-sans normal-case">
              Sign in to RSVP
            </p>
          </Card>

          {/* Share */}
          <Card hover={false}>
            <h3 className="text-sm font-semibold text-white font-sans normal-case mb-3">
              Share with friends
            </h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <Share2 size={14} />
                WhatsApp
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Share2 size={14} />
                X
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Share2 size={14} />
                Copy Link
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
