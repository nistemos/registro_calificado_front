import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/routes'),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
  /*{
    path: 'pruebaHolaMundo',
    loadChildren: () =>
      import('./hola-mundo/hola-mundo.component') as Promise<ItemsModule>,
  },*/
];
