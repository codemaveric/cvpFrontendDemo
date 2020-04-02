import {Component} from '@angular/core';
import {NbMenuItem, NbToastrService} from '@nebular/theme';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../../core';
import {ContentService} from '../content/data-access/content.service';
import {LocalStore} from '../../core/helpers/local-store';
import {LocalStoreKey} from '../../core/helpers/enums';
import {BATCH_INITIATION_CONFIRM_MESSAGE} from '../../core/helpers/constants';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
        ContentService,
        NbToastrService
    ]
})
export class DashboardComponent {

    token: any;
    // lastRefresh: number;
    items: NbMenuItem[] = [
        {
            title: 'home',
            link: '/'
        },
        {
            title: 'dashboard',
            link: 'dashboard'
        }
    ];
    public isFutureContentUrl: boolean;

    constructor(router: Router, private authService: AuthService, private contentService: ContentService, private toastrService: NbToastrService ) {
        router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                this.isFutureContentUrl = (event as any).url.indexOf('all') === -1;
            });

        this.token = LocalStore.getFromStore(LocalStoreKey.USER_TOKEN);
        // const d = new Date();
        // this.lastRefresh = d.setUTCMinutes(d.getUTCMinutes() - 30);
    }

    get showBatchButton() {
        return !this.isFutureContentUrl && this.token.role !== 'user';
    }

    public onLogout() {
        this.authService.logout();
        localStorage.clear();
    }

    showToast(title, message, position, status, duration: number = 3000) {
        return this.toastrService.show(message, title, {position, status, duration});
    }

    public initiateBatchVerification() {
        if (confirm(BATCH_INITIATION_CONFIRM_MESSAGE)) {
            this.contentService.batchVerification().subscribe(
                res => {
                    this.showToast('Batch Verification in Progress', 'Batch Verification in Progress' , 'top-right', 'info', 3000);
                },
                err => {
                    this.showToast(err.message, 'Batch Verification' , 'top-right', 'danger', 3000);
                }
            );
        }
    }

}
