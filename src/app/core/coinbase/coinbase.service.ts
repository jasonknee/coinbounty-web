import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { config } from './../config';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {
  private _account = new BehaviorSubject(undefined);
  constructor(private http: HttpClient) { }
  get account(): any {
    return this._account.getValue();
  }
  set account(val: any) {
    this._account.next(val);
  }
  get account$(): Observable<any> {
    return this._account.asObservable();
  }

  setup(code: string) {
    return new Promise((resolve, reject) => {
      this.fetchToken(code).subscribe(_ => {
        this.fetchUser().subscribe(_ => {
          resolve(true)
        }, reject)
      }, reject)
    });
  }

  async getAccounts() {
    if (!this.account.accountsResponse) {
      await this.fetchAccounts().toPromise();
    }

    return this.account.accountsResponse;
  }

  async getTransactions() {
    if (!this.account.accountsResponse) {
      await this.fetchAccounts().toPromise();
    }

    const btcAccountId = this.account.accountsResponse.data[0].id;
    if (!this.account.transactionsResponse) {
      await this.fetchTransactions(btcAccountId).toPromise();
    }

    return this.account.transactionsResponse;
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
          this.account = ({
            ...this.account,
            tokenResponse
          });
        })
      );
  }

  private buildHeaders = () => new HttpHeaders().set(
    "Authorization",
    "Bearer " + this.account.tokenResponse.access_token
  );

  private fetchUser() {
    const headers = this.buildHeaders();

    return this.http.get(`${config.COINBASE_BASE_URL}/user`, { headers })
      .pipe(
        take(1),
        tap((userResponse: any) => {
          this.account = ({
            ...this.account,
            userResponse
          });
        })
      );
  }

  private fetchAccounts() {
    const headers = this.buildHeaders();

    return this.http.get(`${config.COINBASE_BASE_URL}/accounts`, { headers })
      .pipe(
        take(1),
        tap((accountsResponse: any) => {
          this.account = ({
            ...this.account,
            accountsResponse
          });
        })
      );
  }


  private fetchTransactions(accountId: string) {
    const headers = this.buildHeaders();

    return this.http.get(`${config.COINBASE_BASE_URL}/accounts/${accountId}/transactions`, { headers })
      .pipe(
        take(1),
        tap((transactionsResponse: any) => {
          this.account = ({
            ...this.account,
            transactionsResponse
          });
        })
      );
  }

}
