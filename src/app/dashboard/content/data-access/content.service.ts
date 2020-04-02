import {Service} from '../../../core/services/service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RResponse} from '../../../core/helpers/rresponse';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ContentService extends Service {

    constructor(http: HttpClient) {
        super(http);
    }



    /**
     * Save Credit Limit
     */
    public getFutureContent(body: object) {
        return this.requestFutureContent(body).pipe(
            map(res => res),
            catchError(this.handleError())
        );
    }

    /**
     * Prepares requestObject for getting Future Content.
     *
     */
    private requestFutureContent(body: object): Observable<RResponse> {
        return this.sendPostRequest('/content', body);
    }

    public verifyContent(body: object) {
        return this.verifyContentRequest(body).pipe(
            map(res => res),
            catchError(this.handleError())
        );
    }

    private verifyContentRequest(body: object): Observable<RResponse> {
        return this.sendPostRequest('/content/verify', body);
    }

    public batchVerification() {
        return this.batchVerificationRequest().pipe(
            map(res => res),
            catchError(this.handleError())
        );
    }

    private batchVerificationRequest(): Observable<RResponse> {
        return this.sendGetRequest('/content');
    }
}
