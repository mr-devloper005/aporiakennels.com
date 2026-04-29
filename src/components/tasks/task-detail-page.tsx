import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, Mail, MapPin, Phone, Tag, Folder } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { TaskImageCarousel } from "@/components/tasks/task-image-carousel";
import { ArticleComments } from "@/components/tasks/article-comments";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { getSiteExperience } from "@/lib/site-experience";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
};

const isValidImageUrl = (value?: string | null) =>
  typeof value === "string" && (value.startsWith("/") || /^https?:\/\//i.test(value));

const getContent = (post: SitePost): PostContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as PostContent;
};

const formatArticleHtml = (content: PostContent, post: SitePost) => {
  const raw =
    (typeof content.body === "string" && content.body.trim()) ||
    (typeof content.description === "string" && content.description.trim()) ||
    (typeof post.summary === "string" && post.summary.trim()) ||
    "";

  return formatRichHtml(raw, "Details coming soon.");
};

const getImageUrls = (post: SitePost, content: PostContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaImages = media.map((item) => item?.url).filter((url): url is string => isValidImageUrl(url));
  const contentImages = Array.isArray(content.images)
    ? content.images.filter((url): url is string => isValidImageUrl(url))
    : [];
  const merged = [...mediaImages, ...contentImages];
  if (merged.length) return merged;
  if (isValidImageUrl(content.logo)) return [content.logo as string];
  return ["/placeholder.svg?height=900&width=1400"];
};

function DetailMeta({
  content,
  location,
  website,
  experience,
  post,
  category,
}: {
  content: PostContent;
  location?: string;
  website?: string;
  experience: ReturnType<typeof getSiteExperience>;
  post: SitePost;
  category?: string;
}) {
  return (
    <div className={`rounded-[1.75rem] p-5 ${experience.softPanelClass}`}>
      <h2 className="text-lg font-semibold text-foreground">Details</h2>
      <div className={`mt-4 space-y-3 text-sm ${experience.mutedClass}`}>
        {category ? (
          <div className="flex items-start gap-2">
            <Folder className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-foreground">{category}</span>
          </div>
        ) : null}
        {post.tags?.length ? (
          <div className="flex items-start gap-2">
            <Tag className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs">{t}</span>
              ))}
            </div>
          </div>
        ) : null}
        {website ? (
          <div className="flex items-start gap-2">
            <Globe className="mt-0.5 h-4 w-4 shrink-0" />
            <a href={website} target="_blank" rel="noreferrer" className="break-all text-foreground hover:underline">
              {website}
            </a>
          </div>
        ) : null}
        {content.phone ? (
          <div className="flex items-start gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{content.phone}</span>
          </div>
        ) : null}
        {content.email ? (
          <div className="flex items-start gap-2">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            <a href={`mailto:${content.email}`} className="break-all text-foreground hover:underline">
              {content.email}
            </a>
          </div>
        ) : null}
        {location ? (
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{location}</span>
          </div>
        ) : null}
      </div>
      {website ? (
        <Button asChild className={`mt-5 w-full ${experience.buttonClass}`}>
          <a href={website} target="_blank" rel="noreferrer">
            Visit website
          </a>
        </Button>
      ) : null}
    </div>
  );
}

