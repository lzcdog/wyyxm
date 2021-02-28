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
  }
}