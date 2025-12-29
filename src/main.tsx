import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { RoutesConfig, SocketProvider } from '~core';
import './main.scss';

function main(): void {
  const routes = RoutesConfig.getAllRoutes();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <SocketProvider>
        <BrowserRouter>
          <Routes>{routes}</Routes>
        </BrowserRouter>
      </SocketProvider>
    </StrictMode>,
  );
}

main();
