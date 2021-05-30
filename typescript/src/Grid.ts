/**
 * Two-dimensional grid of houses with current house position
 * and movement with grid.
 */
export class Grid {
  // 2d grid with count a pizza's delivered by house
  grid = new Map<string, number>();
  // current x position
  x = 0;
  // current y position
  y = 0;

  constructor () {
  }

  /**
   * Reset current x, y grid position to start.
   */
  resetPosition(): void {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Move current x, y position in given direction.
   *
   * @param dir - ^ | v | < | >
   * @returns boolean true if dir is a valid direction
   */
  move(dir: string): boolean {
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

      default:
        ret = false;
        console.error(`error move unknown direction [${ dir }]`);
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
  getKey = (x: number, y: number) => `${ x }, ${ y }`;

  /**
   * Deliver pizza to current house.
   */
  deliver(): void {
    const key = this.getKey(this.x, this.y);
    let value = this.grid.get(key) ?? 0;

    value++;

    this.grid.set(key, value);
  }

  /**
   * Get count of unique houses of have had at least
   * one pizza deliver.
   *
   * @return count of houses the got pizza
   */
  getHousesCount(): number {
    return this.grid.size;
  }

  /**
   * Get total count of pizzas delivered.
   *
   * @return total count of pizzas
   */
  getPizzaCount(): number {
    let count = 0;
    this.grid.forEach((value, key) => {
      count += value;
    });

    return count;
  }
}
