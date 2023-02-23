<template>
  <div v-if="isShowDialog" class="dialog-white">
    <div class="dialog" :style="setStyle">
      <div class="header">
        <div class="title">{{ dialogTitle }}</div>
        <div class="close" @click="close"></div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div v-if="showBtn" class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  components: {},
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogWidth: {
      type: String,
      default: '6.66'
    },
    dialogHeight: {
      type: String,
      default: '8'
    },
    showBtn: {
      type:Boolean,
      default:true
    }
  },
  data() {
    return {}
  },
  computed: {
    setStyle() {
      return {
        width: this.dialogWidth + 'rem',
        height: this.dialogHeight + 'rem'
      }
    }
  },
  methods: {
    close() {
      this.$emit('close',false)
    }
  }
}
</script>
<style scoped>
.dialog-white {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 2007;
  margin: 0;
  text-align: justify;
  background: rgba(0, 0, 0, 0.4);
}

.dialog {
  position: relative;
  margin: 0 auto;
  padding: 20px;
  margin-top: 25vh;
  background-color: #fff;
  border-radius: 10px;
  box-sizing:border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
}
.header {
  width: 100%;
  font-size: 12px;
  line-height: 20px;
}
.title {
  float: left;
}
.close {
  float: right;
  width: 12px;
  height: 12px;
  background: url(../assets/img/close.svg) no-repeat;
  background-size: cover;
}
.close:hover {
  background: url(../assets/img/close1.svg) no-repeat;
  background-size: cover;
}
.close:active {
  background: url(../assets/img/close1.svg) no-repeat;
  background-size: cover;
}
.content {
  width: 100%;
  font-size: 12px;
  margin-top: 20px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
  text-align: center;
  font-size: 11px;
  line-height: 30px;
}
</style>