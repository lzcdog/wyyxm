export const totop1 = {
  mounted() {
    //给滚动添加一个监听事件
    window.addEventListener('scroll', this.cheaktop, true)
  },
  destroyed() {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.cheaktop)
  },
}
export const currentTimeformat = {
  data(){
    return{
      time4: 1
    }
  },
  filters: {
    currentTimeformat(value) {
      
        if (!value) return "00:00";
        let interval = Math.floor(value);

        let minute = Math.floor(interval / 60)
          .toString()
          .padStart(2, "0");
        let second = (interval % 60).toString().padStart(2, "0");
        
        return `${minute}:${second}`;
      
    },
  }
}