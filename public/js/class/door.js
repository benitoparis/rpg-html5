import { ctx, config, hero} from '../main.js';
import { Destination } from './destination.js';

// classe d'une porte
export class Door {

// Constructeur de la classe des portes
constructor(params) {
    this.id = params.id;
    this.name = params.roomName;
    this.x = params.x
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    this.currentWorldPosition = {
      worldId: params.belongsToWorldId ,
      mapSheetId: params.belongsToMapSheetId
    };
    this.destination = new Destination(params.destination);
 }

}
