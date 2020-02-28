import { ctx, config, launchGame} from '../main.js';
import { WorldPosition } from './world-position.js';

  export class AnimatedSprite {

    constructor(params){
      this.x = params.x; // Position X sur la map
      this.y = params.y; // Position Y sur la map
      this.dx = 1;
      this.dy = 1;
      this.width = 48;
      this.height = 48;
      this.centerX = ((this.x + this.width) - (this.width / 2));
      this.centerY = ((this.y + this.height) - (this.height / 2));
      this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
      this.speedX = 15;
      this.speedY = 15;
      this.faceX = 0, // 0 (people);
      this.faceY = 64, // 30 (people);
      this.currentLoopIndex = 0;
      this.rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
      this.leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
      this.upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
      this.downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];
      this.dialog = params.dialog;
      this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId );
    }

    // Méthode pour réinitialiser la position du héro
    setPosition(destination) {
      this.x = destination.x;
      this.y = destination.y;
      this.currentWorldPosition.worldId = destination.worldId;
      this.currentWorldPosition.mapSheetId = destination.mapSheetId;
      this.centerX = ((this.x + this.width) - (this.width / 2));
      this.centerY = ((this.y + this.height) - (this.height / 2));
      this.setMapIndexPosition();
    };


    // Méthode pour setter l'index du héros sur la map
    setMapIndexPosition(){
      this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    }
  }
