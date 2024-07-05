import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { DeliveryResults, DeliveryService, Results } from '../../services';

@Component({
  selector: 'app-results-history',
  templateUrl: './results-history.component.html',
  styles: [
  ]
})
export class ResultsHistoryComponent implements AfterViewInit {
  @Input() results!: Results;
  @Output() change = new EventEmitter<DeliveryResults>();

  constructor(public dservice: DeliveryService) {
    if (!this.results) {
      this.results = this.dservice.results;
    }
  }

  ngAfterViewInit(): void {
    this.nav(0);
  }

  nav(dir: number) {
    switch (dir) {
      case -1:
        if (this.results.currentIndex > 0) {
          this.results.currentIndex--;
        }
        break;

      case 1:
        if (this.results.currentIndex < this.results.history.length - 1) {
          this.results.currentIndex++;
        }
        break;
    }

    const current = this.results.current;
    const id = this.results.history[this.results.currentIndex].id;
    if (!dir || (current && current.id !== id)) {
      this.results.current = this.results.history[this.results.currentIndex];

      requestAnimationFrame(() => {
        this.change.emit(this.results.current);
      });
    }
  }

  disableNav(dir: number): boolean {
    switch (dir) {
      case -1:
        if (this.results.currentIndex > 0) {
          return false;
        }
        break;

      case 1:
        if (this.results.currentIndex < this.results.history.length - 1) {
          return false;
        }
        break;
    }

    return true;
  }
}
