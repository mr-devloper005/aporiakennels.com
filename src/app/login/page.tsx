import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LoginForm } from '@/components/auth/login-form'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f8fbff] text-slate-950',
      panel: 'border border-slate-200 bg-white',
      side: 'border border-slate-200 bg-slate-50',
      muted: 'text-slate-600',
      action: 'bg-slate-950 text-white hover:bg-slate-800',
      input: 'border border-slate-200 bg-white text-slate-950',
      icon: Building2,
      title: 'Access your business dashboard',
      body: 'Manage listings, verification details, contact info, and local discovery surfaces from one place.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
      icon: FileText,
      title: 'Sign in to your publication workspace',
      body: 'Draft, review, and publish long-form work with the calmer reading system intact.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#f9f7f2] text-[#3d291c]',
      panel: 'border border-[#e8dfd4] bg-white shadow-[0_22px_55px_rgba(62,40,20,0.07)]',
      side: 'border border-[#ebe3d7] bg-[#fffefb]',
      muted: 'text-[#6a5548]',
      action: 'bg-[#e68a4f] text-white hover:bg-[#d97a42]',
      input: 'border border-[#e8dfd4] bg-white text-[#3d291c]',
      icon: ImageIcon,
      title: 'Welcome back to the gallery',
      body: 'Sign in to sync your session across devices. Your profile stays saved locally in this demo so you can jump right back into the images you care about.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    input: 'border border-[#ddcdbd] bg-white text-[#261811]',
    icon: Bookmark,
    title: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Cleaner product-specific workflows', 'Palette and layout matched to the site family', 'Fewer repeated admin patterns'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
            <LoginForm actionClassName={config.action} inputClassName={config.input} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
