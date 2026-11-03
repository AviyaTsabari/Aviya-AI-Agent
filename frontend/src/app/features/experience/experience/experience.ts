import { Component, inject, signal } from '@angular/core';

import { ExperienceItem as ExperienceItemModel } from '../../../core/models/experience.model';
import { ExperienceService } from '../../../core/services/experience.service';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ExperienceItem } from '../experience-item/experience-item';

@Component({
  selector: 'app-experience',
  imports: [ExperienceItem, ErrorMessage, LoadingSpinner],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private readonly experienceService = inject(ExperienceService);

  protected readonly items = signal<ExperienceItemModel[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.experienceService.getExperience().subscribe({
      next: (data) => {
        this.items.set(data.experience);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load experience. Is the backend running?');
        this.loading.set(false);
      },
    });
  }
}
