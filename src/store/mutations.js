// import { Message } from 'element-ui';
// Message.closeAll()
export default{
  //把action传来的数据返回到state
  pushmusic(state,finalyparams){
    console.log(finalyparams);
    state.musicparms = finalyparams
    const i = state.duomusicparms.findIndex(v=>v.id === finalyparams[0].id)
    if(i!=-1){
    }else{  
      state.duomusicparms.push(...finalyparams)
      return state.duomusicparms
    }
    return state.musicparms
  },
  prvmusic(state,prvmusicparams){
    state.musicparms.splice(0,1,prvmusicparams) 
    return state.musicparms
  },
  nextmusic(state,nextmusicparams){
    state.musicparms.splice(0,1,nextmusicparams) 
    return state.musicparms
  },
  getduration(state,duration){
    state.musicparms[0].duration = duration
    state.musicparms[0].playshow = true
    let index = state.finmusicparms.findIndex(v=>v.id == state.musicparms[0].id)
    if((state.finmusicparms).length==0){
      state.finmusicparms.push(...state.musicparms)
    }else{
      if(index==-1){
        state.finmusicparms.map(v=>v.playshow=false)
        state.finmusicparms.push(...state.musicparms)
      }
    }
    return state.finmusicparms
  }
}