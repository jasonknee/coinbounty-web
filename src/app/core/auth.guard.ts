import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CoinbaseService } from "./coinbase/coinbase.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private coinbaseService: CoinbaseService, private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!this.coinbaseService.account) {
            return this.router.createUrlTree(['/']);
        }
        return true;
    }
}