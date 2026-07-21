import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface HealthResponse {
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [],
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
      .get<HealthResponse>('http://127.0.0.1:8000/health')
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