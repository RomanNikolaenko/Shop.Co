import { Routes } from '@angular/router';

import { STATIC_ROUTES } from '^app/core/static-routes';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('^layouts/auth-layout').then((com) => com.AuthLayout),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: `${STATIC_ROUTES.USER.CH.LOGIN.Path}`,
        title: `${STATIC_ROUTES.USER.CH.LOGIN.Title}`,
        loadComponent: () => import('./pages/login/login').then((m) => m.Login),
      },
      {
        path: `${STATIC_ROUTES.USER.CH.REGISTER.Path}`,
        title: `${STATIC_ROUTES.USER.CH.REGISTER.Title}`,
        loadComponent: () =>
          import('./pages/register/register').then((m) => m.Register),
      },
      {
        path: `${STATIC_ROUTES.USER.CH.FORGOT.Path}`,
        title: `${STATIC_ROUTES.USER.CH.FORGOT.Title}`,
        loadComponent: () =>
          import('./pages/forgot/forgot').then((m) => m.Forgot),
      },
      {
        path: `${STATIC_ROUTES.USER.CH.OTP.Path}`,
        title: `${STATIC_ROUTES.USER.CH.OTP.Title}`,
        loadComponent: () => import('./pages/otp/otp').then((m) => m.Otp),
      },
    ],
  },
];
