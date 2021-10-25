class Player {
    constructor() {
      this.name = null;
      this.index = null;
      this.rotation = 0
      this.offset = 0
      this.turn = 1
      this.shot = false
      this.rx = rx
      this.bx = bx
 
    }
  
    addPlayer() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        rotation: this.rotation,
        playerName: this.name,
        shot: this.shot
      });
      if(this.index == 1){
        offset = (Math.random()*(200)) + 100
        this.offset = offset
        if(Math.random()>0.5){
          r1 = 1
        }else{
          r1 = -0.2
        }
        if(Math.random()>0.5){
          r2 = 1
        }else{
          r2 = -0.2
        }
        this.rx = width/4+(Math.random()*200*r1)
        this.bx = width/4*3+(Math.random()*200*r2)
        database.ref("/").update({
          offset: this.offset,
          redx: this.rx,
          bluex: this.bx
        });
      
    }
  }
  getLocations(){
    var offref = database.ref("offset");
    offref.on("value", data => {
      offset = data.val()
    });

    var redref = database.ref("redx");
    redref.on("value", data => {
      rx = data.val();
    });

    var blueref = database.ref("bluex");
    blueref.on("value", data => {
    bx = data.val();
    });

    }



    getCount() {
      var playerCountRef = database.ref("playerCount");
      playerCountRef.on("value", data => {
        playerCount = data.val();
      });
    }

    updateShot(index,index2){
      database.ref("players/player" + index).update({
        shot: true
      })
  
      database.ref("players/player" + index2).update({
        shot: false
      })
    }

    getTurn(){
      var turnRef = database.ref("turn");
      turnRef.on("value", data => {
        turn = data.val();
      });
      
    }

    updateTurn(turn){
      database.ref("/").update({
        turn: turn
      })
    }
  
    updateCount(count) {
      database.ref("/").update({
        playerCount: count

      });
    }
  
    update() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).update({
        rotation: this.rotation,
      });
    }
  
    static getPlayersInfo() {
      var playerInfoRef = database.ref("players");
      playerInfoRef.on("value", data => {
        allPlayers = data.val();
      });
    }
  

  }