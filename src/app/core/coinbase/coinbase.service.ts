import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CoinbaseService {
  private _account = new BehaviorSubject(undefined);

  constructor(
    private http: HttpClient
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessor Methods
  // -----------------------------------------------------------------------------------------------------

  get account(): any {
    return this._account.getValue();
  }
  set account(val: any) {
    this._account.next(val);
  }
  get account$(): Observable<any> {
    return this._account.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public
  // -----------------------------------------------------------------------------------------------------

  async getAccounts() {
    if (!this.account?.accountsResponse) {
      await this.fetchAccounts().toPromise();
    }

    return this.account.accountsResponse;
  }

  async getTransactions() {
    if (!this.account?.accountsResponse) {
      await this.fetchAccounts().toPromise();
    }

    const btcAccountId = this.account.accountsResponse.data[0].id;
    if (!this.account?.transactionsResponse) {
      await this.fetchTransactions(btcAccountId).toPromise();
    }

    return this.account?.transactionsResponse;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private
  // -----------------------------------------------------------------------------------------------------

  private fetchAccounts() {
    return this.http.get(`${config.COINBASE_BASE_URL}/accounts`)
      .pipe(
        tap((accountsResponse: any) => {
          this.account = ({
            ...this.account,
            accountsResponse
          });
        })
      );
  }

  private fetchTransactions(accountId: string) {
    return this.http.get(`${config.COINBASE_BASE_URL}/accounts/${accountId}/transactions`)
      .pipe(
        tap((transactionsResponse: any) => {
          this.account = ({
            ...this.account,
            transactionsResponse
          });
        })
      );
  }

}
