import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskListClient } from "@/components/tasks/task-list-client";
import { CategoryFilterForm } from "@/components/tasks/category-filter-form";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import { taskIntroCopy } from "@/config/site.content";
import { getSiteExperience } from "@/lib/site-experience";

function renderHero(
  experience: ReturnType<typeof getSiteExperience>,
  task: TaskKey,
  taskLabel: string,
  description: string,
  normalizedCategory: string,
  route: string
) {
  const filterForm = (
    <div className={`grid gap-3 rounded-[1.75rem] p-5 ${experience.softPanelClass}`}>
      <CategoryFilterForm experience={experience} />
    </div>
  );

  if (experience.key === "tynewebdesign") {
    return (
      <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className={`rounded-[2.25rem] p-8 ${experience.panelClass}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">{description}</h1>
          <p className={`mt-5 max-w-2xl text-sm leading-8 ${experience.mutedClass}`}>{experience.heroDescription}</p>
        </div>
        {filterForm}
      </section>
    );
  }

  if (experience.key === "codepixelmedia") {
    return (
      <section className="mb-12 grid gap-0 overflow-hidden rounded-[2rem] lg:grid-cols-[1fr_1fr]">
        <div className={`p-8 ${experience.panelClass}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">{taskLabel}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">{description}</h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-slate-300">{experience.heroDescription}</p>
        </div>
        <div className="bg-[#eef3ff] p-8">{filterForm}</div>
      </section>
    );
  }

  if (experience.key === "radianpark") {
    return (
      <section className={`mb-12 rounded-[2rem] p-6 ${experience.panelClass}`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">{description}</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Tasks", "Success", "Level"].map((item, index) => (
              <div key={item} className="rounded-[1.25rem] border border-zinc-200 bg-zinc-50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{item}</p>
                <p className="mt-2 text-2xl font-semibold text-zinc-950">{["148", "94%", "Expert"][index]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (experience.key === "lashisking") {
    return (
      <section className={`mb-12 rounded-[2.5rem] p-8 ${experience.panelClass}`}>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-rose-950">{description}</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${experience.mutedClass}`}>{experience.heroDescription}</p>
          </div>
          {filterForm}
        </div>
      </section>
    );
  }

  if (experience.key === "scoreminers") {
    return (
      <section className="mb-12 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className={`p-6 ${experience.panelClass}`}>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-950">{experience.heroEyebrow}</p>
          <h1 className="mt-4 text-4xl font-black uppercase text-slate-950">{description}</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["142", "96%", "19"].map((item, index) => (
            <div key={item} className={`p-6 ${experience.softPanelClass}`}>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-950">{["Total tasks", "Success rate", "Level"][index]}</p>
              <p className="mt-3 text-4xl font-black text-slate-950">{item}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (experience.key === "linedesing") {
    return (
      <section className={`mb-12 rounded-[2rem] p-6 ${experience.panelClass}`}>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr_300px]">
          <div className="border-b border-sky-200 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Mode</p>
            <p className="mt-3 text-lg font-semibold text-slate-950">Blueprint</p>
          </div>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950">{description}</h1>
          </div>
          {filterForm}
        </div>
      </section>
    );
  }

  if (experience.key === "helloartcity") {
    return (
      <section className="mb-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className={`relative overflow-hidden rounded-[2rem] p-8 ${experience.panelClass}`}>
          <div className="absolute right-6 top-6 rotate-[8deg] rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-900">Live wall</div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">{experience.heroEyebrow}</p>
          <h1 className="mt-4 text-5xl font-bold tracking-[-0.05em] text-stone-950">{description}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-stone-700">{experience.heroDescription}</p>
        </div>
        {filterForm}
      </section>
    );
  }

  if (experience.key === "housesdecors") {
    return (
      <section className={`mb-12 rounded-[2rem] p-8 ${experience.panelClass}`}>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-amber-950">{description}</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`rounded-[1.5rem] p-5 ${experience.softPanelClass}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-900/60">Task style</p>
              <p className="mt-2 text-xl font-semibold text-amber-950">Material panels</p>
            </div>
            {filterForm}
          </div>
        </div>
      </section>
    );
  }

  if (experience.key === "aporiakennels") {
    const clusterLabels =
      task === "profile"
        ? ["Kennel profiles", "Health notes", "Pedigree links", "Trust signals"]
        : ["Gallery paths", "Litter moments", "Show ring captures", "Daily updates"];

    return (
      <section className={`mb-12 overflow-hidden rounded-[2.25rem] p-8 ${experience.panelClass}`}>
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-emerald-950">{description}</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${experience.mutedClass}`}>
              A connected browsing surface inspired by clustered collection boards, tuned for kennel images and breeder profiles.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Champion lines", "Daily field notes", "Image-backed trust"].map((item) => (
                <span key={item} className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-950">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            <div className="relative min-h-[280px] rounded-[2rem] border border-emerald-200 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_40%),linear-gradient(180deg,#ffffff_0%,#f0fdf4_100%)] p-6">
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white bg-emerald-900 shadow-[0_18px_40px_rgba(22,101,52,0.16)]" />
              <div className="absolute left-[14%] top-[18%] h-24 w-24 rounded-full border border-emerald-200 bg-white shadow-sm" />
              <div className="absolute right-[12%] top-[16%] h-20 w-20 rounded-full border border-emerald-200 bg-emerald-50 shadow-sm" />
              <div className="absolute bottom-[14%] left-[18%] h-20 w-20 rounded-full border border-emerald-200 bg-lime-50 shadow-sm" />
              <div className="absolute bottom-[14%] right-[18%] h-24 w-24 rounded-full border border-emerald-200 bg-white shadow-sm" />
              <div className="absolute left-[28%] top-[34%] h-px w-[24%] -rotate-[22deg] bg-emerald-300" />
              <div className="absolute right-[27%] top-[33%] h-px w-[24%] rotate-[22deg] bg-emerald-300" />
              <div className="absolute bottom-[32%] left-[29%] h-px w-[24%] rotate-[24deg] bg-emerald-300" />
              <div className="absolute bottom-[32%] right-[29%] h-px w-[24%] -rotate-[24deg] bg-emerald-300" />
              <div className="relative grid min-h-[248px] place-items-center">
                <div className="rounded-full bg-white px-6 py-3 text-center shadow-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-700">{taskLabel}</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-950">Connected collection</p>
                </div>
              </div>
              {clusterLabels.map((item, index) => (
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
            {filterForm}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`mb-12 rounded-[2.25rem] p-8 ${experience.panelClass}`}>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${experience.mutedClass}`}>{experience.heroEyebrow}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-slate-950">{description}</h1>
          <p className={`mt-5 max-w-2xl text-sm leading-8 ${experience.mutedClass}`}>{experience.heroDescription}</p>
        </div>
        {filterForm}
      </div>
    </section>
  );
}

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task);
  const posts = await fetchTaskPosts(task, 30);
  const normalizedCategory = category ? normalizeCategory(category) : "all";
  const intro = taskIntroCopy[task];
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const experience = getSiteExperience(SITE_CONFIG.baseUrl);
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || "/posts"}/${post.slug}`,
    name: post.title,
  }));

  return (
    <div className={`min-h-screen bg-[#fbf9f4] ${experience.fontClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SchemaJsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
            url: `${baseUrl}${taskConfig?.route || ""}`,
            hasPart: schemaItems,
          }}
        />

        {renderHero(
          experience,
          task,
          taskConfig?.label || task,
          taskConfig?.description || "Latest posts",
          normalizedCategory,
          taskConfig?.route || "#"
        )}

        {intro ? (
          <section className={`mb-10 rounded-[2rem] p-6 ${experience.panelClass}`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${experience.mutedClass}`}>{intro.title}</p>
                {intro.paragraphs.slice(0, 2).map((paragraph) => (
                  <p key={paragraph.slice(0, 30)} className={`mt-4 max-w-3xl text-sm leading-8 ${experience.mutedClass}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={`rounded-[1.5rem] p-5 ${experience.softPanelClass}`}>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <LayoutGrid className="h-4 w-4" />
                  Surface notes
                </div>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <Link href={taskConfig?.route || "#"} className={`inline-flex items-center gap-2 ${experience.mutedClass}`}>
                    Open current collection <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/search" className={`inline-flex items-center gap-2 ${experience.mutedClass}`}>
                    Search across tasks <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Loading posts...</div>}>
          <TaskListClient task={task} initialPosts={posts} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
