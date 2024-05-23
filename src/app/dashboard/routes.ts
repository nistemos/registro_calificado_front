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
            import('../components/profile/profile.component').then(m => m.ProfileComponent).catch(err => {
              console.error('Error loading ProfileComponent', err);
              return null;
            })
        },
        {
          path: 'users',
          loadComponent: () =>
            import('../components/users/users.component').then(m => m.UsersComponent).catch(err => {
              console.error('Error loading ProfileComponent', err);
              return null;
            })
        },
        {
          path: 'programs',
          loadComponent: () => import('../components/programs/programs.component').then(m => m.ProgramsComponent).catch(err => {
            console.error('Error loading ProfileComponent', err);
            return null;
          })
        },
        {
          path: 'courses',
          loadComponent: () =>
            import('../components/courses/courses.component').then(m => m.CoursesComponent).catch(err => {
              console.error('Error loading ProfileComponent', err);
              return null;
            })
        },
        {
          path: 'academic-period/:id',
          loadComponent: () =>
            import('../components/program-year/program-year.component').then(m => m.ProgramYearComponent).catch(err => {
              console.error('Error loading ProfileComponent', err);
              return null;
            })
        },
      ]
  },

] as Routes;
