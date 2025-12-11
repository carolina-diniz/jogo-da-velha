import type { JSX } from 'react';
import { Avatar } from './components/avatar/avatar.component';
import './home.style.scss';

export function HomeView(): JSX.Element {
  return (
    <div className="home__menu-content">
      <Avatar />
      <div className="home__divider"></div>
    </div>
  );
}
