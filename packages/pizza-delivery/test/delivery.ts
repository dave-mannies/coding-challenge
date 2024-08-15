import 'mocha';
import { expect } from 'chai';

import { delivery, deliveries, DeliveryResults, splitDispatch } from "../src/delivery";
import { test } from '../src/PizzaDeliveryInput';

describe('delivery', () => {
  it('should exist', () => {
    expect(delivery).to.exist;
  })

  it ('should return 0 for no dispatch', () => {
    expect(delivery().housesCount).to.equal(0);
    expect(delivery().housesCount).to.equal(0);
  })

  it ('should return 0 for empty dispatch', () => {
    const dispatch = '';
    expect(delivery(dispatch).housesCount).to.equal(0);
  })

  it ('should return 2 for ">"', () => {
    const dispatch = '>';
    expect(delivery(dispatch).housesCount).to.equal(2);
  })

  it ('should return 2 for "<"', () => {
    const dispatch = '<';
    expect(delivery(dispatch).housesCount).to.equal(2);
  })

  it ('should return 2 for "><"', () => {
    const dispatch = '><';
    expect(delivery(dispatch).housesCount).to.equal(2);
  })

  it ('should return 2 for "^"', () => {
    const dispatch = '^';
    expect(delivery(dispatch).housesCount).to.equal(2);
  })

  it ('should return 2 for "v"', () => {
    const dispatch = 'v';
    expect(delivery(dispatch).housesCount).to.equal(2);
  })

  it ('should return 2 for "^v"', () => {
    const dispatch = '^v';
    expect(delivery(dispatch).housesCount).to.equal(2);
  })

  it ('should return 4 for "^>v<"', () => {
    const dispatch = '^>v<';
    expect(delivery(dispatch).housesCount).to.equal(4);
  })

  it ('should return 2 for "^v^v^v^v^v"', () => {
    const dispatch = '^v^v^v^v^v';
    expect(delivery(dispatch).housesCount).to.equal(2);
  })

  it ('should return 10 for "^^<<v<<v><"', () => {
    const dispatch = '^^<<v<<v><';
    expect(delivery(dispatch).housesCount).to.equal(10);
  })

  it ('should return 5 for "^<v<>"', () => {
    const dispatch = '^<v<>';
    expect(delivery(dispatch).housesCount).to.equal(5);
  })

  it ('should return 6 for "^<<v<"', () => {
    const dispatch = '^<<v<';
    expect(delivery(dispatch).housesCount).to.equal(6);
  })

  it ('should return 2565 for test', () => {
    const dispatch = test;
    expect(delivery(dispatch).housesCount).to.equal(2565);
  })

  it ('should deliver test length + 1 pizzas', () => {
    const dispatch = test;
    const res = delivery(dispatch);

    expect(res.pizzasCount).to.equal(test.length + 1);
  });
});

describe('deliveries', () => {
  it('should exist', () => {
    expect(deliveries).to.exist;
  })

  it ('should return 3 for 2 deliverees and "^v"', () => {
    const dispatch = '^v';
    const res = deliveries(2, dispatch);

    expect(res.housesCount).to.equal(3);
  })

  it ('should return 3 for 2 deliverees and "^>v<"', () => {
    const dispatch = '^>v<';
    const res = deliveries(2, dispatch);

    expect(res.housesCount).to.equal(3);
  })

  it ('should return 11 for 2 deliverees and "^v^v^v^v^v"', () => {
    const dispatch = '^v^v^v^v^v';
    const res = deliveries(2, dispatch);

    expect(res.housesCount).to.equal(11);
  })

  it ('should return 14 for 3 deliverees and "^v>^v>^v>^v<^v<"', () => {
    const dispatch = '^v>^v>^v>^v<^v<';
    const res = deliveries(3, dispatch);

    expect(res.housesCount).to.equal(14);
  })

  it ('should return 2639 for 2 deliverees and test', () => {
    const dispatch = test;
    const res = deliveries(2, test);

    expect(res.housesCount).to.equal(2639);
  })

  it ('should return 2565 for 1 deliverees and test', () => {
    const dispatch = test;
    const res = deliveries(1, test);

    expect(res.housesCount).to.equal(2565);
  })

  it ('should deliver test length + 1 pizzas', () => {
    const dispatch = test;
    const count = 2;
    const res = deliveries(count, test);

    expect(res.pizzasCount).to.equal(test.length + count);
  });
});

describe('splitDispatch', () => {
  it('should exist', () => {
    expect(splitDispatch).to.exist;
  })

  it ('should split "^^<<v<<v><" into ["^<v<>", "^<<v<"]', () => {
    const dispatch = '^^<<v<<v><';
    const expected = JSON.stringify(['^<v<>', '^<<v<']);
    const splits = splitDispatch(2, dispatch);

    expect(JSON.stringify(splits)).to.equal(expected);
  })

  it ('should return 4096 each lengths for split for 2 deliverees and test', () => {
    const dispatch = test;
    const splits = splitDispatch(2, test);

    expect(splits[0].length).to.equal(4096);
    expect(splits[1].length).to.equal(4096);
  })

  it ('should return 2639 for 2 deliverees and test', () => {
    const dispatch = test;
    const splits = splitDispatch(2, test);

    expect(delivery(splits[0]).housesCount).to.equal(1348);
    expect(delivery(splits[1]).housesCount).to.equal(1490);

    const res = delivery(splits[0]);
    expect(res.housesCount).to.equal(1348);

    res.grid.resetPosition();

    const res2 = delivery(splits[1], res.grid);
    expect(res2.housesCount).to.equal(2639);
  })
});
