import {Component, OnInit, Renderer, ElementRef, ViewChild} from '@angular/core';
import 'rxjs/add/operator/filter';

import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {NavbarComponent} from './shared/navbar/navbar.component';

@Component({
  selector: 'rt-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private renderer: Renderer, private element: ElementRef, public location: Location,
      private translate: TranslateService) {

    translate.addLangs(['cs', 'en']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('cs');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('cs');
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this.renderer.listenGlobal('window', 'scroll', () => {
      const number = window.scrollY;
      // if (number > 150 || window.pageYOffset > 150) {
      //   // add logic
      //   navbar.classList.remove('navbar-transparent');
      // } else {
      //   // remove logic
      //   navbar.classList.add('navbar-transparent');
      // }
    });
    const ua = window.navigator.userAgent;
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
      const version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);

      if (version) {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('ie-background');
      }
    }
  }

  removeFooter() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    return !(titlee === 'signup' || titlee === 'nucleoicons');
  }
}
