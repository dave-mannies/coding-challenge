import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { DeliveryEntry, DeliveryService, Results } from "../../services";

interface ExDeliveryEntry extends DeliveryEntry {
  hide?: boolean;
  title?: string;
}

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styles: [
  ]
})
export class PlayComponent implements OnInit, OnChanges {
  @ViewChild('board') board!: ElementRef;

  showDel = [true, true, true, true];
  results!: Results;
  tracking: ExDeliveryEntry[] = [];
  start = 0;
  end = 0;
  max = 0;
  xmin = 0;
  xmax = 0;
  ymin = 0;
  ymax = 0;
  pmax = 0;

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
    this.getTracking();
  }

  ngOnChanges (changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  getTracking(): void {
    this.tracking = this.dservice.getDeliveryTracking();
    this.analyze();
    this.filter();
  }

  analyze() {
    this.max = this.tracking.length / (this.results.current?.deliverees ?? 1);
    this.start = this.max > 0 ? 1 : 0;
    this.end = this.max;

    let xmin = 0;
    let xmax = 0;
    let ymin = 0;
    let ymax = 0;
    let pmax = 0;

    this.tracking.forEach(track => {
      xmin = Math.min(xmin, track.x!);
      xmax = Math.max(xmax, track.x!);
      ymin = Math.min(ymin, track.x!);
      ymax = Math.max(ymax, track.x!);
      pmax = Math.max(pmax, track.pizzas!);

      track.title = `${ track.x! }, ${ track.y! }: ${ track.pizzas } pizzas`
    });

    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.pmax = pmax;

    console.log({xmin, xmax, ymin, ymax, pmax});
  }

  toggleChanged(dId: number): void {
    this.showDel[dId] = !this.showDel[dId];
    this.filter();
  }

  startChanged(): void {
    if (this.end < this.start) {
      this.end = Math.min(this.start + 100, this.max);
    }
    this.filter();
  }

  endChanged(): void {
    if (this.start > this.end) {
      this.start = Math.max(this.end - 100, 0);
    }
    this.filter();
  }

  filter(): void {
    this.start

    this.tracking.forEach(track => {
      track.hide = this.start > track.order || this.end < track.order || !this.showDel[track.dId - 1];
    });
  }

  formatLabel(value: number) {
    return value;
  }
}
