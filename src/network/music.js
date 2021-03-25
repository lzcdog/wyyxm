import {request} from './request'
export function musicurl(data){
  return request({
    url:"/song/url",
    params:data
  })
}
export function lyric1(data){
  return request({
    url:"/lyric",
    params: data
  })
}
export function checkmusicok(data){
  return request({
    url:"/check/music",
    params: data
  })
}
