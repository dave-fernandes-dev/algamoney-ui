import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class LogoutService {

  tokensRevokeUrl = environment.apiUrl+'/tokens/revoke';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
