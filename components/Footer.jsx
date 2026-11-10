import Image from 'next/image';

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

const companyLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Threads', href: 'https://threads.com/@zanathmar' },
];

const linkClass =
  'inline-flex items-center gap-2 text-gray-600 transition-colors duration-300 hover:text-black';

const Footer = () => (
  <footer className="font-jakarta relative overflow-hidden bg-[#f5f5f5] text-black">
    <div className="relative z-10 mx-auto max-w-6xl px-3 pt-14 sm:px-4">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <a href="#home" className="text-2xl font-bold tracking-tight">
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
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
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
          <h3 className="text-sm font-bold text-black">Newsletter</h3>
          <p className="text-sm leading-relaxed text-gray-600">
            Receive project updates, new work, and early access to what I am building.
          </p>
        </div>
      </div>
      <div className="mt-10"></div>
    </div>

    <Image
      src="/assets/images/halftone_footer.png"
      alt="footer"
      width={2493}
      height={1080}
      className="relative z-0 -mt-10 h-auto w-full sm:-mt-16 lg:-mt-24"
    />
  </footer>
);

export default Footer;