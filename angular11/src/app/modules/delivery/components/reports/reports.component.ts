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
    this.dataSource.data = dservice.getDeliveryTracking();
  }

  ngOnInit(): void {
  }

}
