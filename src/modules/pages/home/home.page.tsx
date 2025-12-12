import type { JSX } from 'react';
import { Background } from '~core';
import { HomeView } from './home.view';

export function HomePage(): JSX.Element {
  return (
    <>
      <Background />
      <HomeView />
    </>
  );
}
