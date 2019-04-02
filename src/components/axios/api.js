import { fetch } from './fetch';
import api from './url';


// ❶ 登录
export function login(loginAccount,password){
  return fetch({
    method:'POST',
    url:api.login,
    data:{
      loginAccount:loginAccount,
      password:password
    }
  });
}

// ❷ 数据列表 + ❺ 分页条 + ❻ 关键词搜索
export function getList(){
  return fetch({
    method:'POST',
    url:api.manageList,
    data:{
      //page:currentPage
    }
  });
}

// ❸ 删除
export function delRow(resourceId){
  return fetch({
    method:'POST',
    url:api.delRow,
    data:{ resourceId:resourceId }
  });
}

// ❹ 编辑
export function saveEdit(name,resourceId){
  return fetch({
    method:'POST',
    url:api.saveEdit,
    data:{
      name:name,
      resourceId:resourceId
    }
  });
}

// ❼ 获取文件上传所需的签名
export function getUploadPermission(type){
  return fetch({
    method:'POST',
    url:api.uploadPassCode,
    data:{
      type:type
    }
  })


}

// ❽ 文件上传

// ❾ 表单提交
export function submit(form){
  return fetch({
    method:'POST',
    url:api.submit,
    data:form
  });
}

// ❿ 数据统计图
export function getStatistics(){
  return fetch({
    method:'GET',
    url:api.statistics
  })
}





//  文件名格式化      =========>非接口，仅仅是公共函数
export function getYyyymmdd() {
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return "" + myDate.getFullYear() + month + day;
}
export function getRandom(num) {
  var n = 1;
  for (var i = 0; i < num; i++) {
    n *= 10;
  }
  return Math.round(Math.random() * n);
}
//  文件名格式化      =========>非接口，仅仅是公共函数


//  时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt

}
export function second2hhmmss(s) {
  var hour = Math.floor(s / 3600);
  var other = s % 3600;
  var minute = Math.floor(other / 60);
  var second = other % 60;

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  return hour + ":" + minute + ":" + second;
}
//  时间格式化





