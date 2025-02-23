import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { footerLinks } from '~/utils/types/navigation';

const copy = {
  footer: 'Watchly | CodeBeyondWork © 2024',
  suggestion: 'Have a suggestion? Submit a review at',
  suggestion_link: 'Feature Request/Review',
  tmdb: {
    copy: 'Film and Show data from ',
    link: 'TMDb',
    url: 'https://www.themoviedb.org/'
  },
  justwatch: {
    copy: 'Watching options from',
    url: 'https://www.justwatch.com/',
    link: 'JustWatch'
  }
};

export default function Footer() {
  return (
    <div className="w-full bg-slate-900 flex flex-row py-[82px] px-[90px] justify-center border-t border-t-slate-primary">
      <div className="flex flex-col w-[1014px]">
        <div className="flex flex-row px-[50px] justify-between">
          <FooterLinks />
          <div className="flex flex-col gap-2 justify-between">
            <Image src={"/assets/brand-light.svg"} alt="Brand" className="ml-auto" width={144*1.2} height={37*1.2} />
            <div className="flex flex-col gap-2 items-end">
              <span>Have a feature request or a bug report?</span>
              <Link className="btn-secondary btn flex flex-row items-center gap-2" href="https://github.com/dimacuhamarc/watchly/issues" target="_blank">
                <FaGithub className="w-4 h-4" /> Submit an Issue
              </Link>
            </div>
            
          </div>
        </div>
        <div className="divider before:bg-t-dark after:bg-t-dark"></div>
        <div className="flex flex-row justify-between text-slate-300">
          <span>{copy.footer}</span>
          <div className="flex flex-col gap-2">
            <span>{copy.tmdb.copy} <Link href={copy.tmdb.url} className="text-link">{copy.tmdb.link}</Link></span>
            <span>{copy.justwatch.copy} <Link href={copy.justwatch.url} className="text-link">{copy.justwatch.link}</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}


function FooterLinks() {
  return (
    <div className="flex flex-col justify-start">
      {footerLinks.map((link) => (
          link.showWhen !== 'authenticated' && (
            <Link key={link.href} className="text-link" href={link.href}>
              {link.name}
            </Link>
          )
        ))}
    </div>
  );
}