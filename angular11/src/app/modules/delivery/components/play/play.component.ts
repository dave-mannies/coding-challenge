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
export class PlayComponent implements OnInit {
  @ViewChild('board') board!: ElementRef;

  current?: DeliveryResults;
  tracking: ExDeliveryEntry[] = [];
  deliverees = 0;
  showDel = [true, true, true, true];
  start = 0;
  end = 0;
  max = 0;
  pmin = 0;
  pmax = 0;

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
    this.deliverees = 0;
    this.current = undefined;
    this.tracking = [];
    this.showDel = [true, true, true, true];
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
    this.deliverees = this.current?.deliverees ?? 1;
    this.max = this.tracking.length / (this.current?.deliverees ?? 1);
    this.start = this.max > 0 ? 1 : 0;
    this.end = this.max;
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
      track.hide =
        this.start > track.order ||
        this.end < track.order ||
        !this.showDel[track.dId - 1];
    });
  }

  formatLabel(value: number) {
    return value;
  }
}
