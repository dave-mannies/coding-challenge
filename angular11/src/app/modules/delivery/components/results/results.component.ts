import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DeliveryResults } from "@ts/*";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() results?: DeliveryResults;
  @Output() change = new EventEmitter<DeliveryResults>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges (changes: SimpleChanges): void {
    setTimeout(() => {
      this.change.emit(this.results);
    });
  }
}
