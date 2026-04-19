import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/status',
    title: `Status | ${SITE_CONFIG.name}`,
    description: `Service health for ${SITE_CONFIG.name} web, media, and search surfaces.`,
  })
}

const services = [
  { name: 'Gallery web app', detail: 'SSR + edge caching for marketing pages.', status: 'Operational' },
  { name: 'Image CDN', detail: 'Responsive transforms + blur placeholders.', status: 'Operational' },
  { name: 'Search index', detail: 'ISR refresh + master feed connector.', status: 'Operational' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Thumbnail regeneration lag', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Search ranking drift after deploy', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Status"
      title="Systems that keep tails wagging"
      description="We monitor the surfaces dog families actually touch—fast loads, sharp imagery, and honest incident notes when something wobbles."
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="/help">Report an issue</Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.name} className={warmCardClass}>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" aria-hidden />
              <h2 className="text-lg font-semibold text-[#3d291c]">{service.name}</h2>
            </div>
            <p className="mt-2 text-sm text-[#6a5548]">{service.detail}</p>
            <p className="mt-4 inline-flex rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-emerald-800">{service.status}</p>
          </div>
        ))}
      </div>
      <div className={`${warmCardClass} mt-10`}>
        <h3 className="text-lg font-semibold text-[#3d291c]">Incident history</h3>
        <p className="mt-2 text-sm text-[#6a5548]">Transparent notes for partners who embed our gallery or syndicate stories.</p>
        <div className="mt-6 space-y-3">
          {incidents.map((incident) => (
            <div key={incident.title} className="rounded-[1rem] border border-[#ebe3d7] bg-[#fffefb] px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6a5548]">{incident.date}</div>
              <div className="mt-1 text-sm font-medium text-[#3d291c]">{incident.title}</div>
              <div className="mt-1 text-xs font-semibold text-emerald-700">{incident.status}</div>
            </div>
          ))}
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
