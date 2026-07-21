import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatMessage, ChatResponse } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:8000/api/chat';

  sendMessage(message: string, history: ChatMessage[]): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { message, history });
  }
}
