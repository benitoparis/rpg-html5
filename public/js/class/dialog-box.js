import { ctx, config, launchGame} from '../main.js';

export class DialogBox {

  constructor(){
    this.dialogStyle = 'dialog';
    this.currentMsgSet = [];
    this.msgToDisplay = '';
    this.currentMsgIndex = 0;
  }

  // Dessine le dialogue
  drawDialogs() {

    switch(this.dialogStyle){
      case 'storyTelling':
        // On dessine un fond noir sur l'écran d'accueil
        ctx.fillStyle="#5858BA";
        ctx.fillRect(50, 400, stage.width - 100, 200);
        // On dessine le border sur le rectangle
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 400, stage.width - 100, 200);

        this.drawMessages("Fusce eu nunc non tortor dignissim elementum quis eget justo. Mauris scelerisque eu justo sed pulvinar. Sed at hendrerit leo. Vivamus ut tortor viverra, vestibulum lorem non, accumsan dui.", 70, 450, 3);
      break;

      case 'dialog':

        // On dessine un fond noir sur l'écran d'accueil
        ctx.fillStyle="#5858BA";
        ctx.fillRect(50, 400, stage.width - 100 , 200);
        // On dessine une bordure blanche
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 400, stage.width - 100, 200);

        // On affiche le message au centre de la boite de dialogue
        this.drawMessages(70, 430, 3);

        this.drawMessages(70, 405, 3, `${this.currentName}:`);

        // On dessine l'image de la personne qui parle
        this.drawPicture();
      break;
    };

    // function fillTextMultiLine(ctx, text, x, y) {
    //   var lineHeight = ctx.measureText("M").width * 1.2;
    //   var lines = text.split("\n");
    //   for (var i = 0; i < lines.length; ++i) {
    //     ctx.fillText(lines[i], x, y);
    //     y += lineHeight;
    //   }
    // }
  }

  // Méthode pour écrire des messages sur l'écran
  drawMessages(x, y, fontsize, msg) {

    if(!msg){
      msg = this.msgToDisplay;
    }

    switch(fontsize) {
      case 1:
        ctx.font = "100px small-caption";
        break;
      case 2:
        ctx.font = "40px small-caption";
        break;
      case 3:
        ctx.font = "20px small-caption";
        break;
    }
    ctx.fillStyle = "#FFFFFF";

    for(let i = 0; i <= msg.length; i += 40){
      let start = i;
      let end = i  + 60;
      y += 50;

      let cuttedMsg = msg.slice(start, end);

      ctx.fillText(cuttedMsg, x, y);

    }
  };

  // Méthode pour dessiner une image
  drawPicture(){
     ctx.drawImage(
      this.currentPicture,
      32 , // Position X de la partie à croper
      0 , // Position Y de la partie à croper
      30, // Largeur de la partie à croper
      30, // Hauteur de la partie à corper
      630, // Position X sur le canvas
      410, // Position Y sur le canvas
      48, // Largeur de la partie cropée
      48 // Hauteur de la partie cropée
    );
  };

  // Récupère la discussion à afficher
  getSprite(sprite){
    this.currentMsgSet = sprite.dialog;
    this.currentName = sprite.name;
    this.currentPicture = config.getImage(sprite.reference);
    this.currentFaceX = sprite.faceX;
    this.currentFaceY =  sprite.faceY;
    this.currentMsgIndex = 0;
  }

  // Méthode qui définie le message à afficher
  setMsgToDisplay(){
    console.log('setMsgToDisplay this.currentMsgIndex', this.currentMsgIndex);
    if(this.checkDialogContinue()){ // Si l'index du message courant est inférieur à la longueur du dialogue
        this.msgToDisplay = this.currentMsgSet[this.currentMsgIndex];
        this.currentMsgIndex++;
    } else {
      this.msgToDisplay = '';
      this.currentMsgSet = []
    }
  }

  // Vérifie si le dialogue continue
  checkDialogContinue(){
    if (this.currentMsgIndex < this.currentMsgSet.length){
      return true;
    } else {
      return false;
    }
  }

}
