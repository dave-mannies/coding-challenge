import { delivery, deliveries, DeliveryResults } from "./delivery";
import { test } from './PizzaDeliveryInput';

function main(): void {
  console.log('Part 1:');
  part1(test);
  // part2(1, test);

  console.log('Part 2:');
  part2(2, test);
}

function part1(dispatch: string): void {
  const res = delivery(dispatch);

  console.log(`Delivered ${ res.pizzasCount } pizzas to ${ res.housesCount } houses using 1 deliveree.`);
}

function part2(count: number, dispatch: string): void {
  const res = deliveries(count, dispatch);

  console.log(`Delivered ${ res.pizzasCount } pizzas to ${ res.housesCount } houses using ${ count } deliverees.`);
}

main();
