import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ExperienceService } from '../../../core/services/experience.service';
import { ExperienceItem } from '../experience-item/experience-item';

@Component({
  selector: 'app-experience',
  imports: [AsyncPipe, ExperienceItem],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private readonly experienceService = inject(ExperienceService);

  protected readonly experience$ = this.experienceService.getExperience();
}
