import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoinbaseService } from './coinbase.service';

@Component({
    selector: 'cb-callback',
    template: ''
})
export class CoinbaseCallbackComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private coinbaseService: CoinbaseService
    ) { }

    public ngOnInit(): void {
        const code = this.route.snapshot.queryParamMap.get('code') as string;
        this.coinbaseService.setup(code)
            .then(_ => {
                this.router.navigate(['/guild']);
            })
            .catch(_ => {
                this.router.navigate(['/'])
            });
    }
}
