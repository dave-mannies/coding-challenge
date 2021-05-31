import { Component, OnInit } from '@angular/core';

import { DeliveryService, Results } from "../../services";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent implements OnInit {
  results!: Results;

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
  }

}
