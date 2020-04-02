import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AllContentComponent} from './all-content/all-content.component';
import {DashboardSummaryResolver} from './dashboard-summary.resolver';
import {FutureContentComponent} from './future-content/future-content.component';
import {AuthGuard} from '../core';


const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            {path: '', redirectTo: 'future', pathMatch: 'full'},
            {path: 'all', component: AllContentComponent, resolve: {dashboardSummary: DashboardSummaryResolver}},
            {path: 'future', component: FutureContentComponent,  resolve: {dashboardSummary: DashboardSummaryResolver}},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [DashboardSummaryResolver]
})
export class DashboardRoutingModule {
}
