import { Instagram, Twitter, Globe } from "lucide-react";
import { HOST } from "@/lib/constants";

export default function AboutLeoSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-8">
        {/* Avatar placeholder */}
        <div className="shrink-0">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-arsenal-red to-arsenal-red-dark flex items-center justify-center text-4xl font-bold text-white font-heading">
            LD
          </div>
        </div>

        {/* Bio */}
        <div>
          <h2 className="text-3xl font-bold text-white font-heading">
            Your Host
          </h2>
          <p className="mt-1 text-arsenal-gold text-sm font-semibold uppercase tracking-wider font-sans">
            {HOST.tagline}
          </p>
          <p className="mt-3 text-white/60 leading-relaxed font-sans normal-case">
            {HOST.shortBio}
          </p>

          {/* Social links */}
          <div className="mt-4 flex gap-3">
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
    </section>
  );
}
