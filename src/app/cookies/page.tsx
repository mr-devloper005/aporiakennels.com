import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/cookies',
    title: `Cookies | ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} uses cookies and similar technologies.`,
  })
}

const rows = [
  {
    title: 'Essential cookies',
    body: 'Keep you signed in, protect forms, and maintain security tokens across navigation.',
  },
  {
    title: 'Preference cookies',
    body: 'Remember UI choices such as dismissed banners or filter defaults when we enable them.',
  },
  {
    title: 'Analytics cookies',
    body: 'Optional, privacy-preserving metrics so we know which gallery sections resonate. You can disable these in your browser if you prefer.',
  },
]

export default function CookiesPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Cookies"
      title="Small files, clear intent"
      description={`Cookies help ${SITE_CONFIG.name} feel fast and familiar. We keep the list short and document every category below.`}
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#e8dfd4] bg-white text-[#3d291c] hover:bg-[#fff5eb]">
          <Link href="/privacy">Back to privacy</Link>
        </Button>
      }
    >
      <div className={warmCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5548]">Last updated · April 18, 2026</p>
        <div className="mt-8 space-y-5">
          {rows.map((row) => (
            <div key={row.title} className={warmCardMutedClass}>
              <h3 className="text-base font-semibold text-[#3d291c]">{row.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6a5548]">{row.body}</p>
            </div>
          ))}
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
