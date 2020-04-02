import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RResponse} from '../../../core/helpers/rresponse';
import {Service} from '../../../core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BackgroundTaskService extends Service {

    constructor(http: HttpClient) {
        super(http);
    }


    public verifyContent() {
        return this.verifyContentRequest().pipe(
            catchError(this.handleError())
        );
    }

    private verifyContentRequest(): Observable<RResponse> {
        return this.sendGetRequest('/content/verify');
    }
}
