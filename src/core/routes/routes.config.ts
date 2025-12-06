import { createElement, type JSX } from 'react';
import { Route } from 'react-router-dom';

export interface RouteConfig {
  path: string;
  element: JSX.Element;
}

interface Module {
  default?: RouteConfig | 'object';
}

export const RoutesConfig = {
  getAllRoutes(): React.ReactElement[] {
    const routes = [] as React.ReactElement[];

    const routeModules = import.meta.glob('/src/modules/**/*.route.ts', {
      eager: true,
    });

    for (const path in routeModules) {
      try {
        const module = routeModules[path] as Module;

        if (module.default && module.default === 'object') {
          const route = module.default as unknown as RouteConfig;

          routes.push(createElement(Route, { ...route }));
        }
      } catch (error) {
        console.warn('error loading route module:', path, error);
      }
    }

    return routes;
  },
};
