import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BackgroundTaskService} from './data-access/background-task.service';
import {NbToastrService} from '@nebular/theme';

@Component({
    selector: 'app-background-task',
    templateUrl: './background-task.component.html',
    styleUrls: ['./background-task.component.scss'],
    providers: [BackgroundTaskService]
})
export class BackgroundTaskComponent implements OnInit {
    public inProgress = false;
    private interval;
    public tasks: string[] = [];
    @Output() completed = new EventEmitter();

    constructor(private service: BackgroundTaskService, private toastrService: NbToastrService) {
    }

    ngOnInit() {}

    start(title) {
        this.inProgress = true;
        this.tasks.push(title);
        this.interval =  setInterval(this.callAPI.bind(this), 5000);
    }

    callAPI() {

        this.service.verifyContent().subscribe(
            res => {
                console.log(res);
                if ((res as any).isCompleted) {
                    const status = 'success';
                    clearInterval(this.interval);
                    this.toastrService.show('Verification Completed', 'Verification Completed', {status});
                    this.inProgress = false;
                    this.tasks = [];
                    this.completed.emit((res as any).episodes);
                }
            },
            err => {
                clearInterval(this.interval);
                this.inProgress = false;
                this.tasks = [];
                console.log(err);
            }
        );

    }

}
