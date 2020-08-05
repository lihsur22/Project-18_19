var obsG, obsImg;
var fudG, fudImg;
var monkey, monkeyImg;
var hintergrund, hinterImg;
var grund;

var score;
var gameState, PLAY, END;

function preload() {
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  hinterImg = loadImage("jungle2.jpg");
  fudImg = loadImage("banana.png");
  obsImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);

  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("run", monkeyImg);
  monkey.scale = 0.1;
  monkey.depth = 2;

  hintergrund = createSprite(0,0,800,400);
  hintergrund.addImage("backgrund", hinterImg);
  hintergrund.scale = 1.6;
  hintergrund.x = hintergrund.width/2;
  hintergrund.velocityX = -4;
  hintergrund.depth = -1;

  grund = createSprite(400,350,800,10);
  grund.visible = false;

  score = 0;

  obsG = new Group();
  fudG = new Group();

  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background(230,230,230);
  
  if(gameState == PLAY)
  {
    if(hintergrund.x <= 0)
    {
      hintergrund.x = hintergrund.width/2
    }

    if(keyDown("space") && monkey.y >= 300)
    {
      monkey.velocityY = -18;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(grund)
    fuud();
    obs();

    if(monkey.isTouching(fudG))
    {
      score = score + 1
      fudG.destroyEach();
    }
    switch(score)
    {
      case 0: monkey.scale = 0.1;
      break;
      case 5: monkey.scale = 0.12;
      break;
      case 10: monkey.scale = 0.14;
      break;
      case 15: monkey.scale = 0.16;
      break;
      case 20: monkey.scale = 0.18;
      break;
      case 25: monkey.scale = 0.2;
      break;
      case 30: monkey.scale = 0.22;
      break;
      case 35: monkey.scale = 0.24;
      break;
      case 40: monkey.scale = 0.26;
      break;
      case 45: monkey.scale = 0.28;
      break;
      case 50: monkey.scale = 0.3;
      break;
    }
    if(monkey.isTouching(obsG) && score != 0)
    {
      score = score - 1;
      obsG.destroyEach();
    }
    if(monkey.isTouching(obsG) && score == 0)
    {
      gameState = END;
    }
  }

  if(gameState == END)
  {
    obsG.setVelocityXEach(0);
    fudG.setVelocityXEach(0);
    hintergrund.velocityX = 0;
    monkey.velocityY = 0;
    fudG.setLifetimeEach(-1);
    obsG.setLifetimeEach(-1);
    monkey.scale = -0.1
  }

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function fuud() 
{
  if(frameCount % 80 == 0) 
  {
    var banana = createSprite(800,random(120,200),40,10);
    banana.velocityX = -5;
    banana.lifetime = 165;
    banana.addImage("fuuud", fudImg);
    banana.scale = 0.05;
    banana.depth = 0;

    fudG.add(banana);
  }
}

function obs()
{
  if(frameCount % 200 == 0)
  {
    var obst = createSprite(800,330,10,10);
    obst.velocityX = random(-8,-11);
    obst.lifetime = 110;
    obst.addImage("obs", obsImg);
    obst.scale = 0.3;
    obst.depth = 1;

    obsG.add(obst);
  }
}