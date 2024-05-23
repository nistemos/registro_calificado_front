import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
    title: 'Inicio de sesión | RECAFET',
  },
] as Routes;
