export const totop1 = {
  mounted() {
    //给滚动添加一个监听事件
    window.addEventListener('scroll', this.cheaktop, true)
  },
  destroyed() {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.cheaktop)
  },
}