import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((m) => m.DashboardComponent),
    title: 'Dashboard | RECAFET',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../components/dashboard-index/dashboard-index.component').then(m => m.DashboardIndexComponent).catch((err) => {
            console.error('Error loading DashboardIndexcomponent', err);
            return null;
          }),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../components/profile/profile.component')
            .then((m) => m.ProfileComponent)
            .catch((err) => {
              console.error('Error loading ProfileComponent', err);
              return null;
            }),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../components/users/users.component')
            .then((m) => m.UsersComponent)
            .catch((err) => {
              console.error('Error loading UsersComponent', err);
              return null;
            }),
      },
      {
        path: 'programs',
        loadComponent: () =>
          import('../components/programs/programs.component')
            .then((m) => m.ProgramsComponent)
            .catch((err) => {
              console.error('Error loading ProgramsComponent', err);
              return null;
            }),
      },
      {
        path: 'courses/:id',
        loadComponent: () =>
          import('../components/courses/courses.component')
            .then((m) => m.CoursesComponent)
            .catch((err) => {
              console.error('Error loading CoursesComponent', err);
              return null;
            }),
      },
      {
        path: 'courses/files/:id',
        loadComponent: () =>
          import('../components/file/file.component')
            .then((m) => m.FileComponent)
            .catch((err) => {
              console.error('Error loading FileComponent', err);
              return null;
            }),
      },
      {
        path: 'academic-period/:id',
        loadComponent: () =>
          import('../components/program-year/program-year.component')
            .then((m) => m.ProgramYearComponent)
            .catch((err) => {
              console.error('Error loading ProgramYearComponent', err);
              return null;
            }),
      },
      {
        path: '**',
        loadComponent: () =>
          import('../page-not-found/page-not-found.component').then(
            (m) => m.PageNotFoundComponent
          ),
      }
    ],
  },
] as Routes;
