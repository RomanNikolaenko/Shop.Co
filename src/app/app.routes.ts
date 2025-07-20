import { Routes } from '@angular/router';

import { STATIC_ROUTES } from '^core/static-routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('^layouts/main-layout').then((com) => com.MainLayout),
    children: [
      {
        path: `${STATIC_ROUTES.HOME.Path}`,
        title: `${STATIC_ROUTES.HOME.Title}`,
        loadComponent: () => import('^features/home/home').then((m) => m.Home),
      },
      {
        path: `${STATIC_ROUTES.ABOUT.Path}`,
        title: `${STATIC_ROUTES.ABOUT.Title}`,
        loadComponent: () =>
          import('^features/about/about').then((m) => m.About),
      },
    ],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('^features/user/user.routes').then((m) => m.userRoutes),
  },
  {
    path: '**',
    title: `${STATIC_ROUTES.NOT_FOUND.Title}`,
    loadComponent: () =>
      import('^features/not-found/not-found').then((m) => m.NotFound),
  },
];
