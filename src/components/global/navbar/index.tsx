"use client";

import Link from "next/link";
import Image from "next/image";
import { navigationLinks, onboardingLinks } from "~/utils/types/navigation";
import { useState, useEffect } from "react";
import { useAuthenticated } from "~/hooks/useAuth";

type NavbarProps = {
  options?: {
    logoOnly?: boolean;
    mainLinks?: boolean;
    onboardingLinks?: boolean;
  }
}

export default function Navbar({ options }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { username, isAuthenticated, cookiesLoaded } = useAuthenticated();
  const [authChecked, setAuthChecked] = useState(false);

  // Set authChecked to true once authentication state is determined
  useEffect(() => {
    setAuthChecked(true);
  }, [isAuthenticated]);

  // Scroll control effect
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // For the main container, make it initially hidden via CSS
  // This prevents content flash before JS loads
  return (
    <div className={`w-full backdrop-blur-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className={`w-2/3 mx-auto flex flex-row ${options?.logoOnly ? 'justify-center' : 'justify-center md:justify-between'} items-center px-10 py-8`}>
        <Link className="text-3xl font-bold" href="/">
          <Image src={"/assets/brand-light.svg"} alt="Brand" width={144} height={37} priority />
        </Link>
        {!options?.logoOnly && (
          <>
            <div className="hidden md:flex flex-row items-center gap-4">
              {isAuthenticated ? (
                  // Authenticated user links
                  navigationLinks.map((link) => (
                    link.showWhen !== 'unauthenticated' && (
                      <Link key={link.name} className='text-link'href={link.href + (link.name === 'My Profile' ? username : '')}>
                        {link.name}
                      </Link>
                    )
                  ))
                ) : (
                  // Unauthenticated user links
                  navigationLinks.map((link) => (
                    link.showWhen !== 'authenticated' && (
                      <Link key={link.name} className='text-link' href={link.href}>
                        {link.name}
                      </Link>
                    )
                  ))
                )}
            </div>
            {/* Only render auth-dependent links after auth check completes */}
            {authChecked && cookiesLoaded && (
              <div className="hidden md:flex flex-row items-center gap-4">
                {isAuthenticated ? (
                  // Authenticated user links
                  onboardingLinks.map((link) => (
                    link.showWhen !== 'unauthenticated' && (
                      <Link key={link.type} className={`${link.withStyle ? 'btn-primary btn' : 'text-link'}`} href={link.href} onClick={() => {localStorage.removeItem("auth-storage");}}>
                        {link.name}
                      </Link>
                    )
                  ))
                ) : (
                  // Unauthenticated user links
                  onboardingLinks.map((link) => (
                    link.showWhen !== 'authenticated' && (
                      <Link key={link.type} className={`${link.withStyle ? 'btn-primary btn' : 'text-link'}`} href={link.href + '?type=' + link.type}>
                        {link.name}
                      </Link>
                    )
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
