import { Grid } from "./Grid";
import {deliveries, delivery} from './delivery';
import {DeliveryEntry} from './types';

describe('Grid', () => {
  it('should exist', () => {
    const grid = new Grid();
    expect(grid).toBeDefined();
  })

  it('defaults to 0, 0', () => {
    const grid = new Grid();
    expect(grid.x).toBe(0);
    expect(grid.y).toBe(0);
  })

  it('resets to 0, 0', () => {
    const grid = new Grid();

    grid.x = 10;
    grid.y = -10;
    grid.resetPosition();

    expect(grid.x).toBe(0);
    expect(grid.y).toBe(0);
  })

  it('moves "^" y up', () => {
    const grid = new Grid();
    const dir = "^";

    grid.move(dir);

    expect(grid.x).toBe(0);
    expect(grid.y).toBe(1);
  })

  it('moves "v" y down', () => {
    const grid = new Grid();
    const dir = "v";

    grid.move(dir);

    expect(grid.x).toBe(0);
    expect(grid.y).toBe(-1);
  })

  it('moves "^v" y 0', () => {
    const grid = new Grid();
    const dir = "^";
    const dir2 = "v";

    grid.move(dir);
    grid.move(dir2);

    expect(grid.x).toBe(0);
    expect(grid.y).toBe(0);
  })

  it('moves ">" x up', () => {
    const grid = new Grid();
    const dir = ">";

    grid.move(dir);

    expect(grid.x).toBe(1);
    expect(grid.y).toBe(0);
  })

  it('moves "<" x down', () => {
    const grid = new Grid();
    const dir = "<";

    grid.move(dir);

    expect(grid.x).toBe(-1);
    expect(grid.y).toBe(0);
  })

  it('moves "><" x 0', () => {
    const grid = new Grid();
    const dir = ">";
    const dir2 = "<";

    grid.move(dir);
    grid.move(dir2);

    expect(grid.x).toBe(0);
    expect(grid.y).toBe(0);
  })

  it('moves "." x and y 0', () => {
    const grid = new Grid();
    const dir = ".";

    grid.move(dir);

    expect(grid.x).toBe(0);
    expect(grid.y).toBe(0);
  })

  it('key 0,0', () => {
    const grid = new Grid();
    const key = grid.getKey(0, 0);

    expect(key).toBe('0, 0');
  })

  it('key -1, -1', () => {
    const grid = new Grid();
    const key = grid.getKey(-1, -1);

    expect(key).toBe('-1, -1');
  })

  it('deliver adds 1 to grid', () => {
    const grid = new Grid();
    const key = grid.getKey(0, 0);

    expect(grid.grid.get(key)).toBe(undefined);

    grid.deliver(1);

    expect(grid.grid.get(key)?.pizzas).toBe(1);

    grid.deliver(2);

    expect(grid.grid.get(key)?.pizzas).toBe(2);
  })

  it('getHouses() is 1', () => {
    const grid = new Grid();

    expect(grid.getHousesCount()).toBe(0);

    grid.deliver(1);
    grid.deliver(2);

    expect(grid.getHousesCount()).toBe(1);
  })

  it('getHouses() is 2', () => {
    const grid = new Grid();
    const dir = ">";
    const dir2 = "<";

    grid.deliver(1);
    grid.move(dir);
    grid.deliver(2);
    grid.move(dir2);
    grid.deliver(3);

    expect(grid.getHousesCount()).toBe(2);
  })

  it('getPizzaCount() is 3', () => {
    const grid = new Grid();

    grid.deliver(1);
    grid.move('>');
    grid.deliver(2);
    grid.move('>');
    grid.deliver(3);

    expect(grid.getPizzaCount()).toBe(3);
  })

  it('getDeliveryEntries() length is 3', () => {
    const grid = new Grid();

    grid.deliver(1);
    grid.move('>');
    grid.deliver(2);
    grid.move('<');
    grid.deliver(3);

    const res = grid.getDeliveryEntries();

    expect(grid.getPizzaCount()).toBe(3);
    expect(res.length).toBe(3);
  })

  it ('getDeliveryEntries() entries should have 3 unique dIds for 3 deliverees and "^v>^v>^v>^v<^v<"', () => {
    const dispatch = '^v>^v>^v>^v<^v<';
    const res = deliveries(3, dispatch);
    const entries: DeliveryEntry[] = res.grid.getDeliveryEntries();
    const dIds = new Set();

    entries.forEach(entry => dIds.add(entry.dId));

    expect(dIds.size).toBe(3);
  })

  it ('getAnalysis() results exist and are correct for "^v>^v>^v>^v<^v<"', () => {
    const dispatch = '^v>^v>^v>^v<^v<';
    const res = delivery(dispatch);
    const analysis = res.analysis[0];

    expect(res.analysis.length).toBe(1);
    expect(analysis.xmin).toBe(0);
    expect(analysis.xmax).toBe(3);
    expect(analysis.ymin).toBe(0);
    expect(analysis.ymax).toBe(1);
    expect(analysis.pmax).toBe(4);
    expect(analysis.pavg).toBe(2);
    expect(analysis.totalPizzas).toBe(16);
    expect(analysis.totalHouses).toBe(8);
  })
});
