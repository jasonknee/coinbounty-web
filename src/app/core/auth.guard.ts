import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CoinbaseAuthService } from "./coinbase/coinbase-auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private coinbaseService: CoinbaseAuthService, private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!this.coinbaseService.isLoggedIn()) {
            return this.router.createUrlTree(['/']);
        }
        return true;
    }
}