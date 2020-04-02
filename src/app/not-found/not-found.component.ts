import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    public sideNavOpened = false;
  //  @ViewChild('sideNav') sideNav: MatSidenav;

    constructor(private router: Router) {}

    public ngOnInit() {
   //     this.sideNav.openedChange.subscribe(o => this.sideNavOpened = o);
    }

    public handleToggleSideNav(toggle: boolean) {
  //      this.sideNav.toggle();
    }

}
