import { Grid, TrackingAnalysis } from './Grid';

/**
 * Results of delivery(...) invocation.
 */
export interface DeliveryResults {
  id?: number;
  date?: Date;
  deliverees?: number;
  dispatch?: string;
  grid: Grid;
  housesCount: number;
  pizzasCount: number;
  analysis: TrackingAnalysis[];
}

/**
 * Delivery pizza using given dispatch move directions. Provide
 * optional grid to stack deliveries for multiple deliverees.
 * Returns DeliveryResults.
 *
 * @param dispatch - string of grid dispatch move directions
 * @param grid - optional grid to
 * @param dId - deliveree id
 * @returns DeliveryResults
 */
export function delivery(dispatch: string = '', grid: Grid = new Grid(), dId: number = 1): DeliveryResults  {
  if (dispatch) {
    grid.deliver(1, dId);

    dispatch.toLowerCase().split('').forEach((dir, i) => {
      if (grid.move(dir)) {
        grid.deliver(i + 2, dId);
      }
    });
  }

  const analysis = Grid.getAnalysis(grid);

  return {
    date: new Date(),
    deliverees: 1,
    dispatch,
    grid,
    housesCount: analysis.totalHouses,
    pizzasCount: analysis.totalPizzas,
    analysis: [ analysis ]
  };
}

/**
 * Delivery pizzas using given dispatch move directions with multiple deliverees.
 * Dispatch move directions are applied 1 at a time to each deliveree in turn.
 * "^v><" would apply to 2 deliverees as "^>" and "v<".
 * Returns DeliveryResults.
 *
 * @param count - number of deliverees to split displatch
 * @param dispatch - string of grid dispatch move directions
 * @returns DeliveryResults
 */
export function deliveries(count: number, dispatch: string): DeliveryResults {
  console.time('deliveries')

  const splits = splitDispatch(count, dispatch);
  const grid = new Grid();
  let res: DeliveryResults = { housesCount: 0, pizzasCount: 0, grid, analysis: [] };

  splits.forEach((dispatch, i) => {
    res.grid.resetPosition();
    res = delivery(dispatch, grid, i + 1);
  });

  res.date = new Date();
  res.deliverees = count;
  res.dispatch = dispatch;

  console.timeEnd('deliveries');

  return res;
}

/**
 * Split up dispatch move directions for count deliverees.
 * Dispatch move directions are applied 1 at a time to each deliveree in turn.
 * "^v><" would apply to 2 deliverees as "^>" and "v<".
 * Dispatch move directions are split until all move directions
 * have been divided out so there may be one less for some deliverees.
 *
 * @param count - number of deliverees to split displatch
 * @param dispatch - string of grid dispatch move directions
 * @returns - array of string for each deliveree
 */
export function splitDispatch(count: number, dispatch: string = ''): string[] {
  const ret: string[][] = [];
  const chars = dispatch.split('');

  for(let i = 0; i < count; i++) {
    ret.push([]);
  }

  while(chars.length) {
    for(let i = 0; i < count; i++) {
      const c = chars.shift();
      if (c) {
        ret[i].push(c);
      }
    }
  }

  return ret.map(s => s.join(''));
}
