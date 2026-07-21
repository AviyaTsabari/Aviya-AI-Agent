import { Component, input } from '@angular/core';

import { ExperienceItem as ExperienceItemModel } from '../../../core/models/experience.model';

@Component({
  selector: 'app-experience-item',
  imports: [],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.scss',
})
export class ExperienceItem {
  readonly item = input.required<ExperienceItemModel>();
}
