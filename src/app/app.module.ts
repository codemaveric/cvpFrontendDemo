import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {LandingModule} from './landing/landing.module';
import {RouterModule} from '@angular/router';
import {DashboardModule} from './dashboard/dashboard.module';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        RouterModule.forRoot([
            {path: '404', component: NotFoundComponent},
            {path: '**', component: NotFoundComponent}]),
        NbThemeModule.forRoot({name: 'default'}),
        NbLayoutModule,
        NbEvaIconsModule,
        LandingModule,
        DashboardModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
