import React from 'react'
import Sidebar from '~/components/global/sidebar'

function AuthLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-row bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Sidebar />
      <div className="min-h-screen flex-grow bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pl-24 text-white">
        {children}
      </div>
    </div>
  )
}

export default AuthLayoutProvider
