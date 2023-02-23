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
import '../script/fireWork'
export default {
  name: 'Success',
  comments: {},
  data() {
    return {
      cols: ['#f5d76e', '#f7ca18', '#f4d03f', '#ececec', '#ecf0f1', '#a2ded0'],
      starts: 250,
      domData: '',
      interValId: null
    }
  },
  mounted() {
    this.setStarts()
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
