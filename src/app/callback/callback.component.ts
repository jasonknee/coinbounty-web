import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../shared/constants';

@Component({
    selector: 'cb-callback',
    template: ''
})
export class CallbackComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) { }

    public ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('token');
        const code = this.route.snapshot.queryParamMap.get('code');
        const state = this.route.snapshot.queryParamMap.get('state');
        // Handle token
        // ...
        // console.log(token);
        console.log('my code is:')
        console.log(code);
        // console.log(state);
        // this.router.navigate(['/']);

        this.getAccessToken(code as string);
    }

    getAccessToken(code: string) {
        this.http.post(constants.COINBASE_TOKEN_URL, {
            "grant_type": "authorization_code",
            "code": code,
            "client_id": constants.COINBASE_CLIENT_ID,
            "client_secret": constants.COINBASE_SECRET,
            "redirect_uri": constants.REDIRECT_URI
        }).subscribe((response: any) => {
            console.log(response);
            this.getUser(response['access_token']);
        });
    }

    getUser(access_token: string) {

        let header = new HttpHeaders().set(
            "Authorization",
            "Bearer " + access_token
        );

        this.http.get("https://api.coinbase.com/v2/user", { headers: header })
            .subscribe((response: any) => {
                console.log(response);
            });
    }


}