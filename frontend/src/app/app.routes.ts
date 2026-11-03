import { Routes } from '@angular/router';

import { Chat } from './features/chat/chat/chat';
import { Experience } from './features/experience/experience/experience';
import { Home } from './features/home/home/home';
import { Profile } from './features/profile/profile';
import { Projects } from './features/projects/projects/projects';
import { Skills } from './features/skills/skills/skills';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'profile', component: Profile },
  { path: 'projects', component: Projects },
  { path: 'skills', component: Skills },
  { path: 'experience', component: Experience },
  { path: 'chat', component: Chat },
  { path: '**', redirectTo: '' },
];
