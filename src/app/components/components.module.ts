import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NouisliderModule} from 'ng2-nouislider';
import {JWBootstrapSwitchModule} from 'jw-bootstrap-switch-ng2';

import {BoxComponent} from './box/box.component';
// import {RtMapsComponent} from './maps/maps.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ProgramComponent} from './program/program.component';
import {NucleoiconsComponent} from './nucleoicons/nucleoicons.component';
import {ComponentsComponent} from './components.component';
import {NgbdModalComponent} from './modal/modal.component';
import {NgbdModalContent} from './modal/modal.component';
import {InfoComponent} from "./info/info.component";

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, NouisliderModule, JWBootstrapSwitchModule, TranslateModule],
  declarations: [ComponentsComponent, NavigationComponent,
      NucleoiconsComponent, NgbdModalComponent, NgbdModalContent,
      ProgramComponent, BoxComponent, InfoComponent],
  entryComponents: [NgbdModalContent],
  exports: [ComponentsComponent, ProgramComponent, BoxComponent, InfoComponent]
})
export class ComponentsModule {
}
