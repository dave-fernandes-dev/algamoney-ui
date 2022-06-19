import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


constructor(private auth: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.auth.isAccessTokenInvalido()) {
        console.log('Navegação com Access Token Inválido. Obtendo novo Token...');

        return this.auth.obterNovoAccessToken()
          .then(() => {

            //se ainda é inválido!, vai p login
            if (this.auth.isAccessTokenInvalido()) {
              this.router.navigate(['/login']);
              return false;
            }

            return true;
          });

      } else if (route.data.roles && !this.auth.temQualquerPermissao(route.data.roles)) {
        this.router.navigate(['/nao-autorizado'])
        return false;
      }

    return true;
  }

}
