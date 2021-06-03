import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { DeliveryEntry, DeliveryResults } from "../../services";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  current?: DeliveryResults;
  tracking: DeliveryEntry[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['order', 'dId', 'x', 'y', 'pizzas'];

  constructor() {
  }

  ngOnInit(): void {
  }

  navChanged(current: DeliveryResults) {
    this.current = undefined;
    this.tracking = [];

    setTimeout(() => {
      this.getTracking(current);
    });
  }

  getTracking(current: DeliveryResults): void {
    this.current = current;

    if (this.current && this.current.analysis.length) {
      this.tracking = this.current.analysis[0].entries;
      this.dataSource.data = this.tracking;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
