import { Routes } from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { DocentesComponent } from './pages/docentes/docentes.component';





export const routes: Routes = [
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'home2',
        component:EstudiantesComponent
    },
    {
        path:'home4',
        component:DocentesComponent
    },
];
