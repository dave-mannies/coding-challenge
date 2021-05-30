import { delivery, DeliveryResults } from "./delivery";
import { test } from './PizzaDeliveryInput';

function main(): void {
  part1();
}

function part1(): void {
  const res = delivery(test);

  console.log(res.grid.getHouses());
}

main();
