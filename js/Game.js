class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    hero1 = createSprite(200,100);

    hero2 = createSprite(200,300);
    hero3 = createSprite(200,500);
   
    
    hero1.addImage(hero1Img);
    hero1.scale= 0.3;
    hero2.addImage(hero2Img);
    hero2.scale=0.3;
    hero3.addImage(hero3Img);
    hero3.scale= 0.3;
   

    heros = [hero1, hero2, hero3];
    console.log(heros);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      image(skyImage,displayWidth*19, 0, displayWidth*20, displayHeight );
      var index = 0;

      
      var x = 0;
      var y;
     
      for(var plr in allPlayers){
       
        index = index + 1 ;

        
        y = y + 200;
       
        x = displayWidth + allPlayers[plr].distance;
        heros[index - 1].x = x;
        heros[index - 1].y = y;

        if (index === player.index){
          heros[index - 1].shapeColor = "red";
          camera.position.x = heros[index-1].x;
          camera.position.y = displayHeight/2;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    //if() {
     // gameState = 2;
     // player.rank +=1
     // Player.updateCarsAtEnd(player.rank);
      
    //}
    drawSprites();
  }
}
