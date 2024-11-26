import {deliveries, delivery, splitDispatch} from './delivery';
import {test} from './PizzaDeliveryInput';

describe('delivery', () => {
  it('should exist', () => {
    expect(delivery).toBeDefined();
  })

  it ('should return 0 for no dispatch', () => {
    expect(delivery().housesCount).toBe(0);
    expect(delivery().housesCount).toBe(0);
  })

  it ('should return 0 for empty dispatch', () => {
    const dispatch = '';
    expect(delivery(dispatch).housesCount).toBe(0);
  })

  it ('should return 2 for ">"', () => {
    const dispatch = '>';
    expect(delivery(dispatch).housesCount).toBe(2);
  })

  it ('should return 2 for "<"', () => {
    const dispatch = '<';
    expect(delivery(dispatch).housesCount).toBe(2);
  })

  it ('should return 2 for "><"', () => {
    const dispatch = '><';
    expect(delivery(dispatch).housesCount).toBe(2);
  })

  it ('should return 2 for "^"', () => {
    const dispatch = '^';
    expect(delivery(dispatch).housesCount).toBe(2);
  })

  it ('should return 2 for "v"', () => {
    const dispatch = 'v';
    expect(delivery(dispatch).housesCount).toBe(2);
  })

  it ('should return 2 for "^v"', () => {
    const dispatch = '^v';
    expect(delivery(dispatch).housesCount).toBe(2);
  })

  it ('should return 4 for "^>v<"', () => {
    const dispatch = '^>v<';
    expect(delivery(dispatch).housesCount).toBe(4);
  })

  it ('should return 2 for "^v^v^v^v^v"', () => {
    const dispatch = '^v^v^v^v^v';
    expect(delivery(dispatch).housesCount).toBe(2);
  })

  it ('should return 10 for "^^<<v<<v><"', () => {
    const dispatch = '^^<<v<<v><';
    expect(delivery(dispatch).housesCount).toBe(10);
  })

  it ('should return 5 for "^<v<>"', () => {
    const dispatch = '^<v<>';
    expect(delivery(dispatch).housesCount).toBe(5);
  })

  it ('should return 6 for "^<<v<"', () => {
    const dispatch = '^<<v<';
    expect(delivery(dispatch).housesCount).toBe(6);
  })

  it ('should return 2565 for test', () => {
    const dispatch = test;
    expect(delivery(dispatch).housesCount).toBe(2565);
  })

  it ('should deliver test length + 1 pizzas', () => {
    const dispatch = test;
    const res = delivery(dispatch);

    expect(res.pizzasCount).toBe(test.length + 1);
  });
});

describe('deliveries', () => {
  it('should exist', () => {
    expect(deliveries).toBeDefined();
  })

  it ('should return 3 for 2 deliverees and "^v"', () => {
    const dispatch = '^v';
    const res = deliveries(2, dispatch);

    expect(res.housesCount).toBe(3);
  })

  it ('should return 3 for 2 deliverees and "^>v<"', () => {
    const dispatch = '^>v<';
    const res = deliveries(2, dispatch);

    expect(res.housesCount).toBe(3);
  })

  it ('should return 11 for 2 deliverees and "^v^v^v^v^v"', () => {
    const dispatch = '^v^v^v^v^v';
    const res = deliveries(2, dispatch);

    expect(res.housesCount).toBe(11);
  })

  it ('should return 14 for 3 deliverees and "^v>^v>^v>^v<^v<"', () => {
    const dispatch = '^v>^v>^v>^v<^v<';
    const res = deliveries(3, dispatch);

    expect(res.housesCount).toBe(14);
  })

  it ('should return 2639 for 2 deliverees and test', () => {
    const dispatch = test;
    const res = deliveries(2, test);

    expect(res.housesCount).toBe(2639);
  })

  it ('should return 2565 for 1 deliverees and test', () => {
    const dispatch = test;
    const res = deliveries(1, test);

    expect(res.housesCount).toBe(2565);
  })

  it ('should deliver test length + 1 pizzas', () => {
    const dispatch = test;
    const count = 2;
    const res = deliveries(count, test);

    expect(res.pizzasCount).toBe(test.length + count);
  });
});

describe('splitDispatch', () => {
  it('should exist', () => {
    expect(splitDispatch).toBeDefined();
  })

  it ('should split "^^<<v<<v><" into ["^<v<>", "^<<v<"]', () => {
    const dispatch = '^^<<v<<v><';
    const expected = JSON.stringify(['^<v<>', '^<<v<']);
    const splits = splitDispatch(2, dispatch);

    expect(JSON.stringify(splits)).toBe(expected);
  })

  it ('should return 4096 each lengths for split for 2 deliverees and test', () => {
    const dispatch = test;
    const splits = splitDispatch(2, test);

    expect(splits[0].length).toBe(4096);
    expect(splits[1].length).toBe(4096);
  })

  it ('should return 2639 for 2 deliverees and test', () => {
    const dispatch = test;
    const splits = splitDispatch(2, test);

    expect(delivery(splits[0]).housesCount).toBe(1348);
    expect(delivery(splits[1]).housesCount).toBe(1490);

    const res = delivery(splits[0]);
    expect(res.housesCount).toBe(1348);

    res.grid.resetPosition();

    const res2 = delivery(splits[1], res.grid);
    expect(res2.housesCount).toBe(2639);
  })
});
