import {request} from '@/network/request'
export function search(data){
  return request({
    url: '/search/suggest',
    params: data
  })
}
export function searchlist(data){
  return request({
    url: '/cloudsearch',
    params: data
  })
}