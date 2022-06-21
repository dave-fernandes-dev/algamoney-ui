import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.apiUrl+'/oauth/token';
  jwtPayLoad: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService ) {
    this.carregarToken();
   }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then((response:any) => {
      this.armazenarToken(response['access_token']);
      console.log(response);
    })
    .catch(response => {
      if (response.status === 400) {
        if (response.error.error ==='invalid_grant') {
          console.log(response);
          return Promise.reject('Usuário ou Senha Inválida!');
        }
      }

      //console.log(response);
      return Promise.reject(response);
    });
  }

  armazenarToken(token: string){
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `grant_type=refresh_token`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then((response:any) => {
      this.armazenarToken(response['access_token']);
          console.log('novo access token criado', response);
          //return Promise.resolve();
    })
    .catch(response => {
          console.log('Erro ao renovar Token, RefreshToken Expirado, Redirecionando para login', response);
          //return Promise.resolve();
    });
  }

  private carregarToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: string) {
    for (const role of roles) {
      if (this.temPermissao(role)){
        return true;
      }
    }
    return false;
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayLoad = null;
  }

}
