import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NoAuthGuard} from '../core/guards/no-auth.guard';


const routes: Routes = [{path: '', component: LoginComponent, canActivate: [NoAuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
