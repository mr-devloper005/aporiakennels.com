import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const shell = 'min-h-screen bg-[#f9f7f2] text-[#3d291c]'
const hero =
  'border-b border-[#ebe3d7] bg-[linear-gradient(135deg,#fffdf8_0%,#f9f7f2_42%,#f3ebe2_100%)]'

/** Shared surface styles for marketing pages (matches homepage). */
export const warmCardClass =
  'rounded-[1.15rem] border border-[#e8dfd4] bg-white p-6 shadow-[0_18px_50px_rgba(62,40,20,0.06)]'
export const warmCardMutedClass = 'rounded-[1.15rem] border border-[#ebe3d7] bg-[#fffefb] p-5'
export const warmPillClass =
  'inline-flex rounded-full bg-[#e68a4f] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white'

export function WarmMarketingLayout({
  eyebrow,
  title,
  description,
  actions,
  heroAside,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  heroAside?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={shell}>
      <NavbarShell />
      <main>
        <section className={hero}>
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
            <div className="max-w-2xl flex-1">
              {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#6a5548]">{eyebrow}</p> : null}
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.03em] text-[#3d291c] sm:text-4xl lg:text-[2.65rem]">
                {title}
              </h1>
              {description ? <p className="mt-4 text-base leading-8 text-[#6a5548]">{description}</p> : null}
              {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
            </div>
            {heroAside ? <div className="shrink-0 lg:max-w-sm">{heroAside}</div> : null}
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
