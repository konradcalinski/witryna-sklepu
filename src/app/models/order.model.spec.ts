import { Order } from './order.model';

describe('Order', () => {
  it('should create an instance', () => {
    const order: Order = {
      id: 1,
      products: [],
      accepted: false
    };
    expect(order).toBeTruthy();
  });
});
