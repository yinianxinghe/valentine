<template>
  <div class="home">
    <canvas ref="canvas"></canvas>
    <div class="container">
      <div class="content" ref="content">
        <span>2023年1月25日，浓烈的春节气氛下我们相遇。</span>
        <span>从我第一次遇见你，我就觉得你是我命中注定的唯一</span>
        <span>在我们相处的这段日子里，从一开始互相有所顾虑以致我差点错过你，到后面我们第一次一起出去游玩，再到后面与你一起度过第一个情人节，到如今无话不谈。</span>
        <span>在接下来的日子里，我希望我的身边能够有你的身影，也希望你的身边有我，可以继续相互分享喜怒哀乐。</span>
        <span>所以我想让你做我的女朋友，成为我的宝，你愿意吗？宝</span>
      </div>
      <div class="foot">
        <div class="time">
          <div class="timeTitle">亲爱的彦霏，我们已经相遇了</div>
          <div>{{ time }}</div>
        </div>
        <div v-if="showBtn" class="btns">
          <div class="btn btn-green" @click="handleClick(0)">答应他</div>
          <div class="btn btn-blue" @click="handleClick(1)">再等等</div>
          <!-- <div class="btn btn-grey" @click="handleClick(2)">算了</div> -->
        </div>
      </div>
    </div>
    <Dialog :is-show-dialog="waitDialog" :show-btn="waitBtn">
      <template v-slot:content>
        <div>{{ waitContent }}</div>
        <img :src="imgUrl" alt="">
      </template>
      <template v-slot:footer>
        <div class="btn btn-green" @click="handleClickWait(0)">答应他</div>
        <div v-if="isShow" class="btn btn-blue" @click="handleClickWait(1)">再等等</div>
      </template>
    </Dialog>
    <Dialog :is-show-dialog="errorDialog" :show-btn="errorBtn" dialog-title="给个机会吧" @close="val => errorDialog = val">
      <template v-slot:content>
        <div>{{ errorContent }}</div>
      </template>
      <template v-slot:footer>
        <div class="btn btn-green" @click="handleClickError(0)">答应他</div>
        <div class="btn btn-grey" @click="handleClickError(1)">算了</div>
      </template>
    </Dialog>
</div>
</template>

