import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '~/utils/types/navigation'

const copy = {
  footer: 'Watchly | CodeBeyondWork © 2024',
  suggestion: 'Have a suggestion? Submit a review at',
  suggestion_link: 'Feature Request/Review',
  tmdb: {
    copy: 'Film and Show data from ',
    link: 'TMDb',
    url: 'https://www.themoviedb.org/',
  },
  justwatch: {
    copy: 'Watching options from',
    url: 'https://www.justwatch.com/',
    link: 'JustWatch',
  },
}

export default function Footer() {
  return (
    <div className="border-t-slate-primary flex w-full flex-row justify-center border-t bg-slate-900 px-[90px] py-[82px]">
      <div className="flex w-[1014px] flex-col">
        <div className="flex flex-col md:flex-row md:justify-between md:px-[50px]">
          <FooterLinks />
          <div className="flex flex-col justify-between gap-2">
            <Image
              src={'/assets/brand-light.svg'}
              alt="Brand"
              className="mb-4 ml-auto mr-auto md:mb-0 md:ml-auto md:mr-0"
              width={144 * 1.2}
              height={37 * 1.2}
            />
            <div className="flex flex-col items-center gap-2 md:items-end">
              <span className="hidden md:flex">
                Have a feature request or a bug report?
              </span>
              <Link
                className="btn btn-secondary flex flex-row items-center gap-2"
                href="https://github.com/dimacuhamarc/watchly/issues"
                target="_blank"
              >
                <FaGithub className="h-4 w-4" /> Submit an Issue
              </Link>
            </div>
          </div>
        </div>
        <div className="before:bg-t-dark after:bg-t-dark divider"></div>
        <div className="flex flex-col justify-between gap-4 text-slate-300 md:flex-row md:gap-0">
          <span className="text-nowrap">{copy.footer}</span>
          <div className="flex flex-col gap-2">
            <span>
              {copy.tmdb.copy}{' '}
              <Link href={copy.tmdb.url} className="text-link">
                {copy.tmdb.link}
              </Link>
            </span>
            <span>
              {copy.justwatch.copy}{' '}
              <Link href={copy.justwatch.url} className="text-link">
                {copy.justwatch.link}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FooterLinks() {
  return (
    <div className="hidden flex-col justify-start md:flex">
      {footerLinks.map(
        (link) =>
          link.showWhen !== 'authenticated' && (
            <Link key={link.href} className="text-link" href={link.href}>
              {link.name}
            </Link>
          ),
      )}
    </div>
  )
}
