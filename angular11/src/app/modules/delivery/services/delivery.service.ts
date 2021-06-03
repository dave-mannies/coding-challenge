import { Injectable } from '@angular/core';

import { deliveries, test, DeliveryResults, Grid, DeliveryEntry } from "@ts/index";

export interface Inputs {
  deliverees: number;
  dispatch: string;
}

export  interface Results {
  currentIndex: number;
  current?: DeliveryResults;
  history: DeliveryResults[];
  updated?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  static DELIVEREES = [1, 2, 3, 4];
  static DISPATCHES = ['^v>^v>^v>^v<^v<', '>>><<<<<<', 'vv', '<<', 'vvvv', '^^<<v<<v><', '^v^v^v^v^v'];
  // max count of results saved to history
  static MAX_HISTORY_LEN = 5;

  inputs: Inputs = {
    deliverees: DeliveryService.DELIVEREES[0],
    dispatch: DeliveryService.DISPATCHES[0]
  };
  results: Results = {
    currentIndex: 0,
    current: undefined,
    history: [],
    updated: undefined
  };
  nextId = 1;

  constructor() {
    this.prepopulate();
  }

  prepopulate() {
    this.getAddResults();
    this.getAddResults({ deliverees: 1, dispatch: test });
    this.getAddResults({ deliverees: 2, dispatch: test });

    this.results.current = this.results.history[0];
    this.results.currentIndex = 0;
  }

  getDeliveryResults(inputs?: Inputs): DeliveryResults {
    return deliveries(inputs?.deliverees ?? this.inputs.deliverees, inputs?.dispatch ?? this.inputs.dispatch);
  }

  addResults(results: DeliveryResults): void {
    results.id = this.nextId++;

    this.results.current = results;
    this.results.history.push(results);
    this.results.updated = new Date();

    const len = this.results.history.length;
    if (len > DeliveryService.MAX_HISTORY_LEN) {
      const del = len - DeliveryService.MAX_HISTORY_LEN;
      this.results.history.splice(0, del);
    }

    this.results.currentIndex = this.results.history.length - 1;
  }

  getAddResults(inputs?: Inputs): DeliveryResults {
    const res = this.getDeliveryResults(inputs);

    this.addResults(res);

    return res;
  }

  getDeliveryTracking(results?: DeliveryResults): DeliveryEntry[] {
    let ret: DeliveryEntry[] = [];

    results = results ?? this.results.current;

    if (results && results.analysis.length) {
      ret = results.analysis[0].entries;
    }

    return ret;
  }
}
