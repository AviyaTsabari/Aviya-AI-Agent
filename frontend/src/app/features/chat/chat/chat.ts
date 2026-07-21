import { Component, inject, signal } from '@angular/core';

import { ChatMessage as ChatMessageModel } from '../../../core/models/chat.model';
import { ChatService } from '../../../core/services/chat.service';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ChatInput } from '../chat-input/chat-input';
import { ChatMessage } from '../chat-message/chat-message';

@Component({
  selector: 'app-chat',
  imports: [ChatMessage, ChatInput, LoadingSpinner, ErrorMessage],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  private readonly chatService = inject(ChatService);

  protected readonly messages = signal<ChatMessageModel[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected sendMessage(content: string): void {
    const history = this.messages();
    this.messages.set([...history, { role: 'user', content }]);
    this.error.set(null);
    this.loading.set(true);

    this.chatService.sendMessage(content, history).subscribe({
      next: (response) => {
        this.messages.update((current) => [
          ...current,
          { role: 'assistant', content: response.reply },
        ]);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Sorry, I couldn't reach the chat service. Please try again.");
        this.loading.set(false);
      },
    });
  }
}
