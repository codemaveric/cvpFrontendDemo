import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService, Service} from '../../../core';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class LoginService extends Service {

    constructor(http: HttpClient, private authService: AuthService) {
        super(http);
    }

    /**
     * Creates AccessToken
     *
     */
    public createAccessToken(credentials) {

        return this.requestCreateAccessToken(credentials).pipe(
            map(res => {
                this.authService.isLoggedIn = AuthService.saveUserToken(res);
                return res;

            }),
            catchError(this.handleError())
        );
    }

    /**
     * Prepares requestObject for sending create token and sends to server.
     *
     */
    private requestCreateAccessToken(body) {
        return this.sendPostRequest('/user/auth', body);

    }

}
