import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';


export default [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Inicio de sessión'
  },
] as Routes;
