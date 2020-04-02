import {Injectable} from '@angular/core';
import {Service} from './service';
import {LocalStore} from '../helpers/local-store';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStoreKey} from '../helpers/enums';
import {Router} from '@angular/router';
import {Utils} from '../helpers/utils';
import {map} from 'rxjs/operators';


@Injectable()
export class AuthService extends Service {

    // Expiration refresh period
    private static EXPIRATION_REFRESH_PERIOD = 60 * 3; // 3 minutes

    public isLoggedIn = false;

    // store the URL so we can redirect after logging in
    public redirectUrl: string;

    /**
     * AuthService constructor.
     */
    public constructor(http: HttpClient, protected router: Router) {
        super(http);
        this.authenticateUserToken();
    }


    public static saveUserToken(token): boolean {
        return LocalStore.saveToStore(LocalStoreKey.USER_TOKEN, token);
    }

    public static getUserToken() {
        return LocalStore.getFromStore(LocalStoreKey.USER_TOKEN);
    }


    public static getAuthorizationHeader() {
        return this.getUserToken() && {Authorization: `Bearer ${this.getUserToken().token}`};
    }

    public static isTokenNearExpiration() {
        return false;
        /*const userToken = this.getUserToken();
        const expireIn = Number(userToken.expires_in);
        const createdAt = new Date(userToken.created_at);
        const secondsBtw = Utils.secondsBetween(Date.now(), createdAt);

        return secondsBtw > (expireIn - AuthService.EXPIRATION_REFRESH_PERIOD);*/
    }


    public static isTokenExpired() {
        return false;

        /*const userToken = this.getUserToken();
        const expireIn = Number(userToken.expires_in);
        const createdAt = new Date(userToken.created_at);
        const secondsBtw = Utils.secondsBetween(Date.now(), createdAt);

        return secondsBtw > expireIn;*/
    }

    public logout(isTokenExpired = false) {
        if (LocalStore.deleteStore(LocalStoreKey.STORE_KEY)) {
            this.isLoggedIn = false;
            this.router.navigateByUrl('');

            if (isTokenExpired) {
                this.announceInvalidToken();
            }
        }
    }


    private announceInvalidToken() {
    //    const dialog = new Dialog('Session', `Your session has expired, please sign in again.`);
    //    dialog.setProceedAction(DialogAction.PROCEED.setText('Ok'));
    //    dialog.setRecedeAction(null);

      //  const modal = new Modal(DialogComponent, new ModalData(Dialog.DIALOG_DATA_KEY, dialog));
      //  this.modalService.load(modal);
    }

    private authenticateUserToken() {
        const token = AuthService.getUserToken();

        // TODO write function to check if token not expired
        // if (JwtHelper.tokenNotExpired(token)) {
        if (token) {
            this.isLoggedIn = true;
        }
    }


    public refreshToken() {

        const userToken = AuthService.getUserToken();
        const refreshToken = userToken.refresh_token;

        // assign other params to payload
        const payload = { grant_type: 'refresh_token', refresh_token: refreshToken};

        return this.requestCreateAccessToken(payload).pipe(map(res => {
            (res as any).refresh_token = refreshToken;
            (res as any).created_at = Date.now();
            AuthService.saveUserToken(res);
            console.log('gotten new refresh token, we also saved it too');
            console.log(res);
            return res;
            }
        ));
    }

    /**
     * Prepares requestObject for sending create token and sends to server.
     *
     */
    private requestCreateAccessToken(credentials) {

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'No-Auth': 'True'
        });
        return this.sendRequest('/connect/token', credentials, 'POST', null, headers);

    }
}
