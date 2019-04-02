import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from "axios";
import qs from 'qs'
import './plugins/element.js'
import 'font-awesome/css/font-awesome.css'
import './style/element-ui.scss';
import './permission';
// import VueResource from 'vue-resource'; 
// Vue.use(VueResource); 
Vue.config.productionTip = false
Vue.prototype.$http = axios;
// Vue.http.options.emulateJSON = true; 
Vue.prototype.$qs=qs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

