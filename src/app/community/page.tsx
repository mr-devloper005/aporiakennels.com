import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass, warmPillClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { mockCommunityEvents, mockCommunityGroups } from '@/data/mock-data'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/community',
    title: `Community | ${SITE_CONFIG.name}`,
    description: `Gatherings, volunteer circles, and photo walks that keep ${SITE_CONFIG.name} feeling like a neighborhood.`,
  })
}

export default function CommunityPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Together"
      title="Community is more than a comment thread"
      description={`From weekend clean-ups to sunset photo walks, ${SITE_CONFIG.name} grows through people who show up in person. Here is how we stitch online gallery energy with real-world care.`}
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="/help">Get involved</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#3d291c]">Upcoming rhythms</h2>
          <p className="mt-2 text-sm text-[#6a5548]">Sample calendar—swap dates with your chapter lead anytime.</p>
          <div className="mt-6 space-y-4">
            {mockCommunityEvents.map((event) => (
              <div key={event.id} className={warmCardClass}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={warmPillClass}>{event.tag}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a5548]">{event.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-[#3d291c]">{event.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#6a5548]">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#3d291c]">Circles you can join</h2>
          <p className="mt-2 text-sm text-[#6a5548]">Small groups keep logistics light and friendships deep.</p>
          <div className="mt-6 grid gap-4">
            {mockCommunityGroups.map((group) => (
              <div key={group.id} className={warmCardMutedClass}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-[#3d291c]">{group.name}</h3>
                  <span className="text-xs font-semibold text-[#e68a4f]">{group.members.toLocaleString()} members</span>
                </div>
                <p className="mt-2 text-sm text-[#6a5548]">{group.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
