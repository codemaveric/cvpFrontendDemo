import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Episode, Title} from '../models/title';
import {VerifyPayload} from '../models/verify-payload.interface';

@Component({
    selector: 'app-content-list-view',
    templateUrl: './content-list-view.component.html',
    styleUrls: ['./content-list-view.component.scss']
})
export class ContentListViewComponent implements OnInit {
    _episodes: Episode[];

    @Output() verify = new EventEmitter<VerifyPayload>();

    constructor() {
        console.log('heelo list');
    }

    @Input()
    set episodes(episodes: Episode[]) {
        console.log('setting episodes in list', episodes && episodes.length);
        function sortDate(a, b) {
            const c = new Date(a);
            const d = new Date(b);
            return c.getTime() - d.getTime();
        }
        this._episodes = episodes && episodes.sort(sortDate);
    }


    get episodes() {
        return this._episodes;
    }


    ngOnInit() {
    }

    public checkboxToggle(check: boolean) {
        this.episodes.forEach(val => val.checked = check);
    }


    public verifyContent() {
        const payload = this.genVerifyPayload();
        this.verify.emit(payload);
    }


    private genVerifyPayload() {
        const episodeIds = this.episodes.filter(v => v.checked === true).map(v => v.episodeId);

        return {
            episodeIds
        };

    }
}

