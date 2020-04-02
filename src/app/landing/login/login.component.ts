import {Component, OnInit} from '@angular/core';
import {LoginService} from './data-access/login.service';
import {BaseComponent} from '../../core/abstracts/base.components';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService],
})
export class LoginComponent extends BaseComponent implements OnInit {
    form: FormGroup;

    constructor(private router: Router,
                private loginService: LoginService,
                private formBuilder: FormBuilder) {
        super();

        this.form = this.formBuilder.group({
            username: '',
            password: ''
        });
    }

    ngOnInit() {
    }


    public onSubmit() {
        const payload = this.form.getRawValue();
        if (payload) {
            this.fireLoginToAPI(payload);
        }
    }


    private fireLoginToAPI(payload) {
        this.setLoading();

        this.loginService.createAccessToken(payload).subscribe(
            res => {
                this.setLoading(false);
                this.router.navigate(['/dashboard']);
            },
            err => {
                this.notifyError(err);
            }
        );
    }

}
