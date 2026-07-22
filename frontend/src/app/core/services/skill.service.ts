import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SkillsResponse } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/skills`;

  getSkills(): Observable<SkillsResponse> {
    return this.http.get<SkillsResponse>(this.apiUrl);
  }
}
