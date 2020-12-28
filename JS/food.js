class Food{

    constructor()
    {
       this.image = loadImage("images/milk.png");
       this.foodStock = 0;
       this.lastfed;
    }

    getFoodStock()
    {
      var foodStockRef = database.ref("food");
      foodStockRef.on("value",(data)=>{this.foodStock=data.val()});

      var foodtimeRef = database.ref("fedTime");
      foodtimeRef.on("value",(data)=>{this.lastfed=data.val()});

    }
    updateFood()
    {
        database.ref("/").update({food: this.foodStock, fedTime : this.lastfed})

    }
    deductFood()
    {

    }

    display()
    {
        var xPos = 50;
        var yPos = height/2+50;
        if(this.foodStock>0)
        {
            for(var i=0;i<this.foodStock;i++)
            {
                if(i%10===0)
                {   yPos+=50;
                    xPos = 50;
                }

                image(this.image,xPos,yPos,50,50)
                xPos+=50
            }
        }
    }
}
