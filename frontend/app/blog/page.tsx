import { type Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";

export const metadata: Metadata = {
  title: "Prashan Blog | AI in Education, Exam Tips & Teacher Resources",
  description:
    "Expert insights on AI-powered exam creation, best practices for teachers, CBSE/ICSE curriculum tips, and guides on creating professional question papers efficiently.",
  keywords: [
    "teacher blog India",
    "exam tips CBSE",
    "AI in education",
    "question paper creation guide",
    "teacher productivity",
    "education technology",
  ],
  alternates: {
    canonical: "https://prashan.co.in/blog",
  },
};

type Category = "Tutorial" | "Education" | "Tips" | "AI & Education";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  readTime: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "how-to-create-question-paper-in-minutes",
    title: "How to Create a Professional Question Paper in under minutes",
    excerpt:
      "Discover the power of Prashan AI to transform your syllabus into comprehensive, balanced examination papers with board-aligned formatting — with just a few clicks.",
    category: "Tutorial",
    readTime: "5 min",
    date: "2026-03-15",
  },
  {
    slug: "cbse-vs-icse-exam-papers-differences",
    title: "CBSE vs ICSE Question Papers: Key Differences Every Teacher Should Know",
    excerpt:
      "Navigating the nuances between India's major educational boards requires a deep understanding of their unique assessment philosophies and structural requirements.",
    category: "Education",
    readTime: "7 min",
    date: "2026-03-10",
  },
  {
    slug: "save-time-exam-preparation",
    title: "5 Time-Saving Tips for Exam Preparation Every Teacher Needs",
    excerpt:
      "Exam season doesn't have to mean sleepless nights. Learn how to optimise your workflow and delegate repetitive tasks to AI assistant tools.",
    category: "Tips",
    readTime: "4 min",
    date: "2026-03-05",
  },
  {
    slug: "ai-question-paper-generator-benefits",
    title: "Why AI Question Generators Are the Future of Indian Education",
    excerpt:
      "As the educational landscape evolves, AI emerges not as a replacement but as a powerful partner for teachers to ensure quality assessments at scale.",
    category: "AI & Education",
    readTime: "6 min",
    date: "2026-02-28",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto px-5 pt-24 pb-24">
          {/* ── Header ── */}
          <div className="mb-12 animate-hero-in">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 text-foreground/50">
              From the Prashan team
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground tracking-tight leading-tight">
              Blog
            </h1>
            <p className="text-base max-w-md leading-relaxed text-foreground/70">
              Insights, updates, and educational resources designed to empower
              the modern Indian educator with AI.
            </p>
          </div>

          {/* ── Featured post ── */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-6 rounded-2xl overflow-hidden scroll-animate stagger-0
                       transition-all duration-300 hover:-translate-y-0.5
                       bg-white/80 dark:bg-white/5 backdrop-blur-xl
                       border border-black/5 dark:border-white/10
                       shadow-[0_2px_12px_rgba(26,28,28,0.06)]
                       dark:shadow-black/20"
          >
            <div className="p-7 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md bg-white/30 dark:bg-violet-500/20 border border-black/10 dark:border-violet-500/30 shadow-sm text-foreground/80 dark:text-violet-300">
                    {featured.category}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/50">
                    {featured.readTime} read
                  </span>
                  <span className="text-[11px] text-foreground/50">
                    {formatDate(featured.date)}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-4 group-hover:opacity-75 transition-opacity duration-200 text-foreground tracking-tight max-w-2xl">
                  {featured.title}
                </h2>

                <p className="text-base leading-relaxed text-foreground/70 max-w-3xl">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-8">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-200 text-amber-700 dark:text-amber-500">
                  Read article
                  <ArrowIcon />
                </span>
              </div>
            </div>
          </Link>

          {/* ── 3-column grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden scroll-animate stagger-1
                           transition-all duration-300 hover:-translate-y-0.5
                           bg-white/60 dark:bg-white/5 backdrop-blur-xl
                           border border-black/5 dark:border-white/10
                           shadow-[0_2px_10px_rgba(26,28,28,0.05)]
                           dark:shadow-black/10"
              >
                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md bg-white/30 dark:bg-violet-500/20 border border-black/10 dark:border-violet-500/30 shadow-sm text-foreground/80 dark:text-violet-300">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/50">
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-[16px] font-bold leading-snug mb-3 flex-1 group-hover:opacity-70 transition-opacity duration-200 text-foreground tracking-tight">
                    {post.title}
                  </h2>

                  <p className="text-sm leading-relaxed line-clamp-3 mb-6 text-foreground/70">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                    <time className="text-[10px] text-foreground/50">
                      {formatDate(post.date)}
                    </time>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold group-hover:gap-2 transition-all duration-200 text-amber-700 dark:text-amber-500">
                      Read
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
