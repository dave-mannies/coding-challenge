import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

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
export class PlayComponent implements OnInit, AfterViewInit {
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
  deliverees = 0;

  constructor(public dservice: DeliveryService) {
    this.results = dservice.results;
  }

  ngOnInit(): void {
    this.getTracking();
  }

  ngAfterViewInit(): void {
    this.navChanged();
  }

  fitToBoard(): void {
    const el = this.board.nativeElement;

    const offsetWidth = el.offsetWidth;
    const offsetHeight = el.offsetHeight;
    const width = Math.abs(this.xmax - this.xmin + 1);
    const height = Math.abs(this.ymax - this.ymin + 1);
    const mult = Math.min( Math.floor(offsetWidth / width), Math.floor( offsetHeight / height ) );
    const mwidth = width * mult;
    const mheight = height * mult;
    const xoffset = offsetWidth / 2 - ((this.xmin + this.xmax) / 2) * mult;
    const yoffset = offsetHeight / 2 + ((this.ymin + this.ymax) / 2) * mult;

    el.style.setProperty('--xoffset', xoffset);
    el.style.setProperty('--yoffset', yoffset);
    el.style.setProperty('--mult', mult);
  }

  // __na
  navChanged() {
    setTimeout(() => {
      this.getTracking();
      this.fitToBoard();
    }, 1000);
  }

  getTracking(): void {
    this.tracking = this.dservice.getDeliveryTracking();
    this.analyze();
    this.filter();
  }

  analyze() {
    this.deliverees = this.results.current?.deliverees ?? 1;
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
      ymin = Math.min(ymin, track.y!);
      ymax = Math.max(ymax, track.y!);
      pmax = Math.max(pmax, track.pizzas!);

      track.title = `${ track.x! }, ${ track.y! }: ${ track.pizzas } pizzas`
    });

    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.pmax = pmax;
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
