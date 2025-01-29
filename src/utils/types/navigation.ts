interface NavLink {
  name: string;
  href: string;
  showWhen: 'always' | 'authenticated' | 'unauthenticated';
}

interface OnboardingLink extends NavLink {
  withStyle?: boolean;
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
    name: 'Lists',
    href: '/lists',
    showWhen: 'authenticated',
  },
  {
    name: 'Search',
    href: '/search',
    showWhen: 'always',
  },
  {
    name: 'My Profile',
    href: '/profile',
    showWhen: 'authenticated',
  }
];

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
  }
];

const onboardingLinks: OnboardingLink[] = [
  {
    name: 'Get Started',
    href: '/signup',
    showWhen: 'unauthenticated',
    withStyle: false
  },
  {
    name: 'Login',
    href: '/login',
    showWhen: 'unauthenticated',
    withStyle: true
  }
];

export { navigationLinks, onboardingLinks, footerLinks };