import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { RoutesConfig } from '~core';
import './main.scss';

function main(): void {
  const routes = RoutesConfig.getAllRoutes();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </StrictMode>,
  );
}

main();
