<template>
  <div class="memberManage">
    <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="状态">
                        <el-select v-model="form.status" v-on:change="selectStatus($event)">
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.statusId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第三方账号类型" id="otherType">
                        <el-select v-model="form.payment"  v-on:change="selectPayment($event)">
<el-option v-for="item in payments" :key="item.statusId" :label="item.name" :value="item.statusId"></el-option>
</el-select>
</el-form-item>
<el-form-item label="日期">
<div class="block">
<el-date-picker
v-model="form.date"
type="datetimerange"
range-separator="至"
start-placeholder="开始日期"
end-placeholder="结束日期"  @change="onPick" format="yyyy MM dd ">
</el-date-picker>
</div>
</el-form-item>
<el-form-item label="搜索">
                        <el-input v-model="form.searchKey" placeholder="输入用户昵称、用户ID、绑定手机号" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()"></el-button>
                    </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="用户ID" prop="user_id" align="center"></el-table-column>
                <el-table-column label="用户账号" prop="user_account" align="center"></el-table-column>
                <el-table-column label="所属渠道" prop="channel_name" align="center"></el-table-column>
                <el-table-column label="会员类型" prop="user_type" align="center"></el-table-column>
                <el-table-column label="第三方登录" prop="login_type" align="center"></el-table-column>
                <el-table-column label="剩余加速时长" prop="remain_accelerate_time" align="center"></el-table-column>
                <el-table-column label="注册时间" prop="register_time" align="center"></el-table-column>
                <el-table-column label="最后登录时间" prop="client_last_login_time" align="center"></el-table-column>
                <el-table-column label="状态" prop="user_status" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                      <!-- @click="deleteBtn(scope.$index,scope.row)" -->
                        <el-button size="small" type="warning" @click="openStop(scope.row)">
                           {{scope.row.user_status=="禁用"?"启用":"禁用"}}
                        </el-button>
                        
                           <router-link :to="{ name: '会员详情', params: { id: scope.row.id }}"><el-button size="small" type="danger" >详情</el-button></router-link>
                        
                         
                    </template>
                    
                </el-table-column>
            </el-table>
        </el-col>
         <!--分页条-->
        <el-pagination :total=total :page-size="1" :current-page="1"  @current-change="handleCurrentChange"
         :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
         <!--启用按钮-->
        <el-dialog  title="提示"   :visible.sync="useVisible" width="30%"  center>
            <div class="tooltips">{{this.form.start}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="useVisible = false">取 消</el-button>
                <el-button type="primary" @click="stopRow()">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>
<script>
import * as sysApi from "../../common/sys";
  import {formatDate} from "../../common/utils";
export default {
  data(){
    return{
       form: {
                status: '全部',
                payment:'全部',
                searchKey:"",
                date:formatDate(new Date(),'yyyy-MM-dd'),
                starttime:"",
                endtime:"",
                start:""
            },
            currentPage:1,
            useVisible:false,
            tableData: [{
                userId: "454545454",
                userAcount: "17621027902",
                userType: "黄金会员",
                otherLogin: "微信",
                haveTime: "30",
                regTime: "2018.08.23  12:20:20",
                lastLoginTime: "2018.08.23  12:20:20",
                status: "禁用"
            }],
            total:1,
            status: [
                {
                    statusId: 1,
                    label: '全部'
                },
                {
                    statusId: 2,
                    label: '正常'
                },
                {
                    statusId: 3,
                    label: '禁用'
                }
            ],
            payments: [
                {
                    statusId: 1,
                    name: '全部'
                },
                {
                    statusId: 2,
                    name: 'QQ'
                },
                {
                    statusId: 3,
                    name: '微博'
                },
                {
                    statusId: 4,
                    name: '微信'
                }
            ],
            rowId:""
    }
  },
  methods:{
      openStop(row){
            this.rowId=row.id;
            this.useVisible=true;
            if(row.user_status=="禁用"){
                this.form.start="是否确认启用？"
            }else{
                this.form.start="是否确认禁用？"
            }
        },
        stopRow(){
               if(this.form.start=="是否确认禁用？"){
                var param={"id":this.rowId}
                 sysApi.memberStop(param)
                        .then(data => {
                            if(data.success==true){
                                this.$message({
                                            type:'success',
                                            message:data.info
                                        })
                                this.useVisible=false;
                                // 启用成功重新调用函数
                                 if(this.form.status=="全部"){
              var html=""; 
          }else if(this.form.status=="正常"){
            var html="正常"; 
          }else{
              var html="禁用"
          }
           if(this.form.payment=="全部"){
              var payment=""; 
          }else if(this.form.payment=="QQ"){
              var payment="QQ"
          }else if(this.form.payment=="微博"){
              var payment="微博"
          }else if(this.form.payment=="微信"){
              var payment="微信"
          }
           var pa={"user_status":html,'user_login_type':payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,"page":1};
      
         sysApi.memberForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));

                            }
                            console.log(data);
                        })
            }else{
                var param={"id":this.rowId}
                sysApi.memberStart(param)
                        .then(data => {
                             if(data.success==true){
                                 this.$message({
                                            type:'success',
                                            message:data.info
                                        })
                                this.useVisible=false;
                                 if(this.form.status=="全部"){
              var html=""; 
          }else if(this.form.status=="正常"){
            var html="正常"; 
          }else{
              var html="禁用"
          }
           if(this.form.payment=="全部"){
              var payment=""; 
          }else if(this.form.payment=="QQ"){
              var payment="QQ"
          }else if(this.form.payment=="微博"){
              var payment="微博"
          }else if(this.form.payment=="微信"){
              var payment="微信"
          }
           var pa={"user_status":html,'user_login_type':payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,"page":1};
      
         sysApi.memberForm(pa)
                .then(res => {
                    this.$message({
                                            type:'success',
                                            message:data.info
                                        })
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));

                            }
                            console.log(data);
                        })
            }
        },
      onPick(val){
           if(val==null){
                 var start_time="";
                var end_time="";
            }else{
                
          var start_time=formatDate(val[0],'yyyy-MM-dd');
          var end_time=formatDate(val[1],'yyyy-MM-dd');
            }
          this.form.starttime=start_time;
          this.form.endtime=end_time;
           if(this.form.status=="全部"){
              var html=""; 
          }else if(this.form.status=="正常"){
            var html="正常"; 
          }else{
              var html="禁用"
          }
           if(this.form.payment=="全部"){
              var payment=""; 
          }else if(this.form.payment=="QQ"){
              var payment="QQ"
          }else if(this.form.payment=="微博"){
              var payment="微博"
          }else if(this.form.payment=="微信"){
              var payment="微信"
          }
          var pa={"user_status":html,'user_login_type':payment,"start_time":start_time,"end_time":end_time,"condition":this.form.searchKey,"page":1};
         sysApi.memberForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
      },
      search(){
           if(this.form.status=="全部"){
              var html=""; 
          }else if(this.form.status=="正常"){
            var html="正常"; 
          }else{
              var html="禁用"
          }
           if(this.form.payment=="全部"){
              var payment=""; 
          }else if(this.form.payment=="QQ"){
              var payment="QQ"
          }else if(this.form.payment=="微博"){
              var payment="微博"
          }else if(this.form.payment=="微信"){
              var payment="微信"
          }
          var pa={"user_status":html,'user_login_type':payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,"page":1};
         sysApi.memberForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
      },
      selectStatus(event){
           if(event==1){
              var html=""; 
              this.form.status="全部"
          }else if(event==2){
            var html="正常";
            this.form.status="正常"
          }else{
              var html="禁用";
               this.form.status="禁用"
          }
          if(this.form.payment=="全部"){
              var payment=""; 
          }else if(this.form.payment=="QQ"){
              var payment="QQ"
          }else if(this.form.payment=="微博"){
              var payment="微博"
          }else if(this.form.payment=="微信"){
              var payment="微信"
          }
           var pa={"user_status":html,'user_login_type':payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,"page":1};
         sysApi.memberForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
      },
      selectPayment(event){
           if(this.form.status=="全部"){
              var html=""; 
          }else if(this.form.status=="正常"){
            var html="正常"; 
          }else{
              var html="禁用"
          }
          if(event==1){
              var payment="";
              this.form.payment="全部"
          }else if(event==2){
              var payment="QQ"
              this.form.payment="QQ"
          }else if(event==3){
              var payment="微博"
              this.form.payment="微博"
          }else if(event==4){
              var payment="微信"
              this.form.payment="微信"
          }
            var pa={"user_status":html,'user_login_type':payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,"page":1};
         sysApi.memberForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
      },
      handleCurrentChange(val){
          this.currentPage = parseInt(`${val}`);
          if(this.form.status=="全部"){
              var html=""; 
          }else if(this.form.status=="正常"){
            var html="正常"; 
          }else{
              var html="禁用"
          }
           if(this.form.payment=="全部"){
              var payment=""; 
          }else if(this.form.payment=="QQ"){
              var payment="QQ"
          }else if(this.form.payment=="微博"){
              var payment="微博"
          }else if(this.form.payment=="微信"){
              var payment="微信"
          }
           var pa={"user_status":html,'user_login_type':payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,"page":this.currentPage};
         sysApi.memberForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
      }
  },
  
  created(){
      if(this.form.status=="全部"){
              var html=""; 
          }else if(this.form.status=="正常"){
            var html="正常"; 
          }else{
              var html="禁用"
          }
           if(this.form.payment=="全部"){
              var payment=""; 
          }else if(this.form.payment=="QQ"){
              var payment="QQ"
          }else if(this.form.payment=="微博"){
              var payment="微博"
          }else if(this.form.payment=="微信"){
              var payment="微信"
          }
           var pa={"user_status":html,'user_login_type':payment,"start_time":this.form.starttime,"end_time":this.form.endtime,"condition":this.form.searchKey,"page":this.currentPage};
      
         sysApi.memberForm(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));

  }
}
</script>
<style>
#otherType .el-form-item__label{
  width: 116px!important;
}

.el-button--small{
    margin-right: 10px;
}
</style>


