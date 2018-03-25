
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {HomeComponent} from './home.component';

import {ComponentsModule} from '../components/components.module';

import localeCs from '@angular/common/locales/cs';
registerLocaleData(localeCs);

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, RouterModule, ComponentsModule, TranslateModule],
  declarations: [HomeComponent],
  exports: [HomeComponent, DatePipe], providers: [DatePipe, {provide: LOCALE_ID, useValue: 'cs'}]
})
export class HomeModule {
}
