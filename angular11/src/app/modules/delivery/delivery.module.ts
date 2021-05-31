import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import {
  PagePlayComponent, PlayComponent,
  PageReportsComponent, ReportsComponent,
  InputsComponent, ResultsComponent
} from './components';

@NgModule({
  declarations: [
    PagePlayComponent,
    PageReportsComponent,
    PlayComponent,
    ReportsComponent,
    InputsComponent,
    ResultsComponent
  ],
  exports: [
    InputsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DeliveryModule { }

