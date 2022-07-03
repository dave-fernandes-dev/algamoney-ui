import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

@NgModule({
  imports: [

   SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }
