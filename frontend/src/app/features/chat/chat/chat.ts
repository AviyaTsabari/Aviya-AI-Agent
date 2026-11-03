import { Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';

import { ChatMessage as ChatMessageModel } from '../../../core/models/chat.model';
import { ChatService } from '../../../core/services/chat.service';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { ChatInput } from '../chat-input/chat-input';
import { ChatMessage } from '../chat-message/chat-message';

const WELCOME_MESSAGE: ChatMessageModel = {
  role: 'assistant',
  content:
    "Hey — I'm Aviya. Treat this like a conversation with the engineer: ask about architecture, tradeoffs, projects, stack, or the kind of role I'm looking for. English or Hebrew is fine.",
};

const SUGGESTIONS = [
  'Walk me through your strongest technical skills.',
  'How did you approach the compiler project?',
  'What kind of engineering role are you targeting?',
  'מה הניסיון שלך עם פיתוח פול-סטאק?',
];

@Component({
  selector: 'app-chat',
  imports: [ChatMessage, ChatInput, ErrorMessage],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  private readonly chatService = inject(ChatService);
  private readonly messagesEl = viewChild<ElementRef<HTMLElement>>('messagesPane');

  protected readonly messages = signal<ChatMessageModel[]>([WELCOME_MESSAGE]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly suggestions = SUGGESTIONS;

  constructor() {
    effect(() => {
      this.messages();
      this.loading();
      queueMicrotask(() => this.scrollToLatest());
    });
  }

  protected sendMessage(content: string): void {
    const history = this.messages();
    this.messages.set([...history, { role: 'user', content }]);
    this.requestReply(content, history);
  }

  protected retry(): void {
    const messages = this.messages();
    const lastUserIndex = [...messages]
      .map((message, index) => ({ message, index }))
      .reverse()
      .find(({ message }) => message.role === 'user')?.index;

    if (lastUserIndex === undefined) {
      return;
    }

    this.requestReply(messages[lastUserIndex].content, messages.slice(0, lastUserIndex));
  }

  private requestReply(content: string, history: ChatMessageModel[]): void {
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

  private scrollToLatest(): void {
    const element = this.messagesEl()?.nativeElement;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }
}
