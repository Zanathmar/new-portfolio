'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { sendContactEmail } from '../app/actions/contact';

interface ContactFormData {
  name: string;
  email: string;
  website: string;
  message: string;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface StatusFeedback {
  type: 'success' | 'error';
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    website: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusFeedback | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('izzanathmar.m@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', website: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or reach out directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks: SocialLink[] = [
    {
      href: 'https://linkedin.com/in/zanathmar',
      label: 'LinkedIn',
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
    },
    {
      href: 'https://github.com/zanathmar',
      label: 'GitHub',
      icon: (
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      ),
    },
    {
      href: 'https://youtube.com/@zanathmar',
      label: 'YouTube',
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
    },
    {
      href: 'https://instagram.com/zanathmar',
      label: 'Instagram',
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="flex bg-[#f5f5f5] flex-col gap-12 px-4 py-10 md:px-6 md:flex-row md:items-start lg:px-24 lg:py-16"
    >
      <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-12 w-full">
        {/* Form Column */}
        <div className="w-full md:w-1/2 max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Honeypot field - traps automated bots silently */}
            <div
              className="hidden"
              aria-hidden="true"
              style={{ display: 'none' }}
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-wider text-black mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                autoComplete="name"
                required
                className="w-full border-2 border-primary-black rounded-xl px-4 py-3.5 text-p2 bg-white focus:border-primary-black focus:outline-none transition-all shadow-[0px_3px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-black mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@domain.com"
                autoComplete="email"
                required
                className="w-full border-2 border-primary-black rounded-xl px-4 py-3.5 text-p2 bg-white focus:border-primary-black focus:outline-none transition-all shadow-[0px_3px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-bold uppercase tracking-wider text-black mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can I help you?"
                rows={5}
                required
                className="w-full border-2 border-primary-black rounded-xl px-4 py-3.5 text-p2 bg-white focus:border-primary-black focus:outline-none transition-all resize-vertical shadow-[0px_3px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 border-2 border-primary-black rounded-xl flex items-center justify-center text-primary-black bg-primary-white shadow-[0px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px] transition-all duration-200"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {icon}
                  </svg>
                </a>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-send flex items-center w-52 bg-black text-white text-[18px] font-semibold px-5 py-3.5 rounded-xl overflow-hidden border-2 border-black shadow-[0px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[3px] transition-all duration-200 disabled:opacity-60 ${
                isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="svg-wrapper-1 flex items-center">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={22}
                    height={22}
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>{isSubmitting ? 'Sending...' : 'Get in touch'}</span>
            </button>

            {status && (
              <div
                role="status"
                aria-live="polite"
                className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-900 border-green-700 shadow-[0px_3px_0px_0px_rgba(21,128,61,1)]'
                    : 'bg-red-50 text-red-900 border-red-700 shadow-[0px_3px_0px_0px_rgba(185,28,28,1)]'
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* Right Info Column */}
        <div className="w-full desktop:w-1/2 desktop:pl-12">
          <h1 className="text-4xl md:text-5xl desktop:text-6xl font-bold mb-6 leading-tight">
            Let&apos;s{' '}
            <span className="inline-block border-4 border-black px-3 py-1 bg-white relative">
              talk
              <span className="absolute inset-0 border-4 border-black translate-x-2 translate-y-2 bg-white -z-10"></span>
            </span>{' '}
            for Something special
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            I seek to push the limits of creativity to create high-engaging,
            user-friendly, and memorable interactive experiences.
          </p>

          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Direct Contact
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="mailto:izzanathmar.m@gmail.com"
                className="group inline-flex items-center gap-3 px-5 py-3.5 bg-white border-2 border-black rounded-xl font-semibold text-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] transition-all"
              >
                <Mail size={18} className="text-black group-hover:scale-110 transition-transform" />
                <span className="truncate">izzanathmar.m@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-black text-white rounded-xl border-2 border-black font-semibold text-sm shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
