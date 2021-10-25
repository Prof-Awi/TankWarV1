class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");
      this.off = 0
      this.blast = false;
      this.shot = false
      this.clientShot = false
      this.addColl = false
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }

    
  
    start() {
      createCanvas(1600,800);

      player = new Player();
      playerCount = player.getCount();
      background("white")
      form = new Form();
      form.display();
      player.getLocations()


      colls = new Group()
      rTank = createSprite(rx,800-50,1,1)
      rTank.addImage(RTankImg)
      rTank.scale = 0.5
      rTank.mirrorX(rTank.mirrorX()*-1)
      rTank.setCollider("rectangle", 0, 10, 200, 80);

    



      bTank = createSprite(bx,800-50,1,1)
      bTank.addImage(BTankImg)
      bTank.scale = 0.5
      bTank.setCollider("rectangle", 0, 10, 200, 80);



    
      rBarrel = createSprite(rTank.x+10,rTank.y-30,1,1)
      rBarrel.addImage(RBarrelImg)
      rBarrel.scale = 0.5
      rBarrel.rotation = -30
      rBarrel.mirrorX(rBarrel.mirrorX()*-1)

    
      bBarrel = createSprite(bTank.x-10,bTank.y-30,1,1)
      bBarrel.addImage(BBarrelImg)
      bBarrel.scale = 0.5
      bBarrel.rotation = 30
      bBarrel.mirrorY = -1


      tanks = [rTank,bTank]
      tankBarrel = [rBarrel,bBarrel]

      
      wall = createSprite(1600/2,800/2+200,50,1000)
      wall.shapeColor = "Brown"

      floor = createSprite(windowWidth/2,800,windowWidth,44)
      floor.shapeColor = "Green"
      obstacles = new Group()
      


    }

  
    handleElements() {
      form.hide();
      form.titleImg.position(40, 50);
      form.titleImg.class("gameTitleAfterEffect");
  
      //C39
      this.resetTitle.html("Surrender Game");
      this.resetTitle.class("resetText");
      this.resetTitle.position(windowWidth/20*17.5, 80);
  
      this.resetButton.class("resetButton");
      this.resetButton.position(windowWidth/20*18.5, 20);
  

 
    }
  
    play() {
      this.handleElements();
      this.handleResetButton();  
      Player.getPlayersInfo();
      
      rTank.position.x = rx
      bTank.position.x = bx
      rBarrel.position.x = rTank.x+10
      rBarrel.position.y = rTank.y-30
      bBarrel.position.x = bTank.x-10
      bBarrel.position.y = bTank.y-30
      wall.position.y = width/2+offset
      if(!this.addColl){
        bColl = new Box(bTank.position.x,bTank.position.y+10,100,50)
        rColl = new Box(rTank.position.x,rTank.position.y+10,100,50)
        wColl = new Box(1600/2,width/2+offset,50,1000)
        colls.push(rColl)
        colls.push(bColl)
        colls.push(wColl)

        this.addColl = true
      }






      for(var i = 0;i < obstacles.length; i++){
        if(obstacles[i] != undefined){
          obstacles[i].display()
          obstacles[i].animate()
          this.collisionWithTank(i)
        }
      }
      /*
      for(var i = 0;i < colls.length; i++){
        if(colls[i] != undefined){
          colls[i].show()
        }
      }
      */
      
      if (allPlayers !== undefined) {
        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;
          var rot = allPlayers[plr].rotation;
          tankBarrel[index-1].rotation = rot
          
        }
  
        // handling keyboard events
        this.handlePlayerControls();
        this.handleOpp()
        //this.handleObstacleCollision()
  
  
        drawSprites();
        Matter.Engine.update(engine)
      }
    }
  
    handleResetButton() {
      this.resetButton.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          offset: 0,
          turn:1,
          players: {},
          redx: 0,
          bluex: 0
        });
        window.location.reload();
      });
    }
  
  
    handlePlayerControls() {
      if (!this.blast) {
        if(player.index == 2){
          if (keyIsDown(UP_ARROW) && player.rotation < 100) {
            player.rotation += 1;
            tankBarrel[player.index-1].rotation +=1 
            player.update();
          }  
        
          if (keyIsDown(DOWN_ARROW) && player.rotation > -50) {
            player.rotation -= 1;
            tankBarrel[player.index-1].rotation -=1
            player.update();
          }
        }
        if(player.index == 1){
          if (keyIsDown(UP_ARROW) && player.rotation > -100) {
            player.rotation -= 1;
            tankBarrel[player.index-1].rotation -=1
            player.update();
          }  
        
          if (keyIsDown(DOWN_ARROW) && player.rotation < 50) {
            player.rotation += 1;
            tankBarrel[player.index-1].rotation +=1
            player.update();
          } 
        }
        player.getTurn()
        if(keyIsDown(32)){
          Bullet = new Ammo(tankBarrel[player.index-1].x,tankBarrel[player.index-1].y)
          Matter.Body.setAngle(Bullet.body, tankBarrel[player.index-1].rotation)
          if(player.index==1 && turn == 1){
            Bullet.shoot(1,player.index-1)
            player.updateTurn(2)
            player.updateShot(1,2)
            
            obstacles.push(Bullet)
            
            this.clientShot = false
          }if(player.index==2 && turn == 2){
          Bullet.shoot(-1,player.index-1) 
          player.updateTurn(1)
          obstacles.push(Bullet)
          player.updateShot(2,1)
          this.clientShot = false
          
        }

        }
      }
    }

    collisionWithTank(index) {
      for (var i = 0; i < colls.length; i++) {
        if (obstacles[index] !== undefined && colls[i] !== undefined) {
          var collision = Matter.SAT.collides(obstacles[index].body, colls[i].body);
          if (collision.collided) {
            exsound.play()
            obstacles[index].remove(index);
    
            Matter.World.remove(world, obstacles[index].body);
            delete obstacles[index];

            if(i == player.index-1){
              tanks[i].addImage(explosionImg)
              tankBarrel[i].visible = false
              this.gameOver()
            }else{
              if(colls[i] !== wColl){
                tankBarrel[i].visible = false
                tanks[i].addImage(explosionImg)
                this.showRank()
              }
            }
          }
        }
      }
    }



    handleOpp(){
      if(player.index==1 && allPlayers["player2"].shot && !this.clientShot){
          Bullet = new Ammo(tankBarrel[1].x,tankBarrel[1].y)
          Matter.Body.setAngle(Bullet.body, tankBarrel[1].rotation)
          Bullet.shoot(-1,1)
          obstacles.push(Bullet)
          this.clientShot = true

      }
      if(player.index==2 && allPlayers["player1"].shot && !this.clientShot){
        Bullet = new Ammo(tankBarrel[0].x,tankBarrel[0].y)
        Matter.Body.setAngle(Bullet.body, tankBarrel[0].rotation)
        Bullet.shoot(1,0)
        obstacles.push(Bullet)
        this.clientShot = true
      }
    }
  

  
    showRank() {
      swal({
        title: `Awesome!`,
        text: "You Destroyed Your Opponent Successfully",
        imageUrl:
          "https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/color/thumb-up-dynamic-color.png",
        imageSize: "100x100",
        confirmButtonText: "Ok"
      });
    }
  
    gameOver() {
      swal({
        title: `Game Over`,
        text: "Oops you lost....!!!",
        imageUrl:
          "https://3dicons.sgp1.cdn.digitaloceanspaces.com/v1/dynamic/color/thumb-down-dynamic-color.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }

  }