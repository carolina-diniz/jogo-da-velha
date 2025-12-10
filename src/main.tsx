import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RoutesConfig } from '~core';
import './main.scss';

function main() {
  const routes = RoutesConfig.getAllRoutes();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>{routes}</BrowserRouter>
    </StrictMode>,
  );
}

main();
