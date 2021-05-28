import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoinbaseAuthService } from './coinbase-auth.service';

@Component({
    selector: 'cb-callback',
    template: ''
})
export class CoinbaseCallbackComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private coinbaseService: CoinbaseAuthService
    ) { }

    public ngOnInit(): void {
        const code = this.route.snapshot.queryParamMap.get('code') as string;
        this.coinbaseService.loginSetup(code)
            .then(_ => {
                this.router.navigate(['/guild']);
            })
            .catch(_ => {
                this.router.navigate(['/'])
            });
    }

    


    isOddAsync(num: number) : Promise<any> {
        return new Promise((resolve, reject) => {
            if (num % 2) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    }

    isOdd(num: number): boolean {
        if (num % 2) {
            return false;
        } else {
            return true;
        }
    }
}
