import { NgModule } from '@angular/core';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SegurancaRoutingModule,

    SharedModule
  ]
})
export class SegurancaModule { }
