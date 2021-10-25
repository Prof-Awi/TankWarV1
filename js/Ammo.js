class Ammo {
    constructor(x, y) {
      var options = {
        isStatic: true
      };
      this.r = 6;
      this.speed = 0.05;
      this.body = Matter.Bodies.circle(x, y, this.r, options);
      this.isSink = false;
      Matter.World.add(world, this.body);
    }
  
    animate() {
      this.speed += 0.05;
    }
  
    remove(index) {
      this.isSink = true;
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
      this.speed = 0.05;
      this.r = 150;
      Matter.World.remove(world, this.body);

        }
  
    shoot(neg,index) {

      var newAngle = tankBarrel[index].rotation ;
      newAngle = newAngle *(3.14/180)
      var velocity = p5.Vector.fromAngle(newAngle);
      var m = 0.5*neg
      velocity.mult(m);
      Matter.Body.setStatic(this.body, false);
      Matter.Body.setVelocity(this.body, {
      x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
      
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      noStroke();
      fill("Black");
      ellipse(0, 0, this.r, this.r);
      pop();

      
    }
  }