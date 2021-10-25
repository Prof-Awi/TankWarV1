var RTankImg, BTankImg
var rTank, bTank
var RBarrelImg, BBarrelImg
var rBarrel, bBarrel
var database, gameState;
var bomb, bombImg, floor 
var form, player, playerCount, allPlayers, offsettotal
var wall, turn, rx, bx, wColl, explosionImg
var r1,r2, rotation, Bullet, rColl, bColl, colls
var offset = 0

var engine, world
var obstacles, bgSound, exsound


var tanks = []
var tankBarrel = []

function preload(){
  explosionImg = loadImage("explosion.png")
  bgSound = loadSound("soundtrack.mp3")
  exsound = loadSound("explosion.wav")
  RTankImg = loadImage("/Tanks/Red/Tank.png")
  BTankImg = loadImage("/Tanks/Blue/Tank.png")
  RBarrelImg = loadImage("/Tanks/Red/Barrel.png")
  BBarrelImg = loadImage("/Tanks/Blue/Barrel.png")
  backgroundImage = loadImage("background.jpg")

}



function setup() {
  canvas = createCanvas(1600, 800);
  bgSound.play()
  engine = Matter.Engine.create();
  world = engine.world;
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  


}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }
}

