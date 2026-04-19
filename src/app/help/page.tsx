import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout, warmCardClass, warmCardMutedClass, warmPillClass } from '@/components/marketing/warm-marketing-layout'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/help',
    title: `Help Center | ${SITE_CONFIG.name}`,
    description: `Answers about accounts, uploads, and browsing the ${SITE_CONFIG.name} gallery.`,
  })
}

const topics = [
  {
    title: 'Getting started',
    body: 'Create an account, confirm your email, and tour the gallery tabs. Your login persists locally in this demo so you can hop back in instantly.',
  },
  {
    title: 'Uploading photos',
    body: 'Use the Share flow from the Images section. Add titles, tags, and a short caption—those fields power search and accessibility alt text.',
  },
  {
    title: 'Search & discovery',
    body: 'Search reads titles, summaries, tags, and descriptions. Combine it with category filters on listing pages when they are enabled for your deployment.',
  },
]

const faqs = [
  {
    id: 'faq-gallery-1',
    question: 'How do I reset my local login?',
    answer: 'Open your browser settings, remove site data for this domain, or use the sign-out control in the navigation. Signing in again writes a fresh profile to local storage.',
  },
  {
    id: 'faq-gallery-2',
    question: 'Can I use these photos off-site?',
    answer: 'Please respect each post’s context. Reach out to the original poster or team contact before republishing imagery in fundraising materials.',
  },
  {
    id: 'faq-gallery-3',
    question: 'Where do I report a bug?',
    answer: 'Use the Help form or email your site operator with reproduction steps, browser version, and a screenshot if possible. We prioritize accessibility issues first.',
  },
]

export default function HelpPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Help center"
      title="We are here for the messy questions too"
      description="Browse quick topics, then dig into FAQs. Everything here matches the warm cream, cocoa, and amber system you see on the homepage—so help still feels on-brand."
      actions={
        <Button asChild className="rounded-full bg-[#e68a4f] px-6 text-white hover:bg-[#d97a42]">
          <Link href="/search">Try search</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <div key={topic.title} className={warmCardMutedClass}>
              <span className={warmPillClass}>Guide</span>
              <h2 className="mt-4 text-lg font-semibold text-[#3d291c]">{topic.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#6a5548]">{topic.body}</p>
            </div>
          ))}
        </div>
        <div className={warmCardClass}>
          <h3 className="text-lg font-semibold text-[#3d291c]">FAQ</h3>
          <Accordion type="single" collapsible className="mt-4 w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-[#ebe3d7]">
                <AccordionTrigger className="text-left text-sm font-semibold text-[#3d291c] hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-[#6a5548]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </WarmMarketingLayout>
  )
}
