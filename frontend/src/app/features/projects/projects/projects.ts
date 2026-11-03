import { Component, inject, signal } from '@angular/core';

import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, ErrorMessage, LoadingSpinner],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly projectService = inject(ProjectService);

  protected readonly projects = signal<Project[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data.projects);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load projects. Is the backend running?');
        this.loading.set(false);
      },
    });
  }
}
