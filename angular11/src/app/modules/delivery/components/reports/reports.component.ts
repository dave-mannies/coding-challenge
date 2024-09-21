import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DeliveryResults } from '../../services';
import { TrackingOptionsWrapper, ExDeliveryEntry } from '../tracking-options/tracking-options.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent extends TrackingOptionsWrapper implements OnInit, AfterContentInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['order', 'dId', 'x', 'y', 'pizzas'];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate =
      (data: ExDeliveryEntry, filter: string): boolean => !(data.hide ?? false);
  }

  clear(): void {
    super.clear();
    this.dataSource.data = this.tracking;
  }

  getTracking(current: DeliveryResults): void {
    if (this.current) {
      super.getTracking(current);
      this.dataSource.data = this.tracking;
    }
  }

  tableFilter(): void {
    this.dataSource.filter = 'trigger';
  }

  filter(): void {
    super.filter();
    this.tableFilter();
  }
}
