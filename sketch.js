var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;
var bullet;
var astroid;
var spaceShip

function preload(){
    bgImg = loadImage("bg.png");
    shipImg=loadImage("ship.png");
    astroidImg=loadImage("astroid.png");
    bulletImg=loadImage("bullet.png");
    overImg=loadImage("gameover.png");
    restartImg=loadImage("restart.png")                           
}
 
function setup() {
   createCanvas(800,800);
  
  score=0

  
     scene = createSprite(400,400,800,800);
     scene.addImage(bgImg);
    
  
    spaceShip = createSprite(40,750,20,20);
    spaceShip.addImage(shipImg);
    spaceShip.scale=0.4;
  
  var ground =createSprite(400,820,600,60)
   ground.visible=false;
  
   astroidGroup=createGroup();
   bulletGroup=createGroup();
  
   
  gameOver=createSprite(400,400)
  gameOver.addImage(overImg)
  gameOver.visible=false;

  restart=createSprite(400,500)
  restart.addImage(restartImg);
  restart.visible=false;
}

function draw() {
 background(220)
  
    if(gameState === PLAY){
      
     restart.visible=false
        
      
      if (frameCount %120==0){
   astroid=createSprite(400,100,10,10);
    astroid.velocityY=5;
    astroid.addImage(astroidImg);
    astroid.scale=0.3;
    astroid.x=Math.round(random(50,750));
    astroidGroup.add(astroid);
    astroid.setCollider("rectangle",0,0,astroid.width,astroid.height-10);
    astroid.debug =false;
}
      
    spaceShip.x=mouseX;
       
  if (keyDown("space")){
    var bullet=createSprite(spaceShip.x,spaceShip.y,10,20) 
    bullet.velocityY=-10  ;
    bullet.addImage(bulletImg);
    bullet.scale=0.3; 
    bulletGroup.add(bullet);
    bullet.setCollider("rectangle",0,0,bullet.width-100,bullet.height-10);
    bullet.debug = false;
  }
      
    if (astroidGroup.isTouching(bulletGroup)){
    bulletGroup.destroyEach();
    astroidGroup.destroyEach();
      score=score+1
     
    }
      if (astroidGroup.isTouching(spaceShip )){
  gameState = END;
      }
      
      
      
 } else if (gameState === END) {
   scene.visible = false;
  gameOver.visible=true;
   restart.visible = true;
   spaceShip.visible = false;

  
 }

if(mousePressedOver(restart)){
  gameState=PLAY;
  scene.visible = true;
  gameOver.visible=false;
   restart.visible = false;
  spaceShip.visible = true;
  score = 0;
}

 
 drawSprites();

 textSize(25);
 text("Astroid Destroyed: "+ score, 500,50);

}