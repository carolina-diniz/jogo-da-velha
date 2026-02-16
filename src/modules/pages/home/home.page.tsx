import type { JSX } from 'react';
import { Background, Footer } from '~core';
import { HomeView } from './home.view';
import { useHomePage } from './hooks/home.hook';

export function HomePage(): JSX.Element {
  const homePageParams = useHomePage();

  return (
    <>
      <Background />
      <HomeView {...homePageParams} />
      <Footer />
    </>
  );
}
