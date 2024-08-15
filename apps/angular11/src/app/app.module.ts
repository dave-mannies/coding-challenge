import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, GanalyticsComponent, ViewportDirective } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveryModule } from './modules/delivery/delivery.module';
import { MaterialModule } from './modules/material';

@NgModule({
  declarations: [
    AppComponent,
    GanalyticsComponent,
    ViewportDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DeliveryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
