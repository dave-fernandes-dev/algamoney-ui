import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import localePt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { SegurancaModule } from '../seguranca/seguranca.module';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent  ],
  imports: [
    CommonModule,

    //sem o RouterModule os links href não funcionam
    RouterModule,

    SegurancaModule,
  ],
  exports: [NavbarComponent, ToastModule, ConfirmDialogModule],
  providers: [DatePipe, ErrorHandlerService, MessageService, ConfirmationService, Title,
              {provide: LOCALE_ID, useValue: 'pt-BR'}
            ]
})
export class CoreModule { }
