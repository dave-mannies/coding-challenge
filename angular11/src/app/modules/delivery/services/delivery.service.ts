import { Injectable } from '@angular/core';

import { deliveries, test, DeliveryResults, Grid } from "@ts/index";

export interface Inputs {
  deliverees: number;
  dispatch: string;
}

export  interface Results {
  current?: DeliveryResults;
  history: DeliveryResults[];
  updated?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  static DELIVEREES = [1, 2, 3, 4];
  static DISPATCHES = ['^^<<v<<v><', '^v^v^v^v^v'];
  // max count of results saved to history
  static MAX_HISTORY_LEN = 5;

  inputs: Inputs = {
    deliverees: DeliveryService.DELIVEREES[0],
    dispatch: DeliveryService.DISPATCHES[0]
  };
  results: Results = {
    current: undefined,
    history: [],
    updated: undefined
  };
  nextId = 1;

  constructor() {
    const res = this.getDeliveryResults();
    this.addResults(res);
  }

  getDeliveryResults(inputs?: Inputs): DeliveryResults {
    return deliveries(inputs?.deliverees ?? this.inputs.deliverees, inputs?.dispatch ?? this.inputs.dispatch);
  }

  addResults(results: DeliveryResults): void {
    results.id = this.nextId++;

    this.results.current = results;
    this.results.history.unshift(results);
    this.results.updated = new Date();

    const len = this.results.history.length;
    if (len > DeliveryService.MAX_HISTORY_LEN) {
      const del = len - DeliveryService.MAX_HISTORY_LEN;
      this.results.history.splice(len - del, del);
    }
  }

  getAddResults(inputs?: Inputs): DeliveryResults {
    const res = this.getDeliveryResults(inputs);

    this.addResults(res);

    return res;
  }
}
