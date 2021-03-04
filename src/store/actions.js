import {musicurl} from '@/network/music'
import { lyric1 } from '../network/music'
export default {
  //通过请求获取歌曲url
  async getmusicurl(context,finalyparams){
    // const index = context.state.musicparms.findIndex(finalyparams)
    // context.state.musicparms = finalyparams
    const res = await musicurl({id:finalyparams[0].id})
    //获取歌词
    let lyrictime = await lyric1({id:finalyparams[0].id})
    lyrictime = lyrictime.lrc.lyric
    let finlyrictime = lyrictime.split(/[\[\]]/g)
    let lyric = []
    let time = []

    for(let i=1;i<(finlyrictime).length;i++){
      if(i%2==0){
        
        
          let ie ={
            lyricshow:false,
            lyric: finlyrictime[i]
          }
          
          lyric.push(ie )
        
      }else{
        let fintime = finlyrictime[i].split('.')
        time.push(fintime[0])
      }
    }
    // songtime1.forEach(v => {
    //   console.log( v.split('['));
    // });
    // console.log(songtime1);
    const url = res.data[0].url
    finalyparams[0].url = url
    finalyparams[0].lyric = lyric
    finalyparams[0].time = time
    // console.log(res.data[0].url);
    console.log(finalyparams);
    // context.state.musicurl = res.data[0].url
    context.commit('pushmusic',finalyparams)
  },
}