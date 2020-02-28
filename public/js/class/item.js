import { ctx, config, hero} from '../main.js';
import { WorldPosition } from './world-position.js';

// classe d'un Item
export class Item {

 // Constructeur de la classe Item
 constructor(reference, params) {
    this.reference = reference // Type d'item (tresors,..)
    this.itemImg = config.getImage(this.reference);
    this.x = params.x // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.width = 48;
    this.height = 48;
    this.faceX = 130; // Position x du crop
    this.faceY = 70; // Position y du crop
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId);
  }


  // Méthode pour afficher l'item sur le canvas
  draw() {
    ctx.drawImage(
      this.itemImg, // Objet image à afficher
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      30 , // Largeur de la partie à croper
      30 , // Hauteur de la partie à corper
      351 - (hero.x - this.x), // Position X sur le canvas
      288.5 - (hero.y - this.y), // Position Y sur le canvas
      this.width, // Largeur de l'image sur le canvas
      this.height // Hauteur de l'image sur le canvas
    );
  }

}
