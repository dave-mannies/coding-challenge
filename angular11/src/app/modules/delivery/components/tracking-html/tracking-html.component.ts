import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import { ExDeliveryEntry } from "../tracking-options/tracking-options.component";

@Component({
  selector: 'app-tracking-html',
  templateUrl: './tracking-html.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingHtmlComponent implements OnInit {
  @Input() tracking: ExDeliveryEntry[] = [];
  @Output() hovering = new EventEmitter<ExDeliveryEntry | undefined>()
  @ViewChild('board') board!: ElementRef;

  hover?: ExDeliveryEntry;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  refresh(): void {
    this.changeDetectorRef.markForCheck();
  }

  onMouseenterEntry(ev: MouseEvent): void {
    const target = ev.target as HTMLElement;
    const index = Number.parseInt(target.getAttribute('index') ?? '-1');

    if (index !== -1 && index < this.tracking.length) {
      this.hover = this.tracking[index];
      this.hovering.emit(this.hover);
    }
  }

  onMouseleaveEntry(ev: MouseEvent): void {
    this.hover = undefined;
    this.hovering.emit(this.hover);
  }
}
