import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./index/index.component').then(
        (m) => m.IndexComponent
      )
  },
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
];
