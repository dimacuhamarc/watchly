"use client";

import Link from "next/link";
import Image from "next/image";
import { navigationLinks, onboardingLinks } from "~/utils/types/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY === 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) { // scrolling down
        setIsVisible(false);
      } else { // scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div className={`w-full backdrop-blur-sm transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="w-2/3 mx-auto flex flex-row justify-between items-center px-10 py-8">
        <Link className="text-3xl font-bold" href="/">
          <Image src={"/assets/brand-light.svg"} alt="Brand" width={144} height={37} />
        </Link>
        <div className="flex flex-row items-center gap-4">
          {navigationLinks.map((link) => (
            link.showWhen !== 'authenticated' && (
              <Link key={link.href} className="text-md tracking-wide uppercase text-link" href={link.href}>
                {link.name}
              </Link>
            )
          ))}
        </div>
        <div className="flex flex-row items-center gap-4">
          {onboardingLinks.map((link) => (
            link.showWhen !== 'authenticated' && (
              <Link key={link.href} className={`${link.withStyle ? 'btn-primary btn' : 'text-link'}`} href={link.href}>
                {link.name}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
