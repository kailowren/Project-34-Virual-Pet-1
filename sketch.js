//Create variables here
var dog, happyDog, database, foodS, foodStock, happyDogImg, dogImg;
foodS=20;

function preload()
{
  //load images here
  happyDogImg = loadImage("happydog.png");
  dogImg = loadImage("Dog.png");
}

function setup() {
  
  database=firebase.database();
  
  createCanvas(500, 500);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
  text("Food: "+foodS,160,50);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  
  
  database.ref('/').update({
    Food: x
  })
}



