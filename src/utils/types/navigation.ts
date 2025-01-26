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

const onboardingLinks: OnboardingLink[] = [
  {
    name: 'Create an account',
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

export { navigationLinks, onboardingLinks };