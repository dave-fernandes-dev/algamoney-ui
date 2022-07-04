import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { Message2Component } from './message/message2.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
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
import { PanelModule } from 'primeng/panel';


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
    FormsModule, ReactiveFormsModule,
    InputTextareaModule,
    SelectButtonModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    CheckboxModule,
    PanelModule,
    ChartModule,

    //sem o RouterModule os links href não funcionam
    RouterModule,
  ],
  exports: [
    AccordionModule,
    ButtonModule,
    CommonModule,
    MessageModule,
    MessagesModule,
    TabViewModule,
    InputTextModule,
    CalendarModule,
    FormsModule, ReactiveFormsModule,
    ChartModule,
    DialogModule,
    DropdownModule,
    HttpClientModule,
    InputNumberModule,
    InputTextareaModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    MessageComponent,
    Message2Component,
    SelectButtonModule,
    ToastModule,
    TableModule,
    TooltipModule,
    ConfirmDialogModule,
    CheckboxModule,
    PanelModule,
  ],
})
export class SharedModule {}
