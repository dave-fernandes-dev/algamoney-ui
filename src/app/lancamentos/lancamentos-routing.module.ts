import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
//import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroReativoComponent } from './lancamento-cadastro-reativo/lancamento-cadastro-reativo.component';


const routes: Routes = [
  { path: '', component: LancamentosPesquisaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']} },

  //{ path: 'novo', component: LancamentosCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']} },
  { path: 'novo', component: LancamentoCadastroReativoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']} },

  //{ path: ':id', component: LancamentosCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']} },
  { path: ':id', component: LancamentoCadastroReativoComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']} },

  //{ path: '**', redirectTo: 'pagina-nao-encontrada' }
];

// const routes: Routes = [
//   { path: '', component: LancamentosPesquisaComponent },
//   { path: 'novo', component: LancamentosCadastroComponent },
//   { path: ':id', component: LancamentosCadastroComponent },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentosRoutingModule {}
