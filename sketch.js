 var PLAY=1;
 var END=0;
 var gameState=PLAY;
 var sword,fruit1,fruit2,fruit3,fruit4,monster,alien;
 var swordImage,monsterImage,alienImage,gameoverImage;  var fruitGroup,enemyGroup;
 var gameover;
 var score=0;
 var knifeSound, gameoverSound;

  function preload(){
    fruit1 = loadImage("fruit1.png");
    fruit2 = loadImage("fruit2.png");
    fruit3 = loadImage("fruit3.png");
    fruit4 = loadImage("fruit4.png");
    monsterImage =loadImage("alien1.png");
    alienImage=loadImage("alien2.png");
    swordImage = loadImage("sword.png");
    gameoverImage = loadImage("gameover.png");
    knifeSound = loadSound("knifeSwooshSound.mp3");
    gameoverSound = loadSound("gameover.mp3");
  }
  function setup(){
    createCanvas(600,600);
    sword = createSprite(40,200,20,20);  
    sword.scale=0.5;
    sword.addImage(swordImage);
    fruitGroup=createGroup();
    enemyGroup=createGroup();
  }
  function draw(){
    background("lightblue");

     if(gameState === PLAY){

    Enemy();
    fruits();

    sword.y=World.mouseY;
    sword.x=World.mouseX;   

    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+1;
      knifeSound.play();
    }
      else if(enemyGroup.isTouching(sword)){

          gameState = END;

      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.velocityX=0;
      enemyGroup.velocityX=0;
      sword.addImage(gameoverImage);
      sword.scale=0.5;
      sword.x=300;
      sword.y=300;
      gameoverSound.play();
    }
    }
    drawSprites();
    fill(0);
    textSize(18);
    text(" score:"+score,300,30);

  }



  function fruits(){

   if(World.frameCount%80===0){ 
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
  //fruit.debud=true;
    r=Math.round(random(1,4)); 
    if(r ==1 ) {
    fruit.addImage(fruit1);
    } else if (r == 2){
      fruit.addImage(fruit2)
      } else if (r == 3){
      fruit.addImage(fruit3)
        } else if (r == 4){
      fruit.addImage(fruit4)
        }
     fruit.y=Math.round(random(50,340));
     fruit.velocityX=-7;
     fruit.setlifetime=100;

     fruitGroup.add(fruit);
  }
  }

  function Enemy(){

   if(World.frameCount%200===0){ 
   monster=createSprite(400,200,20,20);
   monster.addImage("moving",monsterImage,);
   monster.y=Math.round(random(100,300)); 
   monster.velocityX=-8;
   monster.setlifetime=50;

   enemyGroup.add(monster);  
  }
    
     if(World.frameCount%250===0){ 
   alien=createSprite(400,200,20,20);
   alien.addImage("moving",alienImage,);
   alien.y=Math.round(random(100,300)); 
   alien.velocityX=-8;
   alien.setlifetime=50;

   enemyGroup.add(alien);  
  }
  }