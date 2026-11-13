'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FooterQuote from './FooterQuote';

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="h-3 w-3"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

interface NavLink {
  label: string;
  href: string;
}

const companyLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks: NavLink[] = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Threads', href: 'https://threads.com/@zanathmar' },
];

const linkClass =
  'inline-flex items-center gap-2 text-gray-600 transition-colors duration-300 hover:text-black';

const Footer = () => {
  const pathname = usePathname();
  // On pages other than home, hash anchors need the home route prefix.
  const homeHref = (href: string) =>
    href.startsWith('#') && pathname !== '/' ? `/${href}` : href;

  return (
    <footer className="font-jakarta relative overflow-hidden bg-[#f5f5f5] text-black">
    <div className="relative z-10 mx-auto max-w-6xl px-3 pt-14 sm:px-4">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <a href={homeHref('#home')} className="text-2xl font-bold tracking-tight">
            Zanathmar
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-gray-600">
            Building clean, thoughtful things for the web.
          </p>
          <p className="text-xs text-left text-gray-600">
            &copy; {new Date().getFullYear()} Zanathmar. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-black">Directory</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link href={homeHref(item.href)} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/assets/resume.pdf" download className={linkClass}>
                Resume
                <Arrow />
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-black">Socials</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {item.label}
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <h3 className="text-sm font-bold text-black">Words I build by</h3>
          <FooterQuote />
        </div>
      </div>
      <div className="mt-10"></div>
    </div>

    <picture className="relative z-0 block -mt-10 sm:-mt-16 lg:-mt-24">
      <source media="(max-width: 767px)" srcSet="/assets/images/footer_mobile.png" />
      <Image
        src="/assets/images/halftone_footer.png"
        alt="footer"
        width={2493}
        height={1080}
        className="h-auto w-full"
      />
    </picture>
  </footer>
  );
};

export default Footer;
