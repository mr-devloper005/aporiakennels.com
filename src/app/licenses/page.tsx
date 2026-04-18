import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/licenses',
    title: `Licenses | ${SITE_CONFIG.name}`,
    description: `Open source acknowledgements for ${SITE_CONFIG.name}.`,
  })
}

const licenses = [
  { name: 'Next.js', detail: 'MIT License — App Router, image optimization, and deployment tooling.' },
  { name: 'React', detail: 'MIT License — UI rendering and server components foundation.' },
  { name: 'Tailwind CSS', detail: 'MIT License — utility-first styling system.' },
  { name: 'Radix UI', detail: 'MIT License — accessible primitives for dialogs, accordions, and more.' },
  { name: 'Lucide', detail: 'ISC License — iconography used across navigation and cards.' },
  { name: 'Embla Carousel', detail: 'MIT License — optional carousel experiences where enabled.' },
]

export default function LicensesPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Licenses"
      title="Standing on generous open source shoulders"
      description={`${SITE_CONFIG.name} bundles many MIT-licensed libraries. We list primary dependencies here; the full graph lives in your lockfile.`}
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="https://github.com" target="_blank" rel="noreferrer">
            View upstream repos
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {licenses.map((item) => (
          <div key={item.name} className={warmCardMutedClass}>
            <h3 className="text-base font-semibold text-[#3d291c]">{item.name}</h3>
            <p className="mt-2 text-sm leading-7 text-[#6a5548]">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className={`${warmCardClass} mt-10 text-sm leading-7 text-[#6a5548]`}>
        Photography and bespoke branding assets may carry their own licenses—check filenames or metadata before reuse. When in doubt,
        contact the {SITE_CONFIG.name} communications desk via Help.
      </div>
    </WarmMarketingLayout>
  )
}
