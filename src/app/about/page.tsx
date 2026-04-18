import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass, warmPillClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { mockTeamMembers } from '@/data/mock-data'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `Meet the people and purpose behind ${SITE_CONFIG.name}—a warm, image-first gallery for dogs and the humans who love them.`,
  })
}

const milestones = [
  { label: 'Moments shared', value: '1,200+' },
  { label: 'Volunteer hours', value: '4.8k' },
  { label: 'Tail wags (approx.)', value: '∞' },
]

const values = [
  {
    title: 'Care before clicks',
    body: 'Every layout decision keeps dogs, adopters, and families at the center—never noisy feeds or pressure tactics.',
  },
  {
    title: 'Photography with heart',
    body: 'We celebrate natural light, candid joy, and honest storytelling. The gallery is a scrapbook the whole community can browse.',
  },
  {
    title: 'Trust in the open',
    body: 'Clear policies, visible contact paths, and respectful data practices so visitors feel safe sharing their photos.',
  },
]

export default function AboutPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Our story"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a photo-first home for kennel life—daily romps, quiet cuddles, and the small details worth saving. We built it to feel like a warm invitation, not a cold directory.`}
      actions={
        <>
          <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
            <Link href="/images">Open the gallery</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-[#e8dfd4] bg-white text-[#3d291c] hover:bg-[#fff5eb]">
            <Link href="/team">Meet the team</Link>
          </Button>
        </>
      }
      heroAside={
        <div className="flex justify-center lg:justify-end">
          <div className="rounded-2xl border border-[#e8dfd4] bg-white p-5 shadow-[0_22px_55px_rgba(62,40,20,0.1)]">
            <img src="/favicon.png?v=20260418" alt="" width={128} height={128} className="mx-auto rounded-xl" />
            <p className="mt-3 text-center text-xs text-[#6a5548]">Mark + mutts, serif warmth, cream fields—the mark we wear proudly.</p>
          </div>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className={warmCardClass}>
          <span className={warmPillClass}>Why we exist</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d291c]">A gallery built for real life with dogs</h2>
          <p className="mt-4 text-sm leading-7 text-[#6a5548]">
            {SITE_CONFIG.name} started as a simple need: one trustworthy place to collect adoption photos, volunteer snapshots, and
            community memories without losing them in generic social feeds. Today it is a calm, editorial surface where every image gets
            room to breathe—rounded corners, soft shadows, and typography that nods to our serif logo.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#6a5548]">
            Whether you are browsing for joy or sharing a litter update, the experience should feel handcrafted: warm cream backgrounds,
            chocolate-brown type for reading comfort, and amber buttons that signal action without shouting.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {milestones.map((m) => (
              <div key={m.label} className="rounded-[1rem] border border-[#ebe3d7] bg-[#fffefb] px-4 py-4 text-center">
                <div className="text-2xl font-semibold text-[#3d291c]">{m.value}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6a5548]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {values.map((v) => (
            <div key={v.title} className={warmCardMutedClass}>
              <h3 className="text-lg font-semibold text-[#3d291c]">{v.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6a5548]">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#3d291c]">Faces behind the fence</h2>
          <Link href="/careers" className="text-sm font-semibold text-[#e68a4f] hover:underline">
            Join us
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className={`${warmCardClass} transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(62,40,20,0.1)]`}>
              <div className="flex items-center gap-3">
                <img src={member.avatar} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-[#f3ebe2]" width={56} height={56} />
                <div>
                  <p className="text-sm font-semibold text-[#3d291c]">{member.name}</p>
                  <p className="text-xs text-[#6a5548]">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#6a5548]">{member.bio}</p>
              <p className="mt-3 text-xs font-medium text-[#e68a4f]">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
