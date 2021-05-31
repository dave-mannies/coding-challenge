import { Component, OnInit } from '@angular/core';
import { DeliveryService, Results } from "../../services";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styles: [
  ]
})
export class HistoryComponent implements OnInit {
  results!: Results;

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
  }

}
