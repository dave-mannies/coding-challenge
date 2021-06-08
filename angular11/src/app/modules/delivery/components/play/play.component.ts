import { Component, ViewChild } from '@angular/core';

import { DeliveryResults } from "../../services";
import { TrackingHtmlComponent } from "../tracking-html/tracking-html.component";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styles: [
  ]
})
export class PlayComponent {
  @ViewChild('board') board!: TrackingHtmlComponent;

  constructor() {
  }

  navChanged(current: DeliveryResults) {
    this.board.navChanged(current);
  }
}
