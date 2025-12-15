import type { JSX } from 'react';
import { Background } from '~core';
import { HomeView } from './home.view';
import { Footer } from '~core';

export function HomePage(): JSX.Element {
  return (
    <>
      <Background />
      <HomeView />
      <Footer />
    </>
  );
}
