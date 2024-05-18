import { Routes } from '@angular/router';


export default [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then(
        (m) => m.DashboardComponent
      ),
      title: 'Página principal - Registro Calificado',
      children: [
        // {
        //   path: '',
        //   loadComponent: () =>
        //     import('../components/profile/profile.component').then(m => m.ProfileComponent)
        // },
        {
          path: 'profile',
          loadComponent: () =>
            import('../components/profile/profile.component').then(m => m.ProfileComponent)
        },
        {
          path: 'users',
          loadComponent: () =>
            import('../components/users/users.component').then(m => m.UsersComponent)
        },
        {
          path: 'programs',
          loadComponent: () =>
            import('../components/programs/programs.component').then(m => m.ProgramsComponent)
        },
        {
          path: 'courses',
          loadComponent: () =>
            import('../components/courses/courses.component').then(m => m.CoursesComponent)
        },
        {
          path: 'academic-period',
          loadComponent: () =>
            import('../components/program-year/program-year.component').then(m => m.ProgramYearComponent)
        },
      ]
  },

] as Routes;
