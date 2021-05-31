import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PagePlayComponent, PlayComponent,
  PageReportsComponent, ReportsComponent,
} from './components';
import { InputsComponent } from './components/inputs/inputs.component';

@NgModule({
  declarations: [
    PagePlayComponent,
    PageReportsComponent,
    PlayComponent,
    ReportsComponent,
    InputsComponent
  ],
  exports: [
    InputsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DeliveryModule { }

