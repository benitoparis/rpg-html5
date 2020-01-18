import { ctx, rangeNumber} from '../main.js';

export class Scenario {

  constructor(){
    this.dialogs = [{ characterId: 1, dialog : ['Bonjour comment allez-vous?']}];
    this.dialogStyle = 'dialog';
    this.dialogBoxActive = true;
    this.dialogIndex = 0;
    this.msg = '';
       this.currentDialog = ['bjr comment allez-vous?', 'je vais faire quelques courses', 'a tres bientot jèspère'];
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
      // On dessine le border sur le rectangle
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 400, stage.width - 100, 200);

      this.drawMessages(70, 450, 3);
    break;
  }

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
  drawMessages(x,y, fontsize){

    switch(fontsize) {
      case 1:
        ctx.font = "100px Arial";
        break;
      case 2:
        ctx.font = "40px Arial";
        break;
      case 3:
        ctx.font = "20px Arial";
        break;
    }
    ctx.fillStyle = "#FFFFFF";

    for(let i = 0; i <= this.msg.length; i += 60){
      let start = i;
      let end = i  + 60;
      y += 25;

      let cuttedMsg = this.msg.slice(start, end);
      console.log(start,end, y, cuttedMsg);
      ctx.fillText(cuttedMsg, x, y);

    }

  };


 // Méthode qui gère le contenu de la boite de dialogue
 selectMessage() {

   alert(this.dialogIndex);

   if(!this.dialogEnd()){ // Si le dialogue doit continuer
    this.msg = this.currentDialog[this.dialogIndex];
    this.dialogIndex++;
   } else {
     this.dialogIndex = 0;
   }

 }

 // On vérifie si le dialogue est terminé
 dialogEnd(){
   if(this.dialogIndex <= this.currentDialog.length - 1){
     return false;
   } else {
     return true;
   }
 }


}
