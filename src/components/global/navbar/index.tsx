import Link from "next/link";
import Image from "next/image";
import { navigationLinks, onboardingLinks } from "~/utils/types/navigation";

export default function Navbar() {
  return (
    <div className="w-2/3 mx-auto flex flex-row justify-between items-center px-10 py-8">
      <Link className="text-3xl font-bold" href="/">
        <Image src={"/assets/brand-light.svg"} alt="Brand" width={144} height={37} />
      </Link>
      <div className="flex flex-row items-center gap-4">
        {navigationLinks.map((link) => (
          link.showWhen !== 'authenticated' && (
            <Link key={link.href} className="text-sm tracking-wide uppercase text-slate-300 hover:text-white transition-colors duration-300" href={link.href}>
              {link.name}
            </Link>
          )
        ))}
      </div>
      <div className="flex flex-row items-center gap-4">
        {onboardingLinks.map((link) => (
          link.showWhen !== 'authenticated' && (
            <Link key={link.href} className={`${link.withStyle ? 'btn-primary btn' : 'text-sm tracking-wide uppercase text-slate-300 hover:text-white transition-colors duration-300'}`} href={link.href}>
              {link.name}
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
