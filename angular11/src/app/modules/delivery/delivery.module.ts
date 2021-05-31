import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import {
  PagePlayComponent, PlayComponent,
  PageReportsComponent, ReportsComponent,
  InputsComponent, ResultsComponent
} from './components';
import { PageHistoryComponent } from './components/page-history/page-history.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    PagePlayComponent,
    PageReportsComponent,
    PlayComponent,
    ReportsComponent,
    InputsComponent,
    ResultsComponent,
    PageHistoryComponent,
    HistoryComponent
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

