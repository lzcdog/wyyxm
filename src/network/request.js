import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000
  })
  console.log(config);
  
  //请求拦截器
  instance.interceptors.request.use(config=>{
    return config
  },err =>{
    console.log(err);
  })

  
  //响应拦截器
  instance.interceptors.response.use(res=>{
    return res.data
  },(err=>{
    console.log(err);
  }))
  
  return instance(config)
}