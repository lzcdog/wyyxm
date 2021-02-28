import {musicurl} from '@/network/music'
export default {
  //通过请求获取歌曲url
  async getmusicurl(context,finalyparams){
    // const index = context.state.musicparms.findIndex(finalyparams)
    // context.state.musicparms = finalyparams
    const res = await musicurl({id:finalyparams[0].id})
    const url = res.data[0].url
    finalyparams[0].url = url
    // console.log(res.data[0].url);
    // context.state.musicurl = res.data[0].url
    context.commit('pushmusic',finalyparams)
  }
}