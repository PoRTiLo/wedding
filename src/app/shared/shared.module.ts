import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NouisliderModule} from 'ng2-nouislider';
import {JWBootstrapSwitchModule} from 'jw-bootstrap-switch-ng2';


import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {AppComponent} from "../app.component";
import {ComponentsModule} from "../components/components.module";

@NgModule({
    imports: [CommonModule, FormsModule, NgbModule, NouisliderModule, JWBootstrapSwitchModule, ComponentsModule, TranslateModule],
    declarations: [NavbarComponent, FooterComponent],
    exports: [NavbarComponent, FooterComponent]
})
export class SharedModule {
}