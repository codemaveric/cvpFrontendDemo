import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Season, Title} from '../models/title';
import {NbToggleStates} from '@nebular/theme';
import {VerifyPayload} from '../models/verify-payload.interface';

@Component({
    selector: 'app-content-stack-view',
    templateUrl: './content-stack-view.component.html',
    styleUrls: ['./content-stack-view.component.scss']
})
export class ContentStackViewComponent implements OnInit {
    @Input('future') isFutureContent = false;
    @Output() verify = new EventEmitter<VerifyPayload>();

    @ViewChild('accordion', {static: false}) accordion;

    accordionToggleState: NbToggleStates = NbToggleStates.Collapsed;

    titles: Title[];

    constructor() {
        console.log('heelo stack');
    }

    @Input()
    set episodes(episodes: any[]) {
        console.log('setting titles in stack', episodes && episodes.length);
        this.titles = episodes && Title.processFromRawEpisodes(episodes);
    }

    ngOnInit() {
        if (this.isFutureContent) {
            this.accordionToggleState = NbToggleStates.Expanded;
        }
    }


    public checkboxToggle(check: boolean, season: Season) {
        season.episodes.forEach(val => val.checked = check);
    }


    public toggleAccordionAll() {
        if (this.accordionToggleState === NbToggleStates.Expanded) {
            this.accordion.closeAll();
            this.accordionToggleState = NbToggleStates.Collapsed;
        } else {
            this.accordion.openAll();
            this.accordionToggleState = NbToggleStates.Expanded;
        }
    }

    public verifyContent(ev, title) {
        ev.stopImmediatePropagation();

        const payload = this.genVerifyPayload(title);
        this.verify.emit(payload);
    }


    private genVerifyPayload(title) {
        const titleId = title.id;
        const episodeIds: string[] = [];
        for (const season of title.seasons) {
            for (const episode of season.episodes) {
                if (episode.checked === true) {
                    episodeIds.push(episode.episodeId);
                }
            }
        }
        return {
            title,
            titleId,
            episodeIds
        };
    }

}
