<template>
    <div class="permission-container">
        <el-col :span="24" class="add-Btn">
              <el-button type="primary" style="float:right" @click="createModalVisble = true">添加管理员</el-button>
        </el-col>
        <el-col :span="24">
            <el-table :data="tableData" border ref="tableData">
              <el-table-column label="账号名称" prop="admin_name" align="center"></el-table-column>
              <el-table-column label="手机号" prop="admin_number" align="center"></el-table-column>
              <el-table-column label="状态" prop="admin_status" align="center"></el-table-column>
              <el-table-column label="操作" prop="operation" align="center">
                  <template slot-scope="scope">
                      <el-button type="text"  @click="addLimit(scope.row)">[设置权限]</el-button>
                      <!-- scope.row  传一行的数据过去到function -->
                      <!-- <el-button type="text" @click="modifypass(scope.row)" >[重置密码]</el-button>  -->

                      <el-button type="text" @click="stopDialog(scope.row)">{{scope.row.admin_status=="停用"?'[启用]':'[停用]'}}</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <el-pagination :total=total :page-size="1" :current-page="currentPage" @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </el-col>
        <el-dialog title="添加管理员" center :visible.sync="createModalVisble" width="30%" class="addManage2">
            <el-form :model="addManager" label-width="80px" :rules="rules" ref="addManager">
                <el-form-item label="名称" prop="admin_name">
                    <el-input v-model="addManager.admin_name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="账号" prop="admin_number">
                    <el-input v-model="addManager.admin_number" placeholder="限6-16位,数字、字母、字符"></el-input>
                </el-form-item> -->
                  <el-form-item label="手机号" prop="admin_number">
                    <el-input v-model="addManager.admin_number" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createModalVisble = false">取消</el-button>
                <el-button type="success" @click="addbtn('addManager')">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改密码" center :visible.sync="modifyPasswordVisble" width="30%" >
            <el-form :model="modifyPassword" status-icon :rules="passwordRule" ref="modifyPassword" class="demo-ruleForm">
              <el-form-item prop="originPassword">
                  <el-input type="password" auto-complete="off" v-model="modifyPassword.originPassword" placeholder="请输入原密码"></el-input>
              </el-form-item>
              <el-form-item prop="newPassword">
                  <el-input type="password" auto-complete="off" v-model="modifyPassword.newPassword" placeholder="请输入新密码，6-16位字母、数字、字符"></el-input>
              </el-form-item>
              <el-form-item prop="secordPassword">
                  <el-input type="password" v-model="modifyPassword.secordPassword" placeholder="请重新输入密码"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyPasswordVisble = false">取消</el-button>
                <el-button type="success" @click="submitPasswordForm('modifyPassword')">确定</el-button>
            </span>
        </el-dialog>
         <!--重置密码-->
      <el-dialog
        title="提示"
        :visible.sync="resetPassword"
        width="30%"
        center>
        <div class="tooltips">重置密码为123456，是否确定重置 ？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetPassword = false">取 消</el-button>
          <el-button type="primary" @click="reset()">重置</el-button>
        </span>
      </el-dialog>
       <!--停用管理员-->
      <el-dialog
        title="停用管理员"
        :visible.sync="stopManage"
        width="30%"
        center>
        <div class="tooltips">是否停用该管理员身份？停用后不可登录</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="stopManage = false">取 消</el-button>
          <el-button type="primary" @click="stop()">確定</el-button>
        </span>
      </el-dialog>
        <el-dialog title="设置权限" center  :visible.sync="limitModalVisble" width="30%">
            <div v-for="(item,index) in permissions" class="lie">
                <el-checkbox class="first_label" :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="e => handleCheckAllChange(e,index)">{{item.parent_name}}</el-checkbox>
                <el-checkbox-group class="permission_group" v-model="item.checked_child" v-if="item.child_names" @change="e => handleCheckedPermissionChange(e,index)">
                  <el-checkbox v-for="per in item.child_names" :label="per" :key="per">{{per}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="limitModalVisble = false">取消</el-button>
                <el-button type="success" @click="limitSave()">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
//   import { getList,delRow,saveEdit } from "../../components/axios/api";
import * as sysApi from "../../common/sys";
import * as api from "@/api";
import { validateAccount } from "@/common/utils";
import { getToken } from "@/utils/auth";
const permissionOptions = [{
    parent_name: '订单管理',
    child_names: ["订单列表"],
    checked_child: [],
    isIndeterminate: false,
    checkAll: false
},{
    parent_name: '运营管理',
    child_names: ['banner管理','优惠券管理','用户反馈','文章管理','商务合作',"广告管理" ],
    checked_child: [],
    isIndeterminate: false,
    checkAll: false
},{
    parent_name: '统计分析',
    child_names: ['用户统计','订单统计','用户分布','活动统计','下载安装统计','卸载统计','在线统计'],
    checked_child: [],
    isIndeterminate: false,
    checkAll: false
},{
    parent_name: '商品管理',
    child_names: ['商品列表'],
    checked_child: [],
    isIndeterminate: false,
    checkAll: false
},{
    parent_name: '游戏管理',
    child_names: ['游戏列表','分类管理'],
    checked_child: [],
    isIndeterminate: false,
    checkAll: false
},{
    parent_name: '会员管理',
    child_names: ['会员列表'],
    checked_child: [],
    isIndeterminate: false,
    checkAll: false
},{
    parent_name: '系统管理',
    child_names: ['权限管理','操作日志','版本发布','其他设置'],
    checked_child: [],
    isIndeterminate: false,
    checkAll: false
}];
export default {
    data() {
        
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            callback();
        }
        var validateNewPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else {
                if (this.modifyPassword.secordPassword !== '') {
                    this.$refs.modifyPassword.validateField('secordPassword');
                }
                callback();
            }
        }
        var validateNewPass2 = (rule, value , callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }else if (value !== this.modifyPassword.pass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        var validateAdminName=(rule, value, callback)=>{
            if(value===""){
                callback(new Error('请输入账号名'));

            }
            callback();
        };
        var validateAdminAccount=(rule,value,callback)=>{
            if(value===""){
                callback(new Error("请输入手机号"));
            }else if (!validateAccount(value)) {
                callback(new Error('请输入正确手机号'));
            }
            callback();
        }
        return {
            tableData: [{
                admin_name: '',
                admin_number: '',
                admin_status: '',
                // 
            }],
            total:1,
            rules: {
                admin_name: [
                    {validator: validateAdminName,trigger: 'blur'}
                ],
                admin_number: [
                    {validator: validateAdminAccount,trigger: 'blur'}
                ]
            },
            limitModalVisble: false,
            permissions: [],
            stopManage:false,
            resetPassword:false,
            passwordRule: {
                originPassword: [{
                    validator: validatePass,trigger: 'blur'
                }],
                newPassword: [{
                    validator: validateNewPass,trigger: 'blur'
                }],
                secordPassword: [{
                    validator: validateNewPass2,trigger: 'blur'
                }]
            },
            currentPage:1,
            operationRow: {},
            operationRow2:{},
            modifyPassword: {
                originPassword: '',
                newPassword: '',
                secordPassword: ''
            },
            createModalVisble: false,
            modifyPasswordVisble: false,
            limitModalVisble: false,
            addManager: {
                admin_name: '',
                admin_number: ''
            },
            limitCheckLists: [],
            limitCheckLists2: []         
        }
    },
    methods: {
        // 设置权限
        handleCheckAllChange(val,index) {
            this.permissions[index].checked_child = val ? this.permissions[index].child_names : [];
            this.permissions[index].isIndeterminate = false;
        },
        handleCheckedPermissionChange(value,index) {
            let checkedCount = value.length;
            this.permissions[index].checkAll = checkedCount === this.permissions[index].child_names.length;
            this.permissions[index].isIndeterminate = checkedCount > 0 && checkedCount < this.permissions[index].child_names.length;
        },
        isInArray(arr,value){
        for(var i = 0; i < arr.length; i++){
            if(value === arr[i]){
                return true;
            }
        }
        return false;
        },
        addLimit(row){
            this.limitModalVisble=true;
            this.rowId=row.id;
            //获取管理员的权限
            let config = { headers: {'Content-Type': 'multipart/form-data','token':getToken()} };
            var thiz = this;
            this.$http.post(api.LimitSearch,{id:row.id},config).then(function(res){
                console.log(res);
                let limitData = res.data.permission_list;
                var limitAll = [];
                limitData.filter((item) => {
                    var limitObj = new Object();
                    limitObj.parent_name = item.parent_name;
                    limitObj.child_names = item.child_names;
                    limitObj.checked_child = [];
                    limitObj.checkAll = false;
                    limitObj.isIndeterminate = false;
                    limitAll.push(limitObj);
                });
                let adminList = res.data.admin_permission;
                limitAll.forEach((item) => {
                    if(adminList!==null){
                        adminList.find((te) => {
                        if (te.parent_name == item.parent_name) {
                            item.checked_child = te.child_names;
                            if(te.child_names.length == item.child_names.length) {
                                item.checkAll = true;
                            } else {
                                item.checkAll = false;
                                item.isIndeterminate = true;
                            }
                        }
                    })
                    }
               
                })
                thiz.permissions = limitAll;
                thiz.limitModalVisble = true;
            });
        },
        limitSave(){
            let limitArr = [];
            console.log(this.permissions);
            this.permissions.filter((item) => {
                if (item.checked_child.length) {
                    var obj = {};
                    obj.parent_name = item.parent_name;
                    obj.child_name = item.checked_child;
                    limitArr.push(obj);
                }
            });
            var params={ 
                "session_id":1,// 超级管理员id
                "user_id":this.rowId,//需要设置权限的管理员id
                "permissions":limitArr
            }
               sysApi.addEditLimit(params)
                .then(res => {
                    if(res.success===true){
                        this.limitModalVisble=false;
                         this.$message({
                                            type:'success',
                                            message:res.info
                                        })
                    }
                    
                })
                .catch(err => console.log('请求异常信息:' + err));

        },
        // 重置密码
        modifypass(row){
            this.resetPassword=true;
            this.operationRow = Object.assign({},row,true);
        },
        reset() { //妈耶。我记得不是这样啊，有验证的，，，哪个事修改密码不是重置
            console.log(this.operationRow);
            var params={"session_id":1,"id":this.operationRow.id}
               sysApi.resetPassword(params)
                .then(res => {
                    if(res.success===true){
                        this.resetPassword=false;
                        this.$message({
                            type: 'success',
                            message:res.info
                        });
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
                    this.resetPassword = false;
              
        },
        // 停用管理员
        stopDialog(row){
            // this.stopManage=true;
            // this.operationRow = Object.assign({},row,true);
            // console.log(this.tableData);
             var params={"id":row.id}
             console.log(row);
            if(row.admin_status=="停用"){
                      sysApi.startAccount(params)
                .then(res => {
                    if(res.success===true){
                        row.admin_status="停用"
                        this.$message({
                            type: 'success',
                            message:res.info
                        });
                               var pa={"page":this.currentPage};
                                sysApi.queryAccount(pa)
                                    .then(res => {
                                        this.tableData=res.data;
                                        this.total=res.total_count;
                                    console.log(res);
                                })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }else{
           
                sysApi.stopAccount(params)
                .then(res => {
                    if(res.success===true){
                        // this.resetPassword=false;
                        // this.operationRow.isStop=true;
                        row.admin_status="正常"
                        this.$message({
                            type: 'success',
                            message:res.info
                        });
                            var pa={"page":this.currentPage};
                                sysApi.queryAccount(pa)
                                    .then(res => {
                                        this.tableData=res.data;
                                        this.total=res.total_count;
                                    console.log(res);
                                })
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        addbtn(formName){
             this.$refs[formName].validate((valid) => {
          if (valid) {
               var params={"name":this.addManager.admin_name,"account":this.addManager.admin_number}
               sysApi.submitForm(params)
                .then(res => {
                    if(res.success===true){
                        this.createModalVisble=false;
                          this.$message({
                            type: 'success',
                            message:res.info
                        });
                            var pa={"page":this.currentPage};
                                sysApi.queryAccount(pa)
                                    .then(res => {
                                        this.tableData=res.data;
                                        this.total=res.total_count;
                                    console.log(res);
                                })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
          } else {
            return false;
          }
        });
        },
        
      handleCurrentChange(val){
          this.currentPage = parseInt(`${val}`);
            var pa={"page":this.currentPage};
         sysApi.queryAccount(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(res);
                })
               .catch(err => console.log('请求异常信息:' + err));
      }

    },
     created(){
         var pa={"page":this.currentPage};
         sysApi.queryAccount(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(res);
                })
    }
}
</script><style lang="scss">
.add-Btn{
    margin-top: -40px;
    margin-bottom: 10px;
}
.addManage2 {
    .el-form-item {
        margin-bottom: 22px!important;
    }
}
.lie{
    margin-bottom: 10px;
}
.el-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    width: 30%!important;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    float: left!important;
}
.el-checkbox+.el-checkbox{
    margin-left:0!important;
}
.first_label{
    width: 20%!important;
}
.AddManagerTips {
    text-align: center;
    background-color: hsla(0,87%,69%,.1);
    color: #f56c6c;
    margin-bottom: 10px;
}
.permission_group{
     display: block!important;
    overflow: hidden;
    width: 80%;
    margin-left: 100px;
}
</style>

