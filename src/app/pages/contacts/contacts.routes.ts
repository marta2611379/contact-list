import { Routes } from '@angular/router';

export const contactRoutes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'info/:id',
    loadComponent: () =>
      import('./info/info.component').then((m) => m.InfoComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./form/form.component').then((m) => m.FormComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./form/form.component').then((m) => m.FormComponent),
  },
];
