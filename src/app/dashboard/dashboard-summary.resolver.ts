import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Service} from '../core/services/service';
import {RResponse} from '../core/helpers/rresponse';

export interface DashboardSummary {
    totalEpisode: number;
    totalVerified: number;
    totalAvailable: number;
    totalPlaying: number;
    totalNotPlaying: number;
    verificationInProgress: boolean;
}


@Injectable()
export class DashboardSummaryResolver extends Service implements Resolve<DashboardSummary> {

    constructor(http: HttpClient, private router: Router) {
        super(http);
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isFuture = state.url.indexOf('all') === -1;
        return this.requestDashboardSummary(isFuture).pipe(
            catchError(err => {
                this.router.navigate(['/404']);
                return of(null);
            })
        );
    }


    /**
     * Prepares requestObject for getting dashboard summary and sends to server.
     *
     */
    private requestDashboardSummary(isFuture = false): Observable<RResponse> {
        return this.sendGetRequest('/content/dashboard', {future: isFuture});
    }

}
