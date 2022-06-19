import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8090/tokens/revoke';

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
