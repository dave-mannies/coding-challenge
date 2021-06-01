import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
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
export class HistoryComponent implements OnInit {
  results!: Results;
  viewEnum = ViewEnum;
  viewMode = ViewEnum.Cards;
  dataSource = new MatTableDataSource<DeliveryResults>([]);
  displayedColumns = ['id', 'date', 'deliverees', 'dispatch', 'delivered', 'houses'];

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
    this.dataSource.data = this.results.history;
  }

  ngOnInit(): void {
  }

}
