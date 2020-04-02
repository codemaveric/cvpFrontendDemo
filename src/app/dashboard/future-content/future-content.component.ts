import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DashboardSummary} from '../dashboard-summary.resolver';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-future-content',
    templateUrl: './future-content.component.html',
    styleUrls: ['./future-content.component.scss'],
})
export class FutureContentComponent implements OnInit {

    public dashboardSummary: DashboardSummary;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }


    ngOnInit() {
        this.subscription = this.route.data.subscribe(({dashboardSummary}) => {
            this.dashboardSummary = dashboardSummary;
        });
    }

}
