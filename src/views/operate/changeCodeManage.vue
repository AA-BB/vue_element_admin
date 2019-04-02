<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="日期">
<div class="block">
<el-date-picker
v-model="form.date"
type="datetimerange"
range-separator="至"
start-placeholder="开始日期"
end-placeholder="结束日期"   @change="onPick" format="yyyy 年 MM 月 dd 日">
</el-date-picker>
</div>
</el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.value" v-on:change="indexSelect($event)">
                            <el-option v-for="item in value" :key="item.statusId" :label="item.label" :value="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="搜索">
                        <el-input v-model="form.searchKey" placeholder="输入用户ID、用户账号搜索" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()"></el-button>
                    </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <!-- <el-table-column label="用户Id" prop="user_id" align="center"></el-table-column>
                <el-table-column label="兑换码" prop="code_name" align="center"></el-table-column>
                <el-table-column label="用户名" prop="user_account" align="center"></el-table-column>
               <el-table-column label="兑换时间" prop="exchange_time" align="center"></el-table-column> -->
               <el-table-column label="编号" prop="code_number" align="center"></el-table-column>
                <el-table-column label="兑换码" prop="code" align="center"></el-table-column>
                <el-table-column label="兑换账号" prop="user_account" align="center"></el-table-column>
               <el-table-column label="状态" prop="is_used" align="center"></el-table-column>
               <el-table-column label="兑换时间" prop="exchange_time" align="center"></el-table-column>
            </el-table>
        </el-col>
      
 <!--分页条-->
      <el-pagination :total=total :page-size="1" :current-page="1"  @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    
    </div>
</template>
<script>
import * as sysApi from "../../common/sys";
  import {formatDate} from "../../common/utils";
