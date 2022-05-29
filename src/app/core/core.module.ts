import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentosModule } from '../lancamentos/lancamentos.module';
import { PessoasModule } from '../pessoas/pessoas.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    LancamentosModule,
    PessoasModule,
  ],
  exports: [NavbarComponent],
  providers: [DatePipe]
})
export class CoreModule { }
