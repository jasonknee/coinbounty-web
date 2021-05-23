import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CoinbaseService } from "./coinbase/coinbase.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private userService: CoinbaseService, private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        const user = this.userService.get();
        if (user) {
            return true;
        } else {
            return this.router.createUrlTree(['/']);
        }
    }
}