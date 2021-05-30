import 'mocha';
import { expect } from 'chai';

import { delivery, DeliveryResults } from "../src/delivery";

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
});
