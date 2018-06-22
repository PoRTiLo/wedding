import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {ProfileComponent} from './profile/profile.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';

import {HomeModule} from './home/home.module';
import {SharedModule} from "./shared/shared.module";

// required for AOT compilation
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LandingComponent, ProfileComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(), FormsModule, RouterModule, AppRoutingModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
