import axios from "axios";
import store from "@/store";
import { MessageBox } from "element-ui";
import { getToken } from "../utils/auth";
import { removeToken } from "@/utils/auth";

//import qs from "qs";


//axios 配置
axios.defaults.timeout = 100000;//超时时间
axios.defaults.baseURL = 'http://api.admin.js.ispeed.cn';
//axios.defaults.baseURL = 'http://192.168.1.19:7006';

//axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
//post传参序列化
axios.interceptors.request.use((config) => {
    console.log(store.getters.token);
    if (store.getters.token) {
        console.log(getToken());
        config.headers['token'] = getToken();
    }
    if (config.method === 'post') {
        //config.headers['X-CSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
        config.data =config.data;
        config.headers['token'] = getToken();
    }
    if (config.method === 'get') {
        //config.headers['X-CSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
        config.data =config.data;
        config.headers['token'] = getToken();
    }
    return config;
},(error) => {
    return Promise.reject(error);  //报异常
})
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            console.log(error);
            MessageBox({
                type:'error',
                message:error.response.data.errmsg
            }).then(action => { 
                 if (action == 'confirm'&&error.response.data.code==403) {     //确认的回调
                    console.log('退出')
                    removeToken();
                    window.location.href = '/'
                 }
            })
        }
        return Promise.reject(error);
    }
)
export default axios;