import { NgModule } from '@angular/core';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';

@NgModule({
  declarations: [PessoasCadastroComponent, PessoasPesquisaComponent, PessoaCadastroContatoComponent],
  imports: [
    SharedModule,
    PessoasRoutingModule
  ],
  exports: [],
})
export class PessoasModule {}
