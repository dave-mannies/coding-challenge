import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Results } from "../../services";

@Component({
  selector: 'app-results-history',
  templateUrl: './results-history.component.html',
  styles: [
  ]
})
export class ResultsHistoryComponent implements OnInit {
  @Input() results!: Results;
  @Output() change = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
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

    this.results.current = this.results.history[this.results.currentIndex];

    this.change.emit(this.results.current);
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
