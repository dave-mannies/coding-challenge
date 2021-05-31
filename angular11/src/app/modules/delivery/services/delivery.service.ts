import { Injectable } from '@angular/core';

import { deliveries, test, DeliveryResults, Grid } from "@ts/index";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  static DELIVEREES = [1, 2, 3, 4];
  static DISPATCHES = ['^^<<v<<v><'];

  deliverees = DeliveryService.DELIVEREES[0];
  dispatch = DeliveryService.DISPATCHES[0];

  constructor() { }

  getDeliveryResults(count?: number, dispatch?: string): DeliveryResults {
    return deliveries(count ?? this.deliverees, dispatch ?? this.dispatch);
  }

}
