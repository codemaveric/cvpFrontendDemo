import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    NbSelectModule,
    NbToastrModule,
    NbTooltipModule
} from '@nebular/theme';
import {AllContentComponent} from './all-content/all-content.component';
import {FutureContentComponent} from './future-content/future-content.component';
import {ContentComponent} from './content/content.component';
import {FormsModule} from '@angular/forms';
import {MatMenuModule, MatPaginatorIntl, MatPaginatorModule, MatProgressBarModule} from '@angular/material';
import {BackgroundTaskComponent} from './background-task/background-task.component';
import {MatPaginatorIntlCro} from '../core/providers/mat-paginator-intl-cro';
import { ContentStackViewComponent } from './content/content-stack-view/content-stack-view.component';
import { ContentListViewComponent } from './content/content-list-view/content-list-view.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [DashboardComponent, AllContentComponent, FutureContentComponent, ContentComponent, BackgroundTaskComponent, ContentStackViewComponent, ContentListViewComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NbLayoutModule,
        NbSelectModule,
        NbCardModule,
        NbInputModule,
        NbMenuModule.forRoot(),
        NbToastrModule.forRoot(),
        NbButtonModule,
        NbAccordionModule,
        NbListModule,
        NbIconModule,
        NbCheckboxModule,
        NbTooltipModule,
        FormsModule,
        PerfectScrollbarModule,
        MatPaginatorModule,
        MatMenuModule,
        MatProgressBarModule,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
    ]
})
export class DashboardModule {
}
