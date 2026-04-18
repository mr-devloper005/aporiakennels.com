import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass, warmPillClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/careers',
    title: `Careers | ${SITE_CONFIG.name}`,
    description: `Volunteer and staff roles that keep ${SITE_CONFIG.name} caring, creative, and camera-ready.`,
  })
}

const roles = [
  {
    title: 'Lead kennel photographer',
    location: 'On-site + remote editing',
    type: 'Volunteer / stipend',
    level: 'Mid',
    blurb: 'Own weekend shoots, mentor new volunteers, and keep our gallery color grade consistent.',
  },
  {
    title: 'Adoption storyteller',
    location: 'Hybrid',
    type: 'Part-time',
    level: 'Junior+',
    blurb: 'Pair bios with imagery, interview fosters, and publish weekly spotlights.',
  },
  {
    title: 'Community logistics lead',
    location: 'Regional hubs',
    type: 'Contract',
    level: 'Senior',
    blurb: 'Coordinate transport days, supply drives, and pop-up micro events with partner rescues.',
  },
]

const benefits = [
  'Mental-health aware scheduling with rest days after big events',
  'Gear stipend for volunteers who complete onboarding',
  'Annual print swap—every contributor receives a physical zine',
  'Direct line to leadership (no ticket black holes)',
]

export default function CareersPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Careers"
      title="Work that smells like cedar shavings"
      description={`${SITE_CONFIG.name} blends nonprofit grit with editorial polish. If you love dogs, daylight, and shipping meaningful stories, you will fit right in.`}
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="/help">Talk with us</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <div key={role.title} className={warmCardClass}>
              <div className="flex flex-wrap gap-2">
                <span className={warmPillClass}>{role.level}</span>
                <span className="rounded-full border border-[#e8dfd4] bg-[#fffefb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6a5548]">{role.type}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#3d291c]">{role.title}</h2>
              <p className="mt-1 text-sm font-medium text-[#e68a4f]">{role.location}</p>
              <p className="mt-3 text-sm leading-7 text-[#6a5548]">{role.blurb}</p>
              <Button asChild variant="outline" className="mt-5 rounded-full border-[#e8dfd4]">
                <Link href="/help">Start a conversation</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className={warmCardMutedClass}>
          <h3 className="text-lg font-semibold text-[#3d291c]">Why {SITE_CONFIG.name}</h3>
          <p className="mt-3 text-sm leading-7 text-[#6a5548]">
            We are small on purpose. That means your photos land in front of families quickly, your ideas shape the roadmap, and your rest is guarded fiercely.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-[#6a5548]">
            {benefits.map((b) => (
              <li key={b} className="rounded-[1rem] border border-[#ebe3d7] bg-white px-4 py-3">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
