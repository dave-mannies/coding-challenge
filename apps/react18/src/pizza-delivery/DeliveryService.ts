import {DeliveryEntry, DeliveryResults, Inputs, Results, TrackingAnalysis} from './types';
import {deliveries} from './delivery';
import {test} from './PizzaDeliveryInput';

export type TrackingOptions = {
  deliverees: number;
  showDel: boolean[];
  start: number;
  end: number;
  max: number;
  pmax: number;
  pizzas: number;
}

export class DeliveryService {
  static DELIVEREES = [1, 2, 3, 4];
  static DISPATCHES = ['^v>^v>^v>^v<^v<', '>>><<<<<<', 'vv', '<<', 'vvvv', '^^<<v<<v><', '^v^v^v^v^v'];
  // max count of results saved to history
  static MAX_HISTORY_LEN = 5;

  inputs: Inputs = {
    deliverees: DeliveryService.DELIVEREES[0]!,
    dispatch: DeliveryService.DISPATCHES[0]!
  };
  results: Results = {
    history: [],
    updated: undefined
  };
  currentIndex: number = 0;
  nextId = 1;

  constructor() {
    this.prepopulate();
  }

  prepopulate() {
    this.getAddResults();
    this.getAddResults({ deliverees: 1, dispatch: test });
    this.getAddResults({ deliverees: 2, dispatch: test });
    this.getAddResults({ deliverees: 3, dispatch: test });
    this.getAddResults({ deliverees: 4, dispatch: test });

    this.currentIndex = 0;
  }

  getDeliveryResults(inputs?: Inputs): DeliveryResults {
    return deliveries(inputs?.deliverees ?? this.inputs.deliverees, inputs?.dispatch ?? this.inputs.dispatch);
  }

  addResults(results: DeliveryResults): void {
    results.id = this.nextId++;

    this.results.history.push(results);
    this.currentIndex = this.results.history.length - 1;

    this.results.updated = new Date();
    const len = this.results.history.length;
    if (len > DeliveryService.MAX_HISTORY_LEN) {
      const del = len - DeliveryService.MAX_HISTORY_LEN;
      this.results.history.splice(0, del);

    }
  }

  getAddResults(inputs?: Inputs): DeliveryResults {
    const res = this.getDeliveryResults(inputs);

    this.addResults(res);

    return res;
  }

  getTrackingOptions(index: number): TrackingOptions {
    const results = this.getDeliveryResultsByIndex(index);
    const analysis = this.getDeliveryTrackingAnalysis(index);
    const deliverees = results?.deliverees ?? 0;
    const showDel = new Array(deliverees).fill(true);
    const max = Math.ceil((analysis?.entries?.length ?? 0) / deliverees);
    const start = 0;
    const end = max;
    const pmax = analysis?.pmax ?? 0;
    const pizzas = 1;

    return {deliverees, showDel, start, end, max, pmax, pizzas};
  }

  filter(entries: DeliveryEntry[],  options: TrackingOptions): void {
    entries.forEach(track => {
      track.hide =
        options.start > track.order ||
        options.end < track.order ||
        track.pizzas < options.pizzas ||
        !options.showDel[track.dId - 1];
    });
  }

  getDeliveryResultsByIndex(index: number): DeliveryResults | undefined {
    return this.results.history?.[index];
  }

  getDeliveryTrackingAnalysis(index: number): TrackingAnalysis | undefined {
    return this.getDeliveryResultsByIndex(index)?.analysis?.[0];
  }

  getDeliveryTracking(index: number): DeliveryEntry[] {
    return this.getDeliveryTrackingAnalysis(index)?.entries ?? [];
  }
}
