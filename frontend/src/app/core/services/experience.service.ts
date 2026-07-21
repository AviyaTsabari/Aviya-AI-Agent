import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ExperienceResponse } from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:8000/api/experience';

  getExperience(): Observable<ExperienceResponse> {
    return this.http.get<ExperienceResponse>(this.apiUrl);
  }
}
