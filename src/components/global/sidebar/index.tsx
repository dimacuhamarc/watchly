'use client'

import React from 'react'
import './index.css'
import Link from 'next/link'
import { AUTH_NAV_LINKS } from '~/utils/types/navigation'
import { useAuthenticated } from '~/hooks/useAuth'
import { usePathname } from 'next/navigation'

function Sidebar() {
  const { username, isAuthenticated } = useAuthenticated()
  const pathname = usePathname()

  if (!isAuthenticated || !username) {
    return null
  }

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar">
        {
          AUTH_NAV_LINKS.map((link) => (
            <SidebarNavItem
              key={link.name}
              icon={link.icon}
              href={link.href === '/p/' ? `/p/${username}` : link.href}
              label={link.name}
              active={pathname === link.href || (link.href === '/p/' && pathname.startsWith('/p/'))}
            />
          ))
        }
      </div>
    </div>
  )
}

interface SidebarNavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

function SidebarNavItem({ icon, href, label, active }: SidebarNavItemProps) {
  return (
    <Link prefetch={false} href={href} className={`${active ? 'active' : ''} sidebar-nav-item tooltip tooltip-right`} data-tip={label}>
      <div className="sidebar-icon">{icon}</div>
    </Link>
  )
}

export default Sidebar
