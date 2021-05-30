
// two-dimensional grid of houses with current house position
// and movement with grid
export class Grid {
  grid = new Map<string, number>();
  x = 0;
  y = 0;

  constructor () {
  }

  resetPosition(): void {
    this.x = 0;
    this.y = 0;
  }

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

  getKey = (x: number, y: number) => `${ x }, ${ y }`;

  deliver(): void {
    const key = this.getKey(this.x, this.y);
    let value = this.grid.get(key) ?? 0;

    value++;

    this.grid.set(key, value);
  }

  getHouses(): number {
    return this.grid.size;
  }
}
