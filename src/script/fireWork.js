class Particle {
  constructor(pos) {
    this.pos = {
      x: pos ? pos.x : 0,
      y: pos ? pos.y : 0
    };
    this.vel = {
      x: 0,
      y: 0
    };
    this.shrink = 0.97;
    this.size = 2;
  
    this.resistance = 1;
    this.gravity = 0;
  
    this.flick = false;
  
    this.alpha = 1;
    this.fade = 0;
    this.color = 0;
  }
  update() {
    // apply resistance
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;
  
    // gravity down
    this.vel.y += this.gravity;
  
    // update position based on speed
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  
    // shrink
    this.size *= this.shrink;
  
    // fade out
    this.alpha -= this.fade;
  }
  render(c) {
    if (!this.exists()) {
      return;
    }
  
    c.save();
  
    c.globalCompositeOperation = "lighter";
  
    var x = this.pos.x,
      y = this.pos.y,
      r = this.size / 2;
  
    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(
      0.8,
      "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")"
    );
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");
  
    c.fillStyle = gradient;
  
    c.beginPath();
    c.arc(
      this.pos.x,
      this.pos.y,
      this.flick ? Math.random() * this.size : this.size,
      0,
      Math.PI * 2,
      true
    );
  
    c.closePath();
    c.fill();
  
    c.restore();
  }
  exists(){
    return this.alpha >= 0.1 && this.size >= 1;
  }
}

class Rocket {
  constructor(x,y) {
    debugger
    Particle.apply(this, [
      {
        x: x,
        y: y
      }
    ]);
  
    this.explosionColor = 0;
  }
  explode() {
    var count = Math.random() * 10 + 80;
  
    for (var i = 0; i < count; i++) {
      var particle = new Particle(this.pos);
      var angle = Math.random() * Math.PI * 2;
  
      // emulate 3D effect by using cosine and put more particles in the middle
      var speed = Math.cos((Math.random() * Math.PI) / 2) * 15;
  
      particle.vel.x = Math.cos(angle) * speed;
      particle.vel.y = Math.sin(angle) * speed;
  
      particle.size = 10;
  
      particle.gravity = 0.2;
      particle.resistance = 0.92;
      particle.shrink = Math.random() * 0.05 + 0.93;
  
      particle.flick = true;
      particle.color = this.explosionColor;
  
      return particle
    }
  }
  render(c) {
    if (!this.exists()) {
      return;
    }
  
    c.save();
  
    c.globalCompositeOperation = "lighter";
  
    var x = this.pos.x,
      y = this.pos.y,
      r = this.size / 2;
  
    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");
  
    c.fillStyle = gradient;
  
    c.beginPath();
    c.arc(
      this.pos.x,
      this.pos.y,
      this.flick ? (Math.random() * this.size) / 2 + this.size / 2 : this.size,
      0,
      Math.PI * 2,
      true
    );
    c.closePath();
    c.fill();
  
    c.restore();
  }
}

Rocket.prototype = new Particle();
Rocket.prototype.constructor = Rocket;

export {Rocket,Particle}