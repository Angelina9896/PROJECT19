var ghost, ghostImage, tower, towerImage;
var door, doorImage, doorGroup, climber, climberImage, climberGroup, invisibleBlock, invisibleGroup;
PLAY = 1;
END = 0;
var gameState = PLAY;

function preload(){
  ghostImage = loadImage("ghost-standing.png")
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  background("white")
  
  tower = createSprite(windowWidth/2,windowHeight/2)
  tower.addImage("tower", towerImage)
  tower.velocityY = 2;
  
  ghost = createSprite(windowWidth/2,windowHeight/2)
  ghost.addImage("ghost", ghostImage)
  ghost.scale = 0.3

  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleGroup = createGroup();
  
}

function draw(){
  background("white")
  if(gameState = PLAY){
  spawnObstacles();
  if(keyDown("space")){
    ghost.velocityY = -12;
  }
  ghost.velocityY = ghost.velocityY + 0.5 
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5
  }
  
  if(keyDown("left_arrow")){  
    ghost.x = ghost.x-5
  }
  
  if(tower.y>windowHeight){
    tower.y = windowHeight/2
  }
  
  
  if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleGroup.isTouching(ghost) || ghost.y > windowHeight || ghost.y<0){
      ghost.destroy();
      gameState = END;
    }
  }
  
  
  drawSprites();
  if (gameState ===  END){
    background("white")
    textSize(70);
    text("Game Over", windowWidth/2,windowHeight/2)
    if(mousePressedOver()) {
      reset();
    }
  }
}

function spawnObstacles(){
  if(frameCount%400 === 0){
     

    door=createSprite(400,200,20,20);
        door.addAnimation("moving", doorImage);
        door.y=Math.round(random(100,750));
        door.setLifetime=700;
        doorsGroup.add(door);
        ghost.depth = door.depth
        ghost.depth = ghost.depth+1
      
    
    
    climber = createSprite(300, -50)
    climber.y = Math.round(random(450, 800))
    climber.addImage(doorImage)
    climber.velocityY = 2
    climbersGroup.add(climber)
    climber.lifetime = 700
    ghost.depth = climber.depth
    ghost.depth = ghost.depth+1
    

    invisibleBlock = createSprite(300, -50)
    invisibleBlock.y = Math.round(random(450, 800))
    invisibleBlock.addImage(doorImage)
    invisibleBlock.velocityY = 2
    invisibleGroup.add(invisibleBlock)
    invisibleBlock.lifetime = 700
    ghost.depth = invisibleBlock.depth
    ghost.depth = ghost.depth+1
    

    
  }
}






