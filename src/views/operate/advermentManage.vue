<template>
    <div class="app-container">
        <el-col :span="24" style="padding-bottom: 0px">
            <el-form :inline="true" :model="form" label-width="80px" >
                <el-form-item>
                    <el-button type="primary" size="medium" @click="addManageBtn()">
                        <i class="el-icon-circle-plus"></i>&nbsp;
                        添加广告
                    </el-button>
                </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.value" v-on:change="selectChange($event)">
                            <el-option v-for="item in status" :key="item.statusId" :label="item.label" :value="item.statusId"></el-option>
                        </el-select>
                    </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="编号" prop="id" align="center"></el-table-column>
                <el-table-column label="广告名" prop="ad_name" align="center"></el-table-column>
                <el-table-column label="添加时间" prop="add_time" align="center"></el-table-column>
                <el-table-column label="链接" prop="ad_link" align="center"></el-table-column>
                <el-table-column label="备注" prop="ad_remark" align="center"></el-table-column>
                <el-table-column label="状态" prop="ad_status" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="400">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="downUpBtn(scope.row)">
                            {{scope.row.ad_status=="上架"?"下架":"上架"}}
                        </el-button>
                        <el-button size="small" type="danger" @click="deleteBtn(scope.row)">
                            删除
                        </el-button>
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
            <div class="tooltips">{{this.form.status}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="useVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow()">确 定</el-button>
            </span>
        </el-dialog>
         <!--删除按钮-->
        <el-dialog  title="提示"   :visible.sync="deleVisible" width="30%"  center>
            <div class="tooltips">是否确认删除该条广告？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleRow()">确 定</el-button>
            </span>
        </el-dialog>
              <!--添加广告-->
      <el-dialog
        title="添加"
        :visible.sync="addVisible"
        width="30%"
        >
        <el-form label-width="80px" label-position="left" :model="addForm">
               <el-form-item label="广告名">
                  <el-input v-model="addForm.ad_name"></el-input>
              </el-form-item>
              <el-form-item label="链接">
                  <el-input v-model="addForm.ad_link"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                  <el-input v-model="addForm.ad_remark"></el-input>
              </el-form-item>
               <el-form-item label="状态" prop="ad_status">
                    <el-radio-group v-model="addForm.ad_status">
                        <el-radio label="上架"></el-radio>
                        <el-radio label="下架"></el-radio>
                    </el-radio-group>
                </el-form-item>
        </el-form>
        <div slot="footer" class="edit-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
 import * as sysApi from "../../common/sys";
  import {formatDate} from "../../common/utils";
export default {
    data() {
        return {
            tableData: [{
                id: "454545454",
                ad_name: "待付款",
                add_time:"",
                ad_link:"",
                ad_remark: "1212131313",
                ad_status: "133111111",
            }],
            useVisible:false,
            total:"",
            form: {
                value: '全部',
                status:""
            },
            total:10,
         
            status:[{
                label:"全部",
                statusId:"1"
            },{
                label:"上架",
                statusId:"2"
            },{
                label:"下架",
                statusId:"3"
            }],
            addForm:{
                ad_name:"",
                ad_link:"",
                ad_remark:"",
                ad_status:""
            },
            addVisible:false,
            currentPage:1,
            isReadOnly:false,
            isShowDetail: false,
            rowId:"",
            deleVisible:false
          
        }
    },
    methods: {
        handleEdit(row) {
            this.isShowDetail = true;
        },
        addManageBtn(){
            this.addVisible=true;
        },
        saveEdit(){
             var param={
    "name":this.addForm.ad_name,//广告名
    "url":this.addForm.ad_link,//广告链接
    "remark":this.addForm.ad_remark,//广告备注
    "status":this.addForm.ad_status//广告状态
}
        sysApi.adverAdd(param)
        .then(data => {
          console.log(data);
          if(data.success==true){
              this.addVisible=false;
               if(this.form.value=="全部"){
        var valhtml="";
    }else if(this.form.value=="上架"){
        var valhtml="上架";
    }else{
        var valhtml="下架";
    }
               var param={"status":valhtml,"page":1}
      sysApi.adverMent(param)
        .then(data => {
          this.tableData = data.data;
          //this.currentPage = Data.pageNo;
          this.total =data.total_count;
        })
        .catch(err => console.log('请求异常信息:' + err));
          }
        })
        .catch(err => console.log('请求异常信息:' + err));
        },
        downUpBtn(row){
            this.rowId=row.id;
            this.useVisible=true;
            if(row.ad_status=="上架"){
                this.form.status="是否确认下架？"
            }else{
                this.form.status="是否确认上架？"
            }
        },
        deleteRow(){
            if(this.form.status=="是否确认下架？"){
                var param={"id":this.rowId}
                 sysApi.adverDown(param)
                        .then(data => {
                            if(data.success==true){
                                this.$message({
                                            type:'success',
                                            message:data.info
                                        })
                                this.useVisible=false;
                                 if(this.form.value=="全部"){
                                    var valhtml="";
                                }else if(this.form.value=="上架"){
                                    var valhtml="上架";
                                }else{
                                    var valhtml="下架";
                                }
                                var param={"status":valhtml,"page":1}
                                 sysApi.adverMent(param)
                                    .then(data => {
                                        this.tableData = data.data;
                                        this.total =data.total_count;
                                })
                                .catch(err => console.log('请求异常信息:' + err));
                            }
                            console.log(data);
                        })
            }else{
                var param={"id":this.rowId}
                sysApi.adverUp(param)
                        .then(data => {
                             if(data.success==true){
                                 this.$message({
                                            type:'success',
                                            message:data.info
                                        })
                                this.useVisible=false;
                                 if(this.form.value=="全部"){
                                    var valhtml="";
                                }else if(this.form.value=="上架"){
                                     var valhtml="上架";
                                }else{
                                    var valhtml="下架";
                                }
                                var param={"status":valhtml,"page":1}
                                 sysApi.adverMent(param)
                                    .then(data => {
                                        this.tableData = data.data;
                                        this.total =data.total_count;
                                })
                                .catch(err => console.log('请求异常信息:' + err));
                            }
                            console.log(data);
                        })
            }
        },
        // 删除按钮
        deleteBtn(row){
             this.rowId=row.id;
             this.deleVisible=true;
        },
        deleRow(){
             var param={"id":this.rowId}
              sysApi.adverDele(param)
                        .then(data => {
                            if(data.success==true){
                                 this.deleVisible=false;
                                 this.$message({
                                            type:'success',
                                            message:data.info
                                        })
                                  if(this.form.value=="全部"){
                                    var valhtml="";
                                }else if(this.form.value=="上架"){
                                     var valhtml="上架";
                                }else{
                                    var valhtml="下架";
                                }
                                var param={"status":valhtml,"page":1}
                                 sysApi.adverMent(param)
                                    .then(data => {
                                        this.tableData = data.data;
                                        this.total =data.total_count;
                                        
                                })
                                .catch(err => console.log('请求异常信息:' + err));
                            }
                        })
                         .catch(err => console.log('请求异常信息:' + err));
        },
        // select删选
        selectChange(event){
            if(event==1){
                this.form.value="全部"
                 sysApi.adverMent({"status":"","page":1})
                    .then(data => {
                        this.tableData = data.data;
                        this.total =data.total_count;
                        console.log(data);
                 })
                .catch(err => console.log('请求异常信息:' + err));
            }else if(event==2){
                 this.form.value="上架"
                sysApi.adverMent({"status":"上架","page":1})
                    .then(data => {
                        this.tableData = data.data;
                        this.total =data.total_count;
                         console.log(data);
                 })
                .catch(err => console.log('请求异常信息:' + err));
            }else{
                 this.form.value="下架"
                sysApi.adverMent({"status":"下架","page":1})
                    .then(data => {
                        this.tableData = data.data;
                        this.total =data.total_count;
                         console.log(data);
                 })
                .catch(err => console.log('请求异常信息:' + err));
            }
        },
        handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
         if(this.form.value=="全部"){
                var valhtml="";
            }else if(this.form.value=="上架"){
                var valhtml="上架";
            }else{
                var valhtml="下架";
            }
      var param={"status":valhtml,"page":this.currentPage}
      sysApi.adverMent(param)
        .then(data => {
          this.tableData = data.data;
          this.total =data.total_count;
        })
        .catch(err => console.log('请求异常信息:' + err));
      }
    },
    created(){
        /**初次加载 数据列表 vue axios**/
    if(this.form.value=="全部"){
        var valhtml="";
    }else if(this.form.value=="上架"){
        var valhtml="上架";
    }else{
        var valhtml="下架";
    }
      var param={"status":valhtml,"page":this.currentPage}
      sysApi.adverMent(param)
        .then(data => {
          this.tableData = data.data;
          //this.currentPage = Data.pageNo;
          this.total =data.total_count;
          console.log(data)
          // for (var i in Data) {
          //   if (data[i].banner_file == '')
          //     data[i].banner_file = require('../../assets/defaultImg.jpg');
          // }
        })
        .catch(err => console.log('请求异常信息:' + err));
    }
}
</script>


