import { Component, input } from '@angular/core';

import { ChatMessage as ChatMessageModel } from '../../../core/models/chat.model';

@Component({
  selector: 'app-chat-message',
  imports: [],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss',
})
export class ChatMessage {
  readonly message = input.required<ChatMessageModel>();
}
