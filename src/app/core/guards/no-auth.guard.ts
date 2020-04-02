import {Inject, Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!this.authService.isLoggedIn) {
            return true;
        }

        // Navigate to the dashboard if there is login
        this.router.navigate(['/dashboard'], {queryParams: this.router.parseUrl(state.url).queryParams});

        return true;
    }
}


