import { Routes } from '@angular/router';
import { contactRoutes } from './pages/contacts/contacts.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/contacts/contacts.component').then(
        (m) => m.ContactsComponent
      ),
    loadChildren: () =>
      import('./pages/contacts/contacts.routes').then(() => contactRoutes),
  },
];
