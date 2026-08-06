'use client';

import { AnchorHTMLAttributes, MouseEvent, forwardRef } from 'react';
import { useTransitionNavigate } from './TransitionProvider';

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, children, ...rest }, ref) => {
    const navigate = useTransitionNavigate();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (href.startsWith('http') || href.startsWith('#')) return;
      e.preventDefault();
      navigate(href);
    };

    return (
      <a ref={ref} href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  },
);

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink;