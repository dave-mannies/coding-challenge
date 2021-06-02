/**
 * Per delivery pizza deliver info. When applied
 * to HouseEntry x and y are not used.
 *
 * @property dId - deliveree id
 * @property order - dispatch order of delivery
 * @property pizzas - optional total of pizzas delivered at order
 * @property x - optional x location
 * @property y - optional y location
 */
export interface DeliveryEntry {
  dId: number;
  order: number;
  pizzas: number;
  x?: number;
  y?: number;
}

/**
 * Per House pizza delivery info.
 *
 * @property x - x location
 * @property y - y location
 * @property deliveries - array of DeliveryEntry
 * @property pizzas - total of pizza delivered
 */
export interface HouseEntry {
  x: number;
  y: number;
  deliveries: DeliveryEntry[];
  pizzas: number;
}

/**
 * Tracking analysis info.
 *
 * @property entries - array of deliveries
 * @property xmin - farthest left
 * @property xmax - farthest right
 * @property ymin - farthest up
 * @property ymax - farthest down
 * @property pmax - most pizzas delivered to one house
 * @property pavg - average pizzas delivered to a house
 * @property totalPizzas - total number of pizzas delivred
 * @property totalHouses - total unique houses delivered to
 */
export interface TrackingAnalysis {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  pmax: number;
  pavg: number;
  totalPizzas: number;
  totalHouses: number;
}

/**
 * Two-dimensional grid of houses with current house position
 * and movement with grid.
 */
export class Grid {
  // 2d grid with count a pizza's delivered by house
  grid = new Map<string, HouseEntry>();
  // current x position
  x = 0;
  // current y position
  y = 0;

  constructor () {
  }

  /**
   * Reset current x, y grid position to start.
   */
  resetPosition (): void {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Move current x, y position in given direction.
   *
   * @param dir - ^ | v | < | >
   * @returns boolean true if dir is a valid direction
   */
  move (dir: string): boolean {
    let ret = true;

    switch (dir) {
      // up
      case '^':
        this.y += 1;
        break;

      // down
      case 'v':
        this.y -= 1;
        break;

      // right
      case '>':
        this.x += 1;
        break;

      // left
      case '<':
        this.x -= 1;
        break;

      // ignore
      case '\n':
      case '.':
        ret = false;
        break;

      default:
        ret = false;
        console.error(`error move unknown direction [${dir}]`);
        break;
    }

    return ret;
  }

  /**
   * Generates key for given x, y position.
   *
   * @param x - x position
   * @param y - y position
   * @returns the unique key for given x, y pair
   */
  getKey = (x: number, y: number) => `${x}, ${y}`;

  /**
   * Deliver pizza to current house.
   *
   * @param order - dispatch deliver order
   * @param dId - deliveree Id who delivered pizza
   */
  deliver (order: number, dId: number = 1): HouseEntry {
    const key = this.getKey(this.x, this.y);
    let value = this.grid.get(key) ?? {deliveries: [], x: this.x, y: this.y, pizzas: 0};

    value.pizzas++;
    this.grid.set(key, value);
    value.deliveries.push({dId, order: order, pizzas: value.pizzas});

    return value;
  }

  /**
   * Get count of unique houses of have had at least
   * one pizza deliver.
   *
   * @return count of houses the got pizza
   */
  getHousesCount (): number {
    return this.grid.size;
  }

  /**
   * Get total count of pizzas delivered.
   *
   * @return total count of pizzas
   */
  getPizzaCount (): number {
    let count = 0;

    for (let value of this.grid.values()) {
      count += value.pizzas;
    }

    return count;
  }

  /**
   * Get array with every tracked delivery.
   *
   * @return ordered array of DeliveryEntry
   */
  getDeliveryEntries (): DeliveryEntry[] {
    const ret: DeliveryEntry[] = [];

    this.grid.forEach((house) => {
      house.deliveries.map(delivery => {
        ret.push({
          x: house.x, y: house.y,
          order: delivery.order, dId: delivery.dId, pizzas: delivery.pizzas
        });
      });
    });

    ret.sort((a, b) => a.order - b.order);

    return ret;
  }

  /**
   * Get analysis of tracking data.
   * Returns TrackingAnalysis with info.
   *
   * @returns TrackingAnalysis
   */
  public static getAnalysis (grid: Grid, entries?: DeliveryEntry[]): TrackingAnalysis {
    const ret = {
      entries: entries ?? grid.getDeliveryEntries(),
      xmin: 0,
      xmax: 0,
      ymin: 0,
      ymax: 0,
      pmax: 0,
      pavg: 0,
      totalPizzas: 0,
      totalHouses: 0
    };

    ret.entries.forEach(track => {
      ret.xmin = Math.min(ret.xmin, track.x!);
      ret.xmax = Math.max(ret.xmax, track.x!);
      ret.ymin = Math.min(ret.ymin, track.y!);
      ret.ymax = Math.max(ret.ymax, track.y!);
      ret.pmax = Math.max(ret.pmax, track.pizzas!);
    });

    ret.totalPizzas = ret.entries.length;
    ret.totalHouses = grid.grid.size;
    ret.pavg = ret.totalPizzas / ret.totalHouses;

    return ret;
  }

  /**
   * Get analysis of tracking data.
   * Returns TrackingAnalysis with info.
   *
   * @returns TrackingAnalysis
   */
  public static mergeAnalysis (grid: Grid, analyses: TrackingAnalysis[]): TrackingAnalysis {
    const ret = analyses[0];

    // todo

    //
    // const ret2 = {
    //   entries: Grid.getDeliveryEntries(),
    //   xmin: 0,
    //   xmax: 0,
    //   ymin: 0,
    //   ymax: 0,
    //   pmax: 0,
    //   pavg: 0,
    //   totalPizzas: 0,
    //   totalHouses: 0
    // };

    return ret;
  }
}
