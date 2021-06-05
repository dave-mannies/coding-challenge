import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DeliveryResults, DeliveryService, Results } from "../../services";

export enum ViewEnum {
  Cards,
  Table
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: [`
    tr.example-detail-row {
      height: 0;
    }

    tr.example-element-row:not(.example-expanded-row):hover {
      background: whitesmoke;
    }

    tr.example-element-row:not(.example-expanded-row):active {
      background: #efefef;
    }

    .example-element-row td {
      border-bottom-width: 0;
    }

    .example-element-detail {
      overflow: hidden;
      display: flex;
    }
  `
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit, AfterViewInit {
  results!: Results;
  viewEnum = ViewEnum;
  viewMode = ViewEnum.Cards;
  dataSource = new MatTableDataSource<DeliveryResults>([]);
  displayedColumns = ['id', 'date', 'deliverees', 'delivered', 'houses'];
  expandedElement: any = null;

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.results.history;
  }
}
