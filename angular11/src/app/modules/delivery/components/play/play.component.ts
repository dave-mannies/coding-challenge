import { Component, OnInit } from '@angular/core';
import { DeliveryResults } from "@ts/*";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styles: [
  ]
})
export class PlayComponent implements OnInit {
  results!: DeliveryResults;

  constructor() { }

  ngOnInit(): void {
  }

}
