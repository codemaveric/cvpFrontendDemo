import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = state.url;

        // Navigate to the login page
        this.router.navigate(['/']);

        return false;
    }


    canLoad(route: Route): boolean {

        if (this.authService.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = route.path;

        // Navigate to the login page
        this.router.navigate(['/']);

        return false;
    }

}
