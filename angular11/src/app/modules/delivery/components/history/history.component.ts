import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from "@angular/material/legacy-table";
import { DeliveryResults, DeliveryService, Results } from "../../services";

export enum ViewEnum {
  Cards,
  Table
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: [
  ]
})
export class HistoryComponent implements OnInit, AfterViewInit {
  results!: Results;
  viewEnum = ViewEnum;
  viewMode = ViewEnum.Cards;
  dataSource = new MatTableDataSource<DeliveryResults>([]);
  displayedColumns = ['id', 'date', 'deliverees', 'delivered', 'houses'];

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.results.history;
  }
}
