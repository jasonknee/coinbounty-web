import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable()
export class CoinbaseCallbackGuard implements CanActivate {
    constructor(private readonly router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, 
                routerState: RouterStateSnapshot): boolean | UrlTree {
        const codeParam = 'code';
        const code = route.queryParamMap.has(codeParam);
        if (!code) {
            const urlTree = this.router.createUrlTree(['/']);
            return urlTree;
        }

        return true;
    }
}