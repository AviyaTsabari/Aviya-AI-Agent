import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  imports: [],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.scss',
})
export class ChatInput {
  readonly disabled = input(false);
  readonly send = output<string>();

  protected readonly draft = signal('');

  protected updateDraft(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value);
  }

  protected submit(): void {
    const message = this.draft().trim();
    if (!message || this.disabled()) {
      return;
    }
    this.send.emit(message);
    this.draft.set('');
  }
}
