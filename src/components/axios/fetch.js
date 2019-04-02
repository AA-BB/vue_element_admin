import axios from 'axios';
import api from './url';
import { formatDate, } from "./api";


export function fetch(option) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // baseURL: 'http://10.0.1.28:8090/',  ==> 个人服务器
      baseURL: api.baseURL,
      headers:{
        'system': 1,
        'device-type': 1,
        'device-code': 'qwerasdf',
        'trade-time': formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),  //可变化
        'Content-Type': 'application/json',
        'platform-token': sessionStorage.getItem('platFormToken'),   //可变化
        'system-token': sessionStorage.getItem('systemToken')         //可变化
      },
      timeout: 20 * 1000  //超时设置 15s
    });

    instance(option)
      .then(response=>resolve(response))
      .catch(error=>{
        console.log('请求异常信息:'+error);
        reject(error);
      });
  });
}
