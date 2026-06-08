import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '@/lib/supabase/auth'
import { isSupabaseConfigured } from '@/lib/supabase/client'
import { assetUrl } from '@/utils/assets'

const inputClass =
  'contact-input-minimal w-full px-0 py-2.5 border-0 border-b border-acll-navy/15 bg-transparent text-acll-navy text-[15px] placeholder-acll-muted/60 focus:outline-none focus:border-acll-navy focus:ring-0 transition-colors'

const labelClass = 'block text-[12px] font-medium text-acll-navy mb-1'

function LoginShell({
  introTitle,
  introDescription,
  children,
}: {
  introTitle: string
  introDescription: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="bg-acll-navy text-white border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 lg:py-6">
          <Link to="/" className="inline-block">
            <img
              src={assetUrl('images/Atlantic logo.png')}
              alt="Atlantic Catering & Logistics"
              className="h-9 w-auto max-h-10 object-contain object-left"
              width={180}
              height={40}
            />
          </Link>
        </div>
      </header>

      <section className="flex-1 flex items-center py-12 lg:py-16 bg-white">
        <div className="w-full max-w-md mx-auto px-5 sm:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-acll-navy mb-3">
            {introTitle}
          </h2>
          <p className="text-[15px] leading-relaxed text-acll-muted mb-8">{introDescription}</p>
          {children}
        </div>
      </section>

      <footer className="border-t border-acll-navy/[0.06] bg-acll-gray/40 py-6">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-[13px] text-acll-muted">
          <p>Atlantic Catering &amp; Logistics Limited</p>
          <Link to="/" className="font-medium text-acll-navy hover:text-acll-green transition-colors">
            ← Back to website
          </Link>
        </div>
      </footer>
    </div>
  )
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <LoginShell
        introTitle="Setup"
        introDescription="The CMS needs your Supabase project URL and anon key before you can sign in."
      >
        <p className="text-[15px] text-acll-navy leading-relaxed">
          Set <code className="rounded bg-acll-gray/50 px-1.5 py-0.5 text-[13px]">VITE_SUPABASE_URL</code> and{' '}
          <code className="rounded bg-acll-gray/50 px-1.5 py-0.5 text-[13px]">VITE_SUPABASE_ANON_KEY</code> in{' '}
          <code className="rounded bg-acll-gray/50 px-1.5 py-0.5 text-[13px]">react-app/.env</code>, then restart
          the dev server.
        </p>
      </LoginShell>
    )
  }

  return (
    <LoginShell
      introTitle="Admin access"
      introDescription="Sign in with your account to edit site content."
    >
      <form onSubmit={handleSubmit} className="contact-form space-y-5" noValidate>
        <div>
          <label className={labelClass} htmlFor="cms-email">
            Email
          </label>
          <input
            id="cms-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
            placeholder="you@atlanticcatering-gh.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="cms-password">
            Password
          </label>
          <input
            id="cms-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClass}
            placeholder="Your password"
            autoComplete="current-password"
            required
          />
        </div>

        {error ? (
          <p className="text-sm text-red-600 border-l-2 border-red-500 pl-3" role="alert">
            {error}
          </p>
        ) : null}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="contact-submit-btn inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium text-white bg-acll-green hover:bg-acll-green/90 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>
    </LoginShell>
  )
}
