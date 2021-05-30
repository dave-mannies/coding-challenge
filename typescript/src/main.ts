import { delivery, DeliveryResults, splitDispatch } from "./delivery";
import { test } from './PizzaDeliveryInput';

function main(): void {
  part1(test);
  part2(test);
}

function part1(dispatch: string): void {
  const res = delivery(dispatch);

  console.log(res.grid.getHouses());
}

function part2(dispatch: string): void {
  const splits = splitDispatch(2, dispatch);
  const res = delivery(splits[0]);
  delivery(splits[1], res.grid);

  console.log(res.grid.getHouses());
}

main();
