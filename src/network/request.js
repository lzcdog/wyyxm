import axios from 'axios'
//引入elmUI组件
import { Message } from 'element-ui';
Message.closeAll()
export function request(config){
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000
  })
  //请求拦截器
  instance.interceptors.request.use(config=>{
    return config
  },err =>{
    console.log(err);
  })

  if(config.url=="/check/music"){

    instance.interceptors.response.use(res=>{
      return res
    },(err=>{
      Message({
        message: '亲爱的,暂无版权',
        type: 'warning'
      },true)
    }))
  }//响应拦截器
  instance.interceptors.response.use(res=>{

    return res.data
  },(err=>{
    console.log(err);
  }))
  
  
  return instance(config)
}