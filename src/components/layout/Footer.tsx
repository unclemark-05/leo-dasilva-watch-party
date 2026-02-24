import Link from "next/link";
import { Instagram, Twitter, Globe } from "lucide-react";
import { SITE, HOST, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold tracking-widest text-arsenal-red font-heading">
              {SITE.shortName}
            </h3>
            <p className="mt-2 text-sm text-white/50">
              {SITE.tagline}
            </p>
            <p className="mt-1 text-sm text-white/30">
              Founded by {HOST.name}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 font-sans">
              Quick Links
            </h4>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 font-sans">
              Follow {HOST.name}
            </h4>
            <div className="flex gap-3">
              <a
                href={HOST.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-arsenal-red hover:bg-arsenal-red/10 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={HOST.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-arsenal-red hover:bg-arsenal-red/10 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href={HOST.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-arsenal-red hover:bg-arsenal-red/10 transition-colors"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            Free forever. Made for Gooners, by a Gooner.
          </p>
          <p className="text-xs text-white/20 mt-1">
            &copy; {new Date().getFullYear()} {SITE.name}. Not affiliated with Arsenal FC.
          </p>
        </div>
      </div>
    </footer>
  );
}
