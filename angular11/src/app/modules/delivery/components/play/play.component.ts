import { Component, OnInit } from '@angular/core';

import { DeliveryService, Results } from "../../services";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styles: [
  ]
})
export class PlayComponent implements OnInit {
  results!: Results;

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
  }

}
