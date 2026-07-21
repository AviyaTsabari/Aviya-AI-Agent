import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private readonly profileService = inject(ProfileService);

  protected readonly profile$ = this.profileService.getProfile();
}
