import {Component, OnInit, ElementRef} from '@angular/core';
import {Location} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";

class NavbarText {
  title: string;
  label: string
}

const NAVBAR_SECTIONS = 5;

@Component({
  selector: 'rt-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarTexts: NavbarText[] = [];
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(public location: Location, private element: ElementRef, private translate: TranslateService) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.initNavbarText();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    // console.log(toggleButton, 'toggle');

    setTimeout(function() {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isHome() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return titlee === '/home';
  }

  private initNavbarText() {
    this.navbarTexts = [];
    for (let i = 0; i < NAVBAR_SECTIONS; i++) {
      const navbarText = new NavbarText();
      navbarText.title = this.translate.instant(`navbar.section.${i}.title`);
      navbarText.label = this.translate.instant(`navbar.section.${i}.label`);
      this.navbarTexts.push(navbarText);
      console.log(navbarText);
    }

  }
}
