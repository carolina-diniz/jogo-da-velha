import type { JSX } from 'react';
import { Avatar } from './components/avatar/avatar.component';

export function HomeView(): JSX.Element {
  return (
    <>
      <h1>home</h1>
      <Avatar />
    </>
  );
}
