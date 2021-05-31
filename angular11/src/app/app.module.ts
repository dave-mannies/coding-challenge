import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, GanalyticsComponent } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveryModule } from "./modules/delivery/delivery.module";

@NgModule({
  declarations: [
    AppComponent,
    GanalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DeliveryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
