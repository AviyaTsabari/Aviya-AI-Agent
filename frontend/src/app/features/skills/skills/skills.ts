import { Component, inject, signal } from '@angular/core';

import { SkillCategory as SkillCategoryModel } from '../../../core/models/skill.model';
import { SkillService } from '../../../core/services/skill.service';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { SkillCategory } from '../skill-category/skill-category';

@Component({
  selector: 'app-skills',
  imports: [SkillCategory, ErrorMessage, LoadingSpinner],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private readonly skillService = inject(SkillService);

  protected readonly categories = signal<SkillCategoryModel[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.skillService.getSkills().subscribe({
      next: (data) => {
        this.categories.set(data.categories);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load skills. Is the backend running?');
        this.loading.set(false);
      },
    });
  }
}
