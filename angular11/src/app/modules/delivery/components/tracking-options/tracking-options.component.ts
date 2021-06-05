import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface TrackingOptions {
  deliverees: number;
  showDel: boolean[];
  start: number;
  end: number;
  max: number;
  pmax: number;
  pizzas: number;
}

@Component({
  selector: 'app-tracking-options',
  templateUrl: './tracking-options.component.html',
  styles: [
  ]
})
export class TrackingOptionsComponent implements OnInit {
  @Input() options!: TrackingOptions;
  @Output() change = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleChanged(dId: number): void {
    this.options.showDel[dId] = !this.options.showDel[dId];
    this.changed();
  }

  startChanged(): void {
    if (this.options.end < this.options.start) {
      this.options.end = Math.min(this.options.start + 100, this.options.max);
    }
    this.changed();
  }

  endChanged(): void {
    if (this.options.start > this.options.end) {
      this.options.start = Math.max(this.options.end - 100, 0);
    }
    this.changed();
  }

  changed(): void {
    this.change.emit();
  }

  formatLabel(value: number) {
    return value;
  }
}
