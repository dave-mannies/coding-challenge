import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import {
  PagePlayComponent, PlayComponent,
  PageReportsComponent, ReportsComponent,
} from './components';
import { InputsComponent } from './components/inputs/inputs.component';
import { ResultsComponent } from './components/results/results.component';

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

