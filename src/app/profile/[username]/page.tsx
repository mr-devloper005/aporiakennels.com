import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, CheckCircle2, Globe, Layers3, Sparkles, Trophy } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { RichContent, formatRichHtml } from "@/components/shared/rich-content";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import { getSiteExperience } from "@/lib/site-experience";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

function renderStats(experience: ReturnType<typeof getSiteExperience>) {
  const stats = [
    { label: "Total tasks", value: "148", icon: Layers3 },
    { label: "Success rate", value: "94%", icon: CheckCircle2 },
    { label: "Level", value: "Expert", icon: Trophy },
  ];

  if (experience.key === "scoreminers") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="border-[3px] border-slate-950 bg-[#fff5b4] px-4 py-4 shadow-[6px_6px_0_rgba(15,23,42,0.9)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-slate-950">
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
              <p className="mt-3 text-3xl font-black uppercase text-slate-950">{item.value}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (experience.key === "radianpark") {
    return (
      <div className="flex flex-wrap gap-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm">
              <Icon className="h-4 w-4 text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-950">{item.value}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{item.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className={`rounded-[1.5rem] p-4 ${experience.softPanelClass}`}>
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] ${experience.mutedClass}`}>
              <Icon className="h-4 w-4" />
              {item.label}
            </div>
            <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) notFound();

  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const experience = getSiteExperience(SITE_CONFIG.baseUrl);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Profiles", item: `${baseUrl}/profile` },
      { "@type": "ListItem", position: 3, name: brandName, item: `${baseUrl}/profile/${post.slug}` },
    ],
  };

  const coverUrl =
    typeof content.images?.[0] === "string"
      ? content.images[0]
      : typeof content.logo === "string"
        ? content.logo
        : logoUrl;

  return (
    <div className={`min-h-screen ${experience.pageClass} ${experience.fontClass}`}>
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {experience.key === "tynewebdesign" ? (
          <section className={`mx-auto max-w-5xl overflow-hidden rounded-[2.4rem] ${experience.panelClass}`}>
            <div className="relative h-52 sm:h-64">
              {coverUrl ? (
                <ContentImage src={coverUrl} alt={`${brandName} cover`} fill className="object-cover" sizes="100vw" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-cyan-100" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            </div>
            <div className="relative px-6 pb-10 pt-0 md:px-10">
              <div className="-mt-16 flex flex-col items-center gap-6 md:flex-row md:items-end">
                <div className="relative h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-xl">
                  {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                </div>
                <div className="min-w-0 flex-1 text-center md:text-left">
                  <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${experience.mutedClass}`}>Floating identity card</p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-foreground">{brandName}</h1>
                  {domain ? <p className={`mt-2 text-sm ${experience.mutedClass}`}>{domain}</p> : null}
                </div>
              </div>
              <div className="mt-8">{renderStats(experience)}</div>
            </div>
          </section>
        ) : experience.key === "codepixelmedia" ? (
          <section className="overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className={`p-8 ${experience.panelClass}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Split profile</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-white">{brandName}</h1>
              {domain ? <p className="mt-3 text-sm text-slate-300">{domain}</p> : null}
              <div className="mt-8">{renderStats(experience)}</div>
            </div>
            <div className="grid bg-[#eef3ff] p-8">
              <div className="grid gap-5 rounded-[1.75rem] border border-white bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
                  {coverUrl ? <ContentImage src={coverUrl} alt={`${brandName} cover`} fill className="object-cover" /> : null}
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-[1.5rem] bg-slate-100">
                    {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Task data side</p>
                    <p className="mt-1 text-lg font-semibold text-slate-950">Profile assets and trust signals</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : experience.key === "radianpark" ? (
          <section className={`rounded-[2rem] p-6 ${experience.panelClass}`}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-zinc-200 bg-zinc-50 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">Signal bar</p>
                  <h1 className="mt-2 text-3xl font-semibold text-zinc-950">{brandName}</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  {renderStats(experience)}
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-zinc-100">
                  {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                </div>
                <div className={`rounded-[1.75rem] p-6 ${experience.softPanelClass}`}>
                  <p className={`text-sm leading-8 ${experience.mutedClass}`}>Minimal header, denser stats, and a clearer trust-first profile scan.</p>
                </div>
              </div>
            </div>
          </section>
        ) : experience.key === "aporiakennels" ? (
          <section className={`overflow-hidden rounded-[2.25rem] ${experience.panelClass}`}>
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 sm:p-8">
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${experience.mutedClass}`}>Profile collection</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-emerald-950 sm:text-5xl">{brandName}</h1>
                {domain ? (
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm text-emerald-950">
                    <Globe className="h-4 w-4" />
                    {domain}
                  </div>
                ) : null}
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${experience.mutedClass}`}>
                  A connected breeder profile surface with one main identity node and supporting trust branches around it.
                </p>
                <div className="mt-8">{renderStats(experience)}</div>
              </div>
              <div className="relative min-h-[340px] border-t border-emerald-100 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_36%),linear-gradient(180deg,#ffffff_0%,#f0fdf4_100%)] p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white bg-emerald-900 shadow-[0_18px_40px_rgba(22,101,52,0.16)]" />
                <div className="absolute left-[14%] top-[16%] h-24 w-24 rounded-full border border-emerald-200 bg-white shadow-sm" />
                <div className="absolute right-[12%] top-[14%] h-20 w-20 rounded-full border border-emerald-200 bg-emerald-50 shadow-sm" />
                <div className="absolute bottom-[14%] left-[16%] h-20 w-20 rounded-full border border-emerald-200 bg-lime-50 shadow-sm" />
                <div className="absolute bottom-[12%] right-[18%] h-24 w-24 rounded-full border border-emerald-200 bg-white shadow-sm" />
                <div className="absolute left-[28%] top-[34%] h-px w-[24%] -rotate-[22deg] bg-emerald-300" />
                <div className="absolute right-[27%] top-[33%] h-px w-[24%] rotate-[22deg] bg-emerald-300" />
                <div className="absolute bottom-[32%] left-[29%] h-px w-[24%] rotate-[24deg] bg-emerald-300" />
                <div className="absolute bottom-[32%] right-[29%] h-px w-[24%] -rotate-[24deg] bg-emerald-300" />
                <div className="relative grid min-h-[276px] place-items-center">
                  <div className="relative h-36 w-36 overflow-hidden rounded-full border-8 border-white bg-white shadow-xl">
                    {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                  </div>
                </div>
                {["Health tested", "Photo-led trust", "Connected updates", "Direct profile"].map((item, index) => (
                  <div
                    key={item}
                    className={`absolute rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                      index % 2 === 0 ? "bg-white text-emerald-950" : "bg-emerald-100 text-emerald-900"
                    }`}
                    style={
                      [
                        { left: "6%", top: "12%" },
                        { right: "4%", top: "14%" },
                        { left: "8%", bottom: "10%" },
                        { right: "9%", bottom: "8%" },
                      ][index]
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className={`rounded-[2.2rem] p-8 ${experience.panelClass}`}>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="space-y-6">
                <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
                <h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">{brandName}</h1>
                {domain ? (
                  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${experience.softPanelClass}`}>
                    <Globe className="h-4 w-4" />
                    {domain}
                  </div>
                ) : null}
                {renderStats(experience)}
              </div>
              <div className="grid gap-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted">
                  {coverUrl ? <ContentImage src={coverUrl} alt={`${brandName} cover`} fill className="object-cover" /> : null}
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] bg-white shadow-lg">
                    {logoUrl ? <ContentImage src={logoUrl} alt={brandName} fill className="object-cover" /> : null}
                  </div>
                  <div className={`rounded-[1.5rem] p-4 ${experience.softPanelClass}`}>
                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] ${experience.mutedClass}`}>
                      <Sparkles className="h-4 w-4" />
                      Direct-link identity surface
                    </div>
                    <p className="mt-2 text-sm text-foreground">This profile is built to make the layout shift immediate and unmistakable.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <RichContent
            html={descriptionHtml}
            className={`mx-auto rounded-[2rem] p-6 prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold ${experience.panelClass}`}
          />

          <aside className="space-y-5">
            <div className={`rounded-[2rem] p-6 ${experience.softPanelClass}`}>
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] ${experience.mutedClass}`}>
                <BarChart3 className="h-4 w-4" />
                Profile rhythm
              </div>
              <p className="mt-4 text-lg font-semibold text-foreground">{experience.label}</p>
              <p className={`mt-3 text-sm leading-7 ${experience.mutedClass}`}>
                Each site now treats the identity card and result sections differently so the jump between domains feels obvious.
              </p>
            </div>

            {website ? (
              <Button asChild className={`w-full ${experience.buttonClass}`}>
                <Link href={website} target="_blank" rel="noopener noreferrer">
                  Visit website
                </Link>
              </Button>
            ) : null}
          </aside>
        </section>

        {suggestedArticles.length ? (
          <section className="mt-14">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className={`text-sm font-semibold ${experience.mutedClass}`}>
                View all
              </Link>
            </div>

            {experience.key === "codepixelmedia" || experience.key === "helloartcity" ? (
              <div className="flex gap-5 overflow-x-auto pb-2">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <div key={article.id} className="min-w-[280px] max-w-[320px] flex-none">
                    <TaskPostCard post={article} href={buildPostUrl("article", article.slug)} compact />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <TaskPostCard
                    key={article.id}
                    post={article}
                    href={buildPostUrl("article", article.slug)}
                    compact
                  />
                ))}
              </div>
            )}
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
