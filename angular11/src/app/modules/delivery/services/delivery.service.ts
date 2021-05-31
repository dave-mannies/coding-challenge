import { Injectable } from '@angular/core';

import { deliveries, test, DeliveryResults, Grid } from "@ts/index";

export interface Inputs {
  deliverees: number;
  dispatch: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  static DELIVEREES = [1, 2, 3, 4];
  static DISPATCHES = ['^^<<v<<v><', '^v^v^v^v^v'];

  inputs = {
    deliverees: DeliveryService.DELIVEREES[1],
    dispatch: DeliveryService.DISPATCHES[1]
  };
  results?: DeliveryResults;

  constructor() { }

  getDeliveryResults(inputs?: Inputs): DeliveryResults {
    return deliveries(inputs?.deliverees ?? this.inputs.deliverees, inputs?.dispatch ?? this.inputs.dispatch);
  }

}
