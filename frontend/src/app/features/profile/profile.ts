import { Component, inject, signal } from '@angular/core';

import { Profile as ProfileModel } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile.service';
import { ErrorMessage } from '../../shared/components/error-message/error-message';
import { LoadingSpinner } from '../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-profile',
  imports: [ErrorMessage, LoadingSpinner],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private readonly profileService = inject(ProfileService);

  protected readonly profile = signal<ProfileModel | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load the profile. Is the backend running?');
        this.loading.set(false);
      },
    });
  }
}
