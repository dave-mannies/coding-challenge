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
import {
  TrackingOptions,
  ExDeliveryEntry,
  TrackingOptionsWrapper
} from "../tracking-options/tracking-options.component";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styles: [
  ]
})
export class PlayComponent extends TrackingOptionsWrapper implements OnInit {
  @ViewChild('board') board!: ElementRef;

  constructor() {
    super();
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

  analyze(analysis: TrackingAnalysis): void {
    super.analyze(analysis);

    this.options.end = 1;

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
}
