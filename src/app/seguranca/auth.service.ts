import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8090/oauth/token';
  jwtPayLoad: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService ) {
    this.carregarToken();
   }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
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

  private carregarToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }
}
