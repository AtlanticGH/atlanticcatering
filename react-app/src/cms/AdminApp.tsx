import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminShell } from '@/cms/components/AdminShell'
import { AdminCollectionPage } from '@/cms/pages/AdminCollectionPage'
import { AdminDashboardPage } from '@/cms/pages/AdminDashboardPage'
import { AdminLoginPage } from '@/cms/pages/AdminLoginPage'
import { AdminMediaPage } from '@/cms/pages/AdminMediaPage'
import { getSession } from '@/lib/supabase/auth'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'authed' | 'guest'>('loading')

  useEffect(() => {
    getSession()
      .then((session) => setStatus(session ? 'authed' : 'guest'))
      .catch(() => setStatus('guest'))
  }, [])

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-acll-gray/35 text-[14px] text-acll-muted">
        Checking session…
      </div>
    )
  }

  if (status === 'guest') {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="media" element={<AdminMediaPage />} />
        <Route path="collections/:id" element={<AdminCollectionPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
