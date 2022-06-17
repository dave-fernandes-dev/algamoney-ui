import { NgModule } from '@angular/core';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SegurancaRoutingModule,
    SharedModule,

    //necessario para op decoder token jwt
    JwtModule.forRoot({ config: { tokenGetter: () => { return ''; }}}),
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
