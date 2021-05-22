import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'cb-callback',
    template: ''
})
export class CallbackComponent implements OnInit {

    constructor(
        private route: ActivatedRoute, 
        private router: Router
    ) {}

    public ngOnInit():void {
        const token = this.route.snapshot.queryParamMap.get('token');
        const code = this.route.snapshot.queryParamMap.get('code');
        const state = this.route.snapshot.queryParamMap.get('state');
        // Handle token
        // ...
        console.log(token);
        console.log(code);
        console.log(state);
        this.router.navigate(['/']);
    }
}