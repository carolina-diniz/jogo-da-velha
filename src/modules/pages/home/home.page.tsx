import type { JSX } from 'react';
import { Background } from '../../../core/background/background.component';
import { HomeView } from './home.view';

export function HomePage(): JSX.Element {
  return (
    <>
      <Background />
      <HomeView />
    </>
  );
}
