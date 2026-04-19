import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/privacy',
    title: `Privacy | ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} collects, uses, and protects your information.`,
  })
}

const sections = [
  {
    title: 'What we collect',
    body: 'Account details you provide (name, email), content you upload (photos, captions, tags), and basic technical data (device type, browser, approximate region from IP) to keep the service reliable and secure.',
  },
  {
    title: 'How we use information',
    body: 'To operate the gallery, personalize your experience, send essential service notices, improve search relevance, and detect abuse. We do not sell personal data.',
  },
  {
    title: 'Cookies & storage',
    body: 'We use cookies for session continuity and preferences. Demo deployments may store your mock profile in local storage so you can revisit without retyping credentials.',
  },
  {
    title: 'Your choices',
    body: 'You may request export or deletion of your account data where applicable law allows. Contact the site operator listed in Help to initiate a request.',
  },
  {
    title: 'Children',
    body: 'This site may feature imagery of family pets. Parents or guardians should supervise minors when browsing or posting.',
  },
]

export default function PrivacyPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Privacy"
      title="Privacy, explained in plain language"
      description={`We built ${SITE_CONFIG.name} for trust. This page tracks how we handle data today—if your deployment connects to a master panel, your operator may append additional processor details.`}
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#e8dfd4] bg-white text-[#3d291c] hover:bg-[#fff5eb]">
          <Link href="/cookies">Cookie policy</Link>
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