function renderSuggestions(
  experience: ReturnType<typeof getSiteExperience>,
  related: SitePost[],
  task: TaskKey,
  category: string,
  route?: string
) {
  if (!related.length) return null;

  if (experience.key === "codepixelmedia" || experience.key === "helloartcity") {
    return (
      <section className="mt-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Related work</h2>
          {route ? (
            <Link href={route} className={`text-sm font-semibold ${experience.mutedClass}`}>
              View all
            </Link>
          ) : null}
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2">
          {related.map((item) => (
            <div key={item.id} className="min-w-[280px] max-w-[320px] flex-none">
              <TaskPostCard post={item} href={buildPostUrl(task, item.slug)} taskKey={task} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Related work</h2>
        {route ? (
          <Link href={route} className={`text-sm font-semibold ${experience.mutedClass}`}>
            View all
          </Link>
        ) : null}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {related.map((item) => (
          <TaskPostCard key={item.id} post={item} href={buildPostUrl(task, item.slug)} taskKey={task} />
        ))}
      </div>
      <nav className={`mt-6 rounded-[1.75rem] p-5 ${experience.softPanelClass}`}>
        <p className="text-sm font-semibold text-foreground">More paths</p>
        <ul className="mt-3 space-y-2 text-sm">
          {route ? (
            <li>
              <Link href={route} className="text-primary underline-offset-4 hover:underline">
                Browse all {task}
              </Link>
            </li>
          ) : null}
          <li>
            <Link href={`/search?q=${encodeURIComponent(category)}`} className="text-primary underline-offset-4 hover:underline">
              Search more in {category}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export async function TaskDetailPage({ task, slug }: { task: TaskKey; slug: string }) {
  const taskConfig = getTaskConfig(task);
  const post = await fetchTaskPostBySlug(task, slug);

  if (!post) notFound();

  const content = getContent(post);
  const isArticle = task === "article";
  const isBookmark = task === "sbm" || task === "social";
  const category = content.category || post.tags?.[0] || taskConfig?.label || task;
  const description = content.description || post.summary || "Details coming soon.";
  const descriptionHtml = !isArticle ? formatRichHtml(description, "Details coming soon.") : "";
  const articleHtml = isArticle ? formatArticleHtml(content, post) : "";
  const articleSummary = post.summary || (typeof content.excerpt === "string" ? content.excerpt : "") || "";
  const articleAuthor =
    (typeof content.author === "string" && content.author.trim()) || post.authorName || "Editorial Team";
  const articleDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const postTags = Array.isArray(post.tags) ? post.tags.filter((tag) => typeof tag === "string") : [];
  const location = content.address || content.location;
  const images = getImageUrls(post, content);
  const website = content.website;
  const related = (await fetchTaskPosts(task, 6)).filter((item) => item.slug !== post.slug).slice(0, 3);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const experience = getSiteExperience(SITE_CONFIG.baseUrl);

  const schemaPayload = {
    "@context": "https://schema.org",
    "@type": isArticle ? "Article" : "WebPage",
    name: post.title,
    description: articleSummary || description,
    url: `${baseUrl}${taskConfig?.route || "/posts"}/${post.slug}`,
  };

  const introCard =
    experience.key === "scoreminers"
      ? `${experience.softPanelClass} border-[3px]`
      : experience.softPanelClass;
  const isAporiaImageDetail = experience.key === "aporiakennels" && task === "image";

  return (
    <div className={`min-h-screen bg-[#fbf9f4] ${experience.fontClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={schemaPayload} />
        <Link href={taskConfig?.route || "/"} className={`inline-flex items-center gap-2 text-sm font-semibold ${experience.mutedClass}`}>
          <span aria-hidden>←</span> Back to {taskConfig?.label || "posts"}
        </Link>

        <section className={`mt-6 ${isAporiaImageDetail ? "space-y-8" : "grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"}`}>
          {isAporiaImageDetail ? (
            <>
              <div className={`overflow-hidden rounded-[2.25rem] ${experience.panelClass}`}>
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="secondary" className="inline-flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />
                        {category}
                      </Badge>
                      {location ? (
                        <span className={`inline-flex items-center gap-1 text-sm ${experience.mutedClass}`}>
                          <MapPin className="h-4 w-4" />
                          {location}
                        </span>
                      ) : null}
                    </div>
                    <p className={`mt-6 text-xs font-semibold uppercase tracking-[0.28em] ${experience.mutedClass}`}>
                      Visual branch
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-emerald-950 sm:text-5xl">
                      {post.title}
                    </h1>
                    <p className={`mt-5 max-w-2xl text-sm leading-8 ${experience.mutedClass}`}>
                      A connected gallery detail surface inspired by collection-map browsing, adapted for kennel storytelling and trust-building imagery.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {[
                        content.highlights?.[0] || "Primary image",
                        content.highlights?.[1] || "Breeder notes",
                        website ? "Visit source" : "Profile context",
                      ].map((item) => (
                        <span key={item} className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-950">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 border-t border-emerald-100 bg-[linear-gradient(180deg,#f6fff8_0%,#ecfdf3_100%)] p-6 sm:p-8 lg:border-l lg:border-t-0">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <div className="h-px bg-emerald-200" />
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-800">
                        Connected nodes
                      </span>
                      <div className="h-px bg-emerald-200" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {images.slice(1, 5).map((image, index) => (
                        <div key={`${image}-${index}`} className="overflow-hidden rounded-[1.5rem] border border-emerald-200 bg-white p-2 shadow-sm">
                          <div className={`relative overflow-hidden rounded-[1.1rem] ${index === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
                            <ContentImage src={image} alt={`${post.title} branch ${index + 1}`} fill className="object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="space-y-6">
                  <div className={`overflow-hidden rounded-[2rem] ${experience.panelClass}`}>
                    <div className="relative aspect-[16/10]">
                      <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                    </div>
                  </div>
                  <div className={`rounded-[2rem] p-6 ${experience.panelClass}`}>
                    <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${experience.mutedClass}`}>Caption trail</p>
                    <RichContent html={descriptionHtml} className="mt-4 max-w-none" />
                  </div>
                </div>

                <aside className="space-y-6">
                  <DetailMeta content={content} location={location} website={website} experience={experience} post={post} category={category} />
                  {content.highlights?.length ? (
                    <div className={`rounded-[2rem] p-6 ${experience.panelClass}`}>
                      <p className="text-sm font-semibold text-foreground">Highlights</p>
                      <ul className={`mt-4 space-y-3 text-sm ${experience.mutedClass}`}>
                        {content.highlights.map((item) => (
                          <li key={item} className="rounded-[1rem] border border-emerald-100 bg-emerald-50/80 px-4 py-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </aside>
              </div>
            </>
          ) : (
            <>
          <div className="space-y-6">
            {!isBookmark ? (
              experience.key === "codepixelmedia" ? (
                <div className={`overflow-hidden rounded-[2rem] ${experience.panelClass}`}>
                  <div className="relative aspect-[16/10]">
                    <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${experience.badgeClass}`}>
                        {category}
                      </span>
                      <h1 className="mt-4 text-4xl font-semibold text-white">{post.title}</h1>
                    </div>
                  </div>
                </div>
              ) : experience.key === "radianpark" ? (
                <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
                  <div className={`rounded-[1.75rem] p-5 ${experience.panelClass}`}>
                    <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${experience.mutedClass}`}>Profile strip</p>
                    <div className="mt-5 space-y-3">
                      {["Tasks 148", "Success 94%", "Level Expert"].map((item) => (
                        <div key={item} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-950">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`rounded-[1.75rem] p-4 ${experience.panelClass}`}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem]">
                      <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                    </div>
                  </div>
                </div>
              ) : experience.key === "helloartcity" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {images.slice(0, 2).map((image, index) => (
                    <div key={`${image}-${index}`} className={`overflow-hidden rounded-[1.75rem] ${experience.panelClass}`}>
                      <div className={`relative ${index === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
                        <ContentImage src={image} alt={`${post.title} ${index + 1}`} fill className="object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`overflow-hidden rounded-[2rem] ${experience.panelClass}`}>
                  <TaskImageCarousel images={images} />
                </div>
              )
            ) : null}

            <div className={`rounded-[2rem] p-6 ${experience.panelClass}`}>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="inline-flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  {category}
                </Badge>
                {location ? (
                  <span className={`inline-flex items-center gap-1 text-sm ${experience.mutedClass}`}>
                    <MapPin className="h-4 w-4" />
                    {location}
                  </span>
                ) : null}
                {articleDate ? <span className={`text-sm ${experience.mutedClass}`}>{articleDate}</span> : null}
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                {post.title}
              </h1>

              {isArticle ? (
                <>
                  <p className={`mt-3 text-sm font-medium ${experience.mutedClass}`}>By {articleAuthor}</p>
                  {articleSummary ? <p className={`mt-4 text-sm leading-8 ${experience.mutedClass}`}>{articleSummary}</p> : null}
                  <RichContent html={articleHtml} className="mt-6 leading-8 prose-p:my-5 prose-h2:my-7 prose-h3:my-6" />
                  <div className={`mt-8 rounded-[1.75rem] p-5 ${introCard}`}>
                    <p className="text-sm font-semibold text-foreground">Discussion</p>
                    <div className="mt-4">
                      <ArticleComments slug={post.slug} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <RichContent html={descriptionHtml} className="mt-4 max-w-3xl" />
                  {content.highlights?.length ? (
                    <div className={`mt-6 rounded-[1.75rem] p-5 ${experience.softPanelClass}`}>
                      <p className="text-sm font-semibold text-foreground">Highlights</p>
                      <ul className={`mt-3 space-y-2 text-sm ${experience.mutedClass}`}>
                        {content.highlights.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className={`rounded-[2rem] p-6 ${experience.panelClass}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${experience.mutedClass}`}>
                {experience.label}
              </p>
              <p className="mt-4 text-2xl font-semibold text-foreground">{taskConfig?.label || task}</p>
              <p className={`mt-3 text-sm leading-7 ${experience.mutedClass}`}>
                {experience.heroDescription}
              </p>
            </div>

            <DetailMeta content={content} location={location} website={website} experience={experience} post={post} category={category} />

            {experience.key === "scoreminers" ? (
              <div className={`p-5 ${experience.softPanelClass}`}>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-950">Performance blocks</p>
                <div className="mt-4 grid gap-3">
                  {["Total Tasks 148", "Success 96%", "Level 19"].map((item) => (
                    <div key={item} className="border-[3px] border-slate-950 bg-white px-4 py-3 text-sm font-black uppercase text-slate-950">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`rounded-[1.75rem] p-5 ${experience.softPanelClass}`}>
                <p className="text-sm font-semibold text-foreground">Identity metrics</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    { label: "Total tasks", value: "148" },
                    { label: "Success rate", value: "94%" },
                    { label: "Level", value: "Expert" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[1.25rem] border border-border bg-white/70 px-4 py-3">
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${experience.mutedClass}`}>{item.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
            </>
          )}
        </section>

        {renderSuggestions(experience, related, task, category, taskConfig?.route)}
      </main>
      <Footer />
    </div>
  );
}
