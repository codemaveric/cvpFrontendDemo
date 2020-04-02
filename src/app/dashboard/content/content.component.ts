import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ContentService} from './data-access/content.service';
import {NbToastrService, NbToggleStates} from '@nebular/theme';
import {PageEvent} from '@angular/material';
import {BackgroundTaskComponent} from '../background-task/background-task.component';
import {ContentViewStyle} from '../../core/helpers/enums';
import {VerifyPayload} from './models/verify-payload.interface';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        ContentService,
        NbToastrService
    ]
})

export class ContentComponent implements OnInit {
    @Input('future') isFutureContent = false;
    @Input('summary') dashboardSummary;

    @ViewChild('backgroundTask', {static: false}) backgroundTask: BackgroundTaskComponent;

    accordionToggleState: NbToggleStates = NbToggleStates.Collapsed;
    viewStyle = ContentViewStyle.STACK;

    pageLength = 0;
    pageSize = 200;
    pageSkip = 0;
    isGrinding = false;
    selectedSource = 'funimation';
    selectedFilter;
    inputSearchText;
    pageEvent: PageEvent;

    d = new Date();

    lastRefresh = this.d.setUTCMinutes(this.d.getUTCMinutes() - 10);

    public rawEpisodes: any[];

    constructor(private service: ContentService, private toastrService: NbToastrService) {
    }

    get showStackView() {
        return !this.isGrinding && this.viewStyle === ContentViewStyle.STACK;
    }

    get showListView() {
        return !this.isGrinding && this.viewStyle === ContentViewStyle.LIST;
    }

    ngOnInit() {
        this.search();
        if (this.isFutureContent) {
            this.accordionToggleState = NbToggleStates.Expanded;
        }
    }

    showToast(title, message, position, status, duration: number = 3000) {
        return this.toastrService.show(message, title, {position, status, duration});
    }


    setContentView(style: ContentViewStyle | string) {
        this.viewStyle = style as ContentViewStyle;
    }

    public search() {

        const payload = this.generateSearchPayload(this.pageSize, this.pageSkip);

        this.setLoading();
        this.service.getFutureContent(payload).subscribe(
            res => {
                this.setLoading(false);
                this.processContentData(res as any);
            },
            err => {
                this.setLoading(false);
            }
        );
    }

    public paginate(event?: PageEvent) {
        console.log(event);
        this.pageSize = event.pageSize;
        this.pageSkip = event.pageIndex * event.pageSize;
        this.search();
        return event;
    }


    onBackgroundTaskCompleted(episodes: any[]) {
        const allEpisodes = this.rawEpisodes.concat(episodes);
        const distinctEpisodes = [...new Map(allEpisodes.map(item => [item.episodeId, item])).values()];
        this.processContentData(distinctEpisodes);
    }

    onVerify(payload: VerifyPayload) {
        if (payload.episodeIds.length === 0) {
            return;
        }
        const message = payload.title ? payload.title.titleName : 'Episodes';
        payload.title = undefined;

        this.service.verifyContent(payload).subscribe(
            res => {
                this.showToast('Verification in Progress', message, 'top-right', 'info', 3000);
                this.backgroundTask.start(message);
            },
            err => {
                this.showToast(err.message, message, 'top-right', 'danger', 3000);
                console.log(err);
            }
        );
    }

    protected setLoading(isLoading = true) {
        this.isGrinding = isLoading;
        //  isLoading ? this.uiActions.load() : this.uiActions.loadDone();
    }

    private processContentData(res: any) {
        this.rawEpisodes = res.data;
        this.pageLength = res.pagination.count;
    }

    private generateSearchPayload(take: number, skip: number) {
        let available;
        let playing;
        let verified;

        switch (this.selectedFilter) {
            case 'not-verified':
                verified = false;
                break;
            case 'not-available':
                verified = true;
                available = false;
                playing = false;
                break;
            case 'available-not-playing':
                available = true;
                playing = false;
                break;
            case 'available-playing':
                available = true;
                playing = true;

        }

        return {
            verified,
            available,
            playing,
            take, skip,
            futureContent: this.isFutureContent,
            search: this.inputSearchText
        };
    }
}
