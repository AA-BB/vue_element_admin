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
end-placeholder="结束日期"  @change="onPick" format="yyyy 年 MM 月 dd 日">
</el-date-picker>
</div>
</el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.status" v-on:change="selectStatus($event)">
                            <el-option v-for="item in status" :key="item.Id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                   
            </el-form>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
            <el-table :data="tableData" border style="width:100%">
                <el-table-column label="文章ID" prop="id" align="center"></el-table-column>
                <el-table-column label="姓名" prop="user_name" align="center"></el-table-column>
                <el-table-column label="状态" prop="coop_status" align="center"></el-table-column>
                <el-table-column label="电话" prop="user_phone" align="center"></el-table-column>
                <el-table-column label="合作详情" prop="content" align="center"></el-table-column>
                <el-table-column label="提交时间" prop="submit_time" align="center"></el-table-column>
                <el-table-column label="操作" prop="operation" align="center" :width="280">
                    <template slot-scope="scope">
                        <el-button size="small"  @click="desBtn(scope.row)">
                            <i class="el-icon-edit-outline"></i> <b>详情</b>
                        </el-button>
                        <template v-if="scope.row.coop_status!=='已处理'">
                            <el-button size="small" type="danger" @click="handleEdit(scope.row)">处理</el-button>
                        </template>
                        <template v-else>
                        </template>
                    </template>
                    
                </el-table-column>
            </el-table>
             <el-pagination :total=total :page-size="1" :current-page="1"  @current-change="handleCurrentChange"
            :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        </el-col>
         <!-- 查看详细 -->
        <el-dialog title="提示" :visible.sync="isShowDetail" center width="30%" :model="desData">
            <div>{{desData.con}}</div>
            <div slot="footer" class="edit-footer">
          <el-button @click="isShowDetail = false">取 消</el-button>
          <el-button type="primary" @click="isShowDetail = false">确定</el-button>
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
            form: {
                status: '全部',
                 date:formatDate(new Date(),'yyyy-MM-dd'),
                starttime:"",
                endtime:"",
            },
            desData:{
                con:""
            },
            currentPage:1,
            tableData: [{
                articleID: "454545454",
                userName: "张三",
                status: "未处理",
                phone: "17621027902",
                cooperateDes: "你们有开发网吧版的吗？",
                updateTime: "2018.08.23  12:20:20",
                
            }],
            total:1,
            isReadOnly:false,
            isShowDetail: false,
            status_id:"",
            currentPage:1,
            status: [
                {
                    name: '全部',
                    Id: 1
                    
                },
                {
                    name: '未处理',
                    Id: 2,
                },
                {
                    name: '已处理',
                    Id: 3,
                }
            ]
         
        }
    },
    methods: {
             handleCurrentChange(val) {
        this.currentPage = parseInt(`${val}`);
         var pa={"page":this.currentPage,
      "start_time":this.form.starttime,
      "end_time":this.form.endtime,
      "status":this.status_id};
         sysApi.Bussiness(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
      },
        selectStatus(event){
            if(event=="全部"){
                this.status_id="";
                this.form.status="全部"
            }else if(event=="已处理"){
                this.status_id="已处理";
                this.form.status="已处理"
            }else{
                 this.status_id="未处理";
                this.form.status="未处理"
            }
               var pa={"page":1,
      "start_time":this.form.starttime,
      "end_time":this.form.endtime,
      "status":this.status_id};
         sysApi.Bussiness(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
        },
        handleEdit(row) {
             var param={
            "id":row.id// 反馈id 
        }
         sysApi.bussinessHandle(param)
        .then(data => {
            if(data.success==true){
                this.$message({
                    type:"success",
                    message:data.info
                })
                row.coop_status="已处理"
            }
          console.log(data)
        })
        .catch(err => console.log('请求异常信息:' + err));
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
            var pa={"page":1,
      "start_time":this.form.starttime,
      "end_time":this.form.endtime,
      "status":this.status_id};
         sysApi.Bussiness(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
               .catch(err => console.log('请求异常信息:' + err));
      },
      desBtn(row){
          this.rowId=row.id;
          this.desData.con=row.content;
          this.isShowDetail=true;
      },
    },
    created(){
            var pa={"page":this.currentPage,
      "start_time":this.form.starttime,
      "end_time":this.form.endtime,
      "status":""};
         sysApi.Bussiness(pa)
                .then(res => {
                    this.tableData=res.data;
                    this.total=res.total_count;
                    console.log(this.tableData);
                })
                .catch(err => {
                    console.log(err)
                })
    }
}
</script>


