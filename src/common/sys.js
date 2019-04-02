import axios from "@/common/axios";
import * as api from "@/api";
// Function 
//登录
export function Login(param) {
    return new Promise((resolve,reject) => {
        axios.post(api.LOGIN, param).then(res => {
            console.log("获取token?");
            resolve(res.data);
        })
    })
};
//查询管理员接口？
export function queryAccount(param) {
    return new Promise((resolve,reject) => {
        axios.post(api.QUERY_ACCOUNT, param).then(res => {
            resolve(res.data);
        })
    })
};
//重置密码
export function resetPassword(param) {
    return new Promise((resolve,reject) => {
        axios.post(api.RESET_PASSWORD, param).then(res => {
            resolve(res.data);
        })
    })
};
//停用管理员接口？
export function stopAccount(param) {
    return new Promise((resolve,reject) => {
        axios.post(api.STOP_ACCOUNT, param).then(res => {
            resolve(res.data);
        })
    })
};
// 版本列表
export function versionRelease(param) {
    return new Promise((resolve,reject) => {
        axios.post(api.VERSION_RELEASE, param).then(res => {
            resolve(res.data);
        })
    })
};
export function versionAdd(param) {
    return new Promise((resolve,reject) => {
        axios.post(api.VERSION_ADD, param).then(res => {
            resolve(res.data);
        })
    })
};
//啟用管理员接口？
export function startAccount(param) {
    return new Promise((resolve,reject) => {
        axios.post(api.START_ACCOUNT, param).then(res => {
            resolve(res.data);
        })
    })
};
// 提交表单 这里传一个参数就行了
export function submitForm(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.SUBMIT_FORM,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 操作日志列表
export function optionForm(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.OPTION_FORM,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 会员管理列表
export function memberForm(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.MEMBER_FORM,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 订单管理
export function orderManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ORDER_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 订单管理详情
export function orderDes(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ORDER_DES,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 订单统计
export function orderStatis(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ORDER_STATIS,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 会员统计
export function memberStatis(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.MEMBER_STATIS,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function memberStatislist(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.MEMBER_STATISLIST,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 订单统计列表
export function orderList(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ORDER_LIST,param).then(res=>{
            resolve(res.data)
        })
    })
};
// banner
export function bannerManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.BANNER_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
// banner
export function bannerEdit(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.BANNER_EDIT,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function bannerDele(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.BANNER_DELE,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 文章管理
export function articleManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ARTICLE_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 優惠券管理
export function discountManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.DISCOUNT_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function stopdissAccount(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.STOPDISSACCOUNT,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function startdissAccount(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.STARTDISSACCOUNT,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function releaseDisscount(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.RELEASEDISSCOUNT,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function editDisscount(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.EDITDISSCOUNT,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function addDisscount(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADDDISSCOUNT,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 兌換碼管理
export function redcodeManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.REDCODE_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function shengchengRedcode(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.SHENGCHENG_REDCODE,param).then(res=>{
            resolve(res.data)
        })
        
    })
};
export function addRedcode(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADDREDCODE,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function generOrder(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.GENERORDER,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function changecodeOrder(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.CHANGECODEORDER,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 商品管理
export function goodsManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.GOODS_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function editGoods(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.EDIT_GOODS,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function upGoods(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.UP_GOODS,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function downGoods(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.DOWN_GOODS,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function deleteGoods(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.DELETE_GOODS,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 游戏管理
export function gameManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.GAME_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function addgameManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADDGAME_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function gameClassManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.GAMECLASS_MANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 游戏上架
export function gameUp(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.GAME_UP,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 游戏下架
export function gameDown(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.GAME_DOWN,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 游戏分类DELETE_GAME
export function editClassManage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.EDITCLASSMANAGE,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 游戏删除
export function deleteGame(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.DELETE_GAME,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 文件上传
export function gameUpload(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.GAME_UPLOAD,param).then(res=>{
            resolve(res.data)
        })
    })
};// 查看二级分类
export function secondClass(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.SECOND_CLASS,param).then(res=>{
            resolve(res.data)
        })
    })
};
//查看一级分类
export function firstClass() {
    return new Promise((resolve,reject)=> {
        axios.post(api.FIRST_CLASS).then(res => {
            resolve(res.data)
        })
    })
}

export function allClass() {
    return new Promise((resolve,reject)=> {
        axios.post(api.ALL_CLASS).then(res => {
            resolve(res.data)
        })
    })
}

//查看一级分类以下的二级分类
export function secondesClass(param) {
    return new Promise((resolve,reject)=> {
        axios.post(api.SECOND_CLASSES,param).then(res => {
            resolve(res.data)
        })
    })
}


export function addsecondClass(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADDSECOND_CLASS,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function deleSecond(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.DELE_SECOND,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 广告列表
export function adverMent(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADVERMENT,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function adverAdd(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADVERADD,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function adverUp(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADVERUP,param).then(res=>{
            resolve(res.data)
        })
    })
};

export function adverDown(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADVERDOWN,param).then(res=>{
            resolve(res.data)
        })
    })
};export function adverDele(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADVERDELE,param).then(res=>{
            resolve(res.data)
        })
    })
};

// 其他设置
export function otherSet(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.OTHERSET,param).then(res=>{
            resolve(res.data)
        })
    })
};
export function otherSetLook(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.OTHERSETLOOK,param).then(res=>{
            resolve(res.data)
        })
    })
};
// 会员详情
export function memberDetail(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.MEMBERDETAIL,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function codeDetail(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.CODEDETAIL,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 禁用用户、
export function memberStop(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.MEMBER_STOP,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 启用用户
export function memberStart(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.MEMBER_START,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 添加编辑权限、ADDEDITLIMIT
export function addEditLimit(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.ADDEDITLIMIT,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 版本下载
export function versionDownload(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.VERSIONDOWNLOAD,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 商务合作
export function Bussiness(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.BUSSINESS,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 导出
export function Daochu(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.DAOCHU,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 导出删除
export function deleRecord(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.DELERECORD,param).then(res=>{
            resolve(res.data)
        })
    })
}
//退出登录
export function loginOut(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.LOGINOUT,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function firstMessage(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.FIRSTMESSAGE,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 添加文章
export function AddArticle(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.AddArticle,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 审核人列表
export function Examine(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.Examine,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 文章删除detailArticle
export function deleArticle(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.deleArticle,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 文章删除
export function detailArticle(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.detailArticle,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 修改密码
export function changepassword(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.changepassword,param).then(res=>{
            resolve(res.data)
        })
    })
}
// 用户反馈
export function userBack(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.userBack,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function userBackDes(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.userBackDes,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function userBackDo(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.userBackDo,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function bussinessHandle(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.bussinessHandle,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function getCode(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.getCode,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function memberType(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.memberType,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function shenhe(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.shenhe,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function tuikuan(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.tuikuan,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function qudao(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.post(api.qudao,param).then(res=>{
            resolve(res.data)
        })
    })
}
export function region(param){
    return new Promise((resolve,reject)=>{
        console.log(param);
        axios.get(api.region,param).then(res=>{
            resolve(res.data)
        })
    })
}






