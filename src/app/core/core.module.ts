import { NgModule, SkipSelf, Optional } from '@angular/core';
import { AuthGuard } from './auth.guard';

import { CoinbaseService } from './coinbase/coinbase.service';
import { CoinbaseCallbackComponent } from './coinbase/callback.component';
import { CoinbaseCallbackGuard } from './coinbase/callback.guard';

@NgModule({
    declarations: [
        CoinbaseCallbackComponent
    ],
    providers: [
        AuthGuard,
        CoinbaseService,
        CoinbaseCallbackGuard
    ]
})
export class CoreModule
{
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    )
    {
        if (parentModule)
        {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only.'
            );
        }
    }
}
