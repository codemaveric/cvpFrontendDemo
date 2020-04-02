import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthService} from './services/auth.service';
import {NoAuthGuard} from './guards/no-auth.guard';
import {AuthGuard} from './guards/auth.guard';
import {httpInterceptorProviders} from './interceptors';

@NgModule({
    providers: [
        AuthService,
        AuthGuard,
        NoAuthGuard,
        httpInterceptorProviders,
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}
