<template>
        <div  class="dataFirst">
        <ul class="dataFirst_ul">
            <router-link tag="li" to="/form/detail">
                <a>
                    <p><span>今日官网访问ip</span>:<span></span></p>
                    <p><span>今日官网访问pv</span>:<span></span></p>
                </a>
            </router-link>
             <router-link tag="li" to="/form/detail">
                <a>
                    <p><span>今日客户端下载量</span>:<span></span></p>
                    <p><span>今日加速用户</span>:<span></span></p>
                </a>
            </router-link>
             <router-link tag="li" to="/form/detail">
                <a>
                   <p><span>今日注册总量</span>:<span></span></p>
                    <p><span>今日订单总量</span>:<span></span></p>
                </a>
            </router-link>
        </ul>
        <template>
            <p class="title_head">待处理事务</p>
            <ul class="thing">
                <router-link tag="li" to="/form/detail">
                    <a>
                        <p><span>用户反馈</span><span>(1)</span></p>
                    </a>
                </router-link>
                <router-link tag="li" to="/form/detail">
                    <a>
                        <p><span>我的审核</span><span>(1)</span></p>
                    </a>
                </router-link>
                <router-link tag="li" to="/form/detail">
                    <a>
                        <p><span>商务合作</span><span>(1)</span></p>
                    </a>
                </router-link>
                <router-link tag="li" to="/form/detail">
                    <a>
                        <p><span>退款申请</span><span>(1)</span></p>
                    </a>
                </router-link>
            </ul>
        </template>
        <template>
            <p class="title_head">常用功能</p>
            <ul class="fun">
                <router-link tag="li" to="/form/detail">
                    <a>
                        <p><span>短信营销</span></p>
                    </a>
                </router-link>
                <router-link tag="li" to="/form/detail">
                    <a>
                        <p><span>添加游戏</span></p>
                    </a>
                </router-link>
                <router-link tag="li" to="/form/detail">
                    <a>
                        <p><span>添加公告</span></p>
                    </a>
                </router-link> 
            </ul>
        </template>
    </div>
</template>
<script>
// import axios from 'axios';
// export default {
//     name: 'dataFirst',
//    data() {
//       return {
//         qingfo: '',
//         baifo: ''
//       }
//     },
//     created(){
//      axios({
//         method: 'GET',
//         url: 'http://114.55.53.54:8699/ycWatch/watch/ch'
//       }).then(data => {
//         console.log(data);
//         // this.qingfo = data.data.data.foxiangNum;
//         // this.baifo = data.data.data.buddaNum;
//         // for (var i = 0; i < data.data.data.platformTop10foxiangInfoList.length; i++) {
//         //   this.baifoList.push(data.data.data.platformTop10foxiangInfoList[i].classCount);
//         //   this.xAxisData.push(data.data.data.platformTop10foxiangInfoList[i].schoolName);
//         //   this.qingfoList.push(data.data.data.platformTop10foxiangInfoList[i].sysUserCount);
//         // }
//       });
//     }
// }
</script>
<style>
.info-title{
    padding: 10px 15px;
    font-size: 13px;
    font-weight: bold;
    background: #f0f0f0;
    border-bottom: 1px solid #B5CFD9;
}
 ul{
     width: 100%;
     overflow: hidden;
 }
 ul>li>a:hover{
     cursor: pointer;
 }
 ul>li>a{
      color: #666;
 }
  ul.dataFirst_ul > li {
    float: left;
    width: 30%;
    margin-right: 3%;
    background: #fff;
    list-style: none;
    line-height:23px;
    padding:10px;
    border:1px solid #eee;
  }
    ul.dataFirst_ul > li:last-child{
        margin-right: 0;
    }
 ul.dataFirst_ul > li>a{
     color: #666;
 }
   ul.dataFirst_ul > li> span {
    color: #333;
    font-weight: bold;
    font-size: 20px;
  }
  .title_head{
      margin:10px auto;
      height: 40px;
      padding:5px;
      line-height: 30px;
      font-size: 16px;
      color: #fff;
      background: #666;
      columns: #fff;
  }
  .thing>li{
      float: left;
      width:35%;
      margin:5px 10px;
      list-style: none;
      padding:10px 0;
      border-bottom: 1px solid #eee;
  }
  .thing>li>a{
      color: #666;
  }
  .thing>li>a>p{
      overflow: hidden;
  }
  .thing>li>a>p>span:nth-child(1){
       float: left;
   }
   .thing>li>a>p>span:nth-child(2){
       float: right;
       color:#FF0000;
   }
   .fun>li{
       float: left;
       list-style: none;
       margin-right: 15px;
   }

  
</style>
