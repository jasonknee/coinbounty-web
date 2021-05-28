import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { config } from '../config';

interface Tokens {
  access_token: string;
  created_at: any;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface User {
  avatar_url: string;
  id: string;
  name: string;
  profile_bio?: string;
  profile_location?: string;
  profile_url?: string;
  resource: string;
  resource_path: string;
  username?: string;
}

const constants = {
  DEFAULT_GRANT_TYPE: "authorization_code",
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  USER: 'USER'
}

const tokenRequest = {
  "grant_type": constants.DEFAULT_GRANT_TYPE,
  "client_id": config.COINBASE_CLIENT_ID,
  "client_secret": config.COINBASE_SECRET,
  "redirect_uri": config.REDIRECT_URI
};

@Injectable({
  providedIn: 'root'
})
export class CoinbaseAuthService {
  private _user = new BehaviorSubject<any>(this.getUser());
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessor Methods
  // -----------------------------------------------------------------------------------------------------
  get user(): any {
    return this._user.getValue();
  }
  set user(val: any) {
    this.storeUser(val);
    this._user.next(val);
  }
  get user$(): Observable<any> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public
  // -----------------------------------------------------------------------------------------------------

  loginSetup(code: string) {
    return new Promise((resolve, reject) => {
      this.fetchToken(code).subscribe(() => {
        this.fetchUser().subscribe(_ => {
          resolve(true)
        }, reject)
      }, reject)
    });
  }

  logout() {
    this.doLogout();
  }

  refreshToken() {
    const body = {
      ...tokenRequest,
      "grant_type": "refresh_token",
      "refresh_token": this.getRefreshToken()
    };

    return this.http.post<Tokens>(`${config.COINBASE_OAUTH_URL}/token`, body)
      .pipe(
        tap((tokens: Tokens) => this.storeTokens(tokens))
      );
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  getAccessToken(): any {
    return localStorage.getItem(constants.ACCESS_TOKEN);
  }
  
  // -----------------------------------------------------------------------------------------------------
  // @ Private
  // -----------------------------------------------------------------------------------------------------

  private fetchToken(code: string): any {
    const body = {
      ...tokenRequest,
      "code": code,
    };

    return this.http.post<Tokens>(`${config.COINBASE_OAUTH_URL}/token`, body)
      .pipe(
        tap((tokens: Tokens) => this.storeTokens(tokens))
      );
  }

  public fetchUser(): Observable<any> {
    return this.http.get<any>(`${config.COINBASE_BASE_URL}/user`)
      .pipe(
        map((response: any) => response.data as User),
        tap((user: User) => this.user = user)
      );
  }

  private revokeToken() {
    return this.http.post<any>(`${config.COINBASE_OAUTH_URL}/revoke`, { token: this.getAccessToken() })
      .pipe(
        tap(_ => this.doLogout())
      );
  }

  private doLogout() {
    this.user = null;
    this.removeTokens();
    this.router.navigate(['/']);
  }

  private getRefreshToken() {
    return localStorage.getItem(constants.REFRESH_TOKEN);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(constants.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(constants.REFRESH_TOKEN, tokens.refresh_token);
  }

  private removeTokens() {
    localStorage.removeItem(constants.ACCESS_TOKEN);
    localStorage.removeItem(constants.REFRESH_TOKEN);
  }

  private storeUser(user: User) {
    localStorage.setItem(constants.USER, JSON.stringify(user));
  }

  private getUser() {
    const str = localStorage.getItem(constants.USER);
    if (str?.length) {
      return JSON.parse(str);
    }
    return undefined;
  }

}
