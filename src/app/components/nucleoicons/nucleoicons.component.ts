import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'rt-app-nucleoicons',
  templateUrl: './nucleoicons.component.html',
  styleUrls: ['./nucleoicons.component.scss']
})
export class NucleoiconsComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
    const body = document.getElementsByTagName('app-nucleoicons')[0];
    const navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    navbar.classList.add('navbar-hidden');
    body.classList.add('demo-icons');
  }

  ngOnDestroy() {
    const navbar = document.getElementsByTagName('app-navbar')[0].children[0];
    navbar.classList.remove('navbar-hidden');
  }
}
