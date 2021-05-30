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
