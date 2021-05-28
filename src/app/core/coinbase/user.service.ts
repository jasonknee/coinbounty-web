import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { CoinbaseAuthService } from "./coinbase-auth.service";

interface UserModel {
    userName: string;
    password: string;
}

@Injectable()
export class UserService {
    // public user: any;
    private _userSubject = new BehaviorSubject<any>(undefined);
    
    // get user() {
    //     return this._userSubject.getValue();
    // }

    // set user(user: any) {
    //     this._userSubject.next(user);
    // }
    
    // public user$ = () => this._userSubject.asObservable();
    
    
    
    
    public getUser() {
        return this._userSubject.getValue();
        // return this.user;
    }

    public setUser(user: UserModel) {
        this._userSubject.next(user);
        // this.user = user;
    }

    public getUserObservable(): Observable<any> { 
        return this._userSubject.asObservable();
    }

    constructor(public coinbaseService: CoinbaseAuthService) {

    }

    ngOnInit() {
        this.coinbaseService.fetchUser()
            .subscribe(
                (coinbaseUser: any) => {
                    this.setUser(coinbaseUser);
                },
                (error) => {
                    console.log('we erroerd')
                }
            )
    }

    changeUserAccount(selectedUser: any) {
        this.setUser(selectedUser);
    }
}