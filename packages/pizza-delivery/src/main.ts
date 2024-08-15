import { readFileSync } from "fs";

import { delivery, deliveries } from "./delivery";

function main(): void {
  let file = '';
  let count = 0;
  let dispatch = '';

  if (process.argv.length === 3) {
    // option read from given filename

    file = process.argv[2];

    try {
      dispatch = readFileSync(file, 'utf-8');

      console.log(`read ${ dispatch.length } characters from ${ file }`);
    } catch (err) {
      console.error(`error reading file "${ file }\n${ err.message }"`);
    }
  } else if (process.argv.length === 4) {
    // option provide count and dispatch from command line

    count = Number.parseInt(process.argv[2]);
    dispatch = process.argv[3];

    console.log(`read ${ count } count and ${ dispatch.length } characters from command line`);
  } else {
    // incorrect number of options

    console.error(`error incorrect number of arguments ${ process.argv.length } when 3 or 4 expected`);
    console.log(`Expecting "ts-node src/main.ts 'src/PizzaDeliveryInput.txt'"`);
    console.log(`or "ts-node src/main.ts 1 '^^<<v<<v><'`);
    return;
  }

  if (!dispatch) {
    console.error(`error nothing to dispatch`);
    return;
  }

  // default dispatch from file
  if (count === 0) {
    console.log('Part 1:');
    part1(dispatch);
    // part2(1, test);

    console.log('Part 2:');
    part2(2, dispatch);
  } else {
    // dispatch from command line arguments
    part2(count, dispatch);
  }
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
