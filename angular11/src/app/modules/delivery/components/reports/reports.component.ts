import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";

import { DeliveryResults, DeliveryService, Results } from "../../services";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent implements OnInit {
  results!: Results;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['order', 'dId', 'x', 'y', 'pizzas'];

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
    this.navChanged();
  }

  __naving = 0;
  navChanged() {
    clearTimeout(this.__naving)
    this.__naving = setTimeout(() => {
      this.dataSource.data = this.dservice.getDeliveryTracking();
    }, 1000);
  }

}
