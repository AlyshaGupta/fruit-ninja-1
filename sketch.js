//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword, sword_moving;

var score;

var fruitsGroup, f1, f2, f3, f4;

var EnemyGroup,monster_moving;

var swordSound,gameOverSound;

var gameOver,gameOverImage;
    
  function preload(){

  sword_moving = loadImage("sword.png");
  
  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");
  
  monster_moving =       loadAnimation("alien1.png","alien2.png");
  
  swordSound = loadSound("knifeSwooshSound.mp3");
    
  gameOverSound = loadSound("gameover.mp3");
    
  gameOverImage = loadImage("gameover.png");
    
  }

function setup(){
  createCanvas (600,600)
  
   //to create knife
   sword = createSprite(40,200,20,20)
   sword.addImage(sword_moving)
   sword.scale=0.7
  
   //to create score
   score=0;
  
   //create fruits and Enemy Groups
   fruitsGroup = createGroup();
   EnemyGroup = createGroup();
  
}

function draw(){
  background("pink")
  
  //displaying score
  text("Score: "+ score, 400,30);
  
  if(gameState === PLAY) {
    
  //move the sword with mouse
  sword.y=World.mouseY;
  sword.x=World.mouseX;
   
  //to cut fruits
  if(fruitsGroup.isTouching(sword)){
  fruitsGroup.destroyEach();
  swordSound.play();
  score=score+1;
   } 
  } 
    
  if(EnemyGroup.isTouching(sword)){
  gameState = END;
  gameOverSound.play();
  }
  
  if(gameState === END) {
  
  fruitsGroup.destroyEach();
  EnemyGroup.destroyEach();
    
  fruitsGroup.setVelocityXEach(0);
  EnemyGroup.setVelocityXEach(0);
    
  gameOver = createSprite(300,100,100,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2;
 
  sword.x=200;
  sword.y=200;
    
  }
  
  //call fruits and Enemys function
  fruits();
  Enemy();
  
  drawSprites()
  }

function fruits(){
  if (World.frameCount%80===0){
  fruit = createSprite(400,200,20,20);
  fruit.velocityX = (7+(score/4));
  console.log(fruit.velocityX);
  fruit.scale=0.2;
  //fruit.debug=true;
  r=Math.round(random(1,4));
  if (r==1) {
  fruit.addImage(f1);
  } else if (r==2)  {
  fruit.addImage(f2);
  } else if (r==3)  {
  fruit.addImage(f3);
  } else {
  fruit.addImage(f4);
  }
    
  fruit.y=Math.round(random(50,340));
  
  fruit.velocityX = 7;
  fruit.lifetime = 100;
    
  fruitsGroup.add(fruit);
    }
  position=Math.round(random(1,2))
  if(position==1)
  {
  fruits.x=400;
  fruits.velocityX=(7+(score/4));
  }
  else
  {
  if(position==2){
  fruits.x=0;
  }
}
  }
  
function Enemy(){
  if (World.frameCount%200===0){
  monster = createSprite(400,200,20,20);
  monster.addAnimation("moving",monster_moving);
  monster.y=Math.round(random(100,300));
  monster.velocityX=-(8+(score/10));
  console.log(monster.velocityX);
  monster.setLifetime=50;
    
  EnemyGroup.add(monster);
   }
 }  
  