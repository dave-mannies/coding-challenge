import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { DeliveryResults, TrackingAnalysis } from "../../services";
import { ExDeliveryEntry, TrackingOptions } from "../";

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
  tracking: ExDeliveryEntry[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['order', 'dId', 'x', 'y', 'pizzas'];
  optionsDefault: TrackingOptions = {
    deliverees: 0,
    showDel: [true, true, true, true],
    start: 0,
    end: 0,
    max: 0,
    pmax: 0,
    pizzas: 0
  };
  options: TrackingOptions = { ...this.optionsDefault };

  constructor() {
  }

  ngOnInit(): void {
  }

  navChanged(current: DeliveryResults) {
    this.clear();

    this.current = undefined;
    this.tracking = [];

    setTimeout(() => {
      this.getTracking(current);
    });
  }

  clear(): void {
    this.options = { ...this.optionsDefault };
    this.current = undefined;
    this.tracking = [];
  }

  getTracking(current: DeliveryResults): void {
    this.current = current;

    if (this.current && this.current.analysis.length) {
      const analysis = this.current.analysis[0];
      this.tracking = analysis.entries;
      this.dataSource.data = this.tracking;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: ExDeliveryEntry, filter: string): boolean => !data.hide ?? false;
      this.analyze(analysis);
      this.filter();
    }
  }

  analyze(analysis: TrackingAnalysis): void {
    this.options.deliverees = this.current?.deliverees ?? 1;
    this.options.max = Math.floor(this.tracking.length / (this.current?.deliverees ?? 1));
    this.options.start = this.options.max > 0 ? 1 : 0;
    this.options.end = this.options.max;
    this.options.pmax = analysis.pmax;
    this.options.pizzas = 1;
  }

  tableFilter(): void {
    this.dataSource.filter = 'fake'
  }

  filter(): void {
    this.tracking.forEach(track => {
      track.hide =
        this.options.start > track.order ||
        this.options.end < track.order ||
        track.pizzas < this.options.pizzas ||
        !this.options.showDel[track.dId - 1];
    });

    this.tableFilter();
  }

}
