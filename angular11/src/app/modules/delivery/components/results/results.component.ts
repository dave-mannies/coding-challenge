import { Component, Input, OnInit } from '@angular/core';
import { DeliveryResults } from "@ts/*";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {
  @Input() results?: DeliveryResults;

  constructor() { }

  ngOnInit(): void {
  }

}
