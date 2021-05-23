import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { config } from './../config';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {
  private accountSubject = new BehaviorSubject(undefined);
  constructor(private http: HttpClient) { }

  get: any = () => this.accountSubject.getValue();
  set = (data: any) => this.accountSubject.next(data);
  watch = () => this.accountSubject.asObservable();

  setup(code: string) {
    return new Promise((resolve, reject) => {
      this.fetchToken(code).subscribe(_ => {
        this.fetchUser().subscribe(_ => {
          resolve(true)
        }, reject)
      }, reject)
    });
  }

  private fetchToken(code: string) {
    const body = {
      "grant_type": "authorization_code",
      "code": code,
      "client_id": config.COINBASE_CLIENT_ID,
      "client_secret": config.COINBASE_SECRET,
      "redirect_uri": config.REDIRECT_URI
    };

    return this.http.post(config.COINBASE_TOKEN_URL, body)
      .pipe(
        take(1),
        tap((tokenResponse: any) => {
          this.set({
            ...this.get(),
            tokenResponse
          });
        })
      );
  }


  private fetchUser() {
    const headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + this.get().tokenResponse.access_token
    );

    return this.http.get("https://api.coinbase.com/v2/user", { headers })
      .pipe(
        take(1),
        tap((userResponse: any) => {
          this.set({
            ...this.get(),
            userResponse
          });
        })
      );
  }

}
