import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/routes')
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/routes'),
    canActivate: [authGuard]
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
