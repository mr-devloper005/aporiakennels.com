import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Compass, FileText, Heart, Image as ImageIcon, LayoutGrid, MapPin, Play, ShieldCheck, Sparkles, Star, Tag, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  comment: FileText,
  pdf: FileText,
  org: Building2,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function postTaskKey(post: SitePost, fallback: TaskKey): TaskKey {
  return resolveTaskKey((post as SitePost & { task?: unknown }).task, fallback)
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#fbf6ee] text-[#241711]',
    panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
    soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#241711] text-[#fff1e2]',
    action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    actionAlt: 'border border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#f9f7f2] text-[#3d291c]',
    panel: 'border border-[#e8dfd4] bg-white shadow-[0_24px_70px_rgba(62,40,20,0.07)]',
    soft: 'border border-[#ebe3d7] bg-[#fffefb]',
    muted: 'text-[#6a5548]',
    title: 'text-[#3d291c]',
    badge: 'bg-[#e68a4f] text-white',
    action: 'bg-[#e68a4f] text-white shadow-[0_14px_40px_rgba(230,138,79,0.35)] hover:bg-[#d97a42]',
    actionAlt: 'border border-[#e8dfd4] bg-white text-[#3d291c] hover:bg-[#fff5eb]',
    accent: 'text-[#e68a4f]',
    heroWash: 'bg-[linear-gradient(135deg,#fffdf8_0%,#f9f7f2_42%,#f3ebe2_100%)]',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = postTaskKey(post, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || (post as SitePost & { task?: string }).task || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              Reading-first publication
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Essays, analysis, and slower reading designed like a publication, not a dashboard.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                About the publication
              </Link>
            </div>
          </div>

          <aside className={`rounded-[2rem] p-6 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Inside this issue</p>
            <div className="mt-5 space-y-5">
              {side.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Feature</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-12 overflow-hidden rounded-[2.5rem] ${tone.panel}`}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Lead story</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 ${tone.muted}`}>{lead.summary || 'A more deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className={`rounded-[1.8rem] p-6 ${tone.soft}`}>
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 12) : articlePosts.slice(0, 12)
  const mosaic = gallery.slice(0, 5)
  const creators = profilePosts.slice(0, 3)
  const profileEnabled = SITE_CONFIG.tasks.some((t) => t.key === 'profile' && t.enabled)
  const featurePosts = gallery.slice(0, 4)
  const storyPosts = gallery.slice(0, 3)
  const spotlight = gallery[0]
  const offerTiles = [
    { title: 'Browse the gallery', href: primaryTask?.route || '/images', sub: 'Scroll the full image library' },
    { title: 'Search photos', href: '/search', sub: 'Find moments by title or tag' },
    { title: 'Share a photo', href: '/create/image', sub: 'Add a new image to the collection' },
    { title: 'Our story', href: '/about', sub: 'Why we built this gallery' },
  ]

  return (
    <main className={tone.shell}>
      <section className={`${tone.heroWash} border-b border-[#ebe3d7]`}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <ImageIcon className="h-3.5 w-3.5" />
                It starts with the dogs
              </span>
              <h1 className={`mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[3.15rem] ${tone.title}`}>
                Find your <span className={tone.accent}>perfect moment</span> — let&apos;s get <span className={tone.accent}>started</span>
              </h1>
              <p className={`mt-6 max-w-xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${tone.action}`}>
                  Meet the gallery
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {profileEnabled ? (
                  <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${tone.actionAlt}`}>
                    Meet the team
                  </Link>
                ) : (
                  <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${tone.actionAlt}`}>
                    Search images
                  </Link>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {mosaic.map((post, index) => (
                <Link
                  key={post.id}
                  href={getTaskHref(postTaskKey(post, 'image'), post.slug)}
                  className={
                    index === 0
                      ? `col-span-2 row-span-2 overflow-hidden rounded-[1.75rem] shadow-[0_22px_60px_rgba(62,40,20,0.12)] ring-1 ring-[#e8dfd4] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(62,40,20,0.16)]`
                      : `overflow-hidden rounded-[1.1rem] shadow-sm ring-1 ring-[#ebe3d7] transition hover:-translate-y-0.5 hover:shadow-md`
                  }
                >
                  <div className={index === 0 ? 'relative h-[min(380px,52vw)] sm:h-[400px]' : 'relative h-[140px] sm:h-[168px]'}>
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 hover:scale-[1.03]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${tone.muted}`}>A small intro</p>
        <h2 className={`mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl ${tone.accent}`}>The love part is easy. With us, so is the care.</h2>
        <p className={`mt-6 text-base leading-8 ${tone.muted}`}>
          This gallery is built for warm, honest photography—daily life with the dogs, candid smiles, and the little details you want to remember. Browse quietly, share generously, and keep every image close at hand.
        </p>
        <Link href="/about" className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${tone.action}`}>
          Read more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className={`relative overflow-hidden rounded-[1.5rem] shadow-[0_30px_80px_rgba(62,40,20,0.12)] ring-1 ring-[#e8dfd4] ${tone.panel}`}>
          <div className="relative aspect-video w-full min-h-[220px]">
            <ContentImage
              src={spotlight ? getPostImage(spotlight) : '/placeholder.svg?height=900&width=1600'}
              alt={spotlight?.title || 'Featured gallery moment'}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d291c]/55 via-transparent to-transparent" />
            <button type="button" className="absolute inset-0 flex items-center justify-center" aria-label="Play highlight reel">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/92 text-[#e68a4f] shadow-lg ring-2 ring-white/80 transition hover:scale-105">
                <Play className="ml-1 h-7 w-7 fill-current" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-[#ebe3d7] bg-[#fffefb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${tone.muted}`}>It&apos;s all about the dogs</p>
              <h2 className={`mt-2 text-3xl font-semibold tracking-[-0.04em] ${tone.title}`}>Moments worth saving</h2>
            </div>
            <Link href={primaryTask?.route || '/images'} className={`text-sm font-semibold ${tone.accent} hover:underline`}>
              View all photos
            </Link>
          </div>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
            {gallery.slice(0, 8).map((post) => (
              <Link
                key={post.id}
                href={getTaskHref(postTaskKey(post, 'image'), post.slug)}
                className="relative h-44 w-64 shrink-0 snap-start overflow-hidden rounded-[1rem] ring-1 ring-[#e8dfd4] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className={`text-center text-[11px] font-semibold uppercase tracking-[0.26em] ${tone.muted}`}>What we offer</p>
        <h2 className={`mt-3 text-center text-3xl font-semibold tracking-[-0.04em] ${tone.title}`}>Pick your next step</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {offerTiles.map((tile, tileIndex) => (
            <Link key={tile.title} href={tile.href} className="group relative min-h-[200px] overflow-hidden rounded-[1.25rem] ring-1 ring-[#e8dfd4] shadow-[0_18px_50px_rgba(62,40,20,0.08)]">
              <ContentImage
                src={featurePosts[tileIndex] ? getPostImage(featurePosts[tileIndex]!) : '/placeholder.svg?height=600&width=900'}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1f14]/88 via-[#2c1f14]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">{tile.sub}</p>
                <p className="mt-2 text-lg font-semibold tracking-wide">{tile.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#f3ebe2]/60 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${tone.muted}`}>Our community talks</p>
            <div className="mt-3 flex gap-1 text-[#e68a4f]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className={`mt-6 text-lg leading-8 ${tone.title}`}>
              “We come back whenever we need a calm place to look at photos. It feels intentional—not like another noisy feed.”
            </p>
            <p className={`mt-4 text-sm font-medium ${tone.muted}`}>— Aporia families</p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full ring-4 ring-white shadow-xl">
            {gallery[1] ? (
              <ContentImage src={getPostImage(gallery[1])} alt="Community highlight" fill className="object-cover" />
            ) : (
              <ContentImage src="/placeholder.svg?height=800&width=800" alt="" fill className="object-cover" />
            )}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[1.5rem] ring-1 ring-[#e8dfd4] shadow-[0_28px_80px_rgba(62,40,20,0.15)]">
          <div className="relative min-h-[320px] w-full">
            <ContentImage
              src={gallery[2] ? getPostImage(gallery[2]) : '/placeholder.svg?height=800&width=1600'}
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#3d291c]/55" />
            <div className="relative z-[1] flex min-h-[320px] flex-col items-start justify-center px-8 py-12 sm:px-14">
              <span className={`inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white`}>
                <Heart className="h-3.5 w-3.5" />
                Can you help?
              </span>
              <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Every photo helps someone smile a little wider.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/85">Share a new image, invite a friend, or keep exploring—the gallery grows with you.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-[#e68a4f] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#d97a42]">
                  Join the gallery
                  <Sparkles className="h-4 w-4" />
                </Link>
                <Link href="/help" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15">
                  How it works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${tone.muted}`}>Latest from the lens</p>
            <h2 className={`mt-2 text-2xl font-semibold tracking-[-0.03em] ${tone.title}`}>Fresh uploads</h2>
          </div>
          <Link href={primaryTask?.route || '/images'} className={`text-sm font-semibold ${tone.accent} hover:underline`}>
            See everything
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {storyPosts.map((post) => (
            <Link key={post.id} href={getTaskHref(postTaskKey(post, 'image'), post.slug)} className={`overflow-hidden rounded-[1.15rem] ${tone.panel} transition hover:-translate-y-1`}>
              <div className="relative aspect-[16/11] w-full">
                <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className={`text-xs uppercase tracking-[0.18em] ${tone.muted}`}>
                  {new Date(post.updatedAt || post.createdAt || new Date().toISOString()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {profileEnabled && creators.length ? (
        <section className={`border-t border-[#ebe3d7] py-14 ${tone.soft}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">People behind the lens</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Friendly faces, familiar places.</h2>
                <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>Follow the humans who keep the dogs happy, healthy, and camera-ready.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {creators.map((post) => (
                  <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                    <div className="relative h-40 overflow-hidden rounded-[1.2rem] ring-1 ring-[#ebe3d7]">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Profile and story surface.'}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(postTaskKey(post, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
