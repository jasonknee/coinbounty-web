import { NgModule, SkipSelf, Optional } from '@angular/core';
import { AuthGuard } from './auth.guard';

import { UserService } from './user.service';
@NgModule({
    providers: [
        UserService,
        AuthGuard]
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
