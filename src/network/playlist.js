import {request} from './request'
export function playlistdetail(data){
  return request({
    url: "/playlist/detail",
    params: data
  })
}
export function songdetai(data) {
  return request({
    url: "/song/detail",
    params: data
  })
}