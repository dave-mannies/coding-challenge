import { Component, OnInit } from '@angular/core';

import { DeliveryService, DeliveryResults } from "../../services";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent implements OnInit {
  results!: DeliveryResults;

  constructor(public dservice: DeliveryService) {
    this.results = this.dservice.getDeliveryResults();

    // todo remove
    console.log(JSON.stringify(this.results, null, 2));
  }

  ngOnInit(): void {
  }

}
