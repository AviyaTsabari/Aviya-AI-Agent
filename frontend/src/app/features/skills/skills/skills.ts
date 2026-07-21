import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SkillService } from '../../../core/services/skill.service';
import { SkillCategory } from '../skill-category/skill-category';

@Component({
  selector: 'app-skills',
  imports: [AsyncPipe, SkillCategory],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private readonly skillService = inject(SkillService);

  protected readonly skills$ = this.skillService.getSkills();
}
