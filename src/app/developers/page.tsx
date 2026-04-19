import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { mockApiEndpoints } from '@/data/mock-data'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/developers',
    title: `Developers | ${SITE_CONFIG.name}`,
    description: `Integration notes, public environment variables, and API shapes for ${SITE_CONFIG.name}.`,
  })
}

const envKeys = [
  { key: 'NEXT_PUBLIC_SITE_CODE', detail: 'Identifies this deployment to the master panel feed.' },
  { key: 'NEXT_PUBLIC_MASTER_PANEL_URL', detail: 'Base URL for authenticated content sync (read-only in the browser).' },
  { key: 'NEXT_PUBLIC_FEED_REVALIDATE_SECONDS', detail: 'Optional override for ISR cadence on public pages.' },
]

export default function DevelopersPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Developers"
      title="Build alongside the gallery"
      description="This site is generated from a shared automation base. The sections below document the public contract our Next.js layer expects—no secrets, only browser-safe keys."
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#e8dfd4] bg-white text-[#3d291c] hover:bg-[#fff5eb]">
          <Link href="/status">Check status</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className={warmCardClass}>
          <h2 className="text-lg font-semibold text-[#3d291c]">Public environment keys</h2>
          <p className="mt-2 text-sm leading-7 text-[#6a5548]">
            Values themselves live in your deployment provider—this table is only a reference for engineers wiring a new clone.
          </p>
          <ul className="mt-6 space-y-4">
            {envKeys.map((row) => (
              <li key={row.key} className="rounded-[1rem] border border-[#ebe3d7] bg-[#fffefb] px-4 py-3">
                <code className="text-xs font-semibold text-[#3d291c]">{row.key}</code>
                <p className="mt-2 text-sm text-[#6a5548]">{row.detail}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={warmCardMutedClass}>
          <h2 className="text-lg font-semibold text-[#3d291c]">API reference (sample)</h2>
          <p className="mt-2 text-sm text-[#6a5548]">Shape examples from the template dataset—swap paths when your connector goes live.</p>
          <div className="mt-4 space-y-3">
            {mockApiEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="rounded-[1rem] border border-[#e8dfd4] bg-white px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#3d291c] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{endpoint.method}</span>
                  <code className="text-xs text-[#3d291c]">{endpoint.path}</code>
                </div>
                <p className="mt-2 text-sm text-[#6a5548]">{endpoint.description}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#e68a4f]">{endpoint.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
