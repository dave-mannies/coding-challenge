import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  PagePlayComponent,
  PageReportsComponent,
  PageHistoryComponent,
  InputsComponent
} from './modules/delivery/components';

const routes: Routes = [
  {
    path: 'play',
    component: PagePlayComponent
  },
  {
    path: 'reports',
    component: PageReportsComponent
  },
  {
    path: 'history',
    component: PageHistoryComponent
  },
  {
    path: 'inputs',
    component: InputsComponent
  },
  {
    path: '**',
    redirectTo: 'play'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]

})
export class AppRoutingModule { }
