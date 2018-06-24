import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {JWBootstrapSwitchModule} from 'jw-bootstrap-switch-ng2';

import {BoxComponent} from './box/box.component';
// import {RtMapsComponent} from './maps/maps.component';
import {NavigationComponent} from './navigation/navigation.component';
import {ProgramComponent} from './program/program.component';
import {ComponentsComponent} from './components.component';
import {NgbdModalComponent} from './modal/modal.component';
import {NgbdModalContent} from './modal/modal.component';
import {InfoComponent} from "./info/info.component";

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, JWBootstrapSwitchModule, TranslateModule],
  declarations: [ComponentsComponent, NavigationComponent,
      NgbdModalComponent, NgbdModalContent,
      ProgramComponent, BoxComponent, InfoComponent],
  entryComponents: [NgbdModalContent],
  exports: [ComponentsComponent, ProgramComponent, BoxComponent, InfoComponent]
})
export class ComponentsModule {
}
