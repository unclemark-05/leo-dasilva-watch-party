import { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Articles",
  description: "Match previews, recaps, and opinion pieces from the LDWP community.",
};

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "preview", label: "Previews" },
  { key: "recap", label: "Recaps" },
  { key: "opinion", label: "Opinion" },
  { key: "news", label: "News" },
];

// Placeholder articles
const ARTICLES = [
  {
    slug: "arsenal-vs-chelsea-preview",
    title: "Arsenal vs Chelsea: Everything You Need to Know",
    excerpt: "The London derby returns to the Emirates. Here's our tactical breakdown and predicted lineup for the biggest match of March.",
    category: "preview",
    author: "Leo DaSilva",
    date: "Mar 6, 2026",
    readTime: "5 min read",
  },
  {
    slug: "newcastle-recap-3-1",
    title: "Arsenal 3-1 Newcastle: Saka Runs the Show",
    excerpt: "Saka scored twice as Arsenal cruised past Newcastle at the Emirates. Here's how it went down.",
    category: "recap",
    author: "gooner_lagos",
    date: "Mar 2, 2026",
    readTime: "4 min read",
  },
  {
    slug: "why-arteta-is-different",
    title: "Why This Arsenal Feels Different — An Essay",
    excerpt: "From banter era to title contenders. A look at the cultural shift Arteta has brought to Arsenal.",
    category: "opinion",
    author: "tactical_gooner",
    date: "Feb 28, 2026",
    readTime: "8 min read",
  },
  {
    slug: "watch-party-edition-6-highlights",
    title: "Watch Party Edition 6: The Photos, The Vibes, The Memories",
    excerpt: "Over 500 Gooners showed up for the end-of-season watch party. Here's what went down.",
    category: "news",
    author: "Leo DaSilva",
    date: "May 26, 2025",
    readTime: "3 min read",
  },
];

const categoryLabels: Record<string, string> = {
  preview: "Preview",
  recap: "Recap",
  opinion: "Opinion",
  news: "News",
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold text-white font-heading">
        Articles
      </h1>
      <p className="mt-2 text-white/40 font-sans normal-case">
        Match previews, recaps, and stories from the community.
      </p>

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

      {/* Article grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            <Card className="h-full">
              {/* Cover placeholder */}
              <div className="h-40 rounded-lg bg-gradient-to-br from-arsenal-red/10 to-arsenal-navy/10 mb-4" />

              <Badge variant="category" className="mb-2">
                {categoryLabels[article.category] || article.category}
              </Badge>

              <h3 className="text-lg font-bold text-white font-heading leading-tight">
                {article.title}
              </h3>

              <p className="mt-2 text-sm text-white/50 font-sans normal-case line-clamp-2">
                {article.excerpt}
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-white/30 font-sans normal-case">
                <span>{article.author}</span>
                <span>&middot;</span>
                <span>{article.date}</span>
                <span>&middot;</span>
                <span>{article.readTime}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
