import { NgModule } from '@angular/core';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { environment } from 'src/environments/environment';


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
    JwtModule.forRoot({ config: { tokenGetter, allowedDomains: environment.tokenAllowedDomains, disallowedRoutes: environment.tokenDisallowedRoutes }}),
  ],
  providers: [JwtHelperService, LogoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
