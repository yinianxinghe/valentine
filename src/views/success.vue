<template>
  <div class="success">
    <canvas id='fireworks' ref="fireworks">浏览器不支持canvas</canvas>
    <div id="starsBox" ref="starsBox"></div>
    <div class="content">
      往后余生，惟愿是你。余生还很漫长，我愿和你一起走下去。
    </div>
  </div>
</template>
<script>
import {Rocket} from '../script/fireWork'
export default {
  name: 'Success',
  comments: {},
  data() {
    return {
      cols: ['#f5d76e', '#f7ca18', '#f4d03f', '#ececec', '#ecf0f1', '#a2ded0'],
      starts: 250,
      domData: '',
      interValId: null,
      SCREEN_WIDTH: '',
      SCREEN_HEIGHT: '',
      mousePos: {},
      canvas: '',
      context: '',
      particles: [],
      rockets: [],
      MAX_PARTICLES: 200,
      colorCode: 0
    }
  },
  mounted() {
    this.setStarts()
    this.SCREEN_WIDTH = window.innerWidth
    this.SCREEN_HEIGHT = window.innerHeight,
      this.mousePos = {
        x: window.innerWidth / 2,
        y: 0
      }
    this.canvas = this.$refs.fireworks
    this.context = this.canvas.getContext("2d"),
    this.particles = [],
    this.rockets = [],
    this.MAX_PARTICLES = 200,
    this.colorCode = 0;
    this.init()
  },
  methods: {
    setStarts() {
      var _this = this
      for (var i = 0; i <= this.starts; i++) {
        var size = Math.random() * 3;
        var color = this.cols[parseInt(Math.random() * 4)];
        let temp = '<span style=" width: ' + size + 'px; height: ' + size + 'px; top: ' + Math.random() * 100 + '%; left: ' + Math.random() * 100 + '%; background: ' + color + '; box-shadow: 0 0 ' + Math.random() * 10 + 'px' + color + ';"></span>';
        this.domData = this.domData + temp
      }
      this.$refs.starsBox.innerHTML = this.domData
      setTimeout(function () {
        Array.from(_this.$refs.starsBox.children).forEach(el => {
          el.style.top = Math.random() * 100 + '%'
          el.style.left = Math.random() * 100 + '%'
          el.style.position = 'absolute'
          el.style.display = 'inline-block'
          el.style.borderRadius = '100%'
          el.style.transition = '100s linear'
        })
      }, 1)
      this.changeStar()
    },
    changeStar() {
      if (!this.interValId) {
        this.interValId = setInterval(this.setStart, 100000);
      }
    },
    setstart() {
      Array.from(this.$refs.starsBox.children).forEach((el, i) => {
        el.style.top = Math.random() * 100 + '%'
        el.style.left = Math.random() * 100 + '%'
        el.style.position = 'absolute'
        el.style.display = 'inline-block'
        el.style.width = 'auto'
        el.style.borderRadius = '100%'
        el.style.transition = '100s linear'
      })
    },
    init() {
      debugger
      this.canvas.width = this.SCREEN_WIDTH;
      this.canvas.height = this.SCREEN_HEIGHT;
      setInterval(this.launch, 800);
      setInterval(this.loop, 1000 / 50);
    },
    launch() {
      this.launchFrom(this.mousePos.x);
    },
    launchFrom(x) {
      if (this.rockets.length < 10) {
        var rocket = new Rocket(x,this.SCREEN_HEIGHT);
        rocket.explosionColor = Math.floor((Math.random() * 360) / 10) * 10;
        rocket.vel.y = Math.random() * -3 - 4;
        rocket.vel.x = Math.random() * 2 - 1;
        rocket.size = 8;
        rocket.shrink = 0.999;
        rocket.gravity = 0.01;
        this.rockets.push(rocket);
      }
    },
    loop() {
      // update screen size
      if (this.SCREEN_WIDTH !== window.innerWidth) {
        this.canvas.width = this.SCREEN_WIDTH = window.innerWidth;
      }
      if (this.SCREEN_HEIGHT !== window.innerHeight) {
        this.canvas.height = this.SCREEN_HEIGHT = window.innerHeight;
      }

      // clear canvas
      this.context.fillStyle = "rgba(0, 0, 0, 0.05)";
      this.context.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

      var existingRockets = [];

      for (var i = 0; i < this.rockets.length; i++) {
        // update and render
        this.rockets[i].update();
        this.rockets[i].render(this.context);

        // calculate distance with Pythagoras
        var distance = Math.sqrt(
          Math.pow(this.mousePos.x - this.rockets[i].pos.x, 2) +
          Math.pow(this.mousePos.y - this.rockets[i].pos.y, 2)
        );

        // random chance of 1% if rockets is above the middle
        var randomChance =
          this.rockets[i].pos.y < (this.SCREEN_HEIGHT * 2) / 3
            ? Math.random() * 100 <= 1
            : false;

        /* Explosion rules
         - 80% of screen
         - going down
         - close to the mouse
         - 1% chance of random explosion
         */
        if (
          this.rockets[i].pos.y < this.SCREEN_HEIGHT / 5 ||
          this.rockets[i].vel.y >= 0 ||
          distance < 50 ||
          randomChance
        ) {
          this.particles.push(this.rockets[i].explode());
        } else {
          existingRockets.push(this.rockets[i]);
        }
      }

      this.rockets = existingRockets;

      var existingParticles = [];

      for (var j = 0; j < this.particles.length; j++) {
        this.particles[j].update();

        // render and save this.particles that can be rendered
        if (this.particles[j].exists()) {
          this.particles[j].render(this.context);
          existingParticles.push(this.particles[j]);
        }
      }

      // update array with existing particles - old particles should be garbage collected
      this.particles = existingParticles;

      while (this.particles.length > this.MAX_PARTICLES) {
        this.particles.shift();
      }
    }
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    clearInterval()
  }
}
</script>
<style scoped>
#starsBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
}

.content {
  position: absolute;
  top: 50%;
  margin: 0 auto;
  color: #ffffff;
}
</style>