<script>
import { createHeart } from "../script/heart"
import Dialog from '../components/dialog.vue'
import qql from '../assets/img/qql.jpg'
import love from '../assets/img/love.gif'
export default {
  name: 'HomeView',
  components: {
    Dialog
  },
  data() {
    return {
      firstTime: '2023/01/25',
      time: '',
      canvasRef: '',
      ctx: '',
      ww: '',
      wh: '',
      hearts: [],
      heartImage: new Image(),
      content: '2023年1月25日，浓烈的春节气氛下我们相遇。从我第一次遇见你，我就觉得你是我命中注定的唯一。在我们相处的这段日子里，从一开始互相有所顾虑以致我差点错过你，到后面我们第一次一起出去游玩，再到后面与你一起度过第一个情人节，到如今无话不谈。在接下来的日子里，我希望我的身边能够有你的身影，也希望你的身边有我，可以继续相互分享喜怒哀乐。所以我想让你做我的女朋友，成为我的宝，你愿意吗？宝',
      progress: 0,
      interValId: null,
      interValId2: null,
      showBtn: false,
      waitDialog: false,
      errorDialog: false,
      waitContent: '还等啥啊，快答应啊！',
      waitIndex: 0,
      waitImage: '',
      waitBtn: true,
      errorContent: '别啊，我觉得我们可以',
      errorIndex: 0,
      errorImage: '',
      errorBtn: true,
      imgUrl: qql,
      isShow: true
    }
  },
  created() {
  },
  mounted() {
    this.canvasRef = this.$refs.canvas
    this.ctx = this.canvasRef.getContext("2d")
    this.ww = window.innerWidth
    this.wh = window.innerHeight
    window.addEventListener("resize", function () {
      this.ww = window.innerWidth;
      this.wh = window.innerHeight;
    })
    this.heartImage.onload = this.init();
    this.heartImage.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NzMuOHB4IiBoZWlnaHQ9IjQwOC42cHgiIHZpZXdCb3g9IjAgMCA0NzMuOCA0MDguNiI+PHBhdGggZmlsbD0iI2QzMjkzMiIgZD0iTTQwNC42LDE2LjZDMzg1LjQsNi4xLDM2My41LDAsMzQwLDBjLTQxLjUsMC03OC41LDE4LjktMTAzLDQ4LjVDMjEyLjMsMTguOSwxNzUuMywwLDEzMy44LDAgYy0yMy4zLDAtNDUuMyw2LjEtNjQuNSwxNi42QzI3LjksMzkuNSwwLDgzLjQsMCwxMzMuOWMwLDE0LjQsMi40LDI4LjMsNi42LDQxLjJDMjkuNiwyNzguNCwyMzcsNDA4LjYsMjM3LDQwOC42IHMyMDcuMi0xMzAuMiwyMzAuMi0yMzMuNWM0LjMtMTIuOSw2LjYtMjYuOCw2LjYtNDEuMkM0NzMuOCw4My40LDQ0NS45LDM5LjYsNDA0LjYsMTYuNnoiLz48L3N2Zz4=";
    this.setcontent()
    this.dataRefreh()
  },
  methods: {
    init() {
      requestAnimationFrame(this.render);
      this.canvasRef.width = this.ww;
      this.canvasRef.height = this.wh;
      for (var i = 0; i < 100; i++) {
        this.hearts.push(createHeart(this.ww, this.wh, this.ctx, this.heartImage))
      }
    },
    render() {
      this.ctx.clearRect(0, 0, this.ww, this.wh);
      for (var i = 0; i < 100; i++) {
        this.hearts[i].update();
        this.hearts[i].draw();
      }
      requestAnimationFrame(this.render);
    },
    setcontent() {
      let str = this.$refs.content.innerHTML
      let progress = 0
      this.interValId = setInterval(() => {
        var current = str.substr(progress, 1);
        if (current == '<') {
          progress = str.indexOf('>', progress) + 1;
        } else {
          progress++;
        }
        this.$refs.content.innerHTML = str.substring(0, progress) + (progress & 1 ? '_' : '');
        if (progress >= str.length) {
          setTimeout(() => {
            this.showBtn = true
          }, 1000);
          clearInterval(this.interValId);
        }
      }, 75);
    },
    setTime() {
      let time = (Date.now() - Date.parse(this.firstTime)) / 1000
      let days = parseInt(time / 86400) //天
      let hours = parseInt(time / 3600) - 24 * days//小时
      let minutes = parseInt(time % 3600 / 60)//分钟
      let seconds = parseInt(time % 60) //秒
      this.time = days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId2 != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId2 = setInterval(() => {
        this.setTime(); //加载数据函数
      }, 1000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId2); //清除计时器
      this.intervalId2 = null; //设置为null
    },
    //点击事件
    handleClick(val) {
      this.waitIndex = 0
      this.errorIndex = 0
      if (val == 0) {
        this.$router.push('/success')
      } else if (val == 1) {
        this.waitDialog = true
        this.waitIndex++
      } else if (val == 2) {
        this.errorDialog = true
        this.errorIndex++
      }
    },
    handleClickWait(val) {
      if (val == 0) {
        this.waitDialog = false
        this.$nextTick(() => {
          this.$router.push('/success')
        })
      } else {
        if (this.waitIndex == 1) {
          this.waitContent = '明人不说暗话，我是真心喜欢你，我会给你我能给的所有，请答应我吧！'
          this.imgUrl = love
          this.waitIndex++
        } else if(this.waitIndex == 2) {
          this.waitContent = '以后饭我来做'
          this.waitIndex++
        }  else if(this.waitIndex == 3) {
          this.waitContent = '衣服碗筷我来洗'
          this.waitIndex++
        }  else if(this.waitIndex == 4) {
          this.waitContent = '爱你，么么哒!'
          this.waitIndex++
          this.isShow = false
        }
        //  else {
        //   this.waitContent = '我会继续等你，等你的回复'
        //   this.waitBtn = false
        //   setTimeout(() => {
        //     this.waitDialog = false
        //   }, 1000 * 5);
        // }
      }
    },
    handleClickError(val) {
      if (val == 0) {
        this.waitDialog = false
        this.$nextTick(() => {
          this.$router.push('/success')
        })
      } else {
        if (this.errorIndex == 1) {
          this.errorContent = '有什么问题请直接对我说，不要这么急着拒绝啊'
          this.errorIndex++
        } else if (this.errorIndex == 2) {
          this.errorContent = '请慎重考虑啊'
          this.errorIndex++
        } else {
          this.errorContent = '对不起，没能和你在一起，祝你能找到更好的另一半，也希望我们还是朋友'
          this.errorBtn = false
          setTimeout(() => {
            this.errorDialog = false
          }, 1000 * 5);
        }
      }
    }
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear();
  }
}
</script>
<style scoped>
.home {
  background-color: #ffe;
}

.container {
  width: 220px;
  height: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
}

.content {
  color: #000;
  font-size: 12px;
  line-height: 20px;
  text-align: justify;
  text-indent: 24px;
}

.foot {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.time {
  font-size: 20px;
  line-height: 25px;
  font-weight: 600;
}
.timeTitle {
  font-size: 14px;
  line-height: 20px;
  color:#67c23a;
}
.btns {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 11px;
  line-height: 30px;
}
img {
  width: 5rem;
  height: 5rem;
}
</style>
