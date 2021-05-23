import { NgModule, SkipSelf, Optional } from '@angular/core';
import { AuthGuard } from './auth.guard';

import { CoinbaseAuthService } from './coinbase/coinbase-auth.service';
import { CoinbaseCallbackComponent } from './coinbase/callback.component';
import { CoinbaseCallbackGuard } from './coinbase/callback.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './coinbase/token.interceptor';
import { CoinbaseService } from './coinbase/coinbase.service';

@NgModule({
    declarations: [
        CoinbaseCallbackComponent
    ],
    providers: [
        // GUARDS
        AuthGuard,
        // SERVICES
        CoinbaseAuthService,
        CoinbaseCallbackGuard,
        CoinbaseService,
        // INTERCEPTORS
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only.'
            );
        }
    }
}
