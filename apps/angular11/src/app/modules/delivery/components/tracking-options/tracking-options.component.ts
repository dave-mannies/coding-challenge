import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DeliveryEntry, DeliveryResults, TrackingAnalysis } from "@ts/*";

export interface ExDeliveryEntry extends DeliveryEntry {
  hide?: boolean;
  title?: string;
}

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

export class TrackingOptionsWrapper {
  current?: DeliveryResults;
  tracking: ExDeliveryEntry[] = [];
  optionsDefault: TrackingOptions = {
    deliverees: 0,
    showDel: [true, true, true, true],
    start: 0,
    end: 0,
    max: 0,
    pmax: 0,
    pizzas: 0
  };
  options: TrackingOptions = { ...this.optionsDefault };

  constructor() {
  }

  navChanged(current: DeliveryResults) {
    this.clear();
    this.current = current;

    requestAnimationFrame(() => {
      this.getTracking(this.current!);
    });
  }

  clear(): void {
    this.options = { ...this.optionsDefault };
    this.current = undefined;
    this.tracking = [];
  }

  getTracking(current: DeliveryResults): void {
    this.current = current;

    if (this.current && this.current.analysis.length) {
      const analysis = this.current.analysis[0];
      this.tracking = analysis.entries;
      this.analyze(analysis);
      this.filter();
    }
  }

  analyze(analysis: TrackingAnalysis): void {
    this.options.deliverees = this.current?.deliverees ?? 1;
    this.options.max = Math.floor(this.tracking.length / (this.current?.deliverees ?? 1));
    this.options.start = this.options.max > 0 ? 1 : 0;
    this.options.end = this.options.max;
    this.options.pmax = analysis.pmax;
    this.options.pizzas = 1;
  }

  filter(): void {
    this.tracking.forEach(track => {
      track.hide =
        this.options.start > track.order ||
        this.options.end < track.order ||
        track.pizzas < this.options.pizzas ||
        !this.options.showDel[track.dId - 1];
    });
  }
}
