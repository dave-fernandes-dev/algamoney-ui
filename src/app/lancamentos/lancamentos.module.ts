import { NgModule } from '@angular/core';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { LancamentoCadastroReativoComponent } from './lancamento-cadastro-reativo/lancamento-cadastro-reativo.component';


@NgModule({
  declarations: [LancamentosPesquisaComponent, LancamentosCadastroComponent, LancamentoCadastroReativoComponent],
  imports: [
    SharedModule,
    LancamentosRoutingModule,
  ],
  exports: [],
})
export class LancamentosModule {}
