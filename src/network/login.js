import {request} from './request'
export function EwmKey(){
  return request({
    url: "login/qr/key"
  })
}
export function EwmSc(data){
  return request({
    url: "login/qr/create",
    params: data
  })
}
export function CheckEwm(data){
  return request({
    url:"login/qr/check",
    params: data
  })
}
export function login(data){
  return request({
    url: "/login/cellphone",
    method: 'post',
    params: data
  })
}
export function getplaylist(data){
  return request({
    url: "/user/playlist",
    params: data
  })
}