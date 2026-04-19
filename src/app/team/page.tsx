import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass, warmPillClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { mockTeamMembers } from '@/data/mock-data'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/team',
    title: `Team | ${SITE_CONFIG.name}`,
    description: `Volunteers, photographers, and caretakers who keep ${SITE_CONFIG.name} running with heart.`,
  })
}

const focusAreas = [
  { title: 'Kennel care', detail: 'Hands-on routines, enrichment, and adoption readiness.' },
  { title: 'Field photography', detail: 'Patient shoots that respect every dog’s comfort zone.' },
  { title: 'Community voice', detail: 'Events, education, and the stories we amplify online.' },
]

export default function TeamPage() {
  return (
    <WarmMarketingLayout
      eyebrow="People"
      title="The team behind the lens"
      description={`${SITE_CONFIG.name} is powered by volunteers and staff who show up early, stay late, and still find time for belly rubs. Here are a few of the humans you will see in our gallery notes and field days.`}
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="/images">See their work</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {focusAreas.map((f) => (
          <div key={f.title} className={warmCardMutedClass}>
            <span className={warmPillClass}>Focus</span>
            <h2 className="mt-4 text-lg font-semibold text-[#3d291c]">{f.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#6a5548]">{f.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {mockTeamMembers.map((member) => (
          <div key={member.id} className={warmCardClass}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <img src={member.avatar} alt="" className="h-28 w-28 shrink-0 rounded-[1.25rem] object-cover ring-2 ring-[#ebe3d7]" width={112} height={112} />
              <div>
                <h3 className="text-xl font-semibold text-[#3d291c]">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#e68a4f]">{member.role}</p>
                <p className="mt-4 text-sm leading-7 text-[#6a5548]">{member.bio}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#6a5548]">{member.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-[1.25rem] border border-[#e8dfd4] bg-[linear-gradient(110deg,#fffefb_0%,#f3ebe2_100%)] p-8 text-center">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d291c]">Want to walk with us?</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#6a5548]">
          We are always looking for photographers, transport volunteers, and gentle storytellers. Tell us how you would like to help—no cold forms, just a conversation.
        </p>
        <Button asChild className="mt-6 rounded-full bg-[#3d291c] px-8 text-white hover:bg-[#2a2118]">
          <Link href="/careers">View openings</Link>
        </Button>
      </div>
    </WarmMarketingLayout>
  )
}
