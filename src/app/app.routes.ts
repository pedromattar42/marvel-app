import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () =>
        import('./pages/list/list.component').then((m) => m.ListComponent),
    },
  ];
  
