import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardSummary} from '../dashboard-summary.resolver';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './all-content.html',
    encapsulation: ViewEncapsulation.None,
})
export class AllContentComponent implements OnInit {
    public dashboardSummary: DashboardSummary;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute) {}


    ngOnInit() {
        this.subscription = this.route.data.subscribe(({dashboardSummary}) => {
            this.dashboardSummary = dashboardSummary;
        });
    }

}
