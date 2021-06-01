import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material";

import {
  PagePlayComponent, PlayComponent,
  PageReportsComponent, ReportsComponent,
  InputsComponent, ResultsComponent, InputsModalComponent,
  PageHistoryComponent, HistoryComponent ,
  DialogComponent
} from './components';

@NgModule({
  declarations: [
    PagePlayComponent,
    PageReportsComponent,
    PlayComponent,
    ReportsComponent,
    InputsComponent,
    ResultsComponent,
    PageHistoryComponent,
    HistoryComponent,
    InputsModalComponent,
    DialogComponent
  ],
  exports: [
    InputsComponent,
    InputsModalComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class DeliveryModule { }

