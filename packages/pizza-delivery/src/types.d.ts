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
 * @property entries - array of DeliveryEntry
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
  entries: DeliveryEntry[];
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  pmax: number;
  pavg: number;
  totalPizzas: number;
  totalHouses: number;
}

export interface ScalingResults {
  xoffset: number;
  yoffset: number;
  mult: number;
  zoom: number;
  xpan: number;
  ypan: number;
}

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

export interface Inputs {
  deliverees: number;
  dispatch: string;
}

export  interface Results {
  currentIndex: number;
  current?: any;
  history: any[];
  updated?: Date;
}
