import {environment} from '../../../environments/environment';
import {AppException} from '../exceptions/app.exception';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {RResponse} from '../helpers/rresponse';
import {Exception} from '../exceptions/custom.exception';
import {AppStatus} from '../helpers/enums';
import {Observable} from 'rxjs';
import {Utils} from '../helpers/utils';

interface RequestOpts {
    method: string;
    url: string;
    options: object;
}

export class Service {

    /**
     * Service constructor.
     */
    public constructor(protected http: HttpClient) {
    }

    /**
     * Prepares request object to send to server.
     */
    public prepareRequest(url: string,
                          body: object | string = null,
                          method: string = 'POST',
                          params = null,
                          headers: HttpHeaders = new HttpHeaders(),
                          apiBase: string = environment.API_BASE): RequestOpts {

        const combinedHeaders = this.getCombinedHeaders(headers);

        if (params !== null) {
            params = new HttpParams({fromObject: params});
        }

        if (headers.get('Content-Type') === 'application/x-www-form-urlencoded' && method === 'POST') {
            body = Utils.URIEncodeObject(body as object);
        }

        return {method, url: apiBase + url, options: {body, headers: combinedHeaders, params}};
    }

    /**
     * Sends request object to server and handles apropiate callbacks.
     *
     */
    public sendToServer(requestOpts: RequestOpts): Observable<RResponse> {
        return this.http.request<RResponse>(requestOpts.method, requestOpts.url, requestOpts.options);
    }

    /**
     * Sends a GET Request
     */
    public sendGetRequest(url: string,
                          queryObject?: object,
                          headers?: HttpHeaders,
                          apiBase?: string) {

        return this.sendRequest(url, null, 'GET', queryObject, headers, apiBase);

    }

    /**
     * Sends a GET Request
     */
    public sendPostRequest(url: string,
                           body?: object,
                           headers?: HttpHeaders,
                           apiBase?: string) {

        return this.sendRequest(url, body, 'POST', null, headers, apiBase);

    }

    /**
     * Builds the RequestOpts and sends to server immediately
     *
     */
    public sendRequest(url: string,
                       body: object = null,
                       method: string = body == null ? 'GET' : 'POST',
                       paramsObject = null,
                       headers: HttpHeaders = new HttpHeaders(),
                       apiBase?: string) {

        const requestOpts = this.prepareRequest(url, body, method, paramsObject, headers, apiBase);

        return this.sendToServer(requestOpts);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * TODO: send the error to remote logging infrastructure
     *
     * @param operation - name of the operation that failed
     *
     */
    public handleError(operation = 'operation') {
        return (err: any) => {
            const error = this.catchErrors(err);

            // display error for user consumption
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.getMessage()}`);

            throw error;
        };
    }

    // noinspection JSMethodCanBeStatic
    protected getCombinedHeaders(headers: HttpHeaders) {
        if (headers.get('Content-Type') === null) {
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Utility function to catch errors
     * basically it checks if its an unauthorised error
     * it logs out immediately if its an unauthorised error
     */
    private catchErrors(err: HttpErrorResponse): Exception {
        let error;


        if (err instanceof AppException) {
            error = err;
        } else if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            error = new AppException(err.error);
        } else if (err.status === 0) {
            error = AppException.INTERNET_UNAVAILABLE;
        } else if (err.status >= 500 && typeof err.error === 'string') {
            error = AppException.SERVER_ERROR;
        } else if (err.error) {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            error = new AppException(err.error, err.error.code, err.error.message);
            // error = err.error.message ?  new AppException(err.error, err.error.code, err.error.message) : AppException.SERVER_ERROR;
        } else {
            error = AppException.SERVER_ERROR;
        }

        console.log(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error || err)}`);

        return error;
    }

    // TODO: better job of transforming error for user consumption
    private displayUserFriendlyError(operation, error) {
        console.log(`${operation} failed: ${error.getMessage()}`);

        if (error.code === AppStatus.INTERNET_UNAVAILABLE) {
            // alert('alert no internet');
        }
    }
}
