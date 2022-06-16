import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { Message2Component } from './message/message2.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [MessageComponent, Message2Component],
  imports: [
    CommonModule,
    MessageModule,
    MessagesModule,
    AccordionModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    FormsModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    CheckboxModule,

    //sem o RouterModule os links href não funcionam
    RouterModule,
  ],
  exports: [MessageComponent, Message2Component,
    CommonModule,
    MessageModule,
    MessagesModule,
    AccordionModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    FormsModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    CheckboxModule,
  ],
})
export class SharedModule { }
