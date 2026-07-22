import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { environment } from '../environments/environment';
import { Footer } from './shared/components/footer/footer';
import { Header } from './shared/components/header/header';

interface HealthResponse {
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly backendStatus = signal('Checking backend connection...');

  ngOnInit(): void {
    this.checkBackendHealth();
  }

  private checkBackendHealth(): void {
    this.http
      .get<HealthResponse>(`${environment.apiUrl}/health`)
      .subscribe({
        next: (response) => {
          this.backendStatus.set(response.status);
        },
        error: () => {
          this.backendStatus.set('Backend connection failed');
        },
      });
  }
}