import { LuUser, LuLayers, LuHouse, LuSearch, LuGlobe } from 'react-icons/lu'
interface BareNavLink {
  icon?: React.ReactNode
  href: string
  name: string
}

interface NavLink extends BareNavLink {
  showWhen: 'always' | 'authenticated' | 'unauthenticated'
}
interface OnboardingLink extends NavLink {
  withStyle?: boolean
  type: 'signup' | 'signin' | 'signout'
}

const navigationLinks: NavLink[] = [
  {
    name: 'Home',
    href: '/',
    showWhen: 'authenticated',
  },
  {
    name: 'About',
    href: '/about',
    showWhen: 'always',
  },
  {
    name: 'Discover',
    href: '/discover',
    showWhen: 'always',
  },
  {
    name: 'Search',
    href: '/search',
    showWhen: 'always',
  },
  {
    name: 'My Lists',
    href: '/lists',
    showWhen: 'authenticated',
  },
  {
    name: 'My Profile',
    href: '/p/',
    showWhen: 'authenticated',
  },
]

const AUTH_NAV_LINKS: BareNavLink[] = [
  {
    name: 'Home',
    href: '/',
    icon: <LuHouse />,
  },
  {
    name: 'My Profile',
    href: `/p/`,
    icon: <LuUser />,
  },
  {
    name: 'My Lists',
    href: '/lists',
    icon: <LuLayers />,
  },
  {
    name: 'Search',
    href: '/search',
    icon: <LuSearch />,
  },
  {
    name: 'Discover',
    href: '/discover',
    icon: <LuGlobe />,
  },
]

const footerLinks: NavLink[] = [
  {
    name: 'Terms of Service',
    href: '/terms',
    showWhen: 'always',
  },
  {
    name: 'Privacy Policy',
    href: '/privacy',
    showWhen: 'always',
  },
  {
    name: 'About Us',
    href: '/about',
    showWhen: 'always',
  },
  {
    name: 'TMDb',
    href: 'https://www.themoviedb.org/',
    showWhen: 'always',
  },
]

const onboardingLinks: OnboardingLink[] = [
  {
    name: 'Get Started',
    href: '/onboarding',
    type: 'signup',
    showWhen: 'unauthenticated',
    withStyle: false,
  },
  {
    name: 'Login',
    href: '/onboarding',
    type: 'signin',
    showWhen: 'unauthenticated',
    withStyle: true,
  },
]

export {
  navigationLinks,
  AUTH_NAV_LINKS,
  onboardingLinks,
  footerLinks,
}
