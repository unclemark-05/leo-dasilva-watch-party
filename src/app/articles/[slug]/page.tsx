import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Article",
};

// Placeholder
const ARTICLE = {
  title: "Arsenal vs Chelsea: Everything You Need to Know",
  category: "preview",
  author: "Leo DaSilva",
  date: "March 6, 2026",
  readTime: "5 min read",
  body: `The London derby is back and this time it means more than ever.

Arsenal sit 5 points clear at the top of the Premier League. Chelsea, under their new manager, have been quietly putting together an impressive run — 6 wins from their last 8.

## Team News

Arsenal will be without Thomas Partey (hamstring), but Declan Rice returns from suspension. Saka is fit and raring to go after a rest in the midweek Champions League tie.

Chelsea have a fully fit squad. Cole Palmer has been their talisman with 15 goals already this season.

## Tactical Preview

Expect Arteta to set up in his trademark 3-2-5 in possession. The key battle will be in midfield — Rice vs Caicedo. Whoever controls that zone controls the game.

Arsenal's left side with Martinelli and Zinchenko will look to exploit Chelsea's high defensive line, while Saka on the right will face a tough test against Marc Cucurella.

## Predicted Lineup

Raya; White, Saliba, Gabriel; Timber, Rice, Odegaard, Zinchenko; Saka, Havertz, Martinelli

## Prediction

Arsenal 3-1 Chelsea. The Emirates will be rocking and Chelsea won't be able to handle the intensity. Saka brace, Havertz scores against his old club.

COYG!`,
};

export default function ArticlePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-white/30 font-sans normal-case">
        <Link href="/articles" className="hover:text-white transition-colors">
          Articles
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/50">Article</span>
      </div>

      {/* Cover placeholder */}
      <div className="h-56 rounded-xl bg-gradient-to-br from-arsenal-red/15 to-arsenal-navy/15 mb-6" />

      <Badge variant="category" className="mb-3">Preview</Badge>

      <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading leading-tight">
        {ARTICLE.title}
      </h1>

      <div className="mt-3 flex items-center gap-2 text-sm text-white/40 font-sans normal-case">
        <div className="h-6 w-6 rounded-full bg-arsenal-red/30 flex items-center justify-center text-xs text-white font-bold">
          L
        </div>
        <span>{ARTICLE.author}</span>
        <span>&middot;</span>
        <span>{ARTICLE.date}</span>
        <span>&middot;</span>
        <span>{ARTICLE.readTime}</span>
      </div>

      {/* Article body */}
      <div className="mt-8 prose prose-invert prose-sm max-w-none font-sans normal-case">
        {ARTICLE.body.split("\n\n").map((paragraph, i) => {
          if (paragraph.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="text-xl font-bold text-white font-heading mt-8 mb-3"
              >
                {paragraph.replace("## ", "")}
              </h2>
            );
          }
          return (
            <p key={i} className="text-white/60 leading-relaxed mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Related articles */}
      <div className="mt-12 pt-8 border-t border-white/5">
        <h3 className="text-lg font-bold text-white font-heading mb-4">
          Related Articles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/articles/newcastle-recap-3-1">
            <Card className="!p-4">
              <Badge variant="category" className="mb-2">Recap</Badge>
              <h4 className="text-sm font-semibold text-white font-sans normal-case">
                Arsenal 3-1 Newcastle: Saka Runs the Show
              </h4>
            </Card>
          </Link>
          <Link href="/articles/why-arteta-is-different">
            <Card className="!p-4">
              <Badge variant="category" className="mb-2">Opinion</Badge>
              <h4 className="text-sm font-semibold text-white font-sans normal-case">
                Why This Arsenal Feels Different
              </h4>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
