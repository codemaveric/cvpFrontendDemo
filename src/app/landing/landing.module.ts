import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LandingRoutingModule} from './landing-routing.module';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbIconModule,
        LandingRoutingModule,
        ReactiveFormsModule,
    ]
})
export class LandingModule {
}
