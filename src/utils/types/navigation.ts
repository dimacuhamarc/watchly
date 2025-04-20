interface NavLink {
  name: string;
  href: string;
  showWhen: 'always' | 'authenticated' | 'unauthenticated';
}

interface OnboardingLink extends NavLink {
  withStyle?: boolean;
  type: 'signup' | 'signin' | 'signout';
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
    href: '/onboarding',
    type: 'signup',
    showWhen: 'unauthenticated',
    withStyle: false
  },
  {
    name: 'Login',
    href: '/onboarding',
    type: 'signin',
    showWhen: 'unauthenticated',
    withStyle: true
  }
  // ,
  // {
  //   name: 'Sign Out',
  //   href: '/api/auth/logout',
  //   type: 'signout',
  //   showWhen: 'authenticated',
  //   withStyle: true
  // }
];

export { navigationLinks, onboardingLinks, footerLinks };