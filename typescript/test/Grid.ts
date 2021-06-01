import 'mocha';
import { expect } from 'chai';
import { deliveries } from "../src";

import { Grid } from "../src/Grid";

describe('Grid', () => {
  it('should exist', () => {
    expect(Grid).to.exist;
  })

  it('defaults to 0, 0', () => {
    const grid = new Grid();
    expect(grid.x).to.equal(0);
    expect(grid.y).to.equal(0);
  })

  it('resets to 0, 0', () => {
    const grid = new Grid();

    grid.x = 10;
    grid.y = -10;
    grid.resetPosition();

    expect(grid.x).to.equal(0);
    expect(grid.y).to.equal(0);
  })

  it('moves "^" y up', () => {
    const grid = new Grid();
    const dir = "^";

    grid.move(dir);

    expect(grid.x).to.equal(0);
    expect(grid.y).to.equal(1);
  })

  it('moves "v" y down', () => {
    const grid = new Grid();
    const dir = "v";

    grid.move(dir);

    expect(grid.x).to.equal(0);
    expect(grid.y).to.equal(-1);
  })

  it('moves "^v" y 0', () => {
    const grid = new Grid();
    const dir = "^";
    const dir2 = "v";

    grid.move(dir);
    grid.move(dir2);

    expect(grid.x).to.equal(0);
    expect(grid.y).to.equal(0);
  })

  it('moves ">" x up', () => {
    const grid = new Grid();
    const dir = ">";

    grid.move(dir);

    expect(grid.x).to.equal(1);
    expect(grid.y).to.equal(0);
  })

  it('moves "<" x down', () => {
    const grid = new Grid();
    const dir = "<";

    grid.move(dir);

    expect(grid.x).to.equal(-1);
    expect(grid.y).to.equal(0);
  })

  it('moves "><" x 0', () => {
    const grid = new Grid();
    const dir = ">";
    const dir2 = "<";

    grid.move(dir);
    grid.move(dir2);

    expect(grid.x).to.equal(0);
    expect(grid.y).to.equal(0);
  })

  it('moves "." x and y 0', () => {
    const grid = new Grid();
    const dir = ".";

    grid.move(dir);

    expect(grid.x).to.equal(0);
    expect(grid.y).to.equal(0);
  })

  it('key 0,0', () => {
    const grid = new Grid();
    const key = grid.getKey(0, 0);

    expect(key).to.equal('0, 0');
  })

  it('key -1, -1', () => {
    const grid = new Grid();
    const key = grid.getKey(-1, -1);

    expect(key).to.equal('-1, -1');
  })

  it('deliver adds 1 to grid', () => {
    const grid = new Grid();
    const key = grid.getKey(0, 0);

    expect(grid.grid.get(key)).to.equal(undefined);

    grid.deliver(1);

    expect(grid.grid.get(key)?.pizzas).to.equal(1);

    grid.deliver(2);

    expect(grid.grid.get(key)?.pizzas).to.equal(2);
  })

  it('getHouses() is 1', () => {
    const grid = new Grid();
    const key = grid.getKey(0, 0);

    expect(grid.getHousesCount()).to.equal(0);

    grid.deliver(1);
    grid.deliver(2);

    expect(grid.getHousesCount()).to.equal(1);
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

    expect(grid.getHousesCount()).to.equal(2);
  })

  it('getPizzaCount() is 3', () => {
    const grid = new Grid();

    grid.deliver(1);
    grid.move('>');
    grid.deliver(2);
    grid.move('>');
    grid.deliver(3);

    expect(grid.getPizzaCount()).to.equal(3);
  })

  it('getDeliveryEntries() length is 3', () => {
    const grid = new Grid();

    grid.deliver(1);
    grid.move('>');
    grid.deliver(2);
    grid.move('<');
    grid.deliver(3);

    const res = grid.getDeliveryEntries();

    expect(grid.getPizzaCount()).to.equal(3);
    expect(res.length).to.equal(3);
  })

  it ('getDeliveryEntries() entries should have 3 unique dIds for 3 deliverees and "^v>^v>^v>^v<^v<"', () => {
    const dispatch = '^v>^v>^v>^v<^v<';
    const res = deliveries(3, dispatch);
    const entries = res.grid.getDeliveryEntries();
    const dIds = new Set();

    entries.forEach(entry => dIds.add(entry.dId));

    expect(dIds.size).to.equal(3);
  })


});
