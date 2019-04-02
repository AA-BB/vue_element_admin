import pathToRegexp  from "path-to-regexp";
export function getCurrentMenu (location, arrayMenu) {
    if (!!arrayMenu) {
        let current = [];
        for(let i=0; i<arrayMenu.length; i++) {
            const e = arrayMenu[i];
            const child = getCurrentMenu(location,e.children);
            if (!!child && child.length > 0) {
                child.push({...e, children: null});
                return child;
            }
            if (e.href && pathToRegexp(e.href).exec(location)) {
                current.push({...e, children: null});
                return current;
            }
        }
        return current;
    }
    return null;
}
export function deepCopy(source) {
    if (!source) return source
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
    }
    return sourceCopy;
}
//验证是否合法的url
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}
//验证账号8-16位 数字  字母组成
// export function validateAccount(account) {
//     const regx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
//     return regx.test(account);
// }
export function validateAccount(account) {
        const regx = /^[1][345768][0-9]{9}$/;
        return regx.test(account);
    }
// 时间格式
// export function formatDate (date, fmt) {
//         if (/(y+)/.test(fmt)) {
//           fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
//         }
//         let o = {
//           'M+': date.getMonth() + 1,
//           'd+': date.getDate(),
//           'h+': date.getHours(),
//           'm+': date.getMinutes(),
//           's+': date.getSeconds()
//         }
//         for (let k in o) {
//           if (new RegExp(`(${k})`).test(fmt)) {
//             let str = o[k] + ''
//             fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
//           }
//         }
//         return fmt
//       }
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
    }
    for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
    let str = o[k] + ''
    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
    }
    return fmt
    }
    function padLeftZero(str) {
    return ('00' + str).substr(str.length)
    }
//生成一个随机id
export function generateUUId() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    })
    return uuid;
}