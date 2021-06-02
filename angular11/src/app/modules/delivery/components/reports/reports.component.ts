import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { DeliveryResults, DeliveryService, Results } from "../../services";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  results!: Results;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['order', 'dId', 'x', 'y', 'pizzas'];

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.navChanged();
  }

  __naving = 0;
  navChanged() {
    clearTimeout(this.__naving)
    this.__naving = setTimeout(() => {
      this.dataSource.data = this.dservice.getDeliveryTracking();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }
}
