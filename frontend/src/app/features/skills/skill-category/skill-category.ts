import { Component, input } from '@angular/core';

import { SkillCategory as SkillCategoryModel } from '../../../core/models/skill.model';

@Component({
  selector: 'app-skill-category',
  imports: [],
  templateUrl: './skill-category.html',
  styleUrl: './skill-category.scss',
})
export class SkillCategory {
  readonly category = input.required<SkillCategoryModel>();
}
