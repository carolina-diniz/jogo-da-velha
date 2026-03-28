import { useState, type JSX } from 'react';
import { Background, Footer } from '~core';
import { Development } from './development';
import './home.style.scss';
import { HomeView } from './home.view';
import { useHomePage } from './hooks/home.hook';

export function HomePage(): JSX.Element {
  const homePageParams = useHomePage();
  const [showDevelopment, setShowDevelopment] = useState(false);

  return (
    <>
      <Background />

      <div className="home__wrapper">
        <div className="home__card">
          {showDevelopment ? (
            <Development onBack={() => setShowDevelopment(false)} />
          ) : (
            <HomeView {...homePageParams} />
          )}
          <div className="home__footer">
            <span onClick={() => setShowDevelopment(true)} style={{ cursor: 'pointer' }}>
              Desenvolvedores
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
