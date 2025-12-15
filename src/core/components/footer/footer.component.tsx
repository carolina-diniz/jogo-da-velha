import type { JSX } from 'react';
import './footer.style.scss';

export function Footer(): JSX.Element {
  return (
    <div className="footer__content">
      <span className="footer__logo">DevLab</span>
      <p className="footer__text">©2025 All rights reserved.</p>
    </div>
  );
}
