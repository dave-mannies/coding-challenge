import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DeliveryResults, Grid, ScalingResults, TrackingAnalysis } from "@ts/*";
import { ExDeliveryEntry, TrackingOptionsWrapper } from "../tracking-options/tracking-options.component";

@Component({
  selector: 'app-tracking-html',
  templateUrl: './tracking-html.component.html',
  styles: [
  ]
})
export class TrackingHtmlComponent extends TrackingOptionsWrapper implements OnInit {
  @ViewChild('board') board!: ElementRef;

  scale: ScalingResults = { xoffset: 0, yoffset: 0, mult: 0, zoom: 1, xpan: 0, ypan: 0};
  panZoom: ScalingResults = { xoffset: 0, yoffset: 0, mult: 0, zoom: 1, xpan: 0, ypan: 0};
  hover?: ExDeliveryEntry;

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
      this.scale = Grid.getFit(analysis, el.offsetWidth, el.offsetHeight, maxMult);
      this.updateCssVars(el);
    }
  }

  updateCssVars(el?: HTMLElement) {
    el = el ?? this.board.nativeElement;

    if (el) {
      const scale = this.scale;
      const panZoom = this.panZoom;

      el.style.setProperty('--xoffset', '' + (scale.xoffset + panZoom.xoffset));
      el.style.setProperty('--yoffset', '' + (scale.yoffset + panZoom.yoffset));
      el.style.setProperty('--mult', '' + (scale.mult + panZoom.mult));
      el.style.setProperty('--zoom', '' + (panZoom.zoom));
      el.style.setProperty('--xpan', '' + (panZoom.xpan));
      el.style.setProperty('--ypan', '' + (panZoom.ypan));
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.fitToBoard();
  }

  onMousedown(ev: MouseEvent): void {
    console.log(`mousedown`);
  }

  onMouseup(ev: MouseEvent): void {
    console.log(`mouseup`);
  }

  onMousemove(ev: MouseEvent): void {
    console.log(`mousemove`);
  }

  onMouseenter(ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    const index = Number.parseInt(target.getAttribute('index') ?? '-1');

    if (index !== -1 && index < this.tracking.length) {
      this.hover = this.tracking[index];
    }
  }

  onMouseleave(ev: MouseEvent): void {
    this.hover = undefined;
  }

  navChanged(current: DeliveryResults) {
    this.clear();

    requestAnimationFrame(() => {
      this.getTracking(current);
      this.fitToBoard();
    });
  }

  clear(): void {
    super.clear();

    this.panZoom = { xoffset: 0, yoffset: 0, mult: 0, zoom: 1, xpan: 0, ypan: 0};
  }

  analyze(analysis: TrackingAnalysis): void {
    super.analyze(analysis);

    this.options.end = 1;
    this.animate();
  }

  animate(): void {
    this.options.end += this.options.max / 10;
    this.options.end = Math.min(this.options.end, this.options.max);

    this.filter();

    if (this.options.end !== this.options.max) {
      requestAnimationFrame(() => this.animate())
    }
  }

  floor(val: number): number {
    return Math.floor(val);
  }

  zoom(dir: number): void {
    // this.scale.xoffset += dir * 100;
    // this.panZoom.xpan += dir * 100;
    this.panZoom.mult += 2 * dir;
    this.panZoom.mult = Math.max(0, this.panZoom.mult);
    // this.panZoom.zoom += dir / 2;

    console.log(JSON.stringify(this.scale));
    console.log(JSON.stringify(this.panZoom));

    this.updateCssVars()
  }

  disableZoom(dir: number): boolean {
    return false;
  }

}
