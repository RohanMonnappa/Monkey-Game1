var PLAY = 1;
var END = 0;
gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var score, survivalTime;
var ground;

var BackgroundImage,Background;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  BackgroundImage = loadImage("jungle.jpg");
  
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,315,900,10);
  ground.velocityX = -4;
  ground.visible = false;
  
  ground.velocityX = -4;
    
 
   
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}


function draw() {

  background(BackgroundImage);
  
  survivalTime = survivalTime+1;
  
  stroke("green");
    fill("green");
      textSize(25);
  
  text("Survival Time:"+  survivalTime,50,50);
  
   stroke("brown");
    fill("brown");
      textSize(25);
  text("score:"+score,350,50);

  monkey.collide(ground);


  if(gameState === PLAY){
    
    score = score + Math.round(getFrameRate()/300);
    survivalTime= survivalTime + Math.round(getFrameRate()/300);

    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
    
    ground.velocityX = -4;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
    
    if(keyDown("space")) {
        monkey.velocityY = -8;
    }
    
    
    if(foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score+2;
    }
    
     monkey.velocityY = monkey.velocityY + 0.8;
    
    obstacleGroup.setLifetimeEach(-1);
    
food();
obstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        monkey.scale=0.2;
        gameState = END;
      SurvivalTime=0;
    }
  }
  
  if (gameState === END) {
     obstacleGroup.destroyEach();
    foodGroup.destroyEach();
     survivalTime.visible = false;
     stroke("red");
    fill("red");
       textSize(30);
  text("GAME OVER ", 200, 180);
    monkey.visible = false;
     score.visible = false;
    survivalTime.visible = false;
   
    
   }
  
  drawSprites();
}

function food() {
  if(frameCount % 80 === 0){
    banana = createSprite(300,350,40,10);
    banana.addImage("banana",bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    foodGroup.add(banana);
     }
}

function obstacles() {
  if(frameCount % 300 === 0 ){
    obstacle = createSprite(250,300,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }
}





