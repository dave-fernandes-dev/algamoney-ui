import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { Message2Component } from './message/message2.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [MessageComponent, Message2Component],
  imports: [CommonModule, MessageModule, MessagesModule],
  exports: [MessageComponent, Message2Component],
})
export class SharedModule {}
