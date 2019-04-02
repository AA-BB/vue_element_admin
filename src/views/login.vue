<template>
  <el-container class="login">
    <el-main>
      <el-row type="flex" justify="center" id="login">
        <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="7" class="form-login">
          <h2>神速加速器管理后台</h2>
          <el-row type="flex" justify="center">
            <el-col :xs="23" :sm="23" :md="20" :lg="20" :xl="20">
              <!--表单-->
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username"  class="username">
                  <el-input type="text" v-model="ruleForm.username" placeholder="请输入手机号码"
                            auto-complete="off" clearable suffix-icon="el-icon-service"></el-input>
                  <template v-if="ruleForm.boolean==false">
                  <el-button @click="getCode()" class="getCode">
                    {{ruleForm.title}}
                  </el-button>
                  </template>
                   <template v-else>
                  <el-button @click="getCode()" class="getCode" disabled>
                    {{ruleForm.title}}
                  </el-button>
                  </template>
                </el-form-item>
                <el-form-item prop="password" class="password">
                  <el-input type="password" v-model="ruleForm.password" placeholder="请输入验证码"
                            auto-complete="off" @keyup.enter.native="submitForm"></el-input>
                  
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
              </el-form>
              <!--/表单-->
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import * as sysApi from "../common/sys";
import { setToken } from "@/utils/auth";
import types from "@/store/mutation-types";
import { mapMutations } from 'vuex';
//import md5 from 'js-md5';
  export default {
    name: 'Login',
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
           boolean:false,
           title:"获取验证码"
        },
       
        countdown:'',
        count:60,
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      };
    },

    methods: {
      getCode(){
          if(/^[1][345678][0-9]{9}$/.test(this.ruleForm.username)){
          this.count = 60;
					this.countdown = setInterval(this.CountDown, 1000);
          this.CountDown();
						this.code();
          }else{
            this.$message.error('请输入正确手机号码！');
            return false;
          }
      },
      CountDown() {
              this.ruleForm.boolean=true;
							this.ruleForm.title=this.count;
							if (this.count == 0) {
                this.ruleForm.title="重新获取";
								this.ruleForm.boolean=false;
								clearInterval(this.countdown);
							}
							this.count--;
						},
      code(){
                   var pa={
                     "phone":this.ruleForm.username,// 手机号 
                    "send_type":"登录",// 类
                  };
            sysApi.getCode(pa)
              .then(res => {
                if(res.success==true){
                  this.$message({
                    type:"success",
                    message:res.info
                  })
                }
                  
              })
      },
      /**登录功能**/
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate(valid=>{
          if(valid){
            var pa={"account":this.ruleForm.username,"code":this.ruleForm.password,"send_type":"登录"};
            sysApi.Login(pa)
              .then(res => {
                if(res.success==true){
                    setToken(res.token);
                  this.$store.dispatch('LoginBySetTooken',res.token);
                  this.$message({
                    type:'success',
                    message:res.info
                  });
                  localStorage.setItem("admin_name",res.admin.admin_name)
                  this.$router.push({path:'/'});
                  localStorage.setItem("Account",this.ruleForm.username)
                }
                  
              })
          }else{
            this.$message.error('请输入账号或密码！');
            return false;
          }
        })
      },
      ...mapMutations({
            setToken: types.setToken,
        })
    }


  }
</script>

<style>
  .el-container {
    height: 100%;
    background: #324157;
  }
.username .el-input{
  width: 70%;
  float: left;
}
.getCode{
  width: 30%;
  float: left;
}
  #login {
    margin-top: 150px;
  }
.login input:-webkit-autofill{
    background: #fff!important;
  }
.login .el-form-item__content{
  margin-bottom: 20px;
}
  .form-login {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
  }

  .form-login > .el-row {
    margin-bottom: 25px;
  }

  .form-login > .el-row:last-child {
    margin-top: 60px;
  }

  .form-login > h2 {
    text-align: center;
    font-weight: normal;
    margin: 20px 0 30px;
  }

  .login .el-form-item:last-child {
    text-align: center;
    margin-top: 50px;
  }

  .login .el-form-item:last-child button {
    width: 100%;
  }
</style>
