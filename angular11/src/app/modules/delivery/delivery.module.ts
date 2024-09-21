import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

import {
  PagePlayComponent, PlayComponent,
  PageReportsComponent, ReportsComponent,
  InputsComponent, ResultsComponent, InputsModalComponent,
  PageHistoryComponent, HistoryComponent ,
  DialogComponent, ResultsHistoryComponent,
  TrackingHtmlComponent, TrackingOptionsComponent
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
    DialogComponent,
    ResultsHistoryComponent,
    TrackingOptionsComponent,
    TrackingHtmlComponent
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
