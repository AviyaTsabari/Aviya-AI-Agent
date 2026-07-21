import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience/experience').then((m) => m.Experience),
  },
  {
    path: 'chat',
    loadComponent: () => import('./features/chat/chat/chat').then((m) => m.Chat),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
