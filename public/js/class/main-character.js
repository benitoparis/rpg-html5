import { ctx, config, hero} from '../main.js';
import { WorldPosition } from './world-position.js';

// classe d'un personnal principal
export class MainCharacter {

 // Constructeur de la classe d'un personnage principal
 constructor(params) {
    this.name = params.name; // Exemple 'darius'
    this.reference = params.reference;
    this.characterImg = config.getImage(this.reference);
    this.x = params.x // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.faceX = 0;
    this.faceY = 0;
    this.width = 48;
    this.height = 48;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.dialog = params.dialog;
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId);
  }

  // Méthode pour afficher le personnage sur le canvas
  draw() {
    ctx.drawImage(
        this.characterImg, // Objet de l'image à croper
        this.faceX , // Position X de la partie à croper
        this.faceY , // Position Y de la partie à croper
        30 , // Largeur de la partie à croper
        30 , // Hauteur de la partie à corper
        351 - (hero.x - this.x),
        288.5 - (hero.y - this.y),
        this.width, // Largeur de la partie cropée
        this.height // Hauteur de la partie cropée
    );
  };

  // action
  // doSomething(hero){
  ckeckItems(hero){

      if(hero.items >= 9) { // Si le héros a collecté les X trésors
        return true;
      } else {
        return false;
      }
  }

}
