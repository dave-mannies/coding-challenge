import 'mocha';
import { expect } from 'chai';

import { delivery, DeliveryResults } from "../src/delivery";
import { test } from '../src/PizzaDeliveryInput';

describe('delivery', () => {
  it('should exist', () => {
    expect(delivery).to.exist;
  })

  it ('should return 0 for no dispatch', () => {
    expect(delivery().houses).to.equal(0);
    expect(delivery().houses).to.equal(0);
  })

  it ('should return 0 for empty dispatch', () => {
    const dispatch = '';
    expect(delivery(dispatch).houses).to.equal(0);
  })

  it ('should return 2 for ">"', () => {
    const dispatch = '>';
    expect(delivery(dispatch).houses).to.equal(2);
  })

  it ('should return 2 for "<"', () => {
    const dispatch = '<';
    expect(delivery(dispatch).houses).to.equal(2);
  })

  it ('should return 2 for "><"', () => {
    const dispatch = '><';
    expect(delivery(dispatch).houses).to.equal(2);
  })

  it ('should return 2 for "^"', () => {
    const dispatch = '^';
    expect(delivery(dispatch).houses).to.equal(2);
  })

  it ('should return 2 for "v"', () => {
    const dispatch = 'v';
    expect(delivery(dispatch).houses).to.equal(2);
  })

  it ('should return 2 for "^v"', () => {
    const dispatch = '^v';
    expect(delivery(dispatch).houses).to.equal(2);
  })

  it ('should return 4 for "^>v<"', () => {
    const dispatch = '^>v<';
    expect(delivery(dispatch).houses).to.equal(4);
  })

  it ('should return 2 for "^v^v^v^v^v"', () => {
    const dispatch = '^v^v^v^v^v';
    expect(delivery(dispatch).houses).to.equal(2);
  })

  it ('should return 10 for "^^<<v<<v><"', () => {
    const dispatch = '^^<<v<<v><';
    expect(delivery(dispatch).houses).to.equal(10);
  })

  it ('should return 2565 for test', () => {
    const dispatch = test;
    expect(delivery(dispatch).houses).to.equal(2565);
  })

});
