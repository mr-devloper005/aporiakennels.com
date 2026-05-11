import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || ''

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      soft: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      hero: 'bg-[#fbf6ee]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#f9f7f2] text-[#3d291c]',
      panel: 'border border-[#e8dfd4] bg-white',
      soft: 'border border-[#ebe3d7] bg-[#fffefb]',
      muted: 'text-[#6a5548]',
      action: 'bg-[#e68a4f] text-white hover:bg-[#d97a42]',
      hero: 'bg-[linear-gradient(135deg,#fffdf8_0%,#f9f7f2_42%,#f3ebe2_100%)]',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    hero: 'bg-[#f7f1ea]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className={`overflow-hidden rounded-[2rem] p-7 shadow-[0_24px_64px_rgba(15,23,42,0.08)] sm:p-10 ${tone.panel} ${tone.hero}`}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Contact {SITE_CONFIG.name}</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Reach the right team faster, with less back-and-forth.
              </h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>
                Tell us what you are trying to publish, fix, or launch. We route requests by workflow so you get actionable replies instead of generic support loops.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${tone.soft}`}>
                  <Sparkles className="h-4 w-4" />
                  Workflow-specific routing
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${tone.soft}`}>
                  <Mail className="h-4 w-4" />
                  Direct support lane
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${tone.soft}`}>
                  <Phone className="h-4 w-4" />
                  Faster response context
                </span>
              </div>
            </div>
            <div className={`rounded-[1.5rem] p-5 ${tone.soft}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What helps us respond quickly</p>
              <ul className={`mt-4 space-y-3 text-sm leading-7 ${tone.muted}`}>
                <li>Share your objective and expected outcome.</li>
                <li>Include links, screenshots, or page routes if relevant.</li>
                <li>Mention urgency and any launch deadline.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Support lanes</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Pick the lane that matches your goal.</h2>
            </div>
            <div className="space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 shadow-sm ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h3 className="mt-3 text-xl font-semibold">{lane.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 shadow-[0_20px_55px_rgba(15,23,42,0.08)] ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Add enough context and we will follow up through the most relevant support lane.</p>
            {CONTACT_EMAIL ? (
              <div className={`mt-5 rounded-[1.5rem] p-4 ${tone.soft}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${tone.muted}`}>Direct email</p>
                <p className="mt-2 text-sm leading-7">Prefer email? Reach us directly and keep the full conversation in your inbox.</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={`mt-4 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold ${tone.action}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            ) : null}
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-current/15 bg-transparent px-4 text-sm outline-none transition focus:border-current/35" placeholder="Your name" />
              <input
                className="h-12 rounded-xl border border-current/15 bg-transparent px-4 text-sm outline-none transition focus:border-current/35"
                placeholder={CONTACT_EMAIL || 'Email address'}
              />
              <input className="h-12 rounded-xl border border-current/15 bg-transparent px-4 text-sm outline-none transition focus:border-current/35" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-2xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-current/35" placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${tone.action}`}>Send message</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
