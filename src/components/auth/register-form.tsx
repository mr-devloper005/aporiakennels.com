'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

export function RegisterForm({ actionClassName, inputClassName }: { actionClassName: string; inputClassName: string }) {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !password) {
      setError('Fill in your name, email, and password to continue.')
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
      <input
        name="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        className={cn('h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#e68a4f]/40', inputClassName)}
        placeholder="Full name"
        disabled={isLoading}
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        className={cn('h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#e68a4f]/40', inputClassName)}
        placeholder="Email address"
        disabled={isLoading}
      />
      <input
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        className={cn('h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#e68a4f]/40', inputClassName)}
        placeholder="Password"
        disabled={isLoading}
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={isLoading} className={cn('inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:opacity-60', actionClassName)}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  )
}
