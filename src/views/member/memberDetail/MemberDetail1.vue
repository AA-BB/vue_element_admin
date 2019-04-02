<template>
    <div>
        <el-form :model="memberBasic">
          <el-form-item label="用户ID："><span>{{memberBasic.user_id}}</span></el-form-item>
          <el-form-item label="绑定手机："><span>{{memberBasic.user_phone}}</span></el-form-item>
          <el-form-item label="第三方登录方式："><span>{{memberBasic.login_type}}</span></el-form-item>
          <el-form-item label="第三方登录账号："><span>{{memberBasic.user_account}}</span></el-form-item>
          <el-form-item label="邮箱："><span>{{memberBasic.user_email}}</span></el-form-item>
          <el-form-item label="注册时间："><span>{{memberBasic.register_time}}</span></el-form-item>
          <el-form-item label="最后登录时间："><span>{{memberBasic.client_last_login_time}}</span></el-form-item>
          <el-form-item label="会员类型："><span>{{memberBasic.user_type}}</span></el-form-item>
          <el-form-item label="付费时长："><span>0</span></el-form-item>
          <el-form-item label="兑换码兑换时长："><span>0</span></el-form-item>
          <el-form-item label="试用时长："><span>0</span></el-form-item>
          <el-form-item label="售后次数："><span>{{memberBasic.after_sale_count}}</span></el-form-item>
        </el-form>
    </div>
</template>
<script>
import * as sysApi from "../../../common/sys";
export default {
    data() {
        return {
            memberBasic: {
                
            },
            id:""
        }
    },
    created(){
        if(this.$route.params.id){
            this.id=parseInt(this.$route.params.id);
            localStorage.setItem('Pageid',this.id);
            var id=parseInt(localStorage.getItem("Pageid"));
        }else{
             var id=parseInt(localStorage.getItem("Pageid"));
        }
      
      var param={"id":id};
        sysApi.memberDetail(param)
        .then(data => {
          this.memberBasic=data.data
        })
    }
}
</script>

