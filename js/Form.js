class Form {
    constructor() {
      this.input = createInput("").attribute("placeholder", "Enter your name");
      this.playButton = createButton("Play");
      this.titleImg = createImg("title.png", "game title");
      this.greeting = createElement("h2");
      this.resetButton = createButton("");

    }
  
    setElementsPosition() {
      this.titleImg.position(windowWidth/2-200, 50);
      this.input.position(windowWidth / 2 - 160, windowHeight / 2 - 120);
      this.playButton.position(windowWidth / 2 - 90, windowHeight / 2 - 75);
      this.greeting.position(windowWidth / 2 - 300, windowHeight / 2 - 100);
      this.resetButton.position(windowWidth/20*18.5, 20);
    }
  
    setElementsStyle() {
      this.titleImg.class("gameTitle");
      this.input.class("customInput");
      this.playButton.class("customButton");
      this.greeting.class("greeting");
      this.resetButton.class("resetButton");

    }
  
    hide() {
      this.greeting.hide();
      this.playButton.hide();
      this.input.hide();
      this.titleImg.hide()
      this.resetButton.hide();

      background("white")
    }
  
    handleMousePressed() {
      this.playButton.mousePressed(() => {
        this.input.hide();
        this.playButton.hide();
        var message = `
        Hello ${this.input.value()}
        </br>wait for another player to join...`;
        this.greeting.html(message);
        playerCount += 1;
        player.name = this.input.value();
        player.index = playerCount;
        player.addPlayer();
        player.updateCount(playerCount);
      });
    }
  
    display() {
      this.setElementsPosition();
      this.setElementsStyle();
      this.handleMousePressed();
    }
  }