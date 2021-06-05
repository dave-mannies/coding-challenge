import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { DeliveryEntry, DeliveryResults, DeliveryService, Grid, Results, TrackingAnalysis } from "../../services";
import { TrackingOptions, ExDeliveryEntry } from "../tracking-options/tracking-options.component";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styles: [
  ]
})
export class PlayComponent implements OnInit {
  @ViewChild('board') board!: ElementRef;

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

  ngOnInit(): void {
  }

  fitToBoard(): void {
    const el = this.board.nativeElement;
    const analysis = this.current?.analysis[0];

    if (el && analysis) {
      const maxMult = 25;
      const scale = Grid.getFit(analysis, el.offsetWidth, el.offsetHeight, maxMult);

      el.style.setProperty('--xoffset', scale.xoffset);
      el.style.setProperty('--yoffset', scale.yoffset);
      el.style.setProperty('--mult', scale.mult);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.fitToBoard();
  }

  __naving: any = 0;
  navChanged(current: DeliveryResults) {
    this.clear();

    clearTimeout(this.__naving);
    this.__naving = setTimeout(() => {
      this.getTracking(current);
      this.fitToBoard();
    }, 100);
  }

  clear(): void {
    clearTimeout(this.__animate);
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
    this.options.end = 1; // this.max;
    this.options.pmax = analysis.pmax;
    this.options.pizzas = 1;
    this.animate();
  }

  __animate: any;
  animate(): void {
    this.options.end += this.options.max / 100;
    this.options.end = Math.min(this.options.end, this.options.max);

    this.filter();

    if (this.options.end !== this.options.max) {
      this.__animate = setTimeout(() => {
        this.animate();
      }, 50);
    }
  }

  floor(val: number): number {
    return Math.floor(val);
  }

  filter(): void {
    this.options.start;

    this.tracking.forEach(track => {
      track.hide =
        this.options.start > track.order ||
        this.options.end < track.order ||
        track.pizzas < this.options.pizzas ||
        !this.options.showDel[track.dId - 1];
    });
  }
}
