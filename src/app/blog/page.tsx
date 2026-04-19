import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmPillClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/blog',
    title: `Stories | ${SITE_CONFIG.name}`,
    description: `Field notes, adoption updates, and photo tips from the ${SITE_CONFIG.name} community.`,
  })
}

const stories = [
  {
    tag: 'Field notes',
    title: 'Golden hour at the play yard',
    date: 'April 8, 2026',
    excerpt: 'How we schedule shoots so shy dogs get soft light, familiar handlers, and zero rush.',
    read: '5 min read',
  },
  {
    tag: 'Adoption',
    title: 'What we learned from twelve spring adoptions',
    date: 'March 22, 2026',
    excerpt: 'Tiny details—leash tension, treat choice, first-night crates—that made transitions smoother.',
    read: '7 min read',
  },
  {
    tag: 'Behind the camera',
    title: 'Gear we actually carry in the kennel',
    date: 'March 4, 2026',
    excerpt: 'Weather-sealed bodies, quiet shutters, and the one lens we reach for when pens get muddy.',
    read: '4 min read',
  },
]

export default function BlogPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Stories"
      title="Notes from the kennel desk"
      description="Longer reads for anyone who loves dogs, light, and the craft of showing both honestly. New essays land here before they echo across the gallery."
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="/images">Browse photos</Link>
        </Button>
      }
    >
      <div className="grid gap-8">
        {stories.map((post) => (
          <article key={post.title} className={`${warmCardClass} transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(62,40,20,0.1)]`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className={warmPillClass}>{post.tag}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a5548]">{post.date}</span>
              <span className="text-xs text-[#6a5548]">{post.read}</span>
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d291c]">{post.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#6a5548]">{post.excerpt}</p>
            <div className="mt-5">
              <Link href="/blog" className="text-sm font-semibold text-[#e68a4f] hover:underline">
                Keep reading (full archive coming soon)
              </Link>
            </div>
          </article>
        ))}
      </div>
    </WarmMarketingLayout>
  )
}
