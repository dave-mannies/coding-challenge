import { Grid } from './Grid';

export interface DeliveryResults {
  houses: number;
  grid: Grid;
}

export function delivery(dispatch: string = '', grid: Grid = new Grid()): DeliveryResults  {
  if (dispatch) {
    grid.deliver();

    dispatch.split('').forEach(dir => {
      if (grid.move(dir)) {
        grid.deliver();
      }
    });
  }

  return {
    grid,
    houses: grid.getHouses()
  };
}

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
