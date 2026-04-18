import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/terms',
    title: `Terms | ${SITE_CONFIG.name}`,
    description: `Terms of service for using ${SITE_CONFIG.name}.`,
  })
}

const sections = [
  {
    title: 'Acceptable use',
    body: 'Treat humans and animals with respect. No harassment, hate speech, illegal content, or attempts to disrupt the service. Photography must honor consent of people depicted.',
  },
  {
    title: 'Your content',
    body: 'You retain rights to media you upload. You grant us a license to host, display, compress, and distribute that content as needed to operate the gallery and related communications.',
  },
  {
    title: 'Accounts',
    body: 'Keep credentials secure. We may suspend accounts that risk the community or violate these terms after reasonable notice when feasible.',
  },
  {
    title: 'Disclaimers',
    body: 'Information on this site is provided as-is. Adoption and care decisions should involve licensed professionals when appropriate.',
  },
]

export default function TermsPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Terms"
      title="Ground rules for a gentle gallery"
      description={`By using ${SITE_CONFIG.name}, you agree to these terms. They prioritize safety, authenticity, and the wellbeing of every dog featured.`}
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="/help">Questions? Ask us</Link>
        </Button>
      }
    >
      <div className={warmCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6a5548]">Last updated · April 18, 2026</p>
        <div className="mt-8 space-y-5">
          {sections.map((section) => (
            <div key={section.title} className={warmCardMutedClass}>
              <h3 className="text-base font-semibold text-[#3d291c]">{section.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#6a5548]">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