export default {
    name:'',
    data() {
        return {
            form:{
                value:"",
                date:"",
                searchKey:"",
                   date:formatDate(new Date(),'yyyy-MM-dd'),
                starttime:"",
                endtime:"",
            },
            tableData:[],
            value:[{
                statusId:"1",
                label:"全部"
            },{
                statusId:"2",
                label:"已使用"
            },{
                statusId:"3",
                label:"未使用"
            }],
            total:1,
            currentPage:1,
            id:"",
        }
    },
    methods: {
           onPick(val){
          var start_time=formatDate(val[0],'yyyy-MM-dd');
          var end_time=formatDate(val[1],'yyyy-MM-dd');
          this.form.starttime=start_time;
          this.form.endtime=end_time;
         
          var param= {
      "id":this.id, // 生成记录里面的id
      "code_status":this.form.value, //兑换码状态，如果为空，则表示查询所有状态
      "start_time":this.form.starttime,// 筛选的兑换开始时间
      "end_time":this.form.endtime,// 筛选的兑换结束时间
      "condition":this.form.searchKey,// 条件：用户ID(user_id)或者用户账号(user_account)
      "page":1// 第几页
  }

       console.log(param)
        sysApi.changecodeOrder(param)
        .then(data => {
                for(var i in data.data){
                if(data.data[i].is_used==true){
                    data.data[i].is_used="已使用"
                }else{
                    data.data[i].is_used="未使用"
                }
            }
          this.tableData = data.data;
        this.total =data.total_count;
          console.log(data)
        })
      .catch(err => console.log('请求异常信息:' + err));
      },
      search(){
          if(this.form.searchKey==""){
                 this.$message({
                  type: 'erroe',
                  message:"请输入用户ID、用户账号进行搜索"
              });
          }else{
          var param= {
      "id":this.id, // 生成记录里面的id
      "code_status":this.form.value, //兑换码状态，如果为空，则表示查询所有状态
      "start_time":this.form.starttime,// 筛选的兑换开始时间
      "end_time":this.form.endtime,// 筛选的兑换结束时间
      "condition":this.form.searchKey,// 条件：用户ID(user_id)或者用户账号(user_account)
      "page":1// 第几页
  }

       console.log(param)
        sysApi.changecodeOrder(param)
        .then(data => {
                for(var i in data.data){
                if(data.data[i].is_used==true){
                    data.data[i].is_used="已使用"
                }else{
                    data.data[i].is_used="未使用"
                }
            }
          this.tableData = data.data;
        this.total =data.total_count;
          console.log(data)
        })
      .catch(err => console.log('请求异常信息:' + err));
          }
  
      },
        indexSelect(event){
            if(event=="全部"){
                this.form.value=''
            }else if(event=="已使用"){
                this.form.value="已使用"
            }else{
                this.form.value="未使用"
            }
                var param= {
      "id":this.id, // 生成记录里面的id
      "code_status":this.form.value, //兑换码状态，如果为空，则表示查询所有状态
      "start_time":this.form.starttime,// 筛选的兑换开始时间
      "end_time":this.form.endtime,// 筛选的兑换结束时间
      "condition":this.form.searchKey,// 条件：用户ID(user_id)或者用户账号(user_account)
      "page":1// 第几页
  }

       console.log(param)
        sysApi.changecodeOrder(param)
        .then(data => {
                  for(var i in data.data){
                if(data.data[i].is_used==true){
                    data.data[i].is_used="已使用"
                }else{
                    data.data[i].is_used="未使用"
                }
            }
          this.tableData = data.data;
        this.total =data.total_count;
          console.log(data)
        })
      .catch(err => console.log('请求异常信息:' + err));
        },
             handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
            var param= {
      "id":this.id, // 生成记录里面的id
      "code_status":this.form.value, //兑换码状态，如果为空，则表示查询所有状态
      "start_time":this.form.starttime,// 筛选的兑换开始时间
      "end_time":this.form.endtime,// 筛选的兑换结束时间
      "condition":this.form.searchKey,// 条件：用户ID(user_id)或者用户账号(user_account)
      "page":this.currentPage// 第几页
  }

       console.log(param)
        sysApi.changecodeOrder(param)
        .then(data => {
                 for(var i in data.data){
                if(data.data[i].is_used==true){
                    data.data[i].is_used="已使用"
                }else{
                    data.data[i].is_used="未使用"
                }
            }
          this.tableData = data.data;
        this.total =data.total_count;
        })
      .catch(err => console.log('请求异常信息:' + err));
      }
    },
    created(){
    //   this.id=parseInt(this.$route.params.id);
    //   localStorage.setItem('id',this.id);
    //   var id=parseInt(localStorage.getItem("id"));
        if(this.$route.params.id){
            this.id=parseInt(this.$route.params.id);
            localStorage.setItem('duiId',this.id);
           // var id=parseInt(localStorage.getItem("Pageid"));
        }else{
            this.id=parseInt(localStorage.getItem("duiId"));
        }
      var param= {
      "id":this.id, // 生成记录里面的id
      "code_status":"", //兑换码状态，如果为空，则表示查询所有状态
      "start_time":this.form.starttime,// 筛选的兑换开始时间
      "end_time":this.form.endtime,// 筛选的兑换结束时间
      "condition":this.form.searchKey,// 条件：用户ID(user_id)或者用户账号(user_account)
      "page":this.currentPage// 第几页
  }

       console.log(param)
        sysApi.changecodeOrder(param)
        .then(data => {
            for(var i in data.data){
                if(data.data[i].is_used==true){
                    data.data[i].is_used="已使用"
                }else{
                    data.data[i].is_used="未使用"
                }
            }
          this.tableData = data.data;
        this.total =data.total_count;
          console.log(data)
        })
      .catch(err => console.log('请求异常信息:' + err));
    },
   
  
}
</script>
<style>
 .el-form-item {
    margin-bottom: 22px;
  }
  .newGenerate .el-form--label-left .el-form-item__label,.editGenerate .el-form--label-left .el-form-item__label{
    width: 100px!important;
  }
   .newGenerate .el-form-item__content,.editGenerate .el-form-item__content{
    margin-left: 100px!important;
  }

</style>



