import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {switchMap} from 'rxjs/internal/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    /**
     * Checks if Access token is not near expiration before performing request
     * If token is near expiration then refresh the token
     *
     */
    interceptOld(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Get the auth header from the service.
        const authHeaders = AuthService.getAuthorizationHeader();

        // Clone the request to add the new header only if URL is for API_BASE.
        const authReq = authHeaders && req.url.includes(environment.API_BASE)
            ? req.clone({setHeaders: authHeaders}) : req;

        // Pass on the cloned request instead of the original request.
        return next.handle(authReq).pipe(catchError(this.handleError())) as any;
    }


    /**
     * Checks if Access token is not near expiration before performing request
     * If token is near expiration then refresh the token
     *
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes(environment.API_BASE) && !req.url.includes(environment.API_BASE + '/connect')) {

            if (!AuthService.isTokenNearExpiration()) {
                console.log('token not expired, all in good shape');

                return this.executeRequest(req, next);

            } else if (!AuthService.isTokenExpired()) {
                console.log('token near expiration, attempt to refresh token');

                return this.authService.refreshToken().pipe(
                    switchMap(() => this.executeRequest(req, next)),
                    catchError(this.handleError())
                );

            } else {
                console.log('token finally expired, log user out');
                this.authService.logout(true);
                return Observable.create(obs => obs.error());
            }

        } else {
            return next.handle(req).pipe(catchError(this.handleError())) as any;
        }
    }

    private handleError(): any {
        return (err: any) => {
            if (err.status === 401) {
                this.authService.logout();
            }
            throw err;
        };
    }

    private handleErrorNew(): any {
        return (err: any) => {
            if (err.status === 401) {
                return this.authService.refreshToken().pipe(
                    catchError(this.handleError())
                );
            }
            throw err;
        };
    }


    private executeRequest(req, next): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        const authHeaders = AuthService.getAuthorizationHeader();

        // Clone the request to add the new header only if URL is for API_BASE.
        const authReq = authHeaders ? req.clone({setHeaders: authHeaders}) : req;

        return next.handle(authReq).pipe(catchError(this.handleError())) as any;
    }
}

