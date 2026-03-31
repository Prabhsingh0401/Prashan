import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/global/navbar";
import Footer from "../../components/global/footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const blogContent: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}> = {
  "how-to-create-question-paper-in-minutes": {
    title: "How to Create a Professional Question Paper in Under 3 Minutes",
    excerpt: "Step-by-step guide for Indian teachers to create board-aligned, professionally formatted exam papers using AI.",
    category: "Tutorial",
    readTime: "5 min",
    date: "2026-03-15",
    content: `
Creating a professional question paper doesn't have to take hours. With the right tools and approach, Indian teachers can generate board-aligned, well-formatted exam papers in under 3 minutes.

## Why This Matters for Indian Teachers

Indian teachers face unique challenges:
- **Curriculum alignment**: CBSE, ICSE, and State Boards have different requirements
- **Time constraints**: Between teaching, grading, and administrative work, exam prep suffers
- **Format requirements**: Different boards have specific formatting standards

## The Traditional Process (And Why It Fails)

Most teachers follow this workflow:
1. Search for questions from textbooks
2. Copy-paste into Word/Google Docs
3. Manually format headers, numbering, and spacing
4. Adjust margins and fonts
5. Export to PDF

This process takes 2-3 hours per paper. Multiply by 5-6 exams per term, and you've spent an entire workweek just on formatting.

## Enter AI-Powered Question Paper Generation

Prashan streamlines this entire process:

### Step 1: Select Your Parameters
Choose your board (CBSE/ICSE/State), class, subject, and chapters. The AI understands curriculum requirements for each board.

### Step 2: Configure Question Types
Define the mix of MCQs, short answer, and long answer questions. Set marks for each type.

### Step 3: Auto-Generate & Format
The AI generates questions scoped to your exact requirements. Formatting happens automatically—no manual intervention needed.

### Step 4: Review & Export
Quick review of generated questions, then export as print-ready PDF.

## Result: Professional Papers in Minutes

What took 3 hours now takes 3 minutes. The quality? Even better than manual creation, because the AI ensures:
- Consistent formatting throughout
- Proper question numbering and sections
- Curriculum-aligned content
- Print-ready output every time

## Try It Free

Prashan is free during early access. No credit card required. Start creating better papers today.
    `,
  },
  "cbse-vs-icse-exam-papers-differences": {
    title: "CBSE vs ICSE Question Papers: Key Differences Every Teacher Should Know",
    excerpt: "Understanding the structural and content differences between CBSE and ICSE examination papers.",
    category: "Education",
    readTime: "7 min",
    date: "2026-03-10",
    content: `
Understanding the differences between CBSE and ICSE examination patterns is crucial for creating aligned question papers. Here's what every Indian teacher should know.

## CBSE Examination Pattern

### Structure
- **MCQs**: 20-25% of total marks
- **Short Answer**: 40-50% of total marks  
- **Long Answer**: 25-30% of total marks

### Key Characteristics
- Focus on application-based questions
- Higher weightage to numerical problems in Science/Math
- Case study questions introduced recently
- Internal choice limited (2-3 questions max)

### Blue Print Based
CBSE papers follow a detailed blue print published by the board, ensuring:
- Content distribution across units
- Cognitive level distribution (Remember, Understand, Apply, Analyze, Evaluate)
- Marks distribution across question types

## ICSE Examination Pattern

### Structure
- **Section I (MCQs)**: 15 marks (compulsory)
- **Section II (Short Answer)**: 35 marks (4 questions, attempt 3)
- **Section III (Long Answer)**: 35 marks (3 questions, attempt 2)

### Key Characteristics
- More descriptive answers required
- Emphasis on language and expression
- Literature-heavy in English
- Project work component (for some subjects)

## Creating Board-Aligned Papers

When generating question papers, ensure alignment:

### For CBSE
1. Follow the latest blue print
2. Include application and HOTS (Higher Order Thinking Skills) questions
3. Keep MCQ mix varied
4. Ensure proper cognitive level distribution

### For ICSE
1. Structure into mandatory Section I
2. Provide adequate internal choices
3. Focus on descriptive writing
4. Include literature-specific questions

## Why Board Alignment Matters

1. **Student Familiarity**: Students perform better when papers match expected patterns
2. **Curriculum Coverage**: Proper alignment ensures all topics are assessed
3. **Fair Assessment**: Consistent structure means fair evaluation

## AI-Powered Alignment

Prashan automatically understands these differences and generates papers aligned to your specific board requirements—no manual pattern matching needed.
    `,
  },
  "save-time-exam-preparation": {
    title: "5 Time-Saving Tips for Exam Preparation Every Teacher Needs",
    excerpt: "Practical strategies to reduce exam preparation time by 80% while maintaining quality.",
    category: "Tips",
    readTime: "4 min",
    date: "2026-03-05",
    content: `
Teachers in India spend an average of 15-20 hours per term just on exam paper creation. Here's how to reclaim that time without sacrificing quality.

## The Time Drain

Breaking down exam prep:
- Question research: 4-5 hours
- Copy-paste and formatting: 3-4 hours
- Proofreading and corrections: 2-3 hours
- Multiple revisions: 2-3 hours
- Final export and printing: 1-2 hours

**Total**: 12-17 hours per exam cycle

## 5 Strategies to Cut Exam Prep Time by 80%

### 1. Use AI-Powered Generation
Tools like Prashan generate board-aligned questions in seconds. The AI understands CBSE/ICSE patterns and creates properly formatted papers automatically.

### 2. Build a Personal Question Bank
Start collecting questions from:
- Previous year papers
- NCERT exemplars
- Reference books
- Online resources

Organize by chapter, topic, and question type. Digital tools can help search and retrieve quickly.

### 3. Reuse and Adapt
Don't start from scratch every time:
- Save successful papers as templates
- Adapt previous year papers with updates
- Create question banks for each unit

### 4. Set Up Templates
Create document templates with:
- Pre-formatted headers
- Question type sections
- Marks allocation tables
- School branding

### 5. Batch Processing
Create multiple papers in one session:
- Process all class 10 papers together
- Use similar formats for consistency
- Batch export to PDF

## The ROI of Time Saved

If you save 10 hours per exam cycle:
- **Per term**: 30 hours saved (one full work week)
- **Per year**: 90 hours saved
- **Career (30 years)**: 2,700 hours = 337 workdays!

That's nearly 1.5 years of work time reclaimed.

## Start Small

Pick ONE tip from this list and implement it for your next exam. Track the time saved. You'll be surprised at how quickly these strategies compound.
    `,
  },
  "ai-question-paper-generator-benefits": {
    title: "Why AI Question Generators Are the Future of Indian Education",
    excerpt: "Exploring how artificial intelligence is transforming exam paper creation for teachers.",
    category: "AI & Education",
    readTime: "6 min",
    date: "2026-02-28",
    content: `
India's education system is undergoing a digital transformation, and AI-powered tools are leading the charge. For teachers, this means smarter workflows and better outcomes.

## The Current Challenge

Indian teachers face a paradox:
- More students to teach
- Higher expectations for quality
- Same limited time to prepare
- Increasing curriculum complexity

Traditional exam preparation methods—manual research, copy-paste, formatting—consume hours that could be spent on actual teaching.

## Enter AI Question Generation

AI question generators solve this by:

### Speed
What takes 3 hours takes 3 minutes. AI processes and generates questions instantly.

### Consistency  
AI maintains formatting standards automatically. Every paper looks professional.

### Coverage
AI understands curriculum requirements across boards (CBSE, ICSE, State) and can generate questions aligned to specific learning objectives.

### Variety
Generate multiple unique papers from the same parameters. No more repeating the same questions year after year.

## Real Benefits for Teachers

### 1. Time Reclaimed
An average teacher creates 20-30 papers per year. At 3 hours saved per paper, that's 60-90 hours annually—time for lesson planning, student engagement, or personal well-being.

### 2. Reduced Errors
AI-generated papers have consistent formatting, proper numbering, and accurate marks distribution. Human error in manual formatting is eliminated.

### 3. Board Alignment
The best AI tools understand Indian board requirements. Questions are automatically scoped to curriculum expectations.

### 4. Professional Output
AI-generated papers meet professional printing standards. Schools can maintain consistent branding across all examinations.

## Addressing Concerns

### "Will AI replace teachers?"
No. AI assists with administrative tasks. The teacher remains central—making pedagogical decisions, evaluating answers, and guiding students.

### "Is it reliable?"
Modern AI question generators undergo rigorous testing. For specific board requirements, look for tools that understand Indian curriculum patterns.

### "Is it accessible?"
Cloud-based tools work on any device with internet. Mobile-friendly interfaces mean teachers can create papers from anywhere.

## The Path Forward

AI in education isn't about replacement—it's about augmentation. Tools like Prashan handle the mechanical work of question paper creation, freeing teachers to focus on what matters: inspiring and educating students.

The future of Indian education is intelligent automation paired with human expertise.
    `,
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Prashan Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://prashan.co.in/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://prashan.co.in/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogContent[slug];

  if (!post) {
    notFound();
  }

  const contentSections = post.content
    .trim()
    .split(/\n\n+/)
    .map((section) => section.trim());

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center pt-24">
        <article className="w-full max-w-[800px] mx-auto px-4 pb-16">
          <Link
            href="/blog"
            className="btn-glass btn-glass-secondary !rounded-xl !py-2 !px-4 text-sm font-medium mb-8"
          >
            ← Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/70">
                {post.category}
              </span>
              <span className="text-xs text-foreground/40">{post.readTime} read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-foreground/60">
              {post.excerpt}
            </p>
            <time className="text-sm text-foreground/40 mt-4 block">
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {contentSections.map((section, index) => {
              if (section.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-xl font-bold text-foreground mt-8 mb-4">
                    {section.replace("## ", "")}
                  </h2>
                );
              }
              if (section.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
                    {section.replace("### ", "")}
                  </h3>
                );
              }
              if (section.startsWith("- ")) {
                const items = section.split("\n").filter((line) => line.startsWith("- "));
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 text-foreground/70 mb-4">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (section.match(/^\d+\./)) {
                const items = section.split("\n").filter((line) => line.match(/^\d+\./));
                return (
                  <ol key={index} className="list-decimal pl-6 space-y-2 text-foreground/70 mb-4">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-foreground/70 leading-relaxed mb-4">
                  {section}
                </p>
              );
            })}
          </div>

          <div className="mt-16 p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <h3 className="text-lg font-bold text-foreground mb-2">Ready to save time?</h3>
            <p className="text-sm text-foreground/60 mb-4">
              Create professional question papers in under 3 minutes with Prashan.
            </p>
            <Link
              href="/auth"
              className="btn-glass btn-glass-primary !px-6 !py-2 text-sm font-bold"
            >
              Get Started Free →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
