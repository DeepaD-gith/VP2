//Create variables here

var dogImg,happydogImg;
var dog, database,foodRef,foodCount; 
var foodObj;
var butfeed, butAddFood;

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  happydogImg = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  database = firebase.database();
  // foodRef = database.ref("food")
  // foodRef.on("value",readData,showError);

  dog = createSprite(width/2,height/2);
  dog.addImage(dogImg);
  dog.scale = .3;

  foodObj = new Food()
  foodObj.getFoodStock();
  console.log("Count s " + foodObj.foodStock)
  butfeed = createButton("Feed Bruno")
  butfeed.position(width/2-30,60)
  butfeed.mousePressed(feedDog);

  butAddFood = createButton("Add Food")
  butAddFood.position(width/2-180,60)
  butAddFood.mousePressed(()=>{foodObj.foodStock+=1;
                              foodObj.updateFood();
                              dog.addImage(dogImg);});

}


function draw() {  
background(46,139,87);
var fedtime;

if(foodObj.lastfed!==undefined)
{
  console.log(foodObj.lastfed)
  if(foodObj.lastfed>12)
  {
    fedHour = foodObj.lastfed % 12 + " PM"
  }
  else
  {
    fedHour = foodObj.lastfed + " AM"
  }

  textSize(20);
  fill("white")  
  text("Food Remaining " + foodObj.foodStock, width-300,50)
  text("Last Fed At " + fedHour, width-300,20)
}


foodObj.display();

  drawSprites();



}




function feedDog()
{
  if(foodObj.foodStock > 0)
  {
    foodObj.foodStock-=1;
    foodObj.lastfed = hour();
    dog.addImage(happydogImg);
    foodObj.updateFood();
  }
}

// function keyReleased()
// {
//   if(keyCode === (UP_ARROW) && foodCount > 0)
// {
//   dog.addImage(dogImg);
// }
// }


