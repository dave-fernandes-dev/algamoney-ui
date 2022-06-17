import { NgModule } from '@angular/core';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SegurancaRoutingModule,
    SharedModule,

    //necessario para op decoder token jwt
    JwtModule.forRoot({ config: { tokenGetter, allowedDomains: ['localhost:8090'], disallowedRoutes: ['http://localhost:8090/oauth/token'] }}),
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
