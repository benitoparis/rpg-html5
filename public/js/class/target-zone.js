import { ctx, config, hero} from '../main.js';

export class TargetZone {

  constructor(x, y) {

    this.direction = config.randomDirection();
    this.x = x + config.randomPositionOrNegativeNumber();
    this.y = y + config.randomPositionOrNegativeNumber();
    this.width = 100;
    this.height = 100;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));

  }

}
