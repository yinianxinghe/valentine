export default class Heart {
    constructor({ ww,wh,ctx,heartImage }) {
        this.x = Math.random() * ww;
      this.y = Math.random() * wh;
      this.opacity = (Math.random() * 0.5) + 0.5;
      this.vel = {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4
      };
      this.targetScale = (Math.random() * 0.15) + 0.02;
      this.scale = this.targetScale * Math.random();
      this.ctx = ctx
      this.heartImage = heartImage
    }
    update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
  
        this.scale += (this.targetScale - this.scale) * 0.01;
        if (this.x - this.width > this.ww || this.x + this.width < 0) {
          this.scale = 0;
          this.x = Math.random() * this.ww;
        }
        if (this.y - this.height > this.wh || this.y + this.height < 0) {
          this.scale = 0;
          this.y = Math.random() * this.wh;
        }
        this.width = 473.8 * this.scale;
        this.height = 408.6 * this.scale;
      }
      draw() {
        this.ctx.globalAlpha = this.opacity;
        this.ctx.drawImage(this.heartImage, this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
      }
}

export function createHeart(ww,wh,ctx,heartImage) {
    return new Heart({
        ww: ww,
        wh: wh,
        ctx: ctx,
        heartImage: heartImage,
    })
}