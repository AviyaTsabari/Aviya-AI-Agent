import { Component, computed, input } from '@angular/core';

import { ChatMessage as ChatMessageModel } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat-message',
  imports: [],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss',
})
export class ChatMessage {
  readonly message = input.required<ChatMessageModel>();

  protected readonly isUser = computed(() => this.message().role === 'user');
  protected readonly author = computed(() => (this.isUser() ? 'You' : 'Aviya Yosef'));
  protected readonly handle = computed(() => (this.isUser() ? 'you' : 'engineer'));
  protected readonly initials = computed(() => (this.isUser() ? 'YOU' : 'AY'));
}
