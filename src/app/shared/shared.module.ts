import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { Message2Component } from './message/message2.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
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
    ProgressSpinnerModule,
    ChartModule,

  ],
  exports: [
    AccordionModule,
    ButtonModule,
    CommonModule,
    MessageModule,
    MessagesModule,
    TabViewModule,
    InputTextModule,
    ConfirmDialogModule,
    CheckboxModule,
    CalendarModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
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
    PanelModule,
    ProgressSpinnerModule,

  ],
})
export class SharedModule { }
