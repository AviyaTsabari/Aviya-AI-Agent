import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ProjectService } from '../../../core/services/project.service';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [AsyncPipe, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly projectService = inject(ProjectService);

  protected readonly projects$ = this.projectService.getProjects();
}
