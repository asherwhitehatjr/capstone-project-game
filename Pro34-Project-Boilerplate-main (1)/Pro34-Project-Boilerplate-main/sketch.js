
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var thunderskyImg, thundersky;
var thundercloudImg, thundercloud;
var fighterjetImg, fighterjet;
var magicorbsImg, magicorbs;
var arrowkeysImg, arrowkeys;
var thundercloudGroup;
var magicorbsGroup;
var magicorbscollected = 0;
var gamestate = 'play';

function preload()
{
  thunderskyImg = loadImage('thunder background.png');
  thundercloudImg = loadImage('thunder cloud.png');
  fighterjetImg = loadImage('fighter jet.png');
  magicorbsImg = loadImage('magic orbs.png');
  arrowkeysImg = loadImage('arrow keys.png');
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  thundercloudGroup = new Group();
  magicorbsGroup = new Group();

  fighterjet = createImage(200,200,50,50);
  fighterjet.addImage('fighterjetImg');
  fighterjet.scale = 0.2;
  
}

function draw() 
{
  background(51);
  image(thunderskyImg,0,0,width,height);


  Engine.update(engine);

  if(gameState === "play"){

    stroke("red");
    fill("blue");
    textSize(30);
    text("magicorbs: "+magicorbscollected,10,30);
    text("collect as many magic orbs as you can - to save our planet",20,40);

    if(keyDown("left_arrow")){
        fighterjet.x = fighterjet.x -3;
    }

    if(keyDown("right_arrow")){
        fighterjet.x = fighterjet.x +3;
    }

    if(collide(fighterjet,magicorbs)==true)
  {
    World.remove(engine.world,magicorbs);
    magicorbs = null;
    magicorbscollected = magicorbscolleced+50;
  }

  if(collision(fighterjet,thundercloud,20)==true)
  {
   thundercloud.visible = false;
   Matter.Body.applyforce(fighterjet{x:0,y:0}{x:0.5,y:0});
   gameState = "end";
  
  }

  spawnthundercloud();
  spawnmagicorbs();

  arrowkeys = createImage(100,30,10,10);
  arrowkeys.scale = 2;

  drawSprites();
  }

  if(gameState === "end"){
    stroke("orange");
    fill("red");
    textSize(20);
    text("GAME OVER - MISSION FAILED",230,250)
   }
}

function spawnthundercloud() {
  if (frameCount % 240 === 0){
      var thundercloud = createSprite(200,-50);
      thundercloud.scale = 0.2;

      thundercloud.x = Math.round(random(120,400));

      thundercloud.addImage(asteroidImg);

      thundercloud.velocityX = 2;

      fighterjet.depth = thundercloud.depth;
      fighterjet.depth +=1;

      thundercloud.lifetime = 800;

      thundercloudGroup.add(thundercloud);
  }
}


function spawnmagicorbs() {
  if (frameCount % 240 === 0){
      var magicorbs = createSprite(200-50);
      magicorbs.scale = 0.1;

      magicorbs.x = Math.round(random(120,400));

      magicorbs.addImage(starImg);

      magicorbs.velocityX = 3;

      fighterjet.depth = magicorbs.depth;
      fighterjet.depth +=1;

      magicorbs.lifetime = 800;

      magicorbsGroup.add(magicorbs);
  }
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function collision(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

