import { createElement } from 'react';
import { Route } from 'react-router-dom';

interface Module {
  default?: RouteConfig;
}

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
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

        if (module.default) {
          const route = module.default as RouteConfig;

          const element = createElement(Route, {
            path: route.path,
            element: createElement(route.element),
          });

          routes.push(element);
        }
      } catch (error) {
        console.warn('error loading route module:', path, error);
      }
    }

    return routes;
  },
};
