import {request} from './request'
export function musicurl(data){
  return request({
    url:"/song/url",
    params:data
  })
}