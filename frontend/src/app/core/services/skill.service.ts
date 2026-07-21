import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { SkillsResponse } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:8000/api/skills';

  getSkills(): Observable<SkillsResponse> {
    return this.http.get<SkillsResponse>(this.apiUrl);
  }
}
