import {request} from "./request";

export function reqswiperdata(data){
  return request({
    url:"/banner",
    params:data
  })
}
export function hotrecommend(data){
  return request({
    url:"/personalized",
    params:data
  })
}

export function newshelves(){
  return request({
    url: "/album/newest",
  })
}

export function listdata(data){
  return request({
    url: "/top/list",
    params: data
  })
}
