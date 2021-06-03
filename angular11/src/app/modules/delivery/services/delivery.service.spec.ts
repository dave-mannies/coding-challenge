import { TestBed } from '@angular/core/testing';

import { DeliveryService, Inputs } from './delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.inputs).toBeTruthy();
    expect(service.results).toBeTruthy();
  });

  it('getDeliveryResults() to default', () => {
    const res = service.getDeliveryResults();
    expect(res).toBeTruthy();
    expect(res.housesCount).toBe(8);
  });

  it('getDeliveryResults() to use inputs', () => {
    const inputs: Inputs = { deliverees: 2, dispatch: '^>^>^>'};
    const res = service.getDeliveryResults(inputs);
    expect(res).toBeTruthy();
    expect(res.housesCount).toBe(7);
  });

  it('addResults() to update results', () => {
    const length = service.results.history.length;
    const res = service.getDeliveryResults();
    service.addResults(res);

    expect(service.results.current).toBeTruthy();
    expect(service.results.updated).toBeTruthy();
    expect(service.results.history.length).toBe(length + 1);
  });

  it('addResults() to update multiple results', () => {
    const length = service.results.history.length;
    const inputs: Inputs = { deliverees: 2, dispatch: '^>^>^>'};
    let res = service.getDeliveryResults();

    service.addResults(res);
    res = service.getDeliveryResults(inputs);
    service.addResults(res);

    expect(service.results.updated).toBeTruthy();
    expect(length).not.toBe(0);
    expect(service.results.current?.housesCount).toBe(7);
    expect(service.results.history[length + 1].housesCount).toBe(7);
  });

  it('addResults() to limit history', () => {
    const inputs: Inputs = { deliverees: 2, dispatch: '^>^>^>'};
    let res = service.getDeliveryResults();

    for(let i = 0; i < 10; i++) {
      res = service.getDeliveryResults();
      service.addResults(res);
      res = service.getDeliveryResults(inputs);
      service.addResults(res);
    }

    expect(service.results.updated).toBeTruthy();
    expect(service.results.history.length).toBe(5);
    expect(service.results.current?.housesCount).toBe(7);
    expect(service.results.history[1].housesCount).toBe(8);
  });

});
