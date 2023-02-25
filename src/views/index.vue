<template>
  <div class="content">
    <img src="../assets/img/xinfeng.png" alt="" class="heart" :class="isShow?'':'hiddenHeart'" @click="handleClick">
  </div>
</template>
<script>
import router from '@/router';

export default {
  name: 'index',
  components: {},
  data() {
    return {
      isShow: true
    }
  },
  mounted() {},
  methods:{
    handleClick() {
      this.isShow=false
      this.$parent.$refs.MusicPlay.play()
      setTimeout(() => {
        router.push('/homeView')
      }, 1000*2);
    }
  }
}
</script>
<style scoped>
.content {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #ffe;
}
.heart {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  animation: heart 5s 1;
}
@keyframes heart {
  0% {opacity: 0;}
  50% {opacity: 0.5;}
  100% {opacity: 1;}
}
.hiddenHeart {
  animation: hiddenHeart 2s 1;
}
@keyframes hiddenHeart {
  0% {opacity: 1;}
  50% {opacity: 0.5;}
  100% {opacity: 0; display: none;}
}
</style>